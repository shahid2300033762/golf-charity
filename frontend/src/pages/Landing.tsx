import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';

/* ── Intersection Observer hook for scroll‑triggered animations ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Animated counter hook ── */
function useCounter(end: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setValue(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return value;
}

/* ── Staggered child wrapper ── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div
      className={className}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'both',
      }}
    >
      {children}
    </div>
  );
}

export default function Landing() {
  const { user } = useAuth();
  
  /* scroll‑reveal refs */
  const stats = useInView(0.2);
  const stories = useInView(0.15);
  const transparency = useInView(0.15);
  const footer = useInView(0.1);

  /* animated counters (Stitch Exact Values) */
  const impactVal = useCounter(8400000, 2200, stats.visible);
  const membersVal = useCounter(14200, 2400, stats.visible);
  const regionsVal = useCounter(42, 1800, stats.visible);

  const fmtCurrency = (n: number) => {
    if (n >= 1_000_000) return `₹${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `₹${(n / 1_000).toFixed(0)}K`;
    return `₹${n}`;
  };

  return (
    <div className="overflow-hidden">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-8 md:px-12 hero-bg">
        {/* Atmospheric glows */}
        <div className="ethereal-glow -top-32 -left-32 animate-glow-drift"></div>
        <div className="ethereal-glow bottom-0 right-0 glow-tertiary animate-glow-drift-reverse"></div>
        <div className="ethereal-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glow-center"></div>

        {/* Floating particles */}
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>

        {/* Hero Background Portrait (Refinement) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src="/images/hero_bg.png" 
            alt="Cinematic golf course at sunrise" 
            className="w-full h-full object-cover scale-110 blur-xl opacity-40 saturate-[1.2] brightness-90 animate-pulse-slow transform-gpu"
          />
          <div className="hero-portrait-overlay"></div>
        </div>

        <div className="z-10 text-center max-w-5xl mx-auto">
          {/* Luminous Badge */}
          <div className="hero-fade-up flex justify-center mb-10" style={{ animationDelay: '200ms' }}>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FACC15] shadow-[0_0_8px_#FACC15]"></div>
              <span className="text-[10px] font-bold tracking-[0.25em] text-white/70 uppercase">The Luminescent Archive of Giving</span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="hero-fade-up font-headline text-[clamp(2.5rem,7vw,6.5rem)] font-extrabold tracking-[-0.04em] text-on-surface mb-8 leading-[0.92]" style={{ animationDelay: '400ms' }}>
            Every Swing<br />
            <span className="text-gradient">Heals a Heart</span>
          </h1>

          {/* Subheadline */}
          <p className="hero-fade-up font-headline text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-on-surface/60 max-w-2xl mx-auto mb-14" style={{ animationDelay: '600ms' }}>
            Join a premium global community where your passion for the game fuels a movement of restorative impact. Elevate your play, transform a life.
          </p>

          {/* CTAs */}
          <div className="hero-fade-up flex flex-col sm:flex-row gap-5 justify-center" style={{ animationDelay: '800ms' }}>
            <Link
              to={user ? "/dashboard" : "/signup"}
              className="group relative py-4 px-10 bg-gradient-to-r from-primary to-primary-dim text-on-primary-container font-headline font-bold uppercase tracking-[0.2em] text-sm rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-3 justify-center">
                {user ? "Enter Dashboard" : "Begin Your Legacy"}
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
              </span>
            </Link>
            <Link
              to="/results"
              className="py-4 px-10 bg-surface-container-highest/30 backdrop-blur-md border border-outline-variant/15 text-on-surface font-headline font-semibold uppercase tracking-[0.15em] text-sm rounded-full hover:bg-surface-container-highest/50 hover:border-outline-variant/25 transition-all duration-300"
            >
              View Impact Report
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow opacity-40">
          <span className="material-symbols-outlined text-on-surface text-2xl">expand_more</span>
        </div>
      </section>

      {/* ═══════════════ IMPACT STORIES ═══════════════ */}
      <section ref={stories.ref} className="py-28 md:py-36 px-6 bg-surface-container-low relative">
        <div className="ethereal-glow top-0 right-0 glow-tertiary opacity-30"></div>

        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${stories.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Section header */}
          <div className="text-center mb-20">
            <p className="text-tertiary font-label font-bold tracking-[0.35em] text-[11px] uppercase mb-4">Our Mission in Action</p>
            <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-on-surface mb-6">
              The Hearts We Heal
            </h2>
            <p className="font-body text-on-surface/50 text-lg max-w-2xl mx-auto leading-relaxed">
              Through the Golf Charity subscription, our members have direct, measurable influence on lives across the globe. Witness the archive of change.
            </p>
          </div>

          {/* Story cards (Parity Rebuild) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Maya */}
            <FadeUp delay={200} className={`story-card group relative h-[420px] rounded-[2rem] overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu ${stories.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="absolute inset-0">
                <img 
                  src="/images/success_maya.png" 
                  alt="Child smiling" 
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent"></div>
              
              <div className="relative h-full p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-[10px] font-bold tracking-widest text-primary uppercase">Education</span>
                  <h3 className="font-headline text-3xl font-bold text-white mt-4 leading-tight group-hover:translate-x-1 transition-transform duration-500">Maya's New Horizon</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[11px] font-bold text-white/50 tracking-wider">₹12,400 Raised</span>
                    <span className="text-[11px] font-bold text-white/50 tracking-wider">75% OF GOAL</span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: stories.visible ? '75%' : '0%' }}></div>
                  </div>
                  <Link 
                    to="/charities/global-scholars-fund" 
                    className="mt-4 inline-flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all"
                  >
                    Read Full Story
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </FadeUp>

            {/* Card 2: Learning Arc */}
            <FadeUp delay={400} className={`story-card group relative h-[420px] rounded-[2rem] overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu ${stories.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="absolute inset-0">
                <img 
                  src="/images/success_classroom.png" 
                  alt="Water stream" 
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent"></div>
              
              <div className="relative h-full p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 text-[10px] font-bold tracking-widest text-secondary uppercase">Education</span>
                  <h3 className="font-headline text-3xl font-bold text-white mt-4 leading-tight group-hover:translate-x-1 transition-transform duration-500">The Learning Arc</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[11px] font-bold text-white/50 tracking-wider">₹45,000 Raised</span>
                    <span className="text-[11px] font-bold text-white/50 tracking-wider">92% OF GOAL</span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: stories.visible ? '92%' : '0%' }}></div>
                  </div>
                  <Link 
                    to="/charities/reforest-project" 
                    className="mt-4 inline-flex items-center gap-2 text-secondary font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all"
                  >
                    Read Full Story
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </FadeUp>

            {/* Card 3: Pure Stream */}
            <FadeUp delay={600} className={`story-card group relative h-[420px] rounded-[2rem] overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${stories.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="absolute inset-0">
                <img 
                  src="/images/success_clean_water.png" 
                  alt="Water stream" 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent"></div>
              
              <div className="relative h-full p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-tertiary/20 border border-tertiary/30 text-[10px] font-bold tracking-widest text-tertiary uppercase">Sustainability</span>
                  <h3 className="font-headline text-3xl font-bold text-white mt-4 leading-tight group-hover:translate-x-1 transition-transform duration-500">Pure Stream Project</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[11px] font-bold text-white/50 tracking-wider">₹8,900 Raised</span>
                    <span className="text-[11px] font-bold text-white/50 tracking-wider">40% OF GOAL</span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: stories.visible ? '40%' : '0%' }}></div>
                  </div>
                  <Link 
                    to="/charities/clean-water-alliance" 
                    className="mt-4 inline-flex items-center gap-2 text-tertiary font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all"
                  >
                    Read Full Story
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>


        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section ref={stats.ref} className="py-28 md:py-32 px-6 bg-surface relative overflow-hidden">
        <div className="ethereal-glow -top-40 left-1/4 animate-glow-drift"></div>
        <div className="ethereal-glow bottom-0 right-1/4 glow-tertiary animate-glow-drift-reverse opacity-50"></div>

        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${stats.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center mb-16">
            <p className="text-tertiary font-label font-bold tracking-[0.35em] text-[11px] uppercase mb-4">By the Numbers</p>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
              Collective Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <FadeUp delay={100} className={`transition-all duration-700 ${stats.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="stat-card glass-card rounded-3xl p-10 text-center group hover:bg-surface-container-high/70 hover:scale-[1.02] transition-all duration-500">
                <p className="text-5xl md:text-6xl font-headline font-extrabold text-white mb-3 tabular-nums group-hover:scale-110 transition-transform duration-500">
                  {membersVal.toLocaleString()}
                </p>
                <p className="text-on-surface-variant text-[11px] uppercase tracking-[0.35em] font-bold font-label">Active Members</p>
                <p className="text-on-surface/30 text-xs mt-3 font-body">Growing every day across the globe.</p>
              </div>
            </FadeUp>

            {/* Stat 2 */}
            <FadeUp delay={300} className={`transition-all duration-700 ${stats.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="stat-card glass-card rounded-3xl p-10 text-center group hover:bg-surface-container-high/70 hover:scale-[1.02] transition-all duration-500">
                <p className="text-5xl md:text-6xl font-headline font-extrabold text-white mb-3 tabular-nums group-hover:scale-110 transition-transform duration-500">
                  {regionsVal}
                </p>
                <p className="text-on-surface-variant text-[11px] uppercase tracking-[0.35em] font-bold font-label">Global Regions</p>
                <p className="text-on-surface/30 text-xs mt-3 font-body">Impact that knows no borders.</p>
              </div>
            </FadeUp>

            {/* Stat 3 */}
            <FadeUp delay={500} className={`transition-all duration-700 ${stats.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="stat-card glass-card rounded-3xl p-10 text-center group hover:bg-surface-container-high/70 hover:scale-[1.02] transition-all duration-500">
                <p className="text-5xl md:text-6xl font-headline font-extrabold text-[#D8B4FE] mb-3 tabular-nums group-hover:scale-110 transition-transform duration-500">
                  {fmtCurrency(impactVal)}
                </p>
                <p className="text-on-surface-variant text-[11px] uppercase tracking-[0.35em] font-bold font-label">Aggregate Growth</p>
                <p className="text-on-surface/30 text-xs mt-3 font-body">Measured monthly across all channels.</p>
              </div>
            </FadeUp>
          </div>

        </div>
      </section>

      {/* ═══════════════ IMPACT TRANSPARENCY ═══════════════ */}
      <section ref={transparency.ref} className="py-28 md:py-36 px-6 bg-surface-container-low relative">
        <div className="ethereal-glow top-1/2 left-0 -translate-y-1/2 opacity-40"></div>

        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${transparency.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="glass-card rounded-[2rem] p-10 md:p-16 relative overflow-hidden">
            {/* Decorative gradient border top */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-label font-bold tracking-[0.3em] text-[10px] uppercase mb-4">Impact Transparency</p>
                <h2 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface mb-6">
                  Real-time tracking of every dollar.
                </h2>
                <p className="font-body text-on-surface/50 text-base leading-relaxed mb-8">
                  Download our verified 2024 Luminescent Report. Creating a bridge between the spirit of competition and the essence of compassion.
                </p>
                <Link
                  to="/results"
                  className="group inline-flex items-center gap-3 py-3 px-8 bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 text-primary font-headline font-semibold text-sm uppercase tracking-widest rounded-full hover:from-primary/30 hover:to-primary/10 hover:border-primary/30 transition-all duration-300"
                >
                  View Full Report
                  <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform duration-300">download</span>
                </Link>
              </div>

              <div className="flex flex-col gap-6">
                {/* Mini transparency cards */}
                <div className={`bg-surface-container/60 backdrop-blur-sm rounded-2xl p-6 transition-all duration-700 delay-200 ${transparency.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-tertiary text-xl">verified</span>
                    </div>
                    <div>
                      <p className="font-headline text-sm font-bold text-on-surface">Audited & Verified</p>
                      <p className="font-body text-xs text-on-surface/40">Third-party audited quarterly</p>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-tertiary to-tertiary-dim rounded-full transition-all duration-1500 ease-out ${transparency.visible ? 'w-full' : 'w-0'}`} style={{ transitionDelay: '600ms' }}></div>
                  </div>
                </div>

                <div className={`bg-surface-container/60 backdrop-blur-sm rounded-2xl p-6 transition-all duration-700 delay-400 ${transparency.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-xl">analytics</span>
                    </div>
                    <div>
                      <p className="font-headline text-sm font-bold text-on-surface">Live Dashboard</p>
                      <p className="font-body text-xs text-on-surface/40">Real-time fund allocation</p>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-primary to-primary-dim rounded-full transition-all duration-1500 ease-out ${transparency.visible ? 'w-[85%]' : 'w-0'}`} style={{ transitionDelay: '800ms' }}></div>
                  </div>
                </div>

                <div className={`bg-surface-container/60 backdrop-blur-sm rounded-2xl p-6 transition-all duration-700 delay-[600ms] ${transparency.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary text-xl">public</span>
                    </div>
                    <div>
                      <p className="font-headline text-sm font-bold text-on-surface">Open Governance</p>
                      <p className="font-body text-xs text-on-surface/40">Community-directed grants</p>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-secondary to-secondary-dim rounded-full transition-all duration-1500 ease-out ${transparency.visible ? 'w-[72%]' : 'w-0'}`} style={{ transitionDelay: '1000ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section className="py-20 md:py-28 px-6 bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-tertiary/5"></div>
        <div className="ethereal-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glow-center opacity-60"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-6">
            Join us in curating a<br /><span className="text-gradient">better world</span>
          </h2>
          <p className="font-body text-on-surface/50 text-lg mb-10 max-w-xl mx-auto">
            Creating a bridge between the spirit of competition and the essence of compassion. Every swing counts.
          </p>
          <Link
            to={user ? "/dashboard" : "/signup"}
            className="group inline-flex items-center gap-3 py-5 px-14 bg-gradient-to-r from-primary to-primary-dim text-on-primary-container font-headline font-bold uppercase tracking-[0.2em] text-sm rounded-full shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
          >
            {user ? "Back to Dashboard" : "Start Your Journey"}
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer ref={footer.ref} className="w-full bg-surface-container-low/50 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

        <div className={`transition-all duration-1000 ${footer.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-8 md:px-20 py-20 w-full">
            {/* Brand */}
            <div className="space-y-5">
              <div className="font-headline text-lg font-bold text-on-background flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">brand_awareness</span>
                Golf Charity
              </div>
              <p className="font-body text-sm text-on-background/50 leading-relaxed max-w-xs">
                Curating a digital heritage of global generosity through cinematic impact storytelling and transparent archive management.
              </p>
              <div className="flex gap-3 pt-2">
                <a href="#" className="w-9 h-9 rounded-xl bg-surface-container-highest/30 flex items-center justify-center hover:bg-primary/20 transition-all duration-300 group">
                  <span className="material-symbols-outlined text-on-background/40 group-hover:text-primary text-lg transition-colors">public</span>
                </a>
                <a href="#" className="w-9 h-9 rounded-xl bg-surface-container-highest/30 flex items-center justify-center hover:bg-primary/20 transition-all duration-300 group">
                  <span className="material-symbols-outlined text-on-background/40 group-hover:text-primary text-lg transition-colors">share</span>
                </a>
                <a href="#" className="w-9 h-9 rounded-xl bg-surface-container-highest/30 flex items-center justify-center hover:bg-primary/20 transition-all duration-300 group">
                  <span className="material-symbols-outlined text-on-background/40 group-hover:text-primary text-lg transition-colors">hub</span>
                </a>
              </div>
            </div>

            {/* Platform */}
            <div className="flex flex-col gap-4">
              <h4 className="text-tertiary font-label font-bold uppercase tracking-[0.25em] text-[10px] mb-1">Platform</h4>
              <Link to="/" className="text-on-background/40 hover:text-primary transition-colors duration-300 text-sm font-body">How it Works</Link>
              <Link to="/charity" className="text-on-background/40 hover:text-primary transition-colors duration-300 text-sm font-body">Charity Partners</Link>
              <Link to="/results" className="text-on-background/40 hover:text-primary transition-colors duration-300 text-sm font-body">Impact Report</Link>
              <Link to="/dashboard" className="text-on-background/40 hover:text-primary transition-colors duration-300 text-sm font-body">Leaderboard</Link>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-4">
              <h4 className="text-tertiary font-label font-bold uppercase tracking-[0.25em] text-[10px] mb-1">Company</h4>
              <a className="text-on-background/40 hover:text-primary transition-colors duration-300 text-sm font-body" href="#">Privacy Policy</a>
              <a className="text-on-background/40 hover:text-primary transition-colors duration-300 text-sm font-body" href="#">Terms of Service</a>
              <a className="text-on-background/40 hover:text-primary transition-colors duration-300 text-sm font-body" href="#">Contact Support</a>
              <a className="text-on-background/40 hover:text-primary transition-colors duration-300 text-sm font-body" href="#">Partner With Us</a>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col gap-4">
              <h4 className="text-tertiary font-label font-bold uppercase tracking-[0.25em] text-[10px] mb-1">Newsletter</h4>
              <p className="font-body text-sm text-on-background/40 leading-relaxed">
                Receive archival updates on our collective impact and upcoming global draws.
              </p>
              <div className="flex gap-2 mt-1">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 bg-surface-container-lowest/30 backdrop-blur-sm border border-outline-variant/10 rounded-xl text-sm text-on-surface placeholder:text-on-surface/20 font-body focus:outline-none focus:border-tertiary/40 transition-colors duration-300"
                />
                <button className="px-4 py-2.5 bg-tertiary/20 border border-tertiary/20 rounded-xl text-tertiary text-sm font-headline font-semibold hover:bg-tertiary/30 transition-all duration-300">
                  <span className="material-symbols-outlined text-lg">send</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="px-8 md:px-20 py-6 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-on-background/30">© 2024 Golf Charity. The Luminescent Archive of Giving.</p>
            <div className="flex gap-6">
              <a href="#" className="text-[10px] uppercase tracking-widest text-on-background/20 hover:text-on-background/40 transition-colors font-label">Cookie Policy</a>
              <a href="#" className="text-[10px] uppercase tracking-widest text-on-background/20 hover:text-on-background/40 transition-colors font-label">Accessibility</a>
              <a href="#" className="text-[10px] uppercase tracking-widest text-on-background/20 hover:text-on-background/40 transition-colors font-label">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
