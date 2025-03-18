import { createClient } from '@supabase/supabase-js';
import Constants from "expo-constants"

const SUPABASE_URL = Constants.expoConfig?.extra?.SUPABASE_URL || 'https://dbunxaexqebpktfwoiap.supabase.co';
const SUPABASE_ANON_KEY = Constants.expoConfig?.extra?.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRidW54YWV4cWVicGt0ZndvaWFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMzQzOTQsImV4cCI6MjA1NTYxMDM5NH0.eexvgd-fyp87PDWTkPAyCrXSBrgT29cAohmHJJWGOTA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
