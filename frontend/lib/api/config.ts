import { Platform } from 'react-native';

function getApiBaseUrl(): string {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  return Platform.OS === 'android'
    ? process.env.EXPO_PUBLIC_API_URL_ANDROID!
    : process.env.EXPO_PUBLIC_API_URL_DEFAULT!;
}

export const API_BASE_URL = getApiBaseUrl();
