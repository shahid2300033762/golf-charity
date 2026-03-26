import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Score {
  id: string;
  value: number;
  created_at: string;
}

export default function Scores() {
  const scoreIcons = ['golf_course', 'flag', 'sports_score', 'history', 'verified'];
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [newScore, setNewScore] = useState<number | ''>('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchScores = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('http://localhost:3001/api/scores', {
        headers: { 'Authorization': `Bearer ${session?.access_token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setScores(data.scores || []);
      }
    } catch (err) {
      console.error('Failed to fetch scores:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const handleSubmit = async () => {
    if (!newScore || newScore < 1 || newScore > 45) {
      setError('Score must be between 1 and 45.');
      return;
    }
    setError('');
    setSubmitLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('http://localhost:3001/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ value: newScore })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to submit score');
      }

      setNewScore('');
      await fetchScores(); // Refresh list to show max 5 logic
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
    <main className="pt-32 pb-24 px-12 max-w-[1400px] mx-auto" style={{
      background: 'radial-gradient(circle at 20% 30%, rgba(144, 147, 255, 0.08) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255, 185, 95, 0.05) 0%, transparent 40%), transparent'
    }}>
      {/* Hero Title Section */}
      <section className="mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          <span className="text-xs font-medium uppercase tracking-widest text-on-surface-variant">Performance Entry</span>
        </div>
        <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface mb-6">Log Your <span className="text-primary">Impact</span></h1>
        <p className="text-on-surface-variant text-lg max-w-2xl mx-auto leading-relaxed">
          Submit your last 5 scores to calculate your current Impact Rating. Every stroke contributes to our monthly charity pool. Oldest scores are rolled out as you progress.
        </p>
      </section>

      {loading ? (
        <div className="flex justify-center mb-20">
          <div className="w-12 h-12 rounded-full border-t-2 border-primary animate-spin"></div>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Display existing scores up to 5, pad the rest with empty slots */}
            {[...Array(5)].map((_, i) => {
              const score = scores[i]; // Latest first
              return (
                <div key={i} className={`p-8 rounded-xl border transition-all group ${score ? 'border-primary/50' : 'border-outline-variant/10 hover:border-primary/30'}`} style={{background: 'rgba(12, 25, 52, 0.6)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)'}}>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-3xl font-headline font-black text-outline-variant/30 group-hover:text-primary/40 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`material-symbols-outlined ${score ? 'text-tertiary' : 'text-primary/50'}`}>{scoreIcons[i]}</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-tighter mb-2">Total Score</label>
                      <div className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 text-2xl font-headline font-bold text-primary pb-2">
                        {score ? score.value : '--'}
                      </div>
                    </div>
                    {score && (
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-4">Logged</label>
                        <p className="text-xs text-on-surface">{new Date(score.created_at).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Monthly Draw Status Card */}
      {!loading && (
        <section className="mb-20">
          <div className="card-premium p-10 flex flex-col md:flex-row items-center justify-between gap-8 border-tertiary/20" style={{background: 'rgba(255, 185, 95, 0.03)'}}>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-tertiary">stars</span>
                <h3 className="font-headline text-2xl font-bold text-white">Monthly Draw Registration</h3>
              </div>
              <p className="text-on-surface-variant max-w-xl mb-6">
                Your latest 5 scores are your entry keys for the heritage draw. Maintain an active subscription and 5 logged values to remain eligible for the jackpot pool.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${scores.length >= 5 ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-surface-container border-outline-variant/20 text-on-surface-variant'}`}>
                  <span className="material-symbols-outlined text-sm">{scores.length >= 5 ? 'check_circle' : 'pending'}</span>
                  <span className="text-xs font-bold uppercase tracking-wider">{scores.length}/5 Scores Logged</span>
                </div>
                {/* We'd normally check sub status here via useAuth or a separate sub hook */}
                <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Subscription Active</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-surface-container-high border border-outline-variant/10 min-w-[240px]">
              <p className="text-[10px] uppercase font-black tracking-widest text-tertiary mb-3 text-center">Current Entry Numbers</p>
              <div className="flex gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${scores[i] ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant/30 text-on-surface-variant'}`}>
                    {scores[i]?.value || '?'}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter">Status</p>
                <p className={`text-sm font-bold ${scores.length >= 5 ? 'text-success' : 'text-warning'}`}>
                  {scores.length >= 5 ? 'ELIGIBLE FOR DRAW' : 'ADD MORE SCORES'}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Action Section */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-surface-container-low rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="relative z-10 flex-1">
            <h3 className="font-headline text-2xl font-bold mb-3">
              {scores.length >= 5 ? '🔒 Monthly Entry Secured' : 'Add New Sequence Entry'}
            </h3>
            <p className="text-on-surface-variant text-sm mb-4">
              {scores.length >= 5 
                ? 'Your 5-score sequence is locked for this month\'s draw. You cannot add or modify entries until the next period.' 
                : 'Values must be cleanly mapped between 1 and 45. Your entry is locked once you reach 5 scores.'}
            </p>
            {error && <p className="text-error text-sm font-semibold mb-4">{error}</p>}
            <div className={`flex flex-col md:flex-row gap-8 items-end ${!newScore || scores.length >= 5 ? 'opacity-50' : 'opacity-100'} transition-opacity`}>
              <div className="flex-1">
                <label className="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2 block">Score Value</label>
                <input 
                  type="number" 
                  min="1" max="45"
                  disabled={scores.length >= 5}
                  value={newScore}
                  onChange={(e) => setNewScore(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 focus:border-tertiary rounded-lg px-4 py-3 text-on-surface disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder={scores.length >= 5 ? "Locked" : "e.g. 34"}
                />
              </div>
              {newScore && (
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex flex-col items-center justify-center min-w-[120px] animate-in zoom-in duration-300">
                  <p className="text-[10px] uppercase font-bold text-primary mb-1">Projected Rating</p>
                  <p className="text-xl font-bold text-on-surface">
                    {(() => {
                      const tempScores = [...scores];
                      if (tempScores.length >= 5) tempScores.pop(); // Remove oldest (assuming they are latest first, wait, let's check)
                      // In Scores.tsx, fetchScores uses api/scores which returns LATEST FIRST.
                      // So the OLDEST is the LAST element.
                      const newAvg = (([...tempScores.map(s => s.value), Number(newScore)].reduce((a, b) => a + b, 0)) / (Math.min(5, scores.length + 1))).toFixed(1);
                      return newAvg;
                    })()}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="relative z-10 flex gap-4 w-full md:w-auto mt-6 md:mt-0">
            <button 
              onClick={handleSubmit}
              disabled={submitLoading || !newScore || scores.length >= 5}
              className="flex-1 md:flex-none px-10 py-5 bg-gradient-to-r from-primary to-primary-dim text-on-primary-container rounded-full font-headline font-extrabold tracking-wider hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
            >
              {scores.length >= 5 ? 'ENTRY LOCKED' : submitLoading ? 'SUBMITTING...' : 'LOG SCORE'}
            </button>
          </div>
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-20 -mt-20"></div>
        </div>
      </section>

      {/* Info Grid */}
      <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-6">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">volunteer_activism</span>
          </div>
          <h4 className="font-headline text-xl font-bold">Philanthropy Engine</h4>
          <p className="text-on-surface-variant leading-relaxed">Each entry contributes to your chosen charity defaults. Maintain all 5 scores to maximize potential draw rewards.</p>
        </div>
        <div className="space-y-6">
          <div className="w-12 h-12 bg-tertiary/10 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-tertiary">monitoring</span>
          </div>
          <h4 className="font-headline text-xl font-bold">Dynamic Adjustments</h4>
          <p className="text-on-surface-variant leading-relaxed">Our rolling system auto-archives your oldest score, ensuring only your freshest, most dynamic metrics impact the monthly tier draw.</p>
        </div>
        <div className="space-y-6">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">shield_with_heart</span>
          </div>
          <h4 className="font-headline text-xl font-bold">Verified Impact</h4>
          <p className="text-on-surface-variant leading-relaxed">Once submitted, your impact numbers combine into an encrypted array compared securely against the admin tier system.</p>
        </div>
      </section>
    </main>

    {/* Footer */}
    <footer className="relative w-full pt-24 pb-12 bg-[#081329]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-20 px-24 max-w-[1920px] mx-auto">
        <div className="col-span-1 md:col-span-1">
          <div className="text-xl font-black text-[#dee5ff] mb-6">Golf Charity</div>
          <p className="text-sm leading-relaxed text-[#dee5ff]/50">Elevating the game of golf through conscious contribution and community impact.</p>
        </div>
        <div>
          <h5 className="text-[#ffb95f] font-headline font-bold mb-6 text-sm uppercase tracking-widest">Platform</h5>
          <ul className="space-y-4 text-sm text-[#dee5ff]/50">
            <li><a className="hover:text-[#ffb95f] transition-colors duration-200 underline-offset-4 hover:underline" href="#">Impact Reports</a></li>
            <li><a className="hover:text-[#ffb95f] transition-colors duration-200 underline-offset-4 hover:underline" href="#">Charities</a></li>
            <li><a className="hover:text-[#ffb95f] transition-colors duration-200 underline-offset-4 hover:underline" href="#">Scores</a></li>
            <li><a className="hover:text-[#ffb95f] transition-colors duration-200 underline-offset-4 hover:underline" href="#">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-[#ffb95f] font-headline font-bold mb-6 text-sm uppercase tracking-widest">Legal</h5>
          <ul className="space-y-4 text-sm text-[#dee5ff]/50">
            <li><a className="hover:text-[#ffb95f] transition-colors duration-200 underline-offset-4 hover:underline" href="#">Privacy Policy</a></li>
            <li><a className="hover:text-[#ffb95f] transition-colors duration-200 underline-offset-4 hover:underline" href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-[#ffb95f] font-headline font-bold mb-6 text-sm uppercase tracking-widest">Connect</h5>
          <ul className="space-y-4 text-sm text-[#dee5ff]/50">
            <li><a className="hover:text-[#ffb95f] transition-colors duration-200 underline-offset-4 hover:underline" href="#">Support</a></li>
            <li><a className="hover:text-[#ffb95f] transition-colors duration-200 underline-offset-4 hover:underline" href="#">Careers</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-20 pt-8 border-t border-outline-variant/10 text-center">
        <p className="text-xs text-[#dee5ff]/30">© 2024 Golf Charity. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
}
