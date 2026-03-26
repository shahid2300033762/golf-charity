import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [charityId, setCharityId] = useState('1');
  const [charityPercentage, setCharityPercentage] = useState(10);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (isLogin) {
      const { error } = await authService.signIn(email, password);
      if (error) setError(error.message);
      else navigate('/dashboard');
    } else {
      const { error } = await authService.signUp(email, password, name, charityId, charityPercentage);
      if (error) setError(error.message);
      else navigate('/subscribe'); // Force new users to subscribe immediately
    }
    setLoading(false);
  };

  return (
    <main className="relative flex items-center justify-center pt-32 pb-16 px-6 hero-bg min-h-screen">
      {/* Background Ethereal Elements */}
      <div className="ethereal-glow -top-20 -left-20 animate-glow-drift"></div>
      <div className="ethereal-glow bottom-0 right-0 glow-tertiary animate-glow-drift-reverse"></div>
      
      {/* Main Auth Shell */}
      <div className="w-full max-w-4xl grid md:grid-cols-2 glass-card rounded-[1.5rem] overflow-hidden shadow-2xl z-10 transition-all duration-700 items-stretch">
        {/* Left Side: Visual/Branding */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-surface-container-low/30 relative overflow-hidden h-full">
          <div className="z-10">
            <h1 className="font-headline text-2xl font-black tracking-tighter text-primary mb-2 italic">GULF CHARITY</h1>
            <p className="text-primary/60 font-bold tracking-[0.3em] text-[10px] uppercase">Luminescent Archive of Giving</p>
          </div>
          <div className="z-10">
            <blockquote className="mb-8">
              <p className="font-headline text-xl font-light leading-relaxed text-on-surface italic">
                "True impact is not measured in numbers, but in the light we leave behind."
              </p>
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-bright border border-outline-variant/30">
                <img alt="Profile avatar" className="w-full h-full object-cover" src="/images/avatar_elena.png"/>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface">Elena Vance</p>
                <p className="text-xs text-on-surface-variant">Global Impact Director</p>
              </div>
            </div>
          </div>
          {/* Abstract Visual Decor */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/20 via-transparent to-transparent"></div>
            <img alt="Abstract texture" className="w-full h-full object-cover mix-blend-overlay" src="/images/auth_abstract.png"/>
          </div>
        </div>
        
        {/* Right Side: Interaction */}
        <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-surface-container/40">
          <div className="mb-10 flex border-b border-outline-variant/10">
            <button type="button" onClick={() => { setIsLogin(true); setError(''); }} className={`pb-4 pr-8 font-headline font-bold text-lg transition-all duration-300 ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>Sign In</button>
            <button type="button" onClick={() => { setIsLogin(false); setError(''); }} className={`pb-4 pr-8 font-headline font-bold text-lg transition-all duration-300 ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>Join Club</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="block text-xs font-bold tracking-widest text-on-surface-variant uppercase ml-1">Full Name</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-tertiary transition-colors">person</span>
                  <input value={name} onChange={e => setName(e.target.value)} className="w-full bg-surface-container-lowest/50 border-0 border-b border-outline-variant/30 py-4 pl-12 pr-4 text-on-surface placeholder:text-outline focus:ring-0 focus:border-tertiary transition-all outline-none rounded-t-lg" placeholder="Your full name" type="text"/>
                </div>
              </div>
            )}
            {!isLogin && (
              <div className="space-y-4 pt-2 border-t border-outline-variant/10">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest text-center">Your Impact Defaults</p>
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-widest text-on-surface-variant uppercase ml-1">Select Charity</label>
                  <select value={charityId} onChange={e => setCharityId(e.target.value)} className="w-full bg-surface-container-lowest/50 border-0 border-b border-outline-variant/30 py-4 px-4 text-on-surface focus:ring-0 focus:border-tertiary transition-all outline-none rounded-t-lg">
                    <option value="1">Maya's New Horizon</option>
                    <option value="2">The Learning Arc</option>
                    <option value="3">Pure Stream Project</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-widest text-on-surface-variant uppercase ml-1">Contribution Percentage: {charityPercentage}%</label>
                  <input type="range" min="10" max="100" value={charityPercentage} onChange={e => setCharityPercentage(Number(e.target.value))} className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-tertiary" />
                  <p className="text-[10px] text-on-surface-variant text-right">Minimum 10% required</p>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label className="block text-xs font-bold tracking-widest text-on-surface-variant uppercase ml-1">Email Address</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-tertiary transition-colors">mail</span>
                <input value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-surface-container-lowest/50 border-0 border-b border-outline-variant/30 py-4 pl-12 pr-4 text-on-surface placeholder:text-outline focus:ring-0 focus:border-tertiary transition-all outline-none rounded-t-lg" placeholder="name@archive.com" type="email"/>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-xs font-bold tracking-widest text-on-surface-variant uppercase">Password</label>
                {isLogin && <a className="text-[10px] font-bold tracking-tighter uppercase text-primary hover:text-primary-fixed transition-colors" href="#">Forgot Access?</a>}
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-tertiary transition-colors">lock</span>
                <input value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-surface-container-lowest/50 border-0 border-b border-outline-variant/30 py-4 pl-12 pr-4 text-on-surface placeholder:text-outline focus:ring-0 focus:border-tertiary transition-all outline-none rounded-t-lg" placeholder="••••••••" type="password"/>
              </div>
            </div>
            {isLogin && (
              <div className="flex items-center gap-3 py-2">
                <input className="w-5 h-5 rounded border-outline-variant bg-surface-container-high text-primary focus:ring-primary/20 focus:ring-offset-0" id="remember" type="checkbox"/>
                <label className="text-sm text-on-surface-variant cursor-pointer select-none" htmlFor="remember">Maintain session for 30 days</label>
              </div>
            )}
            {error && <p className="text-error text-sm">{error}</p>}
            <button disabled={loading} type="submit" className="w-full py-5 bg-gradient-to-r from-primary to-primary-dim text-on-primary-container font-headline font-extrabold uppercase tracking-widest rounded-full shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 mt-4 group disabled:opacity-50">
              <span className="flex items-center justify-center gap-2">
                {loading ? 'Processing...' : isLogin ? 'Enter Archive' : 'Create Archive'}
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
            </button>
            {isLogin && (
              <>
                <div className="relative py-4 flex items-center">
                  <div className="flex-grow border-t border-outline-variant/10"></div>
                  <span className="px-4 text-[10px] font-bold text-on-surface-variant tracking-[0.2em] uppercase">Identity Verification</span>
                  <div className="flex-grow border-t border-outline-variant/10"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" className="flex items-center justify-center gap-3 py-3 px-4 rounded-full bg-surface-container-highest/40 border border-outline-variant/10 hover:bg-surface-container-highest transition-all duration-300">
                    <span className="material-symbols-outlined text-xl text-on-surface/80">public</span>
                    <span className="text-sm font-semibold text-on-surface">Google</span>
                  </button>
                  <button type="button" className="flex items-center justify-center gap-3 py-3 px-4 rounded-full bg-surface-container-highest/40 border border-outline-variant/10 hover:bg-surface-container-highest transition-all duration-300">
                    <span className="material-symbols-outlined text-xl text-on-surface/80" style={{fontVariationSettings: "'FILL' 1"}}>smartphone</span>
                    <span className="text-sm font-semibold text-on-surface">Apple</span>
                  </button>
                </div>
              </>
            )}
          </form>
          <p className="mt-12 text-center text-xs text-on-surface-variant">
            By accessing the archive, you agree to our{' '}
            <a className="text-on-surface hover:text-primary underline decoration-primary/30 underline-offset-4" href="#">Terms of Sovereignty</a>{' '}
            and{' '}
            <a className="text-on-surface hover:text-primary underline decoration-primary/30 underline-offset-4" href="#">Privacy Mandate</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
