import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from '../backend/supabase';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { Stack } from "expo-router";

const StackLayout = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for session changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      if (session) {
        router.replace('/(tabs)/Listings'); // Redirect to main app if logged in
      } else {
        router.replace('/auth/index'); // Redirect to login screen if not logged in
      }
    }
  }, [session, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ title: "" }} />
      <Stack.Screen name="auth" options={{ title: "Authentication" }} />
    </Stack>
  );
};

export default StackLayout;
