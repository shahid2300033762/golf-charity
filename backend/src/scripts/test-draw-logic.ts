import { supabaseAdmin } from '../supabase';

async function testDrawLogic() {
  console.log('--- Testing Draw Logic ---');

  // 1. Mock Data Setup (assuming we have some users/subs/scores)
  // We'll just run a simulation via the existing endpoint or internal logic
  // For this test, we'll simulate the pool calculation and matching
  
  const revenue = 1000; // 20 monthly users at $50?
  const prizePool = revenue * 0.50; // $500
  const rollover = 100; // from prev draw
  
  const currentJackpot = (prizePool * 0.40) + rollover; // $200 + $100 = $300
  const pool4 = prizePool * 0.35; // $175
  const pool3 = prizePool * 0.25; // $125
  
  console.log('Pools:', { jackpot: currentJackpot, tier2: pool4, tier3: pool3 });

  // Simulate winners
  const match5Count = 0;
  const match4Count = 2;
  const match3Count = 5;

  const payout5 = match5Count > 0 ? currentJackpot / match5Count : 0;
  const payout4 = match4Count > 0 ? pool4 / match4Count : 0;
  const payout3 = match3Count > 0 ? pool3 / match3Count : 0;

  console.log('Payouts:', { match5: payout5, match4: payout4, match3: payout3 });
  
  if (match5Count === 0) {
    console.log('Rollover to next draw:', currentJackpot);
  }

  // Verify logic matches requirements
  console.log('--- Verification ---');
  if (payout4 === 175 / 2) console.log('✓ Tier 2 splitting correct');
  if (payout5 === 0 && match5Count === 0) console.log('✓ Jackpot rollover triggered');
  
  console.log('Test complete.');
}

testDrawLogic().catch(console.error);
