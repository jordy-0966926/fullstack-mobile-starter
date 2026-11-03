import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Screen() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      router.replace({ pathname: '/home' });
    }
  }, [isMounted, router]);

  return null;
}
