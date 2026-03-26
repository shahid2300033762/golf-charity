import { supabaseAdmin } from './src/supabase';

async function check() {
  try {
    const { data: subs, error: subError } = await supabaseAdmin.from('subscriptions').select('*');
    const { data: users, error: userError } = await supabaseAdmin.from('users').select('*');
    
    console.log('Subscriptions:', JSON.stringify(subs, null, 2));
    console.log('Users:', JSON.stringify(users, null, 2));
    
    if (subError) console.error('Sub Error:', subError);
    if (userError) console.error('User Error:', userError);
  } catch (err) {
    console.error('Catch Error:', err);
  }
}

check();
