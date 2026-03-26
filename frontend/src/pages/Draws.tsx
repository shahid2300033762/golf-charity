import { useState, useEffect } from 'react';
import { drawService } from '../services/drawService';
import { supabase } from '../lib/supabase';

export default function Draws() {
  const [latestDraw, setLatestDraw] = useState<any>(null);
  const [userScores, setUserScores] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [matchCount, setMatchCount] = useState<number | null>(null);

  useEffect(() => {
    async function loadDrawData() {
      setLoading(true);
      try {
        // 1. Fetch latest published draw
        const { data: draws } = await drawService.getLatestDraws(1);
        const draw = draws?.[0] || null;
        setLatestDraw(draw);

        // 2. Fetch user's latest 5 scores
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: scores } = await supabase
            .from('scores')
            .select('value')
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false })
            .limit(5);
          
          const values = scores?.map((s: any) => s.value) || [];
          setUserScores(values);

          // 3. Calculate match count ONLY if draw is COMPLETED
          if (draw?.status === 'completed' && draw.winning_numbers) {
            const count = values.filter((v: number) => draw.winning_numbers.includes(v)).length;
            setMatchCount(count);
          } else {
            setMatchCount(null);
          }
        }
      } catch (err) {
        console.error('Failed to load draw data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDrawData();
  }, []);

  const getNextDrawDate = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).toLocaleDateString(undefined, {
      month: 'long', day: 'numeric', year: 'numeric'
    });
  };

  const isDrawCompleted = latestDraw?.status === 'completed';

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-t-2 border-primary border-primary/20 rounded-full animate-spin mb-6"></div>
        <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-bold animate-pulse">Syncing Telemetry...</p>
      </div>
    );
  }

  return (
    <>
    <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      {/* Hero Header */}
      <section className="mb-20 text-center relative">
        <div className="absolute -top-16 right-0 flex flex-col items-end gap-3 z-50">
           <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/5 border border-orange-500/20 backdrop-blur-md shadow-lg shadow-orange-500/5 transition-all">
             <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2 border-r border-orange-500/20 pr-3">
               <span className="material-symbols-outlined text-[14px]">biotech</span> Simulation DevTool
             </span>
             <div className="flex items-center gap-1.5 pl-1.5">
               {latestDraw?.status === 'completed' ? (
                 <button 
                   onClick={() => { setLatestDraw(null); setMatchCount(null); }}
                   className="px-2.5 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-[9px] font-black text-orange-400 uppercase tracking-wider transition-colors"
                 >
                   Reset Draw
                 </button>
               ) : (
                 <>
                   <button 
                     onClick={() => {
                        const winNums = [2, 7, 13, 21, 38].filter(n => !userScores.includes(n)).slice(0, 5);
                        // Ensure 0 matches
                        const finalNums = winNums.length < 5 ? [...winNums, 99, 98, 97, 96, 95].slice(0, 5) : winNums;
                        setLatestDraw({ draw_date: new Date().toISOString(), winning_numbers: finalNums, status: 'completed', jackpot_rollover_amount: 5000000 });
                        setMatchCount(0);
                     }}
                     className="px-2.5 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-[9px] font-black text-orange-400 uppercase tracking-wider transition-colors"
                   >
                     Test 0 Matches
                   </button>
                   <button 
                     onClick={() => {
                        const match3 = [...userScores.slice(0, 3), 98, 99];
                        setLatestDraw({ draw_date: new Date().toISOString(), winning_numbers: match3, status: 'completed', jackpot_rollover_amount: 5000000 });
                        setMatchCount(3);
                     }}
                     className="px-2.5 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-[9px] font-black text-orange-400 uppercase tracking-wider transition-colors"
                   >
                     Test 3 Matches
                   </button>
                   <button 
                     onClick={() => {
                        setLatestDraw({ draw_date: new Date().toISOString(), winning_numbers: userScores, status: 'completed', jackpot_rollover_amount: 5000000 });
                        setMatchCount(5);
                     }}
                     className="px-2.5 py-1 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-[9px] font-black text-orange-300 uppercase tracking-wider transition-colors border border-orange-500/20"
                   >
                     Test Jackpot
                   </button>
                 </>
               )}
             </div>
           </div>
           <p className="text-[9px] text-on-surface-variant font-medium opacity-50 text-right max-w-[200px] leading-tight italic">
             This row is a Developer Simulation Tool for UI verification. In production, draw logic is fully automated and system-driven.
           </p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high mb-6 border border-outline-variant/15">
          <span className="material-symbols-outlined text-tertiary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
          <span className="text-xs font-bold tracking-widest uppercase text-on-surface-variant">Official Draw Results</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-manrope font-extrabold tracking-tighter text-on-surface mb-6">
          {isDrawCompleted ? new Date(latestDraw.draw_date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : 'Monthly'} <span className="text-primary italic">Legacy</span> Draw
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">Where every swing contributes to the luminescent archive of global impact. Discover this month's champions.</p>
      </section>

      {/* Results Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
        {/* Winning Sequence Card */}
        <div className="lg:col-span-8 bg-surface-container-low rounded-3xl p-10 flex flex-col justify-between overflow-hidden relative group border border-outline-variant/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>
          
          <div className="relative z-10 w-full">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h2 className="text-3xl font-bold font-manrope mb-2 text-on-surface">Winning Sequence</h2>
                <p className="text-on-surface-variant text-sm">Certified by Sovereign System Protocol</p>
              </div>
              <div className="text-right">
                <span className="block text-2xl font-bold font-manrope text-tertiary">
                  {isDrawCompleted ? `₹${Number(latestDraw.jackpot_rollover_amount || 2500000).toLocaleString('en-IN')}` : '₹25,00,000'}
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-xs uppercase tracking-widest text-on-surface-variant">Prize Pool Allocation</span>
                  <span className="text-[10px] text-tertiary font-bold mt-1 uppercase tracking-tighter italic">₹{Number(125000).toLocaleString('en-IN')} Community Contribution</span>
                </div>
              </div>
            </div>
            
            {isDrawCompleted ? (
              /* AFTER DRAW UI */
              <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-start mb-12 animate-in fade-in slide-in-from-left-4 duration-700">
                {latestDraw.winning_numbers.map((num: number, i: number) => (
                  <div key={i} className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-surface-bright flex items-center justify-center border border-primary/40 shadow-[0_0_30px_rgba(144,147,255,0.15)] transform hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl md:text-4xl font-bold font-manrope text-primary">{num < 10 ? `0${num}` : num}</span>
                  </div>
                ))}
              </div>
            ) : (
              /* BEFORE DRAW UI */
              <div className="py-12 px-8 rounded-2xl bg-surface-bright/50 border border-dashed border-outline-variant/30 text-center mb-12 animate-in fade-in duration-700">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant/30 mb-4">hourglass_empty</span>
                <h3 className="text-xl font-bold text-on-surface/50 mb-2 font-manrope">Draw not yet completed</h3>
                <p className="text-sm text-on-surface-variant/60">Expect results on <span className="text-primary font-bold">{getNextDrawDate()}</span></p>
              </div>
            )}
          </div>
          
          <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-outline-variant/10">
            <span className="material-symbols-outlined text-on-surface-variant">schedule</span>
            <p className="text-sm text-on-surface-variant">
              {isDrawCompleted ? `Draw finalized on ${new Date(latestDraw.draw_date).toLocaleString()}` : 'Awaiting system execution...'}
            </p>
          </div>
        </div>

        {/* User Status Card */}
        <div className="lg:col-span-4 bg-surface-container-high rounded-3xl p-10 flex flex-col justify-between border border-outline-variant/10 overflow-hidden relative">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-surface-bright flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-primary text-3xl">account_circle</span>
            </div>
            <h3 className="text-2xl font-bold font-manrope text-on-surface mb-2">Your Status</h3>
            <p className="text-on-surface-variant mb-8 uppercase tracking-widest text-[10px] font-bold">Active Monthly Sequence</p>
            
            {!isDrawCompleted ? (
              /* BEFORE DRAW STATUS */
              <div className="p-6 rounded-2xl border border-outline-variant/10 bg-surface-container-lowest animate-in fade-in duration-700">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-warning animate-pulse"></span>
                  <span className="text-on-surface font-black font-manrope uppercase text-xs tracking-wider">Awaiting Draw</span>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Your Entry Numbers</p>
                  <div className="flex gap-2">
                    {userScores.map((v, i) => (
                      <div key={i} className="w-8 h-8 rounded-lg bg-surface-bright flex items-center justify-center text-xs font-bold text-on-surface-variant border border-outline-variant/10">
                        {v < 10 ? `0${v}` : v}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* AFTER DRAW STATUS */
              <div className={`p-6 rounded-2xl border border-outline-variant/10 mb-6 animate-in slide-in-from-right-4 duration-700 ${matchCount !== null && matchCount >= 3 ? 'bg-success/5 border-success/20' : 'bg-surface-container-lowest'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-tertiary">
                    {matchCount !== null && matchCount >= 3 ? 'military_tech' : 'sentiment_dissatisfied'}
                  </span>
                  <span className="text-on-surface font-semibold font-manrope uppercase text-xs tracking-wider">
                    {matchCount !== null && matchCount > 0 ? `You matched ${matchCount}/5 numbers` : '0 Matches — Better luck next month'}
                  </span>
                </div>
                {matchCount !== null && matchCount > 0 && (
                  <p className={`text-sm leading-relaxed font-bold ${matchCount >= 3 ? 'text-success' : 'text-on-surface-variant'}`}>
                    {matchCount === 5 ? 'JACKPOT WINNER!' : matchCount === 4 ? 'TIER 2 WINNER!' : matchCount === 3 ? 'TIER 3 WINNER!' : 'Close! Better luck next time.'}
                  </p>
                )}
                <div className="mt-4 flex gap-2">
                  {userScores.map((v, i) => {
                    const isMatch = latestDraw?.winning_numbers?.includes(v);
                    return (
                      <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors ${
                        isMatch ? 'bg-tertiary/20 border-tertiary text-tertiary' : 'bg-surface-bright border-outline-variant/10 text-on-surface-variant/30'
                      }`}>
                        {v < 10 ? `0${v}` : v}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <a href="/scores" className="relative z-10 w-full mt-8 py-4 rounded-xl bg-surface-bright text-on-surface font-bold font-manrope hover:bg-primary/20 transition-all duration-300 flex items-center justify-center gap-2">
            Update My Scores
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>

      {/* Impact & Top Givers Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Top Impact Makers List */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold font-manrope text-on-surface">Impact Pioneers</h2>
            <a className="text-sm font-bold text-primary hover:text-primary-dim transition-colors uppercase tracking-widest" href="#">All Members</a>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Marcus V. Sterling', title: 'Platinum Contributor', amount: '₹4,25,000', impact: 'Trees Planted: 1,200', img: '/images/avatar_marcus.png' },
              { name: 'Elena Rodriguez', title: 'Impact Legend', amount: '₹3,89,000', impact: 'Clean Water: 4 Villages', img: '/images/avatar_elena.png' },
              { name: 'Jameson Blake', title: 'Monthly Champion', amount: '₹2,10,000', impact: 'Medical Kits: 85', img: '/images/avatar_jameson.png' },
            ].map((person, i) => (
              <div key={i} className="group flex items-center justify-between p-5 rounded-2xl bg-surface-container-low border border-transparent hover:border-outline-variant/20 hover:bg-surface-container-high transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                    <img className="w-full h-full object-cover" alt={person.name} src={person.img}/>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface font-manrope">{person.name}</h4>
                    <p className="text-xs text-on-surface-variant">{person.title}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-tertiary font-manrope">{person.amount}</span>
                  <span className="text-[10px] uppercase tracking-tighter text-on-surface-variant">{person.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Monthly Impact Story Card */}
        <section className="bg-surface-container-low rounded-3xl overflow-hidden flex flex-col border border-outline-variant/10">
          <div className="h-64 relative">
            <img className="w-full h-full object-cover" alt="Reforestation project with saplings" src="/images/success_amazon.png"/>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
            <div className="absolute bottom-6 left-8">
              <span className="bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">November Success Story</span>
              <h3 className="text-2xl font-bold font-manrope text-on-surface">The Amazon Corridor</h3>
            </div>
          </div>
          <div className="p-8 flex-1 flex flex-col justify-between">
            <p className="text-on-surface-variant leading-relaxed mb-8 font-inter">
              This month, the Golf Charity community collective contribution reached its milestone. We've officially funded the protection of 40,000 acres of rainforest, preventing carbon emissions equivalent to 12,000 cars annually.
            </p>
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                <span>Goal Progress</span>
                <span className="text-primary">94% Achieved</span>
              </div>
              <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary shadow-[0_0_10px_rgba(144,147,255,0.8)]" style={{width: '94%'}}></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* PAst Legacy Draws Section */}
      <section className="mt-32 border-t border-outline-variant/10 pt-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold font-manrope text-on-surface mb-2">Past Legacy Draws</h2>
            <p className="text-on-surface-variant text-sm uppercase tracking-[0.2em] font-bold">The Heritage Archive of Victory</p>
          </div>
          <button className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:gap-3 transition-all">
            View All Records <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { month: 'October 2024', winning: [5, 12, 18, 33, 41], winners: 42, pool: 2250000, impact: 'Clean Water Initiative' },
            { month: 'September 2024', winning: [1, 9, 22, 35, 45], winners: 12, pool: 1800000, impact: 'Reforestation Project' },
            { month: 'August 2024', winning: [11, 24, 25, 30, 44], winners: 85, pool: 3500000, impact: 'Medical Support' }
          ].map((draw, i) => (
            <div key={i} className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 hover:border-primary/30 transition-all group overflow-hidden relative">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="font-bold text-on-surface font-manrope">{draw.month}</h4>
                  <span className="px-3 py-1 rounded-full bg-surface-bright border border-outline-variant/20 text-[9px] font-black text-on-surface-variant uppercase tracking-widest">Archived</span>
                </div>
                
                <div className="flex gap-2 mb-8">
                  {draw.winning.map((num, idx) => (
                    <div key={idx} className="w-8 h-8 rounded-lg bg-surface-bright flex items-center justify-center text-[11px] font-bold text-primary/60 border border-primary/10">
                      {num}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-t border-outline-variant/10 pt-6">
                  <div>
                    <p className="text-[9px] uppercase font-bold text-on-surface-variant mb-1 tracking-widest">Winners</p>
                    <p className="text-sm font-bold text-white">{draw.winners} Claims</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold text-on-surface-variant mb-1 tracking-widest">Prize Pool</p>
                    <p className="text-sm font-bold text-tertiary">₹{draw.pool.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center gap-2 opacity-50 text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">volunteer_activism</span>
                  Supported: {draw.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>

    {/* Footer */}
    <footer className="bg-[#060e20] w-full border-t border-[#9093ff]/10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-20 py-24 w-full">
        <div>
          <div className="font-manrope text-lg font-bold text-[#dee5ff] mb-6">Golf Charity</div>
          <p className="text-sm text-[#dee5ff]/60 leading-relaxed mb-6 font-inter">
            The Luminescent Archive of Giving. Redefining subscription-based philanthropy through transparency and sport.
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors cursor-pointer">public</span>
            <span className="material-symbols-outlined text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors cursor-pointer">share</span>
            <span className="material-symbols-outlined text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors cursor-pointer">mail</span>
          </div>
        </div>
        <div>
          <h4 className="font-manrope text-sm font-bold text-[#dee5ff] uppercase tracking-widest mb-6">Platform</h4>
          <ul className="space-y-4 font-inter">
            <li><a className="text-sm text-[#dee5ff]/50 hover:text-[#9093ff] transition-colors duration-300" href="#">How It Works</a></li>
            <li><a className="text-sm text-[#dee5ff]/50 hover:text-[#9093ff] transition-colors duration-300" href="#">Impact Report</a></li>
            <li><a className="text-sm text-[#dee5ff]/50 hover:text-[#9093ff] transition-colors duration-300" href="#">Charity Partners</a></li>
            <li><a className="text-sm text-[#dee5ff]/50 hover:text-[#9093ff] transition-colors duration-300" href="#">Past Results</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-manrope text-sm font-bold text-[#dee5ff] uppercase tracking-widest mb-6">Support</h4>
          <ul className="space-y-4 font-inter">
            <li><a className="text-sm text-[#dee5ff]/50 hover:text-[#9093ff] transition-colors duration-300" href="#">Contact Support</a></li>
            <li><a className="text-sm text-[#dee5ff]/50 hover:text-[#9093ff] transition-colors duration-300" href="#">Partner With Us</a></li>
            <li><a className="text-sm text-[#dee5ff]/50 hover:text-[#9093ff] transition-colors duration-300" href="#">Privacy Policy</a></li>
            <li><a className="text-sm text-[#dee5ff]/50 hover:text-[#9093ff] transition-colors duration-300" href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-manrope text-sm font-bold text-[#dee5ff] uppercase tracking-widest mb-6">Newsletter</h4>
          <p className="text-xs text-[#dee5ff]/40 mb-4 font-inter">Stay updated with our latest impact stories.</p>
          <div className="flex font-inter">
            <input className="bg-[#101e3e] border-none rounded-l-lg text-sm text-[#dee5ff] focus:ring-1 focus:ring-[#9093ff] w-full py-2 px-4 shadow-inner" placeholder="Email address" type="email"/>
            <button className="bg-[#172b54] text-[#dee5ff] px-4 rounded-r-lg hover:bg-[#9093ff] hover:text-[#060e20] transition-colors">
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      </div>
      <div className="px-20 py-8 border-t border-[#9093ff]/5 text-center">
        <p className="text-xs text-[#dee5ff]/40 font-inter">© 2024 Golf Charity. The Luminescent Archive of Giving.</p>
      </div>
    </footer>
    </>
  );
}

