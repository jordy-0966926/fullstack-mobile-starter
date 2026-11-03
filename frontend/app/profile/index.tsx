import React from 'react';
import { Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="items-center justify-center flex-1 p-4 bg-background">
      <Text className="mb-2 text-2xl font-bold text-foreground">Your profile</Text>
      <Text className="text-center text-muted-foreground">This is a placeholder for the current user profile.</Text>
    </View>
  );
}
