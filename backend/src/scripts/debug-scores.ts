import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function debugScores() {
  const { data: tables, error } = await supabase.rpc('get_tables'); // Or try raw fetch
  // If RPC doesn't exist, use raw query if possible, but let's try a simple select from a known internal table
  const { data: schemaTables } = await supabase.from('draws').select('*').limit(1);
  console.log('Draws query works?', !!schemaTables);
  
  // Try to list all tables via REST API
  const url = `${process.env.VITE_SUPABASE_URL}/rest/v1/?apikey=${process.env.SUPABASE_SERVICE_ROLE_KEY}`;
  const res = await fetch(url);
  const json = await res.json();
  console.log('Available internal paths:', Object.keys(json.paths).filter(p => !p.includes('/')));
}

debugScores();
