import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { adminService } from '../services/adminService';
import { supabase } from '../lib/supabase';

export default function Charity() {
  const { user } = useAuth();
  const [charities, setCharities] = useState<any[]>([]);
  const [selectedCharity, setSelectedCharity] = useState<string>('');
  const [percentage, setPercentage] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadCharities();
  }, []);

  const loadCharities = async () => {
    const { data } = await adminService.getCharities();
    setCharities(data || []);
  };

  const handleSave = async () => {
    if (!user || !selectedCharity) {
      setMessage('Please select a charity first.');
      return;
    }
    if (percentage < 10) {
      setMessage('Minimum contribution is 10%');
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('donations')
      .insert({
        user_id: user.id,
        charity_id: selectedCharity,
        percentage
      });

    if (error) {
      setMessage('Failed to save preference: ' + error.message);
    } else {
      setMessage('Donation preference saved successfully!');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 animate-in fade-in duration-1000">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <div className="text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">Allocation Heritage</div>
        <h1 className="text-5xl md:text-6xl font-manrope font-extrabold text-white mb-6 tracking-tighter leading-tight">
          Direct the <span className="text-gradient">Impact</span>
        </h1>
        <p className="text-on-surface-variant font-inter text-lg leading-relaxed">
          Select the sanctuary for your contributions. Every engagement within the archive generates light for those who need it most.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-8">Available Sanctuaries</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {charities.length === 0 ? (
              <div className="col-span-full p-12 rounded-3xl border border-dashed border-outline-variant/20 text-center">
                <p className="text-on-surface-variant font-inter italic">The archive of sanctuaries is currently being updated.</p>
              </div>
            ) : (
              charities.map((charity) => (
                <div 
                  key={charity.id} 
                  className={`group relative p-8 rounded-3xl transition-all duration-500 cursor-pointer overflow-hidden ${
                    selectedCharity === charity.id 
                    ? 'bg-primary/10 border-primary/40 shadow-2xl shadow-primary/20 scale-[1.02]' 
                    : 'bg-surface-container-low border-outline-variant/10 hover:bg-surface-container-high hover:border-primary/20'
                  } border`}
                  onClick={() => setSelectedCharity(charity.id)}
                >
                  {/* Selection Indicator */}
                  <div className={`absolute top-6 right-6 w-5 h-5 rounded-full border-2 transition-all duration-500 ${
                    selectedCharity === charity.id ? 'bg-primary border-primary scale-110' : 'border-outline-variant/30 group-hover:border-primary/50'
                  } flex items-center justify-center`}>
                    {selectedCharity === charity.id && (
                      <svg className="w-3 h-3 text-on-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    )}
                  </div>

                  <h3 className="text-xl font-manrope font-extrabold text-white mb-3 group-hover:text-primary transition-colors">{charity.name}</h3>
                  <p className="text-on-surface-variant text-sm line-clamp-3 mb-8 leading-relaxed font-inter">{charity.description}</p>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Total Legacy</p>
                      <p className="text-lg font-bold text-tertiary tracking-tight">${charity.total_raised?.toLocaleString() || '0'}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card-premium sticky top-28 border-primary/20 shadow-primary/10">
            <h2 className="text-xl font-manrope font-bold text-white mb-2 tracking-tight">Your Contribution</h2>
            <p className="text-on-surface-variant text-xs mb-10 leading-relaxed font-inter">Quantum of impact allocated from your participation.</p>
            
            <div className="mb-12">
              <div className="flex justify-between items-end mb-6">
                <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-bold">Intensity</p>
                <div className="text-3xl font-manrope font-extrabold text-primary tracking-tighter">{percentage}%</div>
              </div>
              
              <div className="relative h-12 flex items-center group">
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  step="5"
                  value={percentage} 
                  onChange={(e) => setPercentage(Number(e.target.value))}
                  className="w-full h-1 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary group-hover:h-1.5 transition-all outline-none"
                />
                {/* Visual marker */}
                <div className="absolute left-0 bottom-0 text-[9px] uppercase tracking-widest text-on-surface-variant/40">10% Min</div>
                <div className="absolute right-0 bottom-0 text-[9px] uppercase tracking-widest text-on-surface-variant/40">100% Max</div>
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded-2xl mb-8 text-xs font-bold uppercase tracking-widest text-center animate-in zoom-in duration-300 ${
                message.includes('success') ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-error/10 text-error border border-error/20'
              }`}>
                {message}
              </div>
            )}

            <Button 
              className="w-full text-xs uppercase tracking-[0.2em] py-5" 
              onClick={handleSave}
              disabled={loading || !selectedCharity}
            >
              {loading ? 'Transmitting...' : 'Commit Preference'}
            </Button>

            <div className="mt-8 flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <p className="text-[10px] text-on-surface-variant leading-relaxed">Changes to your sanctuary allocation will take effect in the next processing cycle.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
