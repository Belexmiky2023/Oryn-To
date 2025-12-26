
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES, COLORS } from '../constants';
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2 glass-morphism' : 'py-4 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to={ROUTES.HOME} className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[#39FF14] flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.5)]">
            <span className="text-black font-bold text-xl">O</span>
          </div>
          <span className="font-raj font-bold text-2xl tracking-tighter text-white">
            ORYN<span className="text-[#39FF14]">SERVER</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {[
            { name: 'Home', path: ROUTES.HOME },
            { name: 'Vote', path: ROUTES.VOTE },
            { name: 'Gift', path: ROUTES.GIFT },
            { name: 'Rate Us', path: ROUTES.RATE },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-medium transition-all duration-200 hover:text-[#39FF14] ${isActive(item.path) ? 'text-[#39FF14] neon-glow' : 'text-gray-400'}`}
            >
              {item.name}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center space-x-4 border-l border-gray-800 pl-8">
              <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full border border-[#39FF14]/30" />
              <button onClick={onLogout} className="text-sm text-gray-500 hover:text-white transition-colors">Sign Out</button>
            </div>
          ) : (
            <Link to={ROUTES.VOTE} className="neon-button px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase">
              Login to Vote
            </Link>
          )}
        </div>
        
        {/* Mobile menu toggle would go here */}
      </div>
    </nav>
  );
};

export default Navbar;
