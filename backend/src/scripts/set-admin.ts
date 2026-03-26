import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setAdmin(email: string) {
  const { data, error } = await supabase
    .from('users')
    .update({ role: 'admin' })
    .eq('email', email)
    .select();

  if (error) {
    console.error('Error setting admin:', error.message);
  } else if (data && data.length > 0) {
    console.log(`Success! User ${email} is now an admin.`);
  } else {
    console.log(`User ${email} not found.`);
  }
}

const email = process.argv[2];
if (!email) {
  console.log('Please provide an email: npx ts-node set-admin.ts user@example.com');
} else {
  setAdmin(email);
}
