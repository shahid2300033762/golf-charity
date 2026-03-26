import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

export function Navbar() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#081329]/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] bg-gradient-to-b from-[#101e3e]/20 to-transparent">
      <div className="flex justify-between items-center w-full px-12 py-4 max-w-none">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-[#9093ff] font-manrope">Golf Charity</Link>
        <div className="hidden md:flex items-center space-x-8">
          {[
            { name: 'Home', path: '/' },
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'Charities', path: '/charities' },
            { name: 'Scores', path: '/scores' },
            { name: 'Draws', path: '/draws' },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `font-manrope tracking-wide uppercase text-xs font-black transition-colors duration-200 ease-in-out transform hover:scale-[1.02] ${
                  isActive
                    ? 'text-[#9093ff] border-b-2 border-[#9093ff] pb-1'
                    : 'text-[#dee5ff]/70 hover:text-[#dee5ff]'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          {user?.role === 'admin' && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `font-manrope tracking-wide uppercase text-xs font-black transition-colors duration-200 ease-in-out transform hover:scale-[1.02] ${
                  isActive
                    ? 'text-[#9093ff] border-b-2 border-[#9093ff] pb-1'
                    : 'text-[#dee5ff]/40 bg-primary/10 px-3 py-1 rounded-md border border-primary/20 hover:text-primary hover:bg-primary/20'
                }`
              }
            >
              Admin Command
            </NavLink>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {!isLoading && !user ? (
            <>
              <Link to="/login" className="px-6 py-2 rounded-full font-manrope tracking-wide uppercase text-xs font-black text-[#dee5ff]/70 hover:bg-[#172b54]/50 transition-all duration-300">Sign In</Link>
              <Link to="/signup" className="px-6 py-2 rounded-full font-manrope tracking-wide uppercase text-xs font-black bg-gradient-to-r from-primary to-primary-dim text-on-primary-container shadow-lg hover:scale-[1.02] transition-all duration-200">Join Club</Link>
            </>
          ) : !isLoading && user ? (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-xl">person</span>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-[10px] font-black text-[#9093ff] uppercase tracking-widest leading-none mb-1">Member</p>
                  <p className="text-xs font-bold text-white leading-none">{user.name}</p>
                </div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="p-2 h-10 w-10 flex items-center justify-center rounded-full border border-error/30 text-error/70 hover:bg-error hover:text-white transition-all duration-300 group"
                title="Logout"
              >
                <span className="material-symbols-outlined text-xl">logout</span>
              </button>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full border-2 border-[#9093ff]/20 border-t-[#9093ff] animate-spin"></div>
          )}
        </div>
      </div>
    </nav>
  );
}
