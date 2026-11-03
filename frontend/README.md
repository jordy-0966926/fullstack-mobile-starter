# Mobile Starter app

An Expo SDK 58 app with Home/Profile routes, NativeWind light/dark styling and UI components from [React Native Reusables](https://reactnativereusables.com).

Follow the [root setup guide](../README.md) for Docker, Android emulator networking and environment variables.

## Commands

Run in `frontend/`:

```sh
npm ci
npm run dev
npm run typecheck
npx expo install --check
npx expo-doctor
npx expo export --platform android --output-dir dist-android
```

Use Expo Go compatible with SDK 58. Home and Profile are placeholders for your app's features. The shared API client is in `lib/api/`; configure its base URL through the example environment settings before using it in a screen.

The component foundation is React Native Reusables, built on React Native Primitives. Preserve applicable upstream notices when reusing components.
