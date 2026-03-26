import { useEffect } from 'react';

export default function GlobalScholarsFund() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
{/* TopNavBar */}

{/* Hero Section */}
<section className="relative min-h-screen flex items-center pt-20 px-8 overflow-hidden">
{/* Floating Particles Background */}
<div className="absolute inset-0 z-0 pointer-events-none">
<div className="luminous-particle" style={{'top': '20%','left': '15%'}}></div>
<div className="luminous-particle" style={{'top': '45%','left': '80%'}}></div>
<div className="luminous-particle" style={{'top': '70%','left': '40%'}}></div>
<div className="luminous-particle" style={{'top': '10%','left': '60%'}}></div>
<div className="luminous-particle" style={{'top': '85%','left': '10%'}}></div>
</div>
<div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
<div className="order-2 md:order-1">
<span className="inline-block px-4 py-1 rounded-full bg-surface-container-high text-primary font-label text-xs uppercase tracking-[0.2em] mb-6">Flagship Initiative</span>
<h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-on-surface mb-6 leading-[1.1]">
                    Futures <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">Empowered</span>
</h1>
<p className="text-on-surface-variant text-lg md:text-xl leading-relaxed max-w-xl mb-10 font-light">
                    The Global Scholars Fund provides exceptional students from underserved communities with full-ride opportunities to world-class institutions. We invest in the minds that will solve tomorrow's challenges.
                </p>
<div className="flex flex-wrap gap-4">
<button className="bg-primary text-on-primary-container px-8 py-4 rounded-full font-headline font-bold flex items-center gap-2 hover:bg-primary-dim transition-all">
                        Support a Journey
                        <span className="material-symbols-outlined">arrow_forward</span>
</button>
<button className="px-8 py-4 rounded-full font-headline font-bold border border-outline-variant hover:bg-surface-container-high transition-all">
                        Watch Impact Story
                    </button>
</div>
</div>
<div className="order-1 md:order-2 relative">
<div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
    <img alt="High-contrast student portrait" className="w-full h-full object-cover grayscale contrast-125" src="/images/success_scholars_hero.png"/>
<div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
<div className="absolute bottom-8 left-8 right-8 p-6 glass-effect bg-surface-bright/40 rounded-2xl border border-outline-variant/20">
<p className="font-headline font-bold text-xl mb-1">Amara K.</p>
<p className="text-on-surface-variant text-sm">2023 Scholar • University of Cambridge</p>
</div>
</div>
{/* Abstract Glow */}
<div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
<div className="absolute -bottom-20 -left-20 w-64 h-64 bg-tertiary/10 rounded-full blur-[100px]"></div>
</div>
</div>
</section>
{/* Impact Stats Section */}
<section className="py-24 bg-surface-container-low">
<div className="max-w-7xl mx-auto px-8">
<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
<div className="text-center">
<div className="text-4xl md:text-5xl font-headline font-extrabold text-tertiary mb-2">1,240+</div>
<div className="text-on-surface-variant text-sm font-label uppercase tracking-widest">Scholarships</div>
</div>
<div className="text-center">
<div className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-2">42</div>
<div className="text-on-surface-variant text-sm font-label uppercase tracking-widest">Countries</div>
</div>
<div className="text-center">
<div className="text-4xl md:text-5xl font-headline font-extrabold text-tertiary mb-2">$8.4M</div>
<div className="text-on-surface-variant text-sm font-label uppercase tracking-widest">Funds Raised</div>
</div>
<div className="text-center">
<div className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-2">98%</div>
<div className="text-on-surface-variant text-sm font-label uppercase tracking-widest">Success Rate</div>
</div>
</div>
</div>
</section>
{/* Timeline Section */}
<section className="py-24 px-8 relative">
<div className="max-w-4xl mx-auto">
<div className="mb-16 text-center">
<h2 className="text-4xl font-headline font-bold mb-4">Scholar Journeys</h2>
<div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
</div>
<div className="relative space-y-20 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-tertiary before:to-primary-dim">
{/* Timeline Item 1 */}
<div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
<div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary bg-surface group-hover:bg-primary transition-all duration-300 z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
<span className="material-symbols-outlined text-sm">school</span>
</div>
<div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-8 rounded-2xl bg-surface-container-high border border-outline-variant/10 shadow-xl transition-all hover:scale-[1.02]">
<div className="flex items-center justify-between mb-2">
<span className="text-tertiary font-bold">2021</span>
<span className="text-xs text-on-surface-variant uppercase tracking-widest">Nairobi, Kenya</span>
</div>
<h3 className="font-headline font-bold text-xl mb-3">David's Arrival</h3>
<p className="text-on-surface-variant text-sm leading-relaxed">Starting from a small rural community, David overcame immense hurdles to be accepted into MIT's Physics program with full funding.</p>
</div>
</div>
{/* Timeline Item 2 */}
<div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
<div className="flex items-center justify-center w-10 h-10 rounded-full border border-tertiary bg-surface group-hover:bg-tertiary transition-all duration-300 z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
<span className="material-symbols-outlined text-sm">workspace_premium</span>
</div>
<div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-8 rounded-2xl bg-surface-container-high border border-outline-variant/10 shadow-xl transition-all hover:scale-[1.02]">
<div className="flex items-center justify-between mb-2">
<span className="text-tertiary font-bold">2022</span>
<span className="text-xs text-on-surface-variant uppercase tracking-widest">Berlin, Germany</span>
</div>
<h3 className="font-headline font-bold text-xl mb-3">Global Innovation Award</h3>
<p className="text-on-surface-variant text-sm leading-relaxed">Our scholars collaborated on a water purification project that won the European Youth Innovator award, impacting 10k+ lives.</p>
</div>
</div>
{/* Timeline Item 3 */}
<div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
<div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary-dim bg-surface group-hover:bg-primary-dim transition-all duration-300 z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
<span className="material-symbols-outlined text-sm">public</span>
</div>
<div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-8 rounded-2xl bg-surface-container-high border border-outline-variant/10 shadow-xl transition-all hover:scale-[1.02]">
<div className="flex items-center justify-between mb-2">
<span className="text-tertiary font-bold">2023</span>
<span className="text-xs text-on-surface-variant uppercase tracking-widest">Worldwide</span>
</div>
<h3 className="font-headline font-bold text-xl mb-3">Expansion Milestone</h3>
<p className="text-on-surface-variant text-sm leading-relaxed">The fund reached its 40th country, establishing new roots in Southeast Asia to support local tech talent.</p>
</div>
</div>
</div>
</div>
</section>
{/* Support Card Section */}
<section className="py-24 px-8 mb-20">
<div className="max-w-5xl mx-auto relative group">
<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-tertiary/20 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
<div className="relative p-12 md:p-20 rounded-[3rem] glass-effect bg-surface-container-high/40 border border-outline-variant/20 overflow-hidden text-center">
<div className="max-w-2xl mx-auto">
<h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">Support a Scholar</h2>
<p className="text-on-surface-variant text-lg mb-10 leading-relaxed">
                        Your contribution isn't just a donation; it's a seed planted for future breakthroughs. Select a level of impact to begin.
                    </p>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
<button className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 hover:border-primary transition-all group/btn text-left">
<div className="text-2xl font-bold mb-1">$50</div>
<div className="text-xs text-on-surface-variant">Resources &amp; Books</div>
</button>
<button className="p-6 rounded-2xl bg-surface-container-lowest border border-primary/50 text-on-surface hover:bg-primary/10 transition-all group/btn text-left ring-2 ring-primary/20">
<div className="text-2xl font-bold mb-1">$250</div>
<div className="text-xs text-on-surface-variant">Living Stipend</div>
</button>
<button className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 hover:border-tertiary transition-all group/btn text-left">
<div className="text-2xl font-bold mb-1">Custom</div>
<div className="text-xs text-on-surface-variant">Choose Amount</div>
</button>
</div>
<button className="w-full bg-gradient-to-r from-primary to-primary-dim py-5 rounded-full font-headline font-extrabold text-xl shadow-[0_0_40px_-10px_rgba(144,147,255,0.5)] hover:shadow-[0_0_60px_-10px_rgba(144,147,255,0.7)] transition-all">
                        Empower a Future Now
                    </button>
<p className="mt-8 text-xs text-on-surface-variant/60 font-label flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-sm">lock</span>
                        Secure payment processed by Fairway Impact
                    </p>
</div>
</div>
</div>
</section>
{/* Footer */}
<footer className="bg-[#060e20] w-full py-12 px-8">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
<div className="flex flex-col items-center md:items-start gap-2">
<span className="font-manrope font-bold text-[#dee5ff] text-xl">Golf Charity</span>
<span className="font-inter text-sm text-[#dee5ff]/60">© 2024 Golf Charity. All rights reserved.</span>
</div>
<div className="flex gap-8">
<a className="text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors font-inter text-sm" href="#">Privacy Policy</a>
<a className="text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors font-inter text-sm" href="#">Terms of Service</a>
<a className="text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors font-inter text-sm" href="#">Impact Report</a>
<a className="text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors font-inter text-sm" href="#">Contact</a>
</div>
<div className="flex gap-4">
<span className="material-symbols-outlined text-[#dee5ff]/40 hover:text-[#ffb95f] cursor-pointer transition-colors">language</span>
<span className="material-symbols-outlined text-[#dee5ff]/40 hover:text-[#ffb95f] cursor-pointer transition-colors">share</span>
</div>
</div>
</footer>
</>
  );
}
