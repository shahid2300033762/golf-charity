import { useEffect } from 'react';

export default function CleanWaterAlliance() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
{/* Top Navigation Shell */}

{/* Hero Section: Pure Life */}
<section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
<div className="absolute inset-0 z-0">
<div className="absolute inset-0 bg-surface"></div>
    <img className="w-full h-full object-cover opacity-30 mix-blend-screen" alt="Deep blue water ripples" src="/images/success_clean_water.png"/>
<div className="absolute inset-0 bg-gradient-to-b from-surface/0 via-surface/40 to-surface"></div>
</div>
<div className="relative z-10 text-center px-4 max-w-5xl">
<span className="label-md font-headline tracking-[0.2em] uppercase text-primary mb-6 block opacity-80">Clean Water Alliance</span>
<h1 className="font-headline text-7xl md:text-9xl font-extrabold tracking-tighter text-[#dee5ff] leading-none mb-8 text-glow">
                Pure Life
            </h1>
<p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed">
                Revolutionizing access to the world's most fundamental resource through luminescent engineering and global community action.
            </p>
<div className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center">
<button className="bg-gradient-to-r from-primary to-primary-dim text-on-primary-container px-10 py-5 rounded-full font-headline font-bold text-lg tracking-wide shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
                    Join the Mission
                </button>
<button className="glass-panel text-on-surface border border-outline-variant/30 px-10 py-5 rounded-full font-headline font-bold text-lg hover:bg-surface-bright/40 transition-all">
                    View Impact Report
                </button>
</div>
</div>
</section>
{/* Metric Bento Grid */}
<section className="py-24 px-8 max-w-7xl mx-auto">
<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
{/* Large Metric Card */}
<div className="md:col-span-8 glass-panel rounded-[2rem] p-10 flex flex-col justify-between min-h-[400px]">
<div>
<span className="material-symbols-outlined text-4xl text-primary mb-6">water_drop</span>
<h3 className="font-headline text-4xl font-bold mb-4">Litres Purified</h3>
<p className="text-on-surface-variant max-w-md">Real-time tracking of our global filtration network delivering safe hydration to remote communities.</p>
</div>
<div className="mt-8">
<div className="text-7xl font-extrabold font-headline tracking-tighter text-tertiary">142,804,221</div>
<div className="w-full h-2 bg-surface-container-highest rounded-full mt-6 overflow-hidden">
<div className="h-full w-[85%] bg-primary shadow-[0_0_15px_rgba(144,147,255,0.8)] rounded-full"></div>
</div>
</div>
</div>
{/* Small Metric Card 1 */}
<div className="md:col-span-4 bg-surface-container-high rounded-[2rem] p-10 flex flex-col items-center text-center justify-center border border-outline-variant/10">
<span className="material-symbols-outlined text-5xl text-tertiary mb-6" data-weight="fill">family_restroom</span>
<div className="text-5xl font-extrabold font-headline mb-2">1.2M</div>
<div className="text-on-surface-variant font-medium tracking-wide">Families Served</div>
</div>
{/* Small Metric Card 2 */}
<div className="md:col-span-4 bg-surface-container-high rounded-[2rem] p-10 flex flex-col items-center text-center justify-center border border-outline-variant/10">
<span className="material-symbols-outlined text-5xl text-primary mb-6">public</span>
<div className="text-5xl font-extrabold font-headline mb-2">42</div>
<div className="text-on-surface-variant font-medium tracking-wide">Countries Reached</div>
</div>
{/* Wide Action Card */}
<div className="md:col-span-8 relative overflow-hidden rounded-[2rem] group">
    <img className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-110" alt="Smiling child with clean water" src="https://images.unsplash.com/photo-1547036967-23d1199d8d62?q=80&w=800&auto=format&fit=crop"/>
<div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/60 to-transparent p-10 flex flex-col justify-end">
<h3 className="font-headline text-3xl font-bold mb-2">Direct Impact Stories</h3>
<p className="text-on-surface-variant mb-6 max-w-xs">See how your contribution changes lives on the ground.</p>
<button className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                        Read Stories <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</div>
</div>
</section>
{/* Global Reach Map Section */}
<section className="py-24 bg-surface-container-low">
<div className="max-w-7xl mx-auto px-8">
<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
<div className="max-w-xl">
<h2 className="font-headline text-5xl font-bold mb-6">Global Reach</h2>
<p className="text-lg text-on-surface-variant">Our intervention points are strategically mapped to the highest areas of water scarcity, creating a luminescent web of relief across the globe.</p>
</div>
<div className="flex gap-4">
<div className="flex items-center gap-2 px-4 py-2 bg-surface rounded-full border border-outline-variant/20">
<span className="w-3 h-3 bg-primary rounded-full shadow-[0_0_8px_rgba(144,147,255,1)]"></span>
<span className="text-xs font-bold uppercase tracking-widest text-[#dee5ff]">Active Project</span>
</div>
<div className="flex items-center gap-2 px-4 py-2 bg-surface rounded-full border border-outline-variant/20">
<span className="w-3 h-3 bg-tertiary rounded-full shadow-[0_0_8px_rgba(255,185,95,1)]"></span>
<span className="text-xs font-bold uppercase tracking-widest text-[#dee5ff]">Emergency Response</span>
</div>
</div>
</div>
<div className="w-full h-[600px] rounded-[3rem] overflow-hidden relative glass-panel border border-outline-variant/10 shadow-2xl">
{/* Map Placeholder Concept */}
<div className="absolute inset-0 bg-[#0c1934]" data-location="Global" style={{}}>
    <img className="w-full h-full object-cover opacity-20 grayscale brightness-50" alt="Global impact map" src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop"/>
{/* Animated Map Pins (Simulated) */}
<div className="absolute top-1/2 left-[25%] group cursor-pointer">
<div className="w-4 h-4 bg-primary rounded-full animate-ping absolute"></div>
<div className="w-4 h-4 bg-primary rounded-full relative shadow-[0_0_20px_#9093ff]"></div>
</div>
<div className="absolute top-[40%] left-[65%] group cursor-pointer">
<div className="w-4 h-4 bg-tertiary rounded-full animate-ping absolute"></div>
<div className="w-4 h-4 bg-tertiary rounded-full relative shadow-[0_0_20px_#ffb95f]"></div>
</div>
<div className="absolute top-[60%] left-[50%] group cursor-pointer">
<div className="w-4 h-4 bg-primary rounded-full animate-ping absolute"></div>
<div className="w-4 h-4 bg-primary rounded-full relative shadow-[0_0_20px_#9093ff]"></div>
</div>
</div>
{/* Floating Info Panel */}
<div className="absolute bottom-10 right-10 p-8 glass-panel rounded-2xl max-w-xs border border-outline-variant/20">
<h4 className="font-headline font-bold text-xl mb-2">Sub-Saharan Initiative</h4>
<p className="text-sm text-on-surface-variant mb-4">Currently deploying 250 atmospheric water generators across the Sahel region.</p>
<div className="flex items-center justify-between text-xs font-bold uppercase tracking-tighter text-primary">
<span>Status: 84% Complete</span>
<span className="material-symbols-outlined text-sm">trending_up</span>
</div>
</div>
</div>
</div>
</section>
{/* Donor Wall Section */}
<section className="py-24 px-8 overflow-hidden">
<div className="max-w-7xl mx-auto text-center mb-20">
<h2 className="font-headline text-5xl font-bold mb-4">Clean Water Impact</h2>
<p className="text-on-surface-variant max-w-2xl mx-auto">The individuals and organizations making the ethereal vision a tangible reality.</p>
</div>
<div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
{/* Dynamic Donor Cards */}
<div className="glass-panel p-6 rounded-2xl border border-outline-variant/10 flex items-center gap-4 min-w-[280px] hover:border-primary/40 transition-all cursor-default">
<div className="w-12 h-12 rounded-full overflow-hidden border border-primary/30">
<img className="w-full h-full object-cover" alt="Marcus Thorne" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"/>
</div>
<div>
<div className="font-bold text-[#dee5ff]">Marcus Thorne</div>
<div className="text-xs text-primary font-bold uppercase tracking-widest">Patron</div>
</div>
</div>
<div className="glass-panel p-6 rounded-2xl border border-outline-variant/10 flex items-center gap-4 min-w-[280px] hover:border-primary/40 transition-all cursor-default">
<div className="w-12 h-12 rounded-full overflow-hidden border border-primary/30">
<img className="w-full h-full object-cover" alt="Sarah Chen" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"/>
</div>
<div>
<div className="font-bold text-[#dee5ff]">Sarah Chen</div>
<div className="text-xs text-tertiary font-bold uppercase tracking-widest">Global Guardian</div>
</div>
</div>
<div className="glass-panel p-6 rounded-2xl border border-outline-variant/10 flex items-center gap-4 min-w-[280px] hover:border-primary/40 transition-all cursor-default">
<div className="w-12 h-12 rounded-full bg-surface-bright flex items-center justify-center border border-primary/30">
<span className="material-symbols-outlined text-primary">corporate_fare</span>
</div>
<div>
<div className="font-bold text-[#dee5ff]">Lumina Systems</div>
<div className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Corporate Ally</div>
</div>
</div>
<div className="glass-panel p-6 rounded-2xl border border-outline-variant/10 flex items-center gap-4 min-w-[280px] hover:border-primary/40 transition-all cursor-default">
<div className="w-12 h-12 rounded-full overflow-hidden border border-primary/30">
<img className="w-full h-full object-cover" alt="Julian Vanc" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"/>
</div>
<div>
<div className="font-bold text-[#dee5ff]">Julian Vanc</div>
<div className="text-xs text-primary font-bold uppercase tracking-widest">Champion</div>
</div>
</div>
<div className="glass-panel p-6 rounded-2xl border border-outline-variant/10 flex items-center gap-4 min-w-[280px] hover:border-primary/40 transition-all cursor-default">
<div className="w-12 h-12 rounded-full overflow-hidden border border-primary/30">
<img className="w-full h-full object-cover" alt="Elena Rodriguez" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"/>
</div>
<div>
<div className="font-bold text-[#dee5ff]">Elena Rodriguez</div>
<div className="text-xs text-tertiary font-bold uppercase tracking-widest">Heritage Donor</div>
</div>
</div>
<div className="glass-panel p-6 rounded-2xl border border-outline-variant/10 flex items-center gap-4 min-w-[280px] hover:border-primary/40 transition-all cursor-default">
<div className="w-12 h-12 rounded-full bg-surface-bright flex items-center justify-center border border-primary/30">
<span className="material-symbols-outlined text-primary">add</span>
</div>
<div>
<div className="font-bold text-[#dee5ff]">Your Name Here</div>
<div className="text-xs text-on-surface-variant font-bold uppercase tracking-widest italic">Join the movement</div>
</div>
</div>
</div>
</section>
{/* Footer Shell */}
<footer className="bg-[#060e20] border-t border-outline-variant/10">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 w-full py-12 px-8">
<div className="font-manrope font-bold text-[#dee5ff]">Fairway Impact</div>
<div className="flex flex-wrap justify-center gap-8">
<a className="text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors font-inter text-sm" href="#">Privacy Policy</a>
<a className="text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors font-inter text-sm" href="#">Terms of Service</a>
<a className="text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors font-inter text-sm" href="#">Impact Report</a>
<a className="text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors font-inter text-sm" href="#">Contact</a>
</div>
<div className="font-inter text-sm text-[#dee5ff]/60">© 2024 Fairway Impact. All rights reserved.</div>
</div>
</footer>
</>
  );
}
