import { supabase } from '../lib/supabase';

export const drawService = {
  async getLatestDraws(limit = 10) {
    const { data, error } = await supabase
      .from('draws')
      .select('*')
      .order('draw_date', { ascending: false })
      .limit(limit);
    return { data, error };
  },

  async getWinnersByDraw(drawId: string) {
    const { data, error } = await supabase
      .from('winners')
      .select(`
        *,
        users ( name, email )
      `)
      .eq('draw_id', drawId);
    return { data, error };
  },

  // Real-time listener for new draws being published
  subscribeToDrawUpdates(callback: (payload: any) => void) {
    return supabase
      .channel('public:draws')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'draws' }, callback)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'draws' }, callback)
      .subscribe();
  },

  async claimPrize(winnerId: string, proofUrl: string) {
    const { data: { session } } = await supabase.auth.getSession();
    const API_URL = import.meta.env.VITE_API_URL || '';
    const res = await fetch(`${API_URL}/api/winners/${winnerId}/claim`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`
      },
      body: JSON.stringify({ proof_url: proofUrl })
    });
    return res.json();
  }
};
