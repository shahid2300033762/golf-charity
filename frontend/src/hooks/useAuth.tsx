import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { authService } from '../services/authService';

export interface UserSession {
  id: string;
  email: string;
  role: 'user' | 'admin';
  name: string;
  subscriptionStatus: 'active' | 'inactive';
}

export function useAuth() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const fetchSession = async () => {
      setIsLoading(true);
      try {
        const { session } = await authService.getSession();
        
        if (session?.user) {
          const { data: profile } = await authService.getUserProfile(session.user.id);
          
          // Also fetch subscription status via simple query
          let subStatus: 'active' | 'inactive' = 'inactive';
          try {
            const { data: subData } = await supabase
              .from('subscriptions')
              .select('status')
              .eq('user_id', session.user.id)
              .single();
            subStatus = subData?.status || 'inactive';
          } catch {
            // No subscription found — that's fine
          }

          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: profile?.role || 'user',
            name: profile?.name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || '',
            subscriptionStatus: subStatus,
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.warn('[useAuth] Session fetch failed:', err);
        setUser(null);
      }
      setIsLoading(false);
    };

    fetchSession();

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchSession();
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, isLoading };
}
