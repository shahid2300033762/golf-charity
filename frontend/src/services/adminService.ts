import { supabase } from '../lib/supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const BASE_URL = `${API_URL}/api/admin`;
const DRAW_URL = `${API_URL}/api/draws`;

export const adminService = {
  async getPlatformMetrics() {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch(`${BASE_URL}/stats`, {
      headers: { 'Authorization': `Bearer ${session?.access_token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  async runDraw(isSimulation = false) {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch(`${DRAW_URL}/run`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}` 
      },
      body: JSON.stringify({ isSimulation })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Draw execution failed');
    }
    return res.json();
  },

  async publishDraw(drawId: string) {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch(`${DRAW_URL}/${drawId}/publish`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${session?.access_token}` }
    });
    if (!res.ok) throw new Error('Failed to publish draw');
    return res.json();
  },

  async getWinners() {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch(`${BASE_URL}/winners`, {
      headers: { 'Authorization': `Bearer ${session?.access_token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch winners');
    return res.json();
  },

  async verifyWinner(winnerId: string, status: 'approved' | 'rejected') {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch(`${BASE_URL}/winners/${winnerId}/verify`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}` 
      },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  async getCharities() {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const res = await fetch(`${API_URL}/api/charities`);
    return res.json();
  }
};
