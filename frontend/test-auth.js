const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ohtvovjjjakxqkhrnype.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9odHZvdmpqamFreHFraHJueXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NDE5MDQsImV4cCI6MjA5MDAxNzkwNH0.VfwxfWm-IhZmQlOUzlprW-dmrsBZWsMF6xQfD30bFCo';

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
