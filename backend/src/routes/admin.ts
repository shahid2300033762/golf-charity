import { Router, Response } from 'express';
import { supabaseAdmin } from '../supabase';
import { requireAdmin, AuthenticatedRequest } from '../middleware/auth.middleware';

const router = Router();

router.get('/stats', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  if (!supabaseAdmin) return res.status(500).json({ error: 'Supabase Admin inactive' });

  // Parallel fetching of analytics
  const [ usersRes, subsRes, charitiesRes, donationsRes ] = await Promise.all([
    supabaseAdmin.from('users').select('id', { count: 'exact' }),
    supabaseAdmin.from('subscriptions').select('id', { count: 'exact' }).eq('status', 'active'),
    supabaseAdmin.from('charities').select('*'),
    supabaseAdmin.from('donations').select('amount')
  ]);

  const totalUsers = usersRes.count || 0;
  const activeSubscriptions = subsRes.count || 0;
  
  let totalDonations = 0;
  donationsRes.data?.forEach(d => {
    totalDonations += Number(d.amount);
  });

  res.json({
    totalUsers,
    activeSubscriptions,
    totalDonations,
    charities: charitiesRes.data
  });
});

router.get('/winners', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  if (!supabaseAdmin) return res.status(500).json({ error: 'Supabase Admin inactive' });

  const { data, error } = await supabaseAdmin
    .from('winners')
    .select('*, draws(draw_date), users(email)')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json({ winners: data });
});

router.put('/winners/:id/verify', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  if (!supabaseAdmin) return res.status(500).json({ error: 'Supabase Admin inactive' });

  const winnerId = req.params.id;
  const { status } = req.body; // 'approved' or 'rejected'

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid verification status' });
  }

  const { data, error } = await supabaseAdmin.from('winners')
    .update({ status })
    .eq('id', winnerId)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.json({ message: 'Winner verified successfully', winner: data });
});

// Mock endpoint to upload proof URL for winners (Since we don't implement full s3 bucket here)
router.post('/winners/:id/proof', async (req: AuthenticatedRequest, res: Response) => {
  if (!supabaseAdmin) return res.status(500).json({ error: 'Supabase Admin inactive' });
  const winnerId = req.params.id;
  
  const { data, error } = await supabaseAdmin.from('winners')
    .update({ proof_url: 'https://placeholder.com/proof.jpg' })
    .eq('id', winnerId)
    .select()
    .single();
    
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Proof uploaded', winner: data });
});

export default router;
