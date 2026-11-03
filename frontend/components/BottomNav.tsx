import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useRouter, useSegments } from 'expo-router';
import { Home, User } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BottomNav() {
  const segments = useSegments();
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();


  const isOnHome = segments[0] === 'home';

  const handleHome = () => {
    router.replace({ pathname: '/home', params: { refresh: String(Date.now()) } });
  };

  const handleProfile = () => {
    router.push({ pathname: '/profile' });
  };


  return (
    <View
      className="absolute bottom-0 left-0 right-0 flex-row items-center border-t justify-evenly border-border bg-background"
      style={{ paddingBottom: bottom }}
    >
      <Button
        variant={isOnHome ? 'default' : 'ghost'}
        size="icon"
        onPress={handleHome}
        className="rounded-none"
        accessibilityLabel="Home"
      >
        <Icon as={Home} className={isOnHome ? "size-5 color-primary-foreground" : "size-5"} />
      </Button>

      <Button variant="ghost" size="icon" onPress={handleProfile} accessibilityLabel="Profile">
        <Icon as={User} className="size-5" />
      </Button>


    </View>
  );
}
