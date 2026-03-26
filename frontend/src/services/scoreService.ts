import { supabase } from '../lib/supabase';

export const scoreService = {
  async getLatestScores(userId: string) {
    // Only fetch the latest 5 scores as described in optimization
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);
    
    return { data, error };
  },

  async submitScore(userId: string, value: number) {
    if (value < 1 || value > 45) {
      return { error: { message: 'Score must be between 1 and 45' } };
    }
    
    // Check if score exists in current batch
    const { data: currentScores } = await this.getLatestScores(userId);
    const exists = currentScores?.some((s: { value: number }) => s.value === value);
    if (exists) {
      return { error: { message: 'Duplicate score already exists in latest 5 scores' } };
    }

    const { data, error } = await supabase
      .from('scores')
      .insert({ user_id: userId, value })
      .select();

    return { data, error };
  }
};
