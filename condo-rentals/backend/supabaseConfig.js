import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;

// database password zshXCo52tyTBIjnr