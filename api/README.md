# Mobile Starter API

A Hono API with Zod/OpenAPI validation and Drizzle queries against PostgreSQL.

Start it through the [root Docker setup](../README.md). For host development, install `db/` and `api/` with `npm ci`, create their environment files from the root `example.env`, and initialize PostgreSQL with the database scripts documented in the root README.

## Commands

Run in `api/`:

```sh
npm run dev
npm run typecheck
npm test
npm run build
npm start
```

`npm start` requires a successful build. `PORT` defaults to 3000. The build bundles the local shared database code into `dist/server.js`; ordinary npm dependencies remain external.

## Routes

| Method | Path | Behavior |
| --- | --- | --- |
| GET | /health | 200 JSON when PostgreSQL is reachable; 503 JSON otherwise |
| GET | /users?limit=10 | Public example list; integer limit 1–100 |
| GET | /users/{userId} | Public example detail; positive 32-bit integer ID, 404 if absent |
| GET | /doc | OpenAPI document |
| GET | /swagger | Swagger UI |

Malformed request parameters return 400 JSON with a `message` field. Password fields are excluded from user responses.

Authentication is intentionally unimplemented. The unmounted example middleware denies every request; it does not provide working login or authorization. Use fictional data until you add real access control.

Set `TEST_DATABASE=1` when running tests to include read-only checks against a seeded disposable database. Without it, database checks are skipped.
