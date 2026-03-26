import { Router, Response } from 'express';
import { supabaseAdmin } from '../supabase';
import { requireAuth, requireAdmin, AuthenticatedRequest } from '../middleware/auth.middleware';

const router = Router();

// Get my winnings
router.get('/my-winnings', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (!supabaseAdmin) return res.status(500).json({ error: 'Supabase Admin inactive' });

  const userId = req.user.id;
  const { data, error } = await supabaseAdmin
    .from('winners')
    .select(`
      *,
      draws ( draw_date, winning_numbers )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json({ winnings: data });
});

// Claim a prize (submit proof)
router.post('/:id/claim', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (!supabaseAdmin) return res.status(500).json({ error: 'Supabase Admin inactive' });

  const { id } = req.params;
  const { proof_url } = req.body;
  const userId = req.user.id;

  // Ensure user owns this winner record
  const { data: winner, error: fetchError } = await supabaseAdmin
    .from('winners')
    .select('user_id, status')
    .eq('id', id)
    .single();

  if (fetchError || !winner) return res.status(404).json({ error: 'Winner record not found' });
  if (winner.user_id !== userId) return res.status(403).json({ error: 'Unauthorized to claim this prize' });
  if (winner.status !== 'pending') return res.status(400).json({ error: 'Prize already processed or claimed' });

  const { error: updateError } = await supabaseAdmin
    .from('winners')
    .update({ 
      proof_url,
      status: 'pending' // ensure it stays pending but now has proof
    })
    .eq('id', id);

  if (updateError) return res.status(500).json({ error: updateError.message });
  res.json({ message: 'Proof submitted successfully, awaiting admin verification' });
});

// Verify a winner (Admin only)
router.patch('/:id/verify', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  if (!supabaseAdmin) return res.status(500).json({ error: 'Supabase Admin inactive' });

  const { id } = req.params;
  const { status } = req.body; // 'approved' or 'rejected'

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const { error } = await supabaseAdmin
    .from('winners')
    .update({ status })
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: `Winner status updated to ${status}` });
});

export default router;
