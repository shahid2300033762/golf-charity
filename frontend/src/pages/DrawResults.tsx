import { useState, useEffect, memo } from 'react';
import { drawService } from '../services/drawService';
import { supabase } from '../lib/supabase';

const WinningNumber = memo(({ num }: { num: number }) => (
  <div className="relative group/num transform-gpu">
    <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md opacity-50"></div>
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full glass-panel border border-primary/40 flex items-center justify-center text-2xl sm:text-3xl font-manrope font-extrabold text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative z-10 transition-transform duration-500 group-hover/num:scale-110">
      {num}
    </div>
  </div>
));

const UserEntry = memo(({ num, isMatch }: { num: number, isMatch: boolean }) => (
  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold transition-all duration-500 transform-gpu ${
    isMatch ? 'bg-tertiary/20 border border-tertiary text-tertiary shadow-[0_0_20px_rgba(216,180,254,0.3)]' : 'bg-white/5 border border-white/10 text-white/20'
  }`}>
    {num}
  </div>
));

export default function DrawResults() {
  const [latestDraw, setLatestDraw] = useState<any>(null);
  const [userScores, setUserScores] = useState<number[]>([]);
  const [winnings, setWinnings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [matchCount, setMatchCount] = useState<number | null>(null);

  useEffect(() => {
    loadData();

    const subscription = drawService.subscribeToDrawUpdates(() => {
      loadData();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      // 1. Fetch latest published draw
      const { data: drawsData } = await drawService.getLatestDraws(1);
      const draw = drawsData?.[0] || null;
      setLatestDraw(draw);

      if (session) {
        // 2. Fetch user's latest 5 scores (their entry)
        const { data: scores } = await supabase
          .from('scores')
          .select('value')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(5);
        
        const values = scores?.map((s: any) => s.value) || [];
        setUserScores(values);

        // 3. Calculate match count if draw exists
        if (draw?.winning_numbers) {
          const count = values.filter((v: number) => draw.winning_numbers.includes(v)).length;
          setMatchCount(count);
        }

        // 4. Fetch user winnings history
        const API_URL = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${API_URL}/api/winners/my-winnings`, {
          headers: { 'Authorization': `Bearer ${session.access_token}` }
        });
        if (res.ok) {
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await res.json();
            setWinnings(data.winnings || []);
          }
        }
      }
    } catch (e) {
      console.error('Failed to fetch draw data:', e);
    }
    
    setLoading(false);
  };

  const getNextDrawDate = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).toLocaleDateString(undefined, {
      month: 'long', day: 'numeric', year: 'numeric'
    });
  };

  const getResultText = (count: number) => {
    if (count === 5) return "Jackpot Winner";
    if (count === 4) return "Tier 2 Winner";
    if (count === 3) return "Tier 3 Winner";
    return "0 Matches — Better luck next month";
  };

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4">Victory Chronicles</div>
          <h1 className="text-5xl md:text-6xl font-manrope font-extrabold text-white mb-6 tracking-tighter leading-tight">
            The <span className="text-gradient">Heritage</span> Archive
          </h1>
          <p className="text-on-surface-variant font-inter text-lg leading-relaxed">
            Traverse the historical records of impact. Every match represents a moment where chance met generosity.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-24">
            <div className="w-16 h-16 rounded-full border-t-2 border-primary animate-spin mb-6"></div>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-bold">Accessing Records...</p>
          </div>
        ) : (
          <>
            {/* CURRENT STATUS SECTION */}
            <div className={`p-1 w-full rounded-[2.5rem] bg-gradient-to-br transition-all duration-700 ${
              matchCount && matchCount >= 3 ? 'from-tertiary via-tertiary-dim to-transparent shadow-[0_0_50px_rgba(216,180,254,0.1)]' : 'from-outline-variant/20 to-transparent'
            } mb-20`}>
              <div className="bg-[#0a0f1d] rounded-[2.4rem] p-10 md:p-14 relative overflow-hidden">
                {!latestDraw ? (
                  /* BEFORE DRAW STATE */
                  <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="max-w-md">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-2.5 h-2.5 rounded-full bg-warning animate-pulse"></div>
                        <span className="text-[10px] font-black text-warning uppercase tracking-[0.3em]">Awaiting Draw</span>
                      </div>
                      <h2 className="text-3xl font-manrope font-extrabold text-white mb-4">Draw not yet completed</h2>
                      <p className="text-on-surface-variant text-sm mb-8">The archives are still collecting entries. The next legacy draw will take place on <span className="text-white font-bold">{getNextDrawDate()}</span>.</p>
                      
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Your Entry Numbers</p>
                        <div className="flex gap-3">
                          {userScores.length > 0 ? userScores.map((num, i) => (
                            <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-white/50">{num}</div>
                          )) : (
                            <p className="text-xs text-on-surface-variant italic">Log 5 scores to enter the draw</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
                      <span className="material-symbols-outlined text-[120px] text-on-surface-variant/10 leading-none">hourglass_empty</span>
                    </div>
                  </div>
                ) : (
                  /* AFTER DRAW STATE */
                  <div className="flex flex-col gap-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-2.5 h-2.5 rounded-full ${matchCount && matchCount >= 3 ? 'bg-success' : 'bg-primary'}`}></div>
                          <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${matchCount && matchCount >= 3 ? 'text-success' : 'text-primary'}`}>Draw Completed</span>
                        </div>
                        <h2 className="text-4xl font-manrope font-extrabold text-white tracking-tight">
                          Month of {new Date(latestDraw.draw_date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                        </h2>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2">Match Status</p>
                        <div className="flex items-center gap-4">
                          <span className={`text-4xl font-manrope font-black ${matchCount && matchCount >= 3 ? 'text-tertiary' : 'text-white'}`}>
                            {matchCount || 0}/5
                          </span>
                          <div className="text-left">
                            <p className={`text-xs font-bold leading-none mb-1 ${matchCount && matchCount >= 3 ? 'text-tertiary' : 'text-on-surface-variant'}`}>
                              {matchCount !== null ? getResultText(matchCount) : 'Processing...'}
                            </p>
                            <p className="text-[10px] text-on-surface-variant/50 uppercase tracking-widest font-black">Numbers Found</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* NEW: PRIZE POOL & CHARITY IMPACT SECTION */}
                    <div className="flex flex-wrap items-center gap-12 py-10 border-y border-white/5">
                      <div className="flex flex-col gap-1">
                        <span className="text-5xl font-manrope font-black text-white">₹{(latestDraw.prize_pool || 5000000).toLocaleString('en-IN')}</span>
                        <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em]">Prize Pool Allocation</span>
                      </div>
                      
                      <div className="w-px h-16 bg-white/10 hidden md:block"></div>
                      
                      <div className="flex flex-col gap-1">
                        <span className="text-3xl font-manrope font-black text-primary italic">₹{(latestDraw.prize_pool ? latestDraw.prize_pool * 0.025 : 125000).toLocaleString('en-IN')}</span>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Charity Contribution</span>
                        <p className="text-[11px] text-on-surface-variant font-medium mt-1">Donated to selected charities this month</p>
                      </div>

                      <div className="ml-auto flex items-center gap-4 px-6 py-4 rounded-2xl bg-primary/5 border border-primary/10">
                        <span className="material-symbols-outlined text-primary text-xl">favorite</span>
                        <div>
                          <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Impact Tracking</p>
                          <p className="text-xs font-bold text-white">Supporting: {supabase.auth.getUser() ? 'Your Primary Cause' : 'The Reforest Project'} + 14 Others</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Winning Numbers */}
                      <div className="space-y-6">
                        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em]">Winning Numbers</p>
                        <div className="flex gap-4 sm:gap-6">
                          {latestDraw.winning_numbers?.map((num: number, i: number) => (
                            <WinningNumber key={i} num={num} />
                          ))}
                        </div>
                      </div>

                      {/* Your Entry */}
                      <div className="space-y-6">
                        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em]">Your Entry</p>
                        <div className="flex gap-4">
                          {userScores.map((num, i) => (
                            <UserEntry key={i} num={num} isMatch={latestDraw.winning_numbers?.includes(num)} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* VICTORY LOG - User's Win History */}
            {winnings.length > 0 && (
              <div className="mb-24">
                <h2 className="text-2xl font-manrope font-extrabold text-white mb-8 flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary">military_tech</span>
                  Your Victory Log
                </h2>
                <div className="grid gap-6">
                  {winnings.map((win) => (
                    <div key={win.id} className="p-6 rounded-2xl glass-panel border border-tertiary/30 bg-tertiary/5 flex flex-col md:flex-row justify-between items-center gap-6 animate-in slide-in-from-bottom-4 duration-500">
                      <div>
                        <p className="text-[10px] text-tertiary uppercase font-black tracking-widest mb-1">Impact Match ({win.match_count} Numbers)</p>
                        <h4 className="text-2xl font-bold text-white mb-1">₹{Number(win.prize_amount).toLocaleString('en-IN')} Payout</h4>
                        <p className="text-xs text-on-surface-variant">Draw Date: {new Date(win.draws.draw_date).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          win.status === 'approved' ? 'bg-success/10 border-success/30 text-success' :
                          win.status === 'rejected' ? 'bg-error/10 border-error/30 text-error' :
                          'bg-warning/10 border-warning/30 text-warning'
                        }`}>
                          {win.status === 'approved' ? 'Payout Verified' : win.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
