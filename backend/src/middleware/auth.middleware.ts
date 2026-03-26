import { Request, Response, NextFunction } from 'express';
import { supabase } from '../supabase';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase client not initialized' });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.user = user;
  next();
};

export const requireAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  if (!supabase) {
    return res.status(500).json({ error: 'Supabase client not initialized' });
  }

  // Retrieve user role from public.users table
  const { data, error } = await supabase.from('users').select('role').eq('id', req.user.id).single();
  
  if (error || !data || data.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  next();
};
