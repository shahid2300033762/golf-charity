const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'frontend/.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuth() {
  console.log('Testing SignUp...');
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: 'kshahid2106@gmail.com',
    password: 'password123',
  });
  console.log('SignUp Data:', signUpData.user ? 'Success' : 'null');
  if (signUpError) console.error('SignUp Error:', signUpError.message);

  console.log('\nTesting SignIn...');
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: 'kshahid2106@gmail.com',
    password: 'wrongpassword',
  });
  console.log('SignIn Data:', signInData.user ? 'Success' : 'null');
  if (signInError) console.error('SignIn Error:', signInError.message);
}

testAuth();
