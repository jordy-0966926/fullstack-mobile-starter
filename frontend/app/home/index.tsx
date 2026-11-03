import React from 'react';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="items-center justify-center flex-1 p-4 bg-background">
      <Text className="mb-2 text-2xl font-bold text-foreground">Welcome</Text>
      <Text className="text-center text-muted-foreground">This is a placeholder for the home screen.</Text>
    </View>
  );
}
