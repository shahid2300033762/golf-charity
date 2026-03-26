import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
// Use SERVICE_ROLE_KEY if we want the backend to bypass RLS, but for now we'll use ANON_KEY and rely on the frontend passing JWT headers, OR we pass the user's token.
// Actually, if this is a secure backend, it might use a Service Role key to perform admin operations (like draws).
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey; 

export const supabaseAdmin = supabaseUrl && supabaseServiceKey && !supabaseServiceKey.includes('YOUR_')
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export const supabase = supabaseUrl && supabaseKey && !supabaseKey.includes('YOUR_')
  ? createClient(supabaseUrl, supabaseKey)
  : null;
