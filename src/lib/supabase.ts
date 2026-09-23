import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

if (!supabaseUrl) {
  console.warn(
    '[Supabase] Warning: VITE_SUPABASE_URL is not defined in your environment variables. Please check your .env file.'
  );
}

if (!supabasePublishableKey) {
  console.warn(
    '[Supabase] Warning: VITE_SUPABASE_PUBLISHABLE_KEY is not defined in your environment variables. Please check your .env file.'
  );
}

// Fallback to a placeholder URL if not provided during build/prerender to prevent client crash
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabasePublishableKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
