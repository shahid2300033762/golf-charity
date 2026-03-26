import { useEffect } from 'react';

export default function ReforestProject() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
{/* TopNavBar */}

{/* Hero Section */}
<header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
{/* Background Image with Overlay */}
<div className="absolute inset-0 z-0">
    <img alt="Ethereal Forest" className="w-full h-full object-cover opacity-40" src="/images/success_reforest_hero.png"/>
<div className="absolute inset-0 bg-gradient-to-b from-surface/0 via-surface/40 to-surface"></div>
</div>
{/* Background Light Trails */}
<div className="absolute top-1/4 -left-20 w-full h-px light-trail rotate-12"></div>
<div className="absolute bottom-1/3 -right-20 w-full h-px light-trail -rotate-6"></div>
<div className="relative z-10 max-w-7xl mx-auto px-8 w-full text-center md:text-left grid md:grid-cols-2 gap-16 items-center">
<div className="space-y-8">
<span className="inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-[0.2em] uppercase">Active Initiative</span>
<h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter leading-tight text-on-surface">
                    The <span className="text-primary italic">Reforest</span> Project
                </h1>
<p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
                    Reseeding the planet through a cinematic lens. We target critical biodiversity hotspots, restoring ecosystems one breath at a time.
                </p>
<div className="flex flex-wrap gap-4 pt-4">
<button className="px-8 py-4 bg-primary text-on-primary rounded-full font-headline font-bold text-lg hover:shadow-[0_0_20px_rgba(144,147,255,0.4)] transition-all">Support Growth</button>
<button className="px-8 py-4 bg-surface-container-highest text-on-surface rounded-full font-headline font-bold text-lg hover:bg-surface-bright transition-all flex items-center gap-2">
<span className="material-symbols-outlined" data-icon="play_circle">play_circle</span> Watch Impact
                    </button>
</div>
</div>
{/* Animated Growth Counter */}
<div className="flex flex-col items-center justify-center">
<div className="relative w-80 h-80 flex items-center justify-center">
<div className="absolute inset-0 rounded-full border-4 border-surface-container-highest"></div>
<div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-[spin_10s_linear_infinite]"></div>
<div className="text-center">
<span className="block text-6xl font-headline font-extrabold text-tertiary tracking-tighter">142,892</span>
<span className="text-on-surface-variant font-label uppercase tracking-widest text-sm">Trees Planted Today</span>
<div className="mt-4 flex items-center justify-center gap-2 text-primary">
<span className="material-symbols-outlined text-sm" data-icon="trending_up">trending_up</span>
<span className="text-xs font-bold">+1.4% from yesterday</span>
</div>
</div>
</div>
</div>
</div>
</header>
{/* Impact Tracker Section */}
<section className="py-24 bg-surface">
<div className="max-w-7xl mx-auto px-8">
<div className="mb-16">
<label className="text-primary font-label font-bold uppercase tracking-[0.1em] text-xs">Real-Time Data</label>
<h2 className="text-4xl font-headline font-bold text-on-surface mt-2">The Measurement of Change</h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{/* Trees Planted */}
<div className="bg-surface-container-high p-10 rounded-[2rem] relative overflow-hidden group">
<div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
<span className="material-symbols-outlined text-7xl" data-icon="park">park</span>
</div>
<h3 className="text-on-surface-variant font-label text-sm uppercase tracking-widest mb-4">Total Trees</h3>
<div className="text-5xl font-headline font-extrabold text-on-surface mb-6">4.2M+</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[84%] relative">
<div className="absolute right-0 top-0 h-full w-2 bg-white blur-sm"></div>
</div>
</div>
<p className="mt-4 text-sm text-on-surface-variant italic">84% of our 2024 goal achieved.</p>
</div>
{/* CO2 Absorbed */}
<div className="bg-surface-container-high p-10 rounded-[2rem] relative overflow-hidden group">
<div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
<span className="material-symbols-outlined text-7xl" data-icon="co2">co2</span>
</div>
<h3 className="text-on-surface-variant font-label text-sm uppercase tracking-widest mb-4">CO2 Sequestration</h3>
<div className="text-5xl font-headline font-extrabold text-on-surface mb-6">12.5k<span className="text-2xl ml-1">tons</span></div>
<p className="text-on-surface-variant leading-relaxed">Offsetting the carbon footprint of approximately 2,500 commercial aircraft annually.</p>
<div className="mt-6 flex gap-2">
<span className="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-xs font-bold border border-tertiary/20">High Impact</span>
</div>
</div>
{/* Bio-Recovery */}
<div className="bg-surface-container-high p-10 rounded-[2rem] relative overflow-hidden group">
<div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
<span className="material-symbols-outlined text-7xl" data-icon="pets">pets</span>
</div>
<h3 className="text-on-surface-variant font-label text-sm uppercase tracking-widest mb-4">Species Protected</h3>
<div className="text-5xl font-headline font-extrabold text-on-surface mb-6">450+</div>
<p className="text-on-surface-variant leading-relaxed">From rare orchids to apex predators, we rebuild the chain of life.</p>
<div className="mt-6">
<a className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all" href="#">View Bio-Report <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span></a>
</div>
</div>
</div>
</div>
</section>
{/* On-the-Ground Gallery Section (Asymmetric Bento Grid) */}
<section className="py-24 bg-surface-container-low">
<div className="max-w-7xl mx-auto px-8">
<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
<div className="max-w-xl">
<label className="text-tertiary font-label font-bold uppercase tracking-[0.1em] text-xs">Direct Evidence</label>
<h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mt-2 tracking-tighter">A Gallery of Restoration</h2>
</div>
<div className="flex gap-4">
<button className="p-4 rounded-full border border-outline-variant hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined" data-icon="chevron_left">chevron_left</span>
</button>
<button className="p-4 rounded-full border border-outline-variant bg-primary text-on-primary hover:shadow-lg hover:shadow-primary/20 transition-all">
<span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-6 h-auto md:h-[800px]">
{/* Big Feature Card */}
<div className="md:col-span-8 md:row-span-2 relative rounded-[2.5rem] overflow-hidden group">
    <img alt="Amazon Basin" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1200&auto=format&fit=crop"/>
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent"></div>
<div className="absolute bottom-0 left-0 p-12">
<span className="text-tertiary font-bold tracking-widest text-xs uppercase mb-2 block">Location: Amazon Basin</span>
<h3 className="text-3xl font-headline font-bold text-white mb-4">Reseeding the Heart of the World</h3>
<p className="text-on-surface/80 max-w-md mb-6">Restoring 5,000 hectares of primary rainforest through aerial seed dispersal and local stewardship.</p>
<button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold hover:bg-white hover:text-surface transition-all">Explore Site</button>
</div>
</div>
{/* Small Grid Items */}
<div className="md:col-span-4 md:row-span-1 relative rounded-[2.5rem] overflow-hidden group">
<img alt="Alpine Slopes" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop"/>
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/60 to-transparent"></div>
<div className="absolute bottom-0 left-0 p-8">
<h4 className="text-xl font-headline font-bold text-white">Alpine High-Ground</h4>
<p className="text-xs text-on-surface/70 uppercase tracking-widest">Switzerland</p>
</div>
</div>
<div className="md:col-span-4 md:row-span-1 relative rounded-[2.5rem] overflow-hidden group">
<img alt="Coastal Mangroves" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1544526226-d4568090ffb8?q=80&w=800&auto=format&fit=crop"/>
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/60 to-transparent"></div>
<div className="absolute bottom-0 left-0 p-8">
<h4 className="text-xl font-headline font-bold text-white">Coastal Resilience</h4>
<p className="text-xs text-on-surface/70 uppercase tracking-widest">Indonesia</p>
</div>
</div>
</div>
</div>
</section>
{/* Contribute CTA Section (Glassmorphic Cards) */}
<section className="py-24 relative overflow-hidden">
{/* Background "Glow" elements */}
<div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
<div className="absolute -bottom-24 -left-24 w-96 h-96 bg-tertiary/10 rounded-full blur-[120px]"></div>
<div className="max-w-7xl mx-auto px-8 relative z-10 text-center mb-16">
<h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter mb-4">Become a <span className="text-tertiary italic">Guardian</span></h2>
<p className="text-on-surface-variant max-w-2xl mx-auto">Your contribution isn't just a donation; it's a seed. Choose how you want to impact the future of our biosphere.</p>
</div>
<div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
{/* Glass Card 1 */}
<div className="glass-panel p-10 rounded-[2.5rem] border border-white/10 flex flex-col items-center text-center hover:border-primary/40 transition-all duration-300">
<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
<span className="material-symbols-outlined text-primary text-3xl" data-icon="potted_plant">potted_plant</span>
</div>
<h3 className="text-2xl font-headline font-bold mb-4">The Sapling</h3>
<p className="text-on-surface-variant text-sm leading-relaxed mb-8">Plant 10 trees in a region of your choice and receive a digital certificate of impact.</p>
<div className="mt-auto">
<div className="text-3xl font-headline font-extrabold mb-6">$25 <span className="text-sm font-label text-on-surface-variant font-normal">/ one-time</span></div>
<button className="w-full py-4 bg-primary/20 text-primary border border-primary/30 rounded-full font-bold hover:bg-primary hover:text-on-primary transition-all">Support Now</button>
</div>
</div>
{/* Glass Card 2 (Featured) */}
<div className="glass-panel p-10 rounded-[2.5rem] border-2 border-primary flex flex-col items-center text-center relative scale-105 shadow-2xl shadow-primary/10">
<div className="absolute -top-4 bg-primary text-on-primary text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1 rounded-full">Most Impactful</div>
<div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-8 border border-primary/40 shadow-[0_0_20px_rgba(144,147,255,0.3)]">
<span className="material-symbols-outlined text-primary text-3xl" data-icon="forest">forest</span>
</div>
<h3 className="text-2xl font-headline font-bold mb-4">The Grove</h3>
<p className="text-on-surface-variant text-sm leading-relaxed mb-8">Plant 50 trees monthly. Includes access to our "Live Canopy" satellite monitoring tool.</p>
<div className="mt-auto w-full">
<div className="text-3xl font-headline font-extrabold mb-6">$95 <span className="text-sm font-label text-on-surface-variant font-normal">/ month</span></div>
<button className="w-full py-4 bg-primary text-on-primary rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Adopt a Grove</button>
</div>
</div>
{/* Glass Card 3 */}
<div className="glass-panel p-10 rounded-[2.5rem] border border-white/10 flex flex-col items-center text-center hover:border-tertiary/40 transition-all duration-300">
<div className="w-16 h-16 rounded-full bg-tertiary/10 flex items-center justify-center mb-8 border border-tertiary/20">
<span className="material-symbols-outlined text-tertiary text-3xl" data-icon="landscape">landscape</span>
</div>
<h3 className="text-2xl font-headline font-bold mb-4">Ecosystem Pilot</h3>
<p className="text-on-surface-variant text-sm leading-relaxed mb-8">Fund the total restoration of 1 hectare. Full naming rights for the restoration plot.</p>
<div className="mt-auto">
<div className="text-3xl font-headline font-extrabold mb-6">$2,500 <span className="text-sm font-label text-on-surface-variant font-normal">/ site</span></div>
<button className="w-full py-4 bg-surface-container-highest text-on-surface border border-outline-variant rounded-full font-bold hover:bg-surface-bright transition-all">Partner With Us</button>
</div>
</div>
</div>
</section>
{/* Footer */}
<footer className="bg-[#060e20] w-full py-12 px-8 border-t border-outline-variant/10">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
<div className="text-left">
<span className="font-manrope font-bold text-[#dee5ff] text-xl block">Fairway Impact</span>
<p className="font-inter text-sm text-[#dee5ff]/60 mt-2">© 2024 Fairway Impact. All rights reserved.</p>
</div>
<div className="flex flex-wrap justify-center gap-8">
<a className="text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors font-inter text-sm" href="#">Privacy Policy</a>
<a className="text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors font-inter text-sm" href="#">Terms of Service</a>
<a className="text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors font-inter text-sm" href="#">Impact Report</a>
<a className="text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors font-inter text-sm" href="#">Contact</a>
</div>
<div className="flex gap-4">
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
<span className="material-symbols-outlined text-lg" data-icon="public">public</span>
</div>
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
<span className="material-symbols-outlined text-lg" data-icon="share">share</span>
</div>
</div>
</div>
</footer>
</>
  );
}
