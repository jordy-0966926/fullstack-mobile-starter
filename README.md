# Full-stack mobile starter

My starting point for a mobile app with Expo, a TypeScript API and PostgreSQL. It includes Home/Profile navigation, light/dark styling, a shared API client, validated read-only example endpoints, database setup and Docker development services.

The UI components started from [React Native Reusables](https://reactnativereusables.com). Authentication and app-specific features still need to be added.

## Architecture

- `frontend/`: Expo SDK 58, React Native, Expo Router and NativeWind.
- `api/`: Hono, Zod validation, OpenAPI and Swagger UI.
- `db/`: shared database code, Prisma schema/setup/seed and Drizzle queries.
- PostgreSQL 18 stores the data. The API queries it directly; the `db` container initializes the schema and runs Prisma Studio.

## Quick start with Docker

Install Docker Desktop with Compose v2. Clone the repository if needed:

```sh
git clone https://github.com/jordy-0966926/fullstack-mobile-starter.git
cd fullstack-mobile-starter
```

From the repository root, copy the example environment:

```powershell
Copy-Item example.env db/.env
Copy-Item example.env api/.env
Copy-Item example.env frontend/.env
docker compose up --build
```

On macOS/Linux use `cp` instead of `Copy-Item`. The example credentials are for local development only. Real environment files are ignored by Git and excluded from Docker image builds.

The database is initialized and seeded automatically before the API starts.

| Service | Local address |
| --- | --- |
| API health | http://localhost:3000/health |
| Swagger UI | http://localhost:3000/swagger |
| OpenAPI JSON | http://localhost:3000/doc |
| Prisma Studio | http://localhost:51212 |
| Metro | http://localhost:8081 |

Services bind to the host loopback interface by default. The Home and Profile screens contain placeholders. The public sample API provides `GET /users` and `GET /users/{userId}`, with fictional records and no password fields. List limits must be integers from 1 to 100.

### Android emulator

Use an Expo Go version compatible with SDK 58: [Expo Go downloads](https://expo.dev/go).

Install Android SDK Platform-Tools and put `adb` on your host's PATH. Start an Android emulator, then on the host run:

```sh
adb reverse tcp:8081 tcp:8081
adb shell am start -a android.intent.action.VIEW -d exp://127.0.0.1:8081
```

The emulator reaches the host API through `http://10.0.2.2:3000`. Docker's internal `pg` hostname is for database connections inside containers, not mobile API calls.

For a physical device, run Metro and the API on the host and set `EXPO_PUBLIC_API_URL` to the host's LAN address. The default Docker ports are not exposed to your LAN. So far, this setup has been tested on an Android emulator.

### Environment variables

`example.env` contains the service settings:

- `DATABASE_URL`: use `pg:5432` inside Docker, or the published host PostgreSQL port when running services on the host.
- `EXPO_PUBLIC_API_URL`: optional override for every platform.
- `EXPO_PUBLIC_API_URL_ANDROID`: Android emulator default, `http://10.0.2.2:3000`.
- `EXPO_PUBLIC_API_URL_DEFAULT`: local iOS simulator/default address.
- `PORT`: optional API listening port when running the API outside Docker.

To change host Docker ports, set `API_PORT`, `METRO_PORT`, `STUDIO_PORT` or `POSTGRES_PORT` in a root `.env` or your shell. Update the frontend API URL and adb reverse mapping to match. These host mappings do not change container service ports.

## Local Node development

Use a supported Node.js LTS release (22.13+ or 24.3+). Docker uses Node 22. The API's `db` dependency points to the local sibling package, so install both before starting the API:

```sh
npm ci --prefix db
npm ci --prefix api
npm ci --prefix frontend
```

Create the three environment files as above. When running the API or database tools on the host, update their `DATABASE_URL` to use `localhost` instead of `pg`.

With PostgreSQL running:

```sh
npm run prisma:generate --prefix db
npm run prisma:push --prefix db
npm run prisma:seed --prefix db
npm run dev --prefix api
```

In a second terminal, run `npm run dev --prefix frontend`. The initial database push is suitable for this development starter; use reviewed migrations for an application with persistent deployment data.

## Checks

Run these in a separate terminal after Docker starts:

```sh
docker compose exec api npm run typecheck
docker compose exec api npm test
docker compose exec -e TEST_DATABASE=1 api npm test
docker compose exec frontend npm run typecheck
docker compose exec frontend npx expo install --check
docker compose exec frontend npx expo-doctor
docker compose exec frontend npx expo export --platform android --output-dir /tmp/mobile-starter-android
```

The default API tests check input validation, OpenAPI responses, database-error handling and the auth placeholder. `TEST_DATABASE=1` adds read-only checks against a seeded database.

The API also has a compiled start path:

```sh
npm run build --prefix api
npm start --prefix api
```

Build/start use the current environment and installed dependencies. The Docker services run development commands; this Compose file is not a production deployment configuration.

## Authentication

Authentication is not implemented. The example user routes are public and use fictional seed data. `api/src/lib/authHandler.ts` is an unused placeholder that returns 401. Replace it with authentication and authorization for your app.

Seeded password hashes exist only as sample database fields; there is no login endpoint.

## Updating dependencies

Each service has an npm lockfile and Docker uses `npm ci`. For Expo packages, run `npx expo install --fix` from `frontend/`, then run the checks above and `npm audit`. The frontend has scoped `glob` and `minimatch` overrides for dependency advisories; review those when upgrading Expo.

After dependency changes, recreate development containers and frontend dependency volumes without deleting database data:

```sh
docker compose up --build --renew-anon-volumes
```

`docker compose down` stops the services and preserves the named PostgreSQL volume. `docker compose down --volumes` deletes the local database; use that only when you intend to reset it.

## License

My code is available under the [MIT License](LICENSE). The React Native Reusables components retain their [upstream MIT license and copyright notice](licenses/react-native-reusables.txt). Dependencies retain their own licenses.
