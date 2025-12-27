
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../constants';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-3 glass-morphism' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to={ROUTES.HOME} className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#39FF14] flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-transform group-hover:scale-110">
            <span className="text-black font-bold text-2xl font-raj">O</span>
          </div>
          <span className="font-raj font-bold text-2xl tracking-tighter text-white">
            ORYN<span className="text-[#39FF14] transition-opacity group-hover:opacity-80">SERVER</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          {[
            { name: 'Home', path: ROUTES.HOME },
            { name: 'Vote', path: ROUTES.VOTE },
            { name: 'Gift', path: ROUTES.GIFT },
            { name: 'Rate', path: ROUTES.RATE },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-raj text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:text-[#39FF14] relative group ${isActive(item.path) ? 'text-[#39FF14] neon-glow' : 'text-gray-400'}`}
            >
              {item.name}
              <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#39FF14] transition-transform duration-300 ${isActive(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}></span>
            </Link>
          ))}
          
          {user && user.role === 'admin' && (
            <Link 
              to={ROUTES.ADMIN} 
              className={`font-raj text-sm font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors ${isActive(ROUTES.ADMIN) ? 'opacity-100' : 'opacity-60'}`}
            >
              Terminal
            </Link>
          )}
          
          <div className="h-6 w-px bg-white/10 mx-2"></div>
          
          {user ? (
            <div className="flex items-center space-x-5">
              <div className="flex flex-col items-end">
                <span className="text-white font-raj font-bold text-sm leading-none">{user.name}</span>
                <button 
                  onClick={onLogout} 
                  className="text-[9px] text-gray-500 hover:text-[#39FF14] uppercase tracking-widest transition-colors mt-1 font-bold"
                >
                  Terminate Session
                </button>
              </div>
              <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full border-2 border-[#39FF14]/30 p-0.5" />
            </div>
          ) : (
            <Link to={ROUTES.VOTE} className="neon-button px-8 py-2.5 rounded-full font-bold text-xs tracking-[0.2em] uppercase">
              Authenticate
            </Link>
          )}
        </div>
        
        {/* Mobile Mini Nav */}
        <div className="md:hidden flex items-center space-x-4">
           {user && <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full border border-[#39FF14]/30" />}
           <Link to={ROUTES.VOTE} className="text-[#39FF14]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
           </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
