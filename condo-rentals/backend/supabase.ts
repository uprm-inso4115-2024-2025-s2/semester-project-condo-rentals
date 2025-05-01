// import supabase from './supabaseConfig';
import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://dbunxaexqebpktfwoiap.supabase.co" // YOUR_REACT_NATIVE_SUPABASE_URL
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRidW54YWV4cWVicGt0ZndvaWFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMzQzOTQsImV4cCI6MjA1NTYxMDM5NH0.eexvgd-fyp87PDWTkPAyCrXSBrgT29cAohmHJJWGOTA" //YOUR_REACT_NATIVE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

const fetchProperties = async () => {
  const { data, error } = await supabase.from('properties').select('*');
  if (error) console.error(error);
  return data;
};

const addProperty = async (property: any) => {
  const { data, error } = await supabase.from('properties').insert([property]);
  if (error) console.error(error);
  return data;
};