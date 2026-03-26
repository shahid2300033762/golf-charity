import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

interface Score {
  id: string;
  value: number;
  created_at: string;
}

interface Subscription {
  type: 'monthly' | 'yearly';
  status: 'active' | 'inactive';
  renewal_date: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [scores, setScores] = useState<Score[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [charity, setCharity] = useState<any>(null);
  const [donationStats, setDonationStats] = useState({ monthly: 0, total: 0, count: 0 });

  const fetchDashboardData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const headers = { 'Authorization': `Bearer ${session?.access_token}` };

      const [scoresRes, subRes, charitiesRes, donationsRes] = await Promise.all([
        fetch('http://localhost:3001/api/scores', { headers }),
        fetch('http://localhost:3001/api/subscriptions/status', { headers }),
        fetch('http://localhost:3001/api/charities'),
        supabase.from('donations').select('amount, created_at').eq('user_id', user.id)
      ]);

      if (scoresRes.ok) {
        const data = await scoresRes.json();
        setScores(data.scores || []);
      }
      if (subRes.ok) {
        const data = await subRes.json();
        setSubscription(data.subscription);
      }
      
      const allDonations = donationsRes.data || [];
      const now = new Date();
      const thisMonthDonations = allDonations.filter((d: any) => {
        const dDate = new Date(d.created_at);
        return dDate.getMonth() === now.getMonth() && dDate.getFullYear() === now.getFullYear();
      });
      
      setDonationStats({
        monthly: thisMonthDonations.reduce((acc: number, d: any) => acc + Number(d.amount), 0),
        total: allDonations.reduce((acc: number, d: any) => acc + Number(d.amount), 0),
        count: allDonations.length
      });

      if (charitiesRes.ok) {
        const data = await charitiesRes.json();
        const metadata = user.id ? (await supabase.auth.getUser()).data.user?.user_metadata : {};
        const charityId = metadata?.charity_id || '1';
        setCharity(data.find((c: any) => c.id === charityId) || data[0]);
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const userName = user?.name || user?.email?.split('@')[0] || 'Member';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-t-2 border-primary border-primary/20 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
    <main className="pt-32 pb-24 px-12 max-w-[1600px] mx-auto min-h-screen">
      {/* Hero Welcome */}
      <header className="mb-20">
        <h1 className="text-5xl font-headline font-extrabold tracking-tight text-on-surface mb-2">Welcome Back, {userName}</h1>
        <p className="text-on-surface-variant text-lg font-body max-w-2xl">
          Your rounds are creating ripple effects. {charity ? `Your play is currently supporting ${charity.name}.` : 'Start playing to support global initiatives.'}
        </p>
      </header>

      {/* Bento Grid Dashboard */}
      <div className="grid grid-cols-12 gap-8">
        {/* Subscription & Impact Status */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-high rounded-xl p-8 relative overflow-hidden group border border-outline-variant/10 shadow-2xl">
          <div className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-105">
            <img className="w-full h-full object-cover" alt="Golf ball on tee" src="/images/dashboard_golf.png"/>
            <div className="absolute inset-0 bg-gradient-to-r from-surface-container-high via-surface-container-high/40 to-transparent"></div>
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <span className="uppercase tracking-[0.1em] text-primary font-bold mb-2 block text-xs">
                  {!subscription ? 'Membership Status' : subscription.status === 'active' ? 'Active Membership' : 'Membership Inactive'}
                </span>
                <h2 className="text-3xl font-headline font-bold text-on-surface">
                  {!subscription ? 'No Active Plan' : subscription.type === 'yearly' ? 'Yearly Eagle Tier' : 'Monthly Pro Tier'}
                </h2>
              </div>
              <div className="bg-surface-bright/50 backdrop-blur-md px-4 py-2 rounded-full border border-outline-variant/20">
                <span className="text-tertiary font-bold text-sm tracking-widest uppercase">
                  {subscription?.status || 'Inactive'}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-surface-container-lowest/40 backdrop-blur-sm p-6 rounded-xl">
                <p className="text-on-surface-variant text-xs uppercase tracking-widest mb-1">Standard Rate</p>
                <p className="text-2xl font-headline font-bold text-on-surface">
                  {!subscription ? '₹0.00' : subscription.type === 'monthly' ? '₹4,000.00' : '₹40,000.00'}
                </p>
                <p className="text-[10px] text-tertiary font-bold mt-1 uppercase tracking-tighter">
                  incl. 10% Charity Contribution
                </p>
              </div>
              <div className="bg-surface-container-lowest/40 backdrop-blur-sm p-6 rounded-xl">
                <p className="text-on-surface-variant text-xs uppercase tracking-widest mb-1">Renewal Date</p>
                <p className="text-2xl font-headline font-bold text-on-surface">
                  {subscription?.renewal_date ? new Date(subscription.renewal_date).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="bg-surface-container-lowest/40 backdrop-blur-sm p-6 rounded-xl">
                <p className="text-on-surface-variant text-[10px] uppercase tracking-widest mb-1 font-bold">5-Score Impact Rating</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-headline font-bold text-on-surface">
                    {scores.length > 0 ? (scores.reduce((a, b) => a + b.value, 0) / scores.length).toFixed(1) : '0.0'}
                  </p>
                  <span className="text-[10px] text-primary/60 font-medium">AVG</span>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <div className="flex justify-between items-end mb-3">
                <span className="text-on-surface font-semibold">Individual Impact Target</span>
                <span className="text-primary font-bold">83% Efficiency</span>
              </div>
              <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary shadow-[0_0_15px_rgba(144,147,255,0.6)] rounded-full transition-all duration-1000" style={{width: '83%'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Charity Selection */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-xl p-8 border border-outline-variant/10 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <span className="material-symbols-outlined text-tertiary">volunteer_activism</span>
              <h3 className="text-xl font-headline font-bold">Active Charity</h3>
            </div>
            <div className="aspect-video w-full rounded-xl overflow-hidden mb-6 group bg-surface-container-lowest flex items-center justify-center">
              {charity?.image_url ? (
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Charity" src={charity.image_url}/>
              ) : (
                <span className="material-symbols-outlined text-4xl text-outline-variant">image</span>
              )}
            </div>
            <h4 className="text-lg font-headline font-bold text-on-surface">{charity?.name || 'Loading Charity...'}</h4>
            <p className="text-on-surface-variant text-sm mt-2 line-clamp-3">
              {charity?.description || 'Your contributions help support this global initiative.'}
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-surface-container-highest/20 p-4 rounded-xl border border-outline-variant/10">
              <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Selected Contribution</span>
              <span className="text-lg font-bold text-tertiary">10%</span>
            </div>
            <div className="flex justify-between items-center bg-surface-container-highest/20 p-4 rounded-xl border border-outline-variant/10">
              <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Donated (Current Month)</span>
              <span className="text-lg font-bold text-white">₹{donationStats.monthly.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <button onClick={() => window.location.href='/charities'} className="mt-8 w-full py-4 bg-surface-container-highest hover:bg-surface-bright text-on-surface font-bold rounded-xl transition-colors duration-200 border border-outline-variant/20">
            Switch Impact Partner
          </button>
        </div>

        {/* Recent Scores Table */}
        <div className="col-span-12 lg:col-span-7 bg-surface-container-high rounded-xl p-8 border border-outline-variant/5 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-headline font-bold">Latest Sequences</h3>
            <button onClick={() => window.location.href='/scores'} className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              Manage Scores <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="space-y-4">
            {scores.length > 0 ? scores.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-surface-container/50 hover:bg-surface-bright/30 rounded-xl transition-all border border-transparent hover:border-outline-variant/20">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{item.value}</div>
                  <div>
                    <p className="font-bold text-on-surface">Sequence Round {scores.length - i}</p>
                    <p className="text-xs text-on-surface-variant">{new Date(item.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold">VERIFIED</span>
                </div>
              </div>
            )) : (
              <p className="text-center py-12 text-on-surface-variant italic">No scores logged yet.</p>
            )}
          </div>
        </div>

        {/* Draw Participation & Winnings */}
        <div className="col-span-12 lg:col-span-5 space-y-8">
          <div className="bg-gradient-to-br from-surface-container-high to-surface-container-low rounded-xl p-8 border border-outline-variant/10 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-headline font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">military_tech</span>
                Winnings Overview
              </h3>
              <div className="flex items-end space-x-2">
                <span className="text-5xl font-extrabold text-on-surface tracking-tighter">₹{donationStats.total.toLocaleString('en-IN')}</span>
                <span className="text-on-surface-variant pb-1">Historical Winnings</span>
              </div>
              <div className="mt-8 flex gap-4">
                <div className="flex-1 bg-surface-container-lowest/50 p-4 rounded-lg border border-outline-variant/10">
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Status</p>
                  <p className="text-lg font-bold text-on-surface">No Claims</p>
                </div>
                <div className="flex-1 bg-surface-container-lowest/50 p-4 rounded-lg border border-outline-variant/10">
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Impact Rank</p>
                  <p className="text-lg font-bold text-on-surface">Novice</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container rounded-xl p-8 border border-outline-variant/5 shadow-xl">
            <h3 className="text-xl font-headline font-bold mb-6">Active Monthly Draws</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-surface-bright/20 border border-outline-variant/10 flex justify-between items-center group cursor-pointer hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-xl">confirmation_number</span>
                  </div>
                  <div>
                    <p className="font-semibold text-on-surface">Main Monthly Draw</p>
                    <p className="text-xs text-on-surface-variant">{scores.length === 5 ? 'Eligible' : `${5 - scores.length} more scores needed`}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">chevron_right</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    {/* Footer */}
    <footer className="bg-[#060e20] w-full border-t border-[#9093ff]/10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-20 py-24 w-full text-[#dee5ff]">
        <div>
          <div className="font-headline text-lg font-bold mb-6">Golf Charity</div>
          <p className="text-sm opacity-60 leading-relaxed">
            Transforming the game of golf into a catalyst for global good. Every swing, every score, every donation builds a legacy of impact.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="font-headline font-bold">Explore</h4>
          <ul className="space-y-2 opacity-50 text-sm">
            <li><a className="hover:text-[#9093ff] transition-colors" href="#">How It Works</a></li>
            <li><a className="hover:text-[#9093ff] transition-colors" href="#">Partner Charities</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-headline font-bold">Legal</h4>
          <ul className="space-y-2 opacity-50 text-sm">
            <li><a className="hover:text-[#9093ff] transition-colors" href="#">Terms of Service</a></li>
            <li><a className="hover:text-[#9093ff] transition-colors" href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-headline font-bold mb-6">Stay Connected</h4>
          <div className="flex space-x-4">
            <a className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary transition-all group" href="#"><span className="material-symbols-outlined">share</span></a>
          </div>
          <p className="mt-8 text-sm opacity-60">© 2024 Golf Charity. Luminescent Archive.</p>
        </div>
      </div>
    </footer>
    </>
  );
}
