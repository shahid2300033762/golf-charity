import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Subscribe() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [charities, setCharities] = useState<any[]>([]);
  const [selectedCharity, setSelectedCharity] = useState<string>('1');
  const [contribution, setContribution] = useState<number>(10);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    fetch(`${API_URL}/api/charities`)
      .then(res => res.json())
      .then(setCharities)
      .catch(console.error);
  }, []);

  const handleSubscribe = async () => {
    setLoading(true);
    setError('');
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

      // 2. Call our backend API to create the subscription & donation entries
      const res = await fetch(`${API_URL}/api/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
          type: plan,
          charityId: selectedCharity,
          charityPercentage: contribution
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to subscribe');
      }

      // 3. Force a session refresh to update subscriptionStatus in useAuth
      await supabase.auth.refreshSession();
      navigate('/dashboard');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-tertiary/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 z-10">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-on-surface mb-6">
            Activate Your <span className="text-primary italic">Impact</span>
          </h1>
          <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
            Your subscription powers global change. Gain full access to the Sovereign Charity platform, enter the monthly draw, and actively contribute to the charity of your choice.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container/50 border border-outline-variant/20">
              <span className="material-symbols-outlined text-tertiary mt-1">volunteer_activism</span>
              <div>
                <h3 className="font-bold text-on-surface">Direct Charity Contribution</h3>
                <p className="text-sm text-on-surface-variant">A portion of your subscription goes directly to your selected cause.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container/50 border border-outline-variant/20">
              <span className="material-symbols-outlined text-primary mt-1">sports_golf</span>
              <div>
                <h3 className="font-bold text-on-surface">5-Score Access</h3>
                <p className="text-sm text-on-surface-variant">Log your top 5 golf scores to compete in the monthly draw.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-[2rem] p-8 shadow-2xl border border-outline-variant/30 flex flex-col">
          <h2 className="text-xl font-bold font-headline mb-6 text-center text-on-surface">Select Membership</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => setPlan('monthly')}
              className={`p-6 rounded-2xl border-2 transition-all ${plan === 'monthly' ? 'border-primary bg-primary/5' : 'border-outline-variant/30 hover:border-outline-variant bg-surface-container-lowest'}`}
            >
              <h3 className="font-bold text-on-surface mb-2">Monthly</h3>
              <div className="text-3xl font-black text-primary">₹4,000<span className="text-sm text-on-surface-variant font-normal">/mo</span></div>
            </button>
            <button 
              onClick={() => setPlan('yearly')}
              className={`p-6 rounded-2xl border-2 transition-all relative ${plan === 'yearly' ? 'border-primary bg-primary/5' : 'border-outline-variant/30 hover:border-outline-variant bg-surface-container-lowest'}`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-tertiary text-on-tertiary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">Save 16%</div>
              <h3 className="font-bold text-on-surface mb-2">Annually</h3>
              <div className="text-3xl font-black text-primary">₹40,000<span className="text-sm text-on-surface-variant font-normal">/yr</span></div>
            </button>
          </div>

          <div className="mb-8 space-y-6">
            <div>
              <label className="text-xs font-bold font-headline text-on-surface-variant uppercase tracking-widest mb-3 block">Your Impact Partner</label>
              <select 
                value={selectedCharity}
                onChange={(e) => setSelectedCharity(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface font-semibold focus:border-primary transition-colors outline-none"
              >
                {charities.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold font-headline text-on-surface-variant uppercase tracking-widest block">Contribution Target</label>
                <span className="text-tertiary font-bold">{contribution}%</span>
              </div>
              <input 
                type="range" min="10" max="50" step="1"
                value={contribution}
                onChange={(e) => setContribution(parseInt(e.target.value))}
                className="w-full accent-tertiary h-1.5 bg-surface-container rounded-lg cursor-pointer"
              />
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-on-surface-variant font-bold">MIN 10%</span>
                <span className="text-[10px] text-on-surface-variant font-bold">MAX 50%</span>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter">Impact Amount</p>
                <p className="text-sm font-bold text-on-surface">Included Donation</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-tertiary">₹{( (plan === 'monthly' ? 4000 : 40000) * (contribution / 100) ).toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>

          {error && <div className="p-4 mb-6 rounded-lg bg-error/10 text-error text-sm font-semibold">{error}</div>}

          <button 
            onClick={handleSubscribe} 
            disabled={loading}
            className="w-full py-5 rounded-full bg-gradient-to-r from-primary to-primary-dim text-on-primary-container font-headline font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none mt-auto"
          >
            {loading ? 'Processing...' : `Subscribe ${plan === 'monthly' ? 'Monthly' : 'Annually'}`}
          </button>
          <p className="text-center text-xs text-on-surface-variant mt-4">Secure payment processing. Cancel anytime.</p>
        </div>
      </div>
    </main>
  );
}
