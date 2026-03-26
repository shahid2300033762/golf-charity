import { Router, Response } from 'express';
import { supabase, supabaseAdmin } from '../supabase';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';

const router = Router();

// Get current subscription status
router.get('/status', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase inactive' });

  const userId = req.user.id;
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    return res.status(500).json({ error: 'Failed to fetch subscription' });
  }

  // If renewal date passed, set inactive
  let isActive = false;
  let subscription = data;

  if (data) {
    const isExpired = new Date(data.renewal_date).getTime() < Date.now();
    if (isExpired && data.status === 'active') {
      // Auto-expire
      await supabase.from('subscriptions').update({ status: 'inactive' }).eq('id', data.id);
      subscription.status = 'inactive';
    }
    isActive = subscription.status === 'active';
  }

  res.json({ subscription: subscription || null, isActive });
});

// Create/Renew Subscription
router.post('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (!supabaseAdmin) return res.status(500).json({ error: 'Supabase Admin inactive' });

  const { type, charityId, charityPercentage } = req.body;
  const userId = req.user.id;

  if (!['monthly', 'yearly'].includes(type)) {
    return res.status(400).json({ error: 'Invalid subscription type' });
  }

  if (charityPercentage < 10) {
    return res.status(400).json({ error: 'Minimum charity contribution is 10%' });
  }

  // 1. Calculate dates and amounts
  const amount = type === 'monthly' ? 4000 : 40000;
  const renewalDate = new Date();
  if (type === 'monthly') {
    renewalDate.setMonth(renewalDate.getMonth() + 1);
  } else {
    renewalDate.setFullYear(renewalDate.getFullYear() + 1);
  }

  // 2. Insert or update subscription
  const { data: existing } = await supabaseAdmin.from('subscriptions').select('*').eq('user_id', userId).single();

  let subResult;
  if (existing) {
    subResult = await supabaseAdmin.from('subscriptions').update({
      type,
      status: 'active',
      renewal_date: renewalDate.toISOString(),
      updated_at: new Date().toISOString()
    }).eq('id', existing.id);
  } else {
    subResult = await supabaseAdmin.from('subscriptions').insert({
      user_id: userId,
      type,
      status: 'active',
      renewal_date: renewalDate.toISOString()
    });
  }

  if (subResult.error) return res.status(500).json({ error: subResult.error.message });

  // 3. Process Charity Donation (if charityId exists)
  if (charityId) {
    const donationAmount = amount * (charityPercentage / 100);
    
    // Log donation
    await supabaseAdmin.from('donations').insert({
      user_id: userId,
      charity_id: charityId,
      percentage: charityPercentage,
      amount: donationAmount
    });

    // Update total raised for charity (can be done here or via async trigger, we do it here for simplicity)
    const { data: charity } = await supabaseAdmin.from('charities').select('total_raised').eq('id', charityId).single();
    if (charity) {
      await supabaseAdmin.from('charities').update({
        total_raised: parseFloat(charity.total_raised || '0') + donationAmount
      }).eq('id', charityId);
    }
  }

  res.json({ message: 'Subscription activated' });
});

// Cancel Subscription
router.post('/cancel', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (!supabaseAdmin) return res.status(500).json({ error: 'Supabase Admin inactive' });

  const userId = req.user.id;

  const { error } = await supabaseAdmin.from('subscriptions')
    .update({ status: 'inactive', updated_at: new Date().toISOString() })
    .eq('user_id', userId);

  if (error) return res.status(500).json({ error: error.message });

  res.json({ message: 'Subscription cancelled successfully' });
});

export default router;
