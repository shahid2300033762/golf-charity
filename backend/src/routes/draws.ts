import { Router, Response } from 'express';
import { supabase, supabaseAdmin } from '../supabase';
import { requireAuth, requireAdmin, AuthenticatedRequest } from '../middleware/auth.middleware';

const router = Router();

// Get past draws
router.get('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase inactive' });

  const { data, error } = await supabase
    .from('draws')
    .select('*')
    .order('draw_date', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json({ draws: data });
});

// Run Draw Engine (Admin)
router.post('/run', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  if (!supabaseAdmin) return res.status(500).json({ error: 'Supabase Admin inactive' });

  const { isSimulation } = req.body; // if true, don't save to DB

  // 1. Generate Winning Numbers (5 unique numbers 1-45)
  const winningNumbers: number[] = [];
  while(winningNumbers.length < 5) {
    let r = Math.floor(Math.random() * 45) + 1;
    if(winningNumbers.indexOf(r) === -1) winningNumbers.push(r);
  }
  winningNumbers.sort((a,b) => a - b);

  // 2. Calculate Prize Pool from Active Subscriptions
  const { data: activeSubs } = await supabaseAdmin
    .from('subscriptions')
    .select('user_id, type')
    .eq('status', 'active');
  
  const activeUserIds = activeSubs?.map(sub => sub.user_id) || [];
  
  let totalRevenue = 0;
  activeSubs?.forEach(sub => {
    totalRevenue += (sub.type === 'monthly' ? 4000 : 40000);
  });
  
  // Prize pool logic (50% of revenue after 10% charity)
  const prizePool = totalRevenue * 0.50;

  // Fetch rollover from latest completed draw
  const { data: latestDraw } = await supabaseAdmin
    .from('draws')
    .select('jackpot_rollover_amount')
    .eq('status', 'completed')
    .order('draw_date', { ascending: false })
    .limit(1)
    .single();

  const rollover = latestDraw?.jackpot_rollover_amount || 0;
  const currentJackpotPool = (prizePool * 0.40) + rollover;
  const pool4 = prizePool * 0.35;
  const pool3 = prizePool * 0.25;

  // 3. Match user scores for ACTIVE SUBSCRIBERS
  const { data: allScores, error: scoreError } = await supabaseAdmin
    .from('scores')
    .select('user_id, value, created_at')
    .in('user_id', activeUserIds)
    .order('created_at', { ascending: false });

  if (scoreError) return res.status(500).json({ error: scoreError.message });

  // Group by user id and keep only the latest 5
  const userScores: Record<string, number[]> = {};
  allScores?.forEach(s => {
    if (!userScores[s.user_id]) userScores[s.user_id] = [];
    if (userScores[s.user_id].length < 5) {
      userScores[s.user_id].push(s.value);
    }
  });

  const winnersList: { userId: string, matchCount: number }[] = [];
  let match5Count = 0;
  let match4Count = 0;
  let match3Count = 0;

  Object.keys(userScores).forEach(userId => {
    const uScores = userScores[userId];
    // A user must have at least 5 scores recorded to enter? 
    // Requirement says "with 5 scores".
    if (uScores.length < 5) return;

    let matchCount = 0;
    uScores.forEach(score => {
      if (winningNumbers.includes(score)) {
        matchCount++;
      }
    });

    if (matchCount >= 3) {
      winnersList.push({ userId, matchCount });
      if (matchCount === 5) match5Count++;
      if (matchCount === 4) match4Count++;
      if (matchCount === 3) match3Count++;
    }
  });

  // Calculate individual payouts
  const payout5 = match5Count > 0 ? currentJackpotPool / match5Count : 0;
  const payout4 = match4Count > 0 ? pool4 / match4Count : 0;
  const payout3 = match3Count > 0 ? pool3 / match3Count : 0;

  const result = {
    winningNumbers,
    prizePool,
    jackpotRolledOver: match5Count === 0,
    rolledOverAmount: match5Count === 0 ? currentJackpotPool : 0,
    winners: winnersList.map(w => ({
      ...w,
      prize: w.matchCount === 5 ? payout5 : (w.matchCount === 4 ? payout4 : payout3)
    }))
  };

  if (isSimulation) {
    return res.json({ simulation: true, data: result });
  }

  // 4. Save to DB
  const { data: newDraw, error: drawError } = await supabaseAdmin.from('draws').insert({
    winning_numbers: winningNumbers,
    status: 'pending',
    type: 'random',
    jackpot_rolled_over: result.jackpotRolledOver,
    is_published: false
    // Note: We need to add rollover tracking column to draws if it doesn't exist
  }).select().single();

  if (drawError) return res.status(500).json({ error: drawError.message });

  // Update rollover amount stored in the draw for next time
  if (result.jackpotRolledOver) {
    await supabaseAdmin.from('draws')
      .update({ jackpot_rollover_amount: result.rolledOverAmount })
      .eq('id', newDraw.id);
  }

  if (result.winners.length > 0) {
    const winnersInsertions = result.winners.map(w => ({
      draw_id: newDraw.id,
      user_id: w.userId,
      match_count: w.matchCount,
      prize_amount: w.prize,
      status: 'approved'
    }));

    await supabaseAdmin.from('winners').insert(winnersInsertions);
  }

  res.json({ message: 'Draw executed successfully', draw: newDraw, data: result });
});

// Publish a draw
router.post('/:id/publish', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  if (!supabaseAdmin) return res.status(500).json({ error: 'Supabase Admin inactive' });

  const { id } = req.params;
  const { error } = await supabaseAdmin.from('draws')
    .update({ 
      status: 'completed',
      is_published: true 
    })
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });

  res.json({ message: 'Draw published successfully' });
});

export default router;
