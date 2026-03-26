import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''; // Use service role for admin listUsers
const supabase = createClient(supabaseUrl, supabaseKey);

async function setupTestData() {
  console.log('--- Setting up Test Data ---');

  // 1. Get the first user (assume this is the tester)
  const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
  
  if (authError || !users || users.length === 0) {
    console.error('No users found in Supabase Auth.');
    return;
  }

  const userId = users[0].id;
  console.log(`Using User ID: ${userId} (${users[0].email})`);

  // 2. Clear existing scores (optional)
  await supabase.from('scores').delete().eq('user_id', userId);

  // 3. Insert 5 scores
  const mockScores = [12, 25, 33, 41, 44].map(val => ({
    user_id: userId,
    value: val,
    created_at: new Date().toISOString()
  }));

  const { error: insertError } = await supabase.from('scores').insert(mockScores);

  if (insertError) {
    console.error('Failed to insert scores:', insertError);
  } else {
    console.log('Successfully logged 5 scores for the user.');
  }
}

setupTestData();
