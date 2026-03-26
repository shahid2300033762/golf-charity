import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if credentials are placeholders
const isConfigured = supabaseUrl && 
                   supabaseAnonKey && 
                   !supabaseUrl.includes('YOUR_') && 
                   !supabaseAnonKey.includes('YOUR_');

// Robust Mock Implementation for Local Development
const getMockUsers = () => JSON.parse(localStorage.getItem('sb_mock_users') || '[]');
const saveMockUsers = (users: any[]) => localStorage.setItem('sb_mock_users', JSON.stringify(users));
const getMockSession = () => JSON.parse(localStorage.getItem('sb_mock_session') || 'null');
const saveMockSession = (session: any) => localStorage.setItem('sb_mock_session', JSON.stringify(session));

const authCallbacks: ((event: string, session: any) => void)[] = [];

const functionalMockAuth = {
  getSession: async () => ({ data: { session: getMockSession() }, error: null }),
  getUser: async () => {
    const session = getMockSession();
    return { data: { user: session?.user || null }, error: null };
  },
  onAuthStateChange: (callback: any) => {
    authCallbacks.push(callback);
    return { data: { subscription: { unsubscribe: () => {
      const index = authCallbacks.indexOf(callback);
      if (index > -1) authCallbacks.splice(index, 1);
    } } } };
  },
  signInWithPassword: async ({ email, password }: any) => {
    const users = getMockUsers();
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (!user) return { data: { session: null }, error: { message: 'Invalid credentials. Please join the club first.' } };
    
    const session = { user, access_token: 'mock_token', expires_at: Date.now() + 3600000 };
    saveMockSession(session);
    authCallbacks.forEach(cb => cb('SIGNED_IN', session));
    return { data: { session }, error: null };
  },
  signUp: async ({ email, password, options }: any) => {
    const users = getMockUsers();
    if (users.find((u: any) => u.email === email)) {
      return { data: { user: null }, error: { message: 'User already exists' } };
    }
    
    const newUser = { 
      id: Math.random().toString(36).substring(7), 
      email, 
      password,
      user_metadata: options?.data || {} 
    };
    saveMockUsers([...users, newUser]);
    
    const session = { user: newUser, access_token: 'mock_token', expires_at: Date.now() + 3600000 };
    saveMockSession(session);
    authCallbacks.forEach(cb => cb('SIGNED_UP', session));
    return { data: { user: newUser, session }, error: null };
  },
  signOut: async () => {
    saveMockSession(null);
    authCallbacks.forEach(cb => cb('SIGNED_OUT', null));
    return { error: null };
  },
};

const functionalMockFrom = (table: string) => ({
  select: () => ({
    eq: (_key: string, value: any) => ({
      single: async () => {
        if (table === 'users') {
          const users = getMockUsers();
          const user = users.find((u: any) => u.id === value);
          return { data: user ? { ...user.user_metadata, id: user.id } : null, error: null };
        }
        if (table === 'subscriptions') {
          return { data: { status: 'active' }, error: null };
        }
        return { data: null, error: null };
      }
    })
  })
});

let supabase: any;

if (!isConfigured) {
  console.warn('[Supabase] Missing credentials. Using Local Dev Mode (localStorage mock).');
  supabase = {
    auth: functionalMockAuth,
    from: functionalMockFrom,
  };
} else {
  try {
    supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error('[Supabase] Initialization failed, falling back to mock:', err);
    supabase = {
      auth: functionalMockAuth,
      from: functionalMockFrom,
    };
  }
}

export { supabase };
