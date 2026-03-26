import { Router, Response } from 'express';
import { supabaseAdmin } from '../supabase';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';

const router = Router();

// Get user scores
router.get('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (!supabaseAdmin) return res.status(500).json({ error: 'Supabase Admin inactive' });

  const userId = req.user.id;

  // Order by created_at descending (latest first)
  const { data, error } = await supabaseAdmin
    .from('scores')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) return res.status(500).json({ error: error.message });

  res.json({ scores: data });
});

// Add a score (enforces max 5 rolling logic)
router.post('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (!supabaseAdmin) return res.status(500).json({ error: 'Supabase Admin inactive' });

  const { value } = req.body;
  const userId = req.user.id;

  if (!value || value < 1 || value > 45) {
    return res.status(400).json({ error: 'Invalid Score', message: 'Score value must be between 1 and 45.' });
  }

  // 1. Verify Active Subscription
  const { data: subscription } = await supabaseAdmin
    .from('subscriptions')
    .select('status')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single();

  if (!subscription) {
    return res.status(403).json({ 
      error: 'Subscription Required', 
      message: 'An active subscription is required to log scores and enter draws.' 
    });
  }

  // 2. Fetch scores for the CURRENT MONTH
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { data: scores } = await supabaseAdmin
    .from('scores')
    .select('value')
    .eq('user_id', userId)
    .gte('created_at', startOfMonth.toISOString());

  if (scores && scores.length >= 5) {
    return res.status(403).json({ 
      error: '🔒 Monthly Entry Locked', 
      message: 'You have already logged 5 scores for this month. Your entry is secured.' 
    });
  }

  // 3. Duplicate Prevention
  if (scores?.some(s => s.value === value)) {
    return res.status(400).json({ 
      error: 'Duplicate Score', 
      message: 'This score has already been logged for the current month.' 
    });
  }

  // Insert the new score
  const { data: newScore, error } = await supabaseAdmin
    .from('scores')
    .insert({ user_id: userId, value })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.json({ message: 'Score added successfully', score: newScore });
});

export default router;
