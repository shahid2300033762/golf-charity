import { useNavigate } from 'react-router-dom';
import { useState, useMemo, memo } from 'react';

const CHARITIES_DATA = [
  {
    id: 'reforest-project',
    name: 'The Reforest Project',
    category: 'Environment',
    description: 'Restoring lost ecosystems through tech-enabled reforestation across the Amazon basin and Sub-Saharan Africa.',
    image: '/images/success_amazon.png',
    progress: 78,
    impactGoal: '1M Trees',
    color: 'primary'
  },
  {
    id: 'global-scholars-fund',
    name: 'Global Scholars Fund',
    category: 'Education',
    description: 'Providing digital infrastructure and specialized teacher training to remote communities in South-East Asia.',
    image: '/images/success_classroom.png',
    progress: 42,
    impactGoal: '50 Schools',
    color: 'tertiary'
  },
  {
    id: 'clean-water-alliance',
    name: 'Clean Water Alliance',
    category: 'Health',
    description: 'Deploying solar-powered filtration systems to provide sustainable clean drinking water to over 200,000 families.',
    image: '/images/success_clean_water.png',
    progress: 91,
    impactGoal: '200k Units',
    color: 'error'
  }
];

// Memoized Charity Card for performance
const CharityCard = memo(({ charity, isSelected, onSelect, navigate }: any) => (
  <div 
    key={charity.id}
    className={`group relative rounded-[2rem] overflow-hidden transition-all duration-500 hover:scale-[1.02] transform-gpu ${
      isSelected ? 'ring-2 ring-primary ring-offset-4 ring-offset-[#060e20]' : ''
    }`}
  >
    {/* Image Container */}
    <div className="h-[400px] relative overflow-hidden">
      <img 
        src={charity.image || `https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop`} 
        alt={charity.name}
        loading="lazy"
        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-[#060e20]/20 to-transparent"></div>
      
      {/* Category Badge */}
      <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-bright/80 backdrop-blur-md border border-white/10">
        <div className={`w-1.5 h-1.5 rounded-full ${
          charity.category === 'Environment' ? 'bg-primary' : charity.category === 'Education' ? 'bg-tertiary' : 'bg-success'
        }`}></div>
        <span className="text-[10px] font-black text-on-surface tracking-widest uppercase">{charity.category}</span>
      </div>
    </div>

    {/* Content Overlay */}
    <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end">
      <h3 className="text-3xl font-manrope font-extrabold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">{charity.name}</h3>
      <p className="text-on-surface-variant text-sm mb-6 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
        {charity.description}
      </p>
      
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => onSelect(charity.id)}
          className={`py-4 rounded-xl font-manrope font-black text-[10px] uppercase tracking-[0.25em] transition-all duration-500 ${
            isSelected 
              ? 'bg-primary text-on-primary-container shadow-[0_0_30px_rgba(144,147,255,0.4)]' 
              : 'bg-white/5 text-white/40 border border-white/10 group-hover:bg-primary group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_0_30px_rgba(144,147,255,0.3)]'
          }`}
        >
          {isSelected ? '✓ Selected' : 'Select'}
        </button>
        <button 
          onClick={() => navigate(`/charities/${charity.id}`)}
          className="py-4 rounded-xl font-manrope font-black text-[10px] uppercase tracking-[0.25em] transition-all duration-500 bg-surface-bright/20 text-white/80 border border-white/10 hover:bg-tertiary hover:text-white hover:border-transparent"
        >
          Read Story
        </button>
      </div>
    </div>
  </div>
));

export default function Charities() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCharity, setSelectedCharity] = useState<string | null>(null);

  const categories = ['All', 'Environment', 'Education', 'Health'];

  const filteredCharities = useMemo(() => {
    return CHARITIES_DATA.filter(charity => {
      const matchesCategory = selectedCategory === 'All' || charity.category === selectedCategory;
      const matchesSearch = charity.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           charity.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <>
    <main className="pt-32 pb-24 px-12 max-w-[1440px] mx-auto">
      {/* Hero Section */}
      <header className="mb-20">
        <div className="uppercase tracking-[0.2em] text-primary font-semibold mb-4 text-xs">The Luminescent Archive</div>
        <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl leading-tight">
          Direct Your Impact Through the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">Power of Play</span>
        </h1>
        <p className="text-on-surface-variant text-xl max-w-2xl leading-relaxed">
          Every swing you take contributes to global change. Browse our curated selection of high-impact charities and choose where your legacy begins.
        </p>
      </header>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-6 mb-12 py-6 border-b border-outline-variant/20">
        <div className="flex gap-4">
          {categories.map(category => (
            <button 
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all border ${
                selectedCategory === category 
                ? 'bg-surface-container-high text-on-surface border-outline-variant/50' 
                : 'bg-transparent text-on-surface-variant border-transparent hover:text-on-surface'
              }`}
            >
              {category === 'All' ? 'All Causes' : category}
            </button>
          ))}
        </div>
        <div className="relative min-w-[300px]">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input 
            className="w-full bg-surface-container-low border-b border-outline-variant/30 focus:border-tertiary focus:ring-0 text-on-surface py-3 pl-12 pr-4 transition-all outline-none" 
            placeholder="Search charities..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Charity Gallery */}
      {filteredCharities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCharities.map((charity) => (
            <CharityCard 
              key={charity.id} 
              charity={charity} 
              navigate={navigate}
              isSelected={selectedCharity === charity.id}
              onSelect={setSelectedCharity}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-surface-container-low rounded-3xl border border-dashed border-outline-variant/30">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4 inline-block">search_off</span>
          <h3 className="text-xl font-bold text-on-surface mb-2">No matching causes found</h3>
          <p className="text-on-surface-variant">Try adjusting your search terms or category filters.</p>
        </div>
      )}

      {/* Featured Story / Call to Action */}
      <section className="mt-24 rounded-3xl p-12 overflow-hidden relative" style={{background: 'rgba(8, 19, 41, 0.6)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)'}}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="uppercase tracking-[0.2em] text-tertiary font-bold mb-6 text-xs">Impact Spotlight</div>
            <h2 className="font-headline text-4xl font-extrabold mb-6 leading-tight">Every 50 Points Earned Helps Fund a Solar Panel</h2>
            <p className="text-on-surface-variant text-lg mb-10 leading-relaxed">Our platform ensures that your performance on the green translates directly into sustainable energy for communities in need. Track your progress in real-time and see the light you're bringing to the world.</p>
            <div className="flex gap-4">
              <button className="px-10 py-4 rounded-full bg-gradient-to-r from-primary to-primary-dim text-on-primary-container font-bold shadow-xl">Start Your Impact</button>
              <button onClick={() => navigate('/charities/solar-impact')} className="px-10 py-4 rounded-full bg-surface-container-highest border border-outline-variant/30 text-on-surface font-bold hover:bg-surface-bright transition-colors">Read Full Story</button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-outline-variant/20">
              <img className="w-full h-full object-cover" alt="Solar panels at sunset" src="/images/success_solar_hero.png"/>
            </div>
            <div className="absolute -bottom-8 -left-8 bg-surface-bright p-6 rounded-2xl border border-outline-variant/20 shadow-2xl max-w-[200px]">
              <div className="text-tertiary font-bold text-3xl mb-1">12,400+</div>
              <div className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">Panels Installed</div>
            </div>
          </div>
        </div>
        {/* Decorative Light Leak */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
      </section>
    </main>

    {/* Footer */}
    <footer className="w-full border-t border-[#9093ff]/10 bg-[#060e20]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-20 py-24 w-full">
        <div className="space-y-6">
          <div className="font-headline text-lg font-bold text-[#dee5ff]">Golf Charity</div>
          <p className="text-sm text-[#dee5ff]/60 leading-relaxed">
            Elevating the game of golf into a platform for global change. Join the elite network of players who play for a purpose greater than the score.
          </p>
          <div className="flex gap-4">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-sm">public</span>
            </span>
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-sm">group</span>
            </span>
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-sm">alternate_email</span>
            </span>
          </div>
        </div>
        <div className="space-y-6">
          <div className="font-headline text-sm font-bold text-on-surface uppercase tracking-widest">Platform</div>
          <ul className="space-y-4 text-sm text-[#dee5ff]/50">
            <li className="hover:text-[#9093ff] transition-colors duration-300 cursor-pointer">Impact Report</li>
            <li className="hover:text-[#9093ff] transition-colors duration-300 cursor-pointer">Partner With Us</li>
            <li className="hover:text-[#9093ff] transition-colors duration-300 cursor-pointer">The Scoreboard</li>
            <li className="hover:text-[#9093ff] transition-colors duration-300 cursor-pointer">Exclusive Events</li>
          </ul>
        </div>
        <div className="space-y-6">
          <div className="font-headline text-sm font-bold text-on-surface uppercase tracking-widest">Support</div>
          <ul className="space-y-4 text-sm text-[#dee5ff]/50">
            <li className="hover:text-[#9093ff] transition-colors duration-300 cursor-pointer">Contact Support</li>
            <li className="hover:text-[#9093ff] transition-colors duration-300 cursor-pointer">Terms of Service</li>
            <li className="hover:text-[#9093ff] transition-colors duration-300 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-[#9093ff] transition-colors duration-300 cursor-pointer">Help Center</li>
          </ul>
        </div>
        <div className="space-y-6">
          <div className="font-headline text-sm font-bold text-on-surface uppercase tracking-widest">Newsletter</div>
          <p className="text-sm text-[#dee5ff]/50">Receive monthly impact summaries and tournament invites.</p>
          <div className="relative">
            <input className="w-full bg-surface-container-low border-b border-outline-variant/30 py-3 text-sm focus:border-primary outline-none transition-colors" placeholder="Email Address" type="email"/>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-primary font-bold text-xs uppercase tracking-widest">Join</button>
          </div>
        </div>
      </div>
      <div className="px-20 py-8 border-t border-outline-variant/10 text-center">
        <p className="text-sm text-[#dee5ff]/60">© 2024 Golf Charity. The Luminescent Archive of Giving.</p>
      </div>
    </footer>
    </>
  );
}
