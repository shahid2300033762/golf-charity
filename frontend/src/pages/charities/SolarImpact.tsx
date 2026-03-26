import { useEffect } from 'react';

export default function SolarImpact() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
{/* TopNavBar */}

<main className="pt-20">
{/* Hero Section: Solar Impact Milestone */}
<section className="relative min-h-[921px] flex flex-col items-center justify-center px-6 overflow-hidden">
{/* Background Elements */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] solar-glow rounded-full -z-10"></div>
<div className="text-center max-w-4xl mx-auto z-10">
<div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 mb-8">
<span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
<span className="font-label text-xs uppercase tracking-[0.2em] text-tertiary">Solar Impact Milestone</span>
</div>
<h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-on-surface leading-tight">
                    Every 50 Points Earned Helps <span className="text-gradient-gold">Fund a Solar Panel</span>
</h1>
<p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-12">
                    Your achievements on the fairway now power sustainable futures. Track our collective progress toward our next community solar installation.
                </p>
{/* Progress Section */}
<div className="glass-panel rounded-3xl p-8 md:p-10 max-w-3xl mx-auto relative overflow-hidden">
<div className="flex justify-between items-end mb-4">
<div className="text-left">
<span className="block text-sm font-label uppercase tracking-widest text-on-surface-variant mb-1">Current Progress</span>
<span className="text-4xl font-headline font-extrabold text-on-surface">38 / 50 <span className="text-lg font-medium text-on-surface-variant">Points</span></span>
</div>
<div className="text-right">
<span className="block text-sm font-label uppercase tracking-widest text-tertiary mb-1">Next Goal</span>
<span className="text-lg font-headline font-bold text-on-surface">Panel #124</span>
</div>
</div>
{/* Narrative Progress Bar */}
<div className="w-full h-4 bg-surface-container-highest rounded-full overflow-hidden mb-4 relative">
<div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-tertiary rounded-full shadow-[0_0_15px_rgba(144,147,255,0.5)]" style={{'width': '76%'}}>
<div className="absolute right-0 top-0 h-full w-2 bg-white/40 blur-sm"></div>
</div>
</div>
<div className="flex items-center justify-center gap-4 text-sm font-body text-on-surface-variant">
<span className="material-symbols-outlined text-tertiary text-sm" data-icon="bolt">bolt</span>
                        Only 12 points away from our next panel installation!
                    </div>
</div>
</div>
{/* Floating Visual Decoration */}
<div className="absolute bottom-10 left-10 opacity-20 hidden lg:block">
<span className="material-symbols-outlined text-9xl text-primary" data-icon="wb_sunny">wb_sunny</span>
</div>
<div className="absolute top-40 right-10 opacity-10 hidden lg:block">
<span className="material-symbols-outlined text-8xl text-tertiary" data-icon="solar_power">solar_power</span>
</div>
</section>
{/* Points to Power Calculator */}
<section className="py-24 px-8 bg-surface-container-low">
<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
<div className="space-y-8">
<h2 className="font-headline text-4xl font-bold tracking-tight">The Impact of Your <span className="text-primary">Play</span></h2>
<p className="text-on-surface-variant leading-relaxed text-lg">
                        We've simplified the math. Every birdie, eagle, and completed round contributes to our solar fund. Use the calculator to see how your upcoming season could light up a community.
                    </p>
<div className="grid grid-cols-2 gap-6">
<div className="p-6 rounded-2xl bg-surface-container-high border-b border-outline-variant/10">
<span className="material-symbols-outlined text-tertiary mb-4" data-icon="eco">eco</span>
<h4 className="font-headline font-bold text-xl mb-1">1,240 lbs</h4>
<p className="text-xs text-on-surface-variant uppercase tracking-tighter">CO2 Saved Yearly</p>
</div>
<div className="p-6 rounded-2xl bg-surface-container-high border-b border-outline-variant/10">
<span className="material-symbols-outlined text-primary mb-4" data-icon="home_work">home_work</span>
<h4 className="font-headline font-bold text-xl mb-1">4 Homes</h4>
<p className="text-xs text-on-surface-variant uppercase tracking-tighter">Powered per Panel</p>
</div>
</div>
</div>
<div className="glass-panel p-10 rounded-[2.5rem] relative">
<h3 className="font-headline text-2xl font-bold mb-8 flex items-center gap-3">
                        Points to Power Calculator
                    </h3>
<div className="space-y-8">
<div>
<label className="block text-sm font-label text-on-surface-variant uppercase tracking-widest mb-4">Target Monthly Points</label>
<input className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary" max="100" min="1" type="range" value="50"/>
<div className="flex justify-between mt-2 text-xs font-label text-on-surface-variant">
<span>1 Pt</span>
<span>50 Pts (1 Panel)</span>
<span>100 Pts</span>
</div>
</div>
<div className="pt-8 border-t border-outline-variant/10">
<div className="flex justify-between items-center mb-6">
<span className="text-on-surface-variant">Potential Impact</span>
<span className="text-3xl font-headline font-extrabold text-tertiary">1.2 Panels</span>
</div>
<button className="w-full py-4 rounded-full bg-on-surface text-surface font-headline font-bold transition-all hover:bg-primary hover:text-on-primary">Set Achievement Goal</button>
</div>
</div>
</div>
</div>
</section>
{/* Gallery of Installations */}
<section className="py-24 px-8">
<div className="max-w-7xl mx-auto">
<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
<div>
<h2 className="font-headline text-4xl font-bold mb-4">Completed Installations</h2>
<p className="text-on-surface-variant max-w-xl">Real-world results of your collective effort. From community centers to local schools, your points are making a tangible difference.</p>
</div>
<a className="group flex items-center gap-2 text-primary font-bold hover:text-tertiary transition-colors" href="#">
                        View Full Archive
                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1" data-icon="arrow_forward">arrow_forward</span>
</a>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{/* Gallery Card 1 */}
<div className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden">
    <img alt="Solar panels on a school roof" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="/images/success_solar_hero.png"/>
<div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent"></div>
<div className="absolute bottom-0 left-0 p-8 w-full">
<span className="inline-block px-3 py-1 rounded-full bg-tertiary text-on-tertiary-container text-[10px] font-bold uppercase tracking-widest mb-3">Project #118</span>
<h4 className="font-headline text-2xl font-bold mb-2">Unity Heights School</h4>
<p className="text-on-surface-variant text-sm line-clamp-2">Funded by 2,500 points from the Winter Classic tournament participants.</p>
</div>
</div>
{/* Gallery Card 2 */}
<div className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden">
<img alt="Rural solar farm installation" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://images.unsplash.com/photo-1509391366360-fe5bb584852a?q=80&w=800&auto=format&fit=crop"/>
<div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent"></div>
<div className="absolute bottom-0 left-0 p-8 w-full">
<span className="inline-block px-3 py-1 rounded-full bg-tertiary text-on-tertiary-container text-[10px] font-bold uppercase tracking-widest mb-3">Project #121</span>
<h4 className="font-headline text-2xl font-bold mb-2">East River Microgrid</h4>
<p className="text-on-surface-variant text-sm line-clamp-2">Providing clean energy to 40 local residences during peak summer hours.</p>
</div>
</div>
{/* Gallery Card 3 */}
<div className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden">
<img alt="Rooftop solar garden" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop"/>
<div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent"></div>
<div className="absolute bottom-0 left-0 p-8 w-full">
<span className="inline-block px-3 py-1 rounded-full bg-tertiary text-on-tertiary-container text-[10px] font-bold uppercase tracking-widest mb-3">Project #123</span>
<h4 className="font-headline text-2xl font-bold mb-2">The Canopy Project</h4>
<p className="text-on-surface-variant text-sm line-clamp-2">Our latest milestone, adding shade and power to the community garden pavilion.</p>
</div>
</div>
</div>
</div>
</section>
{/* Power the Future Leaderboard */}
<section className="py-24 px-8 bg-surface-container-high relative overflow-hidden">
{/* Background Accent */}
<div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/5 blur-[100px] rounded-full"></div>
<div className="max-w-5xl mx-auto">
<div className="text-center mb-16">
<h2 className="font-headline text-4xl font-bold mb-4">Power the Future Leaderboard</h2>
<p className="text-on-surface-variant">Top contributors to the current solar panel milestone.</p>
</div>
<div className="glass-panel rounded-3xl overflow-hidden">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-highest/50 border-b border-outline-variant/10">
<th className="px-8 py-5 font-headline font-bold text-xs uppercase tracking-widest text-on-surface-variant">Rank</th>
<th className="px-8 py-5 font-headline font-bold text-xs uppercase tracking-widest text-on-surface-variant">Contributor</th>
<th className="px-8 py-5 font-headline font-bold text-xs uppercase tracking-widest text-on-surface-variant">Points Contributed</th>
<th className="px-8 py-5 font-headline font-bold text-xs uppercase tracking-widest text-on-surface-variant text-right">Impact</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/10">
<tr className="group hover:bg-surface-bright/30 transition-colors">
<td className="px-8 py-6">
<span className="w-8 h-8 rounded-full bg-tertiary/20 text-tertiary flex items-center justify-center font-bold text-sm">1</span>
</td>
<td className="px-8 py-6">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-sm" data-icon="person">person</span>
</div>
<span className="font-headline font-bold">Marcus Sterling</span>
</div>
</td>
<td className="px-8 py-6 text-on-surface">14.5 Pts</td>
<td className="px-8 py-6 text-right">
<span className="text-xs font-label bg-primary/10 text-primary px-3 py-1 rounded-full">29% of Panel</span>
</td>
</tr>
<tr className="group hover:bg-surface-bright/30 transition-colors">
<td className="px-8 py-6">
<span className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-sm">2</span>
</td>
<td className="px-8 py-6">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-sm" data-icon="person">person</span>
</div>
<span className="font-headline font-bold">Elena Rodriguez</span>
</div>
</td>
<td className="px-8 py-6 text-on-surface">9.2 Pts</td>
<td className="px-8 py-6 text-right">
<span className="text-xs font-label bg-primary/10 text-primary px-3 py-1 rounded-full">18% of Panel</span>
</td>
</tr>
<tr className="group hover:bg-surface-bright/30 transition-colors border-l-4 border-primary bg-primary/5">
<td className="px-8 py-6">
<span className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-sm">12</span>
</td>
<td className="px-8 py-6">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center">
<span className="material-symbols-outlined text-sm" data-icon="bolt">bolt</span>
</div>
<span className="font-headline font-bold">You (Alex Chen)</span>
</div>
</td>
<td className="px-8 py-6 text-on-surface">3.8 Pts</td>
<td className="px-8 py-6 text-right">
<span className="text-xs font-label bg-tertiary/10 text-tertiary px-3 py-1 rounded-full">8% of Panel</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</section>
{/* Final Call to Action */}
<section className="py-24 px-8 text-center bg-surface relative overflow-hidden">
<div className="max-w-4xl mx-auto">
<h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-8">Ready to <span className="text-primary">Light Up</span> the Fairway?</h2>
<p className="text-on-surface-variant text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                    Every round counts. Join our upcoming community tournament and double your solar contribution points for the entire weekend.
                </p>
<div className="flex flex-col sm:flex-row items-center justify-center gap-6">
<button className="px-10 py-5 rounded-full bg-gradient-to-r from-primary to-primary-dim text-on-primary font-headline font-extrabold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-all">Sign Up for Tournament</button>
<button className="px-10 py-5 rounded-full border border-outline-variant text-on-surface font-headline font-bold hover:bg-surface-container-high transition-all">Download Impact Guide</button>
</div>
</div>
</section>
</main>
{/* Footer */}
<footer className="bg-[#060e20] w-full py-12 px-8">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
<div className="font-manrope font-bold text-[#dee5ff] text-xl">Fairway Impact</div>
<div className="flex flex-wrap justify-center gap-8">
<a className="font-inter text-sm text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors" href="#">Privacy Policy</a>
<a className="font-inter text-sm text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors" href="#">Terms of Service</a>
<a className="font-inter text-sm text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors" href="#">Impact Report</a>
<a className="font-inter text-sm text-[#dee5ff]/40 hover:text-[#9093ff] transition-colors" href="#">Contact</a>
</div>
<div className="font-inter text-sm text-[#dee5ff]/60">
                © 2024 Fairway Impact. All rights reserved.
            </div>
</div>
</footer>
</>
  );
}
