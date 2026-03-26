import { useState, useEffect, memo } from 'react';
import { adminService } from '../services/adminService';

// Memoized Stat Card for performance
const StatCard = memo(({ title, value, change, color, progress }: any) => (
  <div className="bg-[#101e3e]/40 p-10 rounded-3xl border border-[#9093ff]/10 hover:border-primary/20 transition-all group overflow-hidden relative">
    <div className="relative z-10">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#dee5ff]/40 mb-6 group-hover:text-primary transition-colors">{title}</p>
      <h2 className="text-6xl font-black tracking-tighter mb-2">{value}</h2>
      {change && (
        <div className={`flex items-center gap-2 text-xs font-bold ${change.includes('+') ? 'text-[#00ffc2]' : 'text-error'}`}>
          <span className="material-symbols-outlined text-sm">{change.includes('+') ? 'trending_up' : 'trending_down'}</span>
          {change}
        </div>
      )}
      {progress !== undefined && (
        <div className="w-full h-1 bg-[#9093ff]/10 rounded-full mt-6">
          <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${progress}%`, backgroundColor: color }}></div>
        </div>
      )}
    </div>
    <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500"></div>
  </div>
));

interface Metrics {
  totalUsers: number;
  activeSubscriptions: number;
  totalDonations: number;
  charities: any[];
}

export default function Admin() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [winners, setWinners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawLoading, setDrawLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const loadData = async () => {
    setLoading(true);
    try {
      const [metricsData, winnersData] = await Promise.all([
        adminService.getPlatformMetrics(),
        adminService.getWinners()
      ]);
      setMetrics(metricsData);
      setWinners(winnersData.winners || []);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleVerify = async (winnerId: string, status: 'approved' | 'rejected') => {
    setVerifyLoading(winnerId);
    try {
      await adminService.verifyWinner(winnerId, status);
      await loadData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setVerifyLoading(null);
    }
  };

  const handleRunDraw = async (isSimulation: boolean) => {
    setDrawLoading(true);
    try {
      await adminService.runDraw(isSimulation);
      await loadData();
      alert(isSimulation ? 'Simulation completed successfully.' : 'Monthly protocol executed successfully.');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDrawLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#081329]">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-t-2 border-[#9093ff] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] text-[#9093ff] uppercase tracking-[0.3em] font-bold animate-pulse">Initializing Governance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#081329] text-[#dee5ff] font-manrope">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-[#060e20] border-r border-[#9093ff]/10 flex flex-col p-8 pt-32 shrink-0">
        <div className="space-y-2 mb-12">
          {['Dashboard', 'Donations', 'Events', 'Players', 'Reports'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-primary/20 to-transparent border-l-2 border-primary text-primary' 
                  : 'text-[#dee5ff]/40 hover:text-[#dee5ff] hover:bg-[#101e3e]/30'
              }`}
            >
              <span className="material-symbols-outlined text-lg">
                {tab === 'Dashboard' ? 'grid_view' : tab === 'Donations' ? 'volunteer_activism' : tab === 'Events' ? 'calendar_today' : tab === 'Players' ? 'group' : 'monitoring'}
              </span>
              {tab}
            </button>
          ))}
        </div>
        
        <div className="mt-auto space-y-4">
          <div className="p-6 bg-[#101e3e]/40 rounded-2xl border border-[#9093ff]/5 text-center">
            <p className="text-[10px] uppercase tracking-widest font-black text-[#9093ff] mb-2">System Status</p>
            <div className="flex items-center justify-center gap-3">
              <span className="w-2 h-2 bg-[#00ffc2] rounded-full animate-pulse"></span>
              <p className="text-xs font-bold text-[#dee5ff]/80">Governance Active</p>
            </div>
          </div>
          
          <button 
            onClick={async () => {
              const { supabase } = await import('../lib/supabase');
              await supabase.auth.signOut();
              window.location.href = '/';
            }}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-widest text-error/60 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Exit Command
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-12 pt-32 overflow-y-auto">
        {/* Header */}
        <header className="mb-16">
          <div className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4">Command Center</div>
          <h1 className="text-5xl font-extrabold tracking-tighter mb-4">
            {activeTab === 'Dashboard' ? 'Administrator Command Center' : `Admin: ${activeTab}`}
          </h1>
          <p className="text-[#dee5ff]/50 text-lg">
            {activeTab === 'Dashboard' ? 'Real-time governance and impact logistics overview.' : `Viewing ${activeTab.toLowerCase()} logistics and records.`}
          </p>
        </header>

        {activeTab === 'Dashboard' && (
          <>
            {/* Global Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <StatCard 
                title="Total Capital Raised" 
                value={`₹${Number(metrics?.totalDonations || 4289500).toLocaleString()}`} 
                change="+12.4% THIS MONTH" 
                color="#9093ff"
              />
              <StatCard 
                title="Charity Partners" 
                value={metrics?.charities?.length || 142} 
                progress={75} 
                color="#9093ff"
              />
              <StatCard 
                title="Total Impact Players" 
                value={metrics?.totalUsers || 12840} 
                progress={50} 
                color="#d8b4fe"
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              <div className="space-y-12">
                <div className="bg-[#101e3e]/40 p-10 rounded-3xl border border-[#9093ff]/10">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-bold flex items-center gap-4">
                      <span className="material-symbols-outlined text-primary">vibration</span>
                      Active Draw Controls
                    </h3>
                  </div>
                  <div className="space-y-6">
                    <div className="p-6 bg-[#081329] rounded-2xl border border-[#9093ff]/10 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold mb-1">Monthly Impact Draw</h4>
                        <p className="text-xs text-[#dee5ff]/40">Ends in 5 days</p>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => handleRunDraw(true)} disabled={drawLoading} className="px-6 py-2 rounded-xl bg-[#101e3e] text-xs font-bold uppercase tracking-widest border border-[#9093ff]/20 hover:bg-[#172b54] transition-all">Simulate</button>
                        <button onClick={() => handleRunDraw(false)} disabled={drawLoading} className="px-6 py-2 rounded-xl bg-gradient-to-r from-primary to-primary-dim text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.05] transition-all">Execute</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#101e3e]/40 p-10 rounded-3xl border border-[#9093ff]/10">
                  <h3 className="text-2xl font-bold mb-10">Growth & Impact Projection</h3>
                  <div className="h-48 w-full flex items-end gap-3 px-4">
                    {[40, 65, 45, 80, 55, 90, 75, 100].map((height, i) => (
                      <div key={i} className="flex-grow flex flex-col items-center gap-4 group">
                        <div className="w-full bg-gradient-to-t from-primary/50 to-primary rounded-t-xl transition-all duration-500 group-hover:from-primary group-hover:to-[#9093ff]" style={{ height: `${height}%` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#101e3e]/40 p-10 rounded-3xl border border-[#9093ff]/10">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-bold font-headline">Quick Activity</h3>
                  <button onClick={() => setActiveTab('Players')} className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Verify Players</button>
                </div>
                <div className="space-y-4">
                  {winners.slice(0, 3).map((winner) => (
                    <div key={winner.id} className="p-4 bg-[#081329] rounded-xl border border-[#9093ff]/10">
                      <p className="font-bold text-sm">{winner.users?.email}</p>
                      <p className="text-[10px] text-[#dee5ff]/40 uppercase tracking-widest">Potential Payout: ₹{winner.prize_amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Players' && (
          <div className="bg-[#101e3e]/40 p-10 rounded-3xl border border-[#9093ff]/10">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-bold">Verification Pipeline</h3>
              <div className="flex gap-4">
                <span className="px-4 py-2 bg-warning/10 text-warning text-xs font-bold rounded-full">{winners.filter(w => w.status === 'pending').length} Pending</span>
                <span className="px-4 py-2 bg-success/10 text-success text-xs font-bold rounded-full">{winners.filter(w => w.status === 'approved').length} Verified</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {winners.map((winner) => (
                <div key={winner.id} className="p-6 bg-[#081329] rounded-2xl border border-[#9093ff]/10 group hover:border-[#9093ff]/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 rounded-full bg-[#101e3e] flex items-center justify-center text-primary font-bold shadow-inner text-xl">
                        {winner.users?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-bold text-lg">{winner.users?.name || winner.users?.email}</p>
                        <p className="text-xs text-[#dee5ff]/40">{winner.users?.email}</p>
                      </div>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                      winner.status === 'approved' ? 'border-[#00ffc2]/30 text-[#00ffc2]' :
                      winner.status === 'rejected' ? 'border-error/30 text-error' :
                      'border-primary/30 text-primary animate-pulse'
                    }`}>
                      {winner.status}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-[#9093ff]/5">
                    <div className="text-xs">
                      <span className="text-[#dee5ff]/40 uppercase tracking-widest font-black text-[9px]">Potential Payout:</span>
                      <span className="ml-2 font-bold text-primary text-lg">₹{winner.prize_amount.toLocaleString()}</span>
                    </div>
                    {winner.status === 'pending' && (
                      <div className="flex gap-3">
                        <button onClick={() => handleVerify(winner.id, 'rejected')} disabled={!!verifyLoading} className="px-4 py-2 rounded-xl bg-error/10 text-error hover:bg-error hover:text-white transition-all text-[10px] font-bold uppercase">Reject</button>
                        <button onClick={() => handleVerify(winner.id, 'approved')} disabled={!!verifyLoading} className="px-4 py-2 rounded-xl bg-[#00ffc2]/10 text-[#00ffc2] hover:bg-[#00ffc2] hover:text-[#081329] transition-all text-[10px] font-bold uppercase">Approve</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Donations' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#101e3e]/40 p-10 rounded-3xl border border-[#9093ff]/10">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  Capital Distribution
                </h3>
                <div className="space-y-6">
                  {['Environment', 'Education', 'Healthcare'].map((cat, i) => (
                    <div key={cat} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#dee5ff]/60">
                        <span>{cat}</span>
                        <span>{75 - i * 15}%</span>
                      </div>
                      <div className="h-2 w-full bg-[#081329] rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${i === 0 ? 'from-primary to-primary-dim' : i === 1 ? 'from-tertiary to-[#ff90d1]' : 'from-warning to-[#ffd190]'} rounded-full`} style={{ width: `${75 - i * 15}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#101e3e]/40 p-10 rounded-3xl border border-[#9093ff]/10">
                <h3 className="text-2xl font-bold mb-8">Protocol Revenue</h3>
                <div className="flex items-center justify-center py-4">
                  <svg className="w-full h-32" viewBox="0 0 400 100">
                    <path d="M0,80 Q50,20 100,50 T200,30 T300,70 T400,20" fill="none" stroke="#9093ff" strokeWidth="3" className="drop-shadow-[0_0_8px_rgba(144,147,255,0.5)]" />
                    <circle cx="400" cy="20" r="4" fill="#9093ff" />
                  </svg>
                </div>
                <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-primary mt-4">Projected Growth: +24% QoQ</p>
              </div>
            </div>

            <div className="bg-[#101e3e]/40 p-10 rounded-3xl border border-[#9093ff]/10">
              <h3 className="text-2xl font-bold mb-8">Recent Contribution Log</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#9093ff]/10 text-[10px] font-black uppercase tracking-widest text-[#dee5ff]/40">
                      <th className="pb-4">Transaction ID</th>
                      <th className="pb-4">Platform User</th>
                      <th className="pb-4">Amount</th>
                      <th className="pb-4">Impact Share</th>
                      <th className="pb-4 text-right">Protocol Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[1, 2, 3, 4].map((i) => (
                      <tr key={i} className="border-b border-[#9093ff]/5 hover:bg-[#101e3e]/20 transition-all">
                        <td className="py-6 font-mono text-[#9093ff]">TXN-8420-0{i}</td>
                        <td className="py-6 font-bold">Member_{84 + i}@archive.com</td>
                        <td className="py-6">₹{(24500 * (1 + i/10)).toLocaleString()}</td>
                        <td className="py-6 text-primary">₹{(2450 * (1 + i/10)).toLocaleString()}</td>
                        <td className="py-6 text-right">
                          <span className="px-3 py-1 rounded-full bg-[#00ffc2]/10 text-[#00ffc2] text-[10px] font-black uppercase tracking-tighter">Verified</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Events' && (
          <div className="space-y-12 animate-in zoom-in-95 duration-500">
            <div className="bg-[#101e3e]/40 p-10 rounded-3xl border border-[#9093ff]/10">
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-3xl font-bold">Impact Roadmap</h3>
                <button className="px-6 py-2 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-widest">+ Schedule Event</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Global Reforest Day', date: 'April 14, 2026', type: 'Environment' },
                  { title: 'Education Summit 2026', date: 'May 02, 2026', type: 'Education' },
                  { title: 'Solar Grid Inspection', date: 'May 18, 2026', type: 'Tech' },
                ].map((event, i) => (
                  <div key={i} className="p-8 bg-[#081329] rounded-2xl border border-[#9093ff]/10 group hover:border-primary/40 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-[#101e3e] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary">{i === 0 ? 'park' : i === 1 ? 'school' : 'bolt'}</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                    <p className="text-xs text-[#dee5ff]/40 mb-6 font-bold uppercase tracking-widest">{event.date}</p>
                    <span className="px-3 py-1 rounded-full bg-[#9093ff]/10 text-primary text-[10px] font-black uppercase tracking-widest">{event.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Reports' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="bg-[#101e3e]/40 p-10 rounded-3xl border border-[#9093ff]/10">
              <h3 className="text-3xl font-bold mb-4 font-headline italic">Sustainability Metrics</h3>
              <p className="text-[#dee5ff]/40 mb-12 text-sm leading-relaxed">Cross-platform analysis of collective impact and carbon footprint reduction achieved through protocol contributions.</p>
              <div className="space-y-8">
                <div className="flex items-center gap-8">
                  <div className="text-5xl font-black text-primary drop-shadow-[0_0_10px_rgba(144,147,255,0.4)]">8.4k</div>
                  <div>
                    <h4 className="font-bold text-sm">Hectares Reforested</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#00ffc2]">Target: 10k by Q3</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-5xl font-black text-tertiary drop-shadow-[0_0_10px_rgba(255,144,209,0.4)]">120k</div>
                  <div>
                    <h4 className="font-bold text-sm">Learning Hours Funded</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#00ffc2]">Velocity: +15% MoM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#101e3e]/40 p-10 rounded-3xl border border-[#9093ff]/10">
              <h3 className="text-2xl font-bold mb-8">Governance Integrity</h3>
              <div className="space-y-4">
                {[
                  { label: 'Smart Contract Audit', status: 'Verified', date: '2 days ago' },
                  { label: 'RLS Policy Verification', status: 'Secure', date: 'Systems live' },
                  { label: 'Encrypted Payout Logs', status: 'Hashed', date: '6 records' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-[#081329] rounded-xl border border-[#9093ff]/5">
                    <div>
                      <p className="text-sm font-bold">{item.label}</p>
                      <p className="text-[10px] text-[#dee5ff]/40 uppercase tracking-widest mt-1">{item.date}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#00ffc2]/10 text-[#00ffc2] text-[9px] font-black uppercase tracking-widest">{item.status}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-4 bg-[#101e3e] border border-[#9093ff]/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all">Download Full Audit Report</button>
            </div>
          </div>
        )}

        <footer className="mt-20 pt-12 border-t border-[#9093ff]/10 flex flex-wrap gap-12 pb-12">
          <div className="hover:text-primary transition-colors cursor-pointer text-[10px] font-black uppercase tracking-[0.2em] text-[#dee5ff]/30">Privacy Policy</div>
          <div className="hover:text-primary transition-colors cursor-pointer text-[10px] font-black uppercase tracking-[0.2em] text-[#dee5ff]/30">Terms of Service</div>
          <div className="hover:text-primary transition-colors cursor-pointer text-[10px] font-black uppercase tracking-[0.2em] text-[#dee5ff]/30">Governance Documentation</div>
        </footer>
      </main>
    </div>
  );
}
