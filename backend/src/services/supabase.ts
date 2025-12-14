import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from backend directory (works in both dev and production)
dotenv.config({ path: join(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

// Service role client (for backend operations)
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Function to get user by Clerk ID
export async function getUserByClerkId(clerkId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', clerkId)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  return data;
}

// Function to create or update user from Clerk
export async function syncUserFromClerk(clerkId: string, email: string) {
  const { data, error } = await supabase
    .from('users')
    .upsert(
      {
        clerk_id: clerkId,
        email,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'clerk_id',
      }
    )
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

