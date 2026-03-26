import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''; // Use service role
const supabase = createClient(supabaseUrl, supabaseKey);

async function mockDraw() {
  console.log('--- Mocking Draw Results ---');

  // 1. Get a user with scores
  const { data: scores, error: scoresError } = await supabase
    .from('scores')
    .select('user_id, value')
    .limit(5);

  if (scoresError || !scores || scores.length === 0) {
    console.error('No scores found to mock against.');
    return;
  }

  const userId = scores[0].user_id;
  const userNums = scores.map(s => s.value);
  console.log(`User ID: ${userId}`);
  console.log(`User Scores: ${userNums.join(', ')}`);

  // 2. Create a draw that matches 3 of the user's numbers
  const winningNumbers = [
    userNums[0], 
    userNums[1], 
    userNums[2], 
    Math.floor(Math.random() * 50) + 1, 
    Math.floor(Math.random() * 50) + 1
  ].sort((a, b) => a - b);

  console.log(`Mocking Winning Numbers: ${winningNumbers.join(', ')}`);

  const { data: draw, error: drawError } = await supabase
    .from('draws')
    .insert([{
      draw_date: new Date().toISOString(),
      winning_numbers: winningNumbers,
      status: 'completed',
      jackpot_rollover_amount: 50000,
      jackpot_rolled_over: false
    }])
    .select()
    .single();

  if (drawError) {
    console.error('Failed to create mock draw:', drawError);
    return;
  }

  console.log(`Mock Draw Created: ${draw.id}`);

  // 3. Insert a winner record for the user (3 matches)
  const { error: winnerError } = await supabase
    .from('winners')
    .insert([{
      draw_id: draw.id,
      user_id: userId,
      match_count: 3,
      prize_amount: 1500,
      status: 'approved'
    }]);

  if (winnerError) {
    console.error('Failed to create winner record:', winnerError);
  } else {
    console.log('Success! Mock draw and winner record created. Refresh the page to see results.');
  }
}

mockDraw();
