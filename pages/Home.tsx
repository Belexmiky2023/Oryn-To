
import React from 'react';
import Countdown from '../components/Countdown';
import { ROUTES } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="relative pt-24 pb-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#39FF14]/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#39FF14]/5 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-6 text-center">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-block px-4 py-1 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/5 text-[#39FF14] text-xs font-bold tracking-[0.3em] uppercase mb-4 animate-bounce">
            2025 Global Edition
          </div>
          <h1 className="text-6xl md:text-9xl font-bold font-raj tracking-tighter text-white leading-tight">
            ARYAN <span className="text-[#39FF14]">CUP</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto">
            The ultimate battleground for elite video editors. Witness pure motion artistry.
          </p>
        </div>

        {/* Countdown */}
        <div className="flex justify-center my-16">
          <div className="relative">
            <div className="absolute inset-0 bg-[#39FF14]/10 blur-[40px] rounded-full"></div>
            <Countdown />
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-morphism max-w-2xl mx-auto p-12 rounded-3xl border border-[#39FF14]/20 relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#39FF14]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#39FF14] text-black font-bold text-xs rounded uppercase">
            Join the fray
          </div>
          <h2 className="text-3xl font-raj font-bold mb-6 italic">
            "Want to register and want to see your edit and want to win?"
          </h2>
          <a 
            href="https://forms.gle/UWnLvPZRE4Q2kKS96" 
            target="_blank" 
            rel="noopener noreferrer"
            className="neon-button inline-block px-12 py-4 rounded-xl font-bold text-lg tracking-widest uppercase transition-all"
          >
            Register Here
          </a>
        </div>

        {/* Prize Preview Section */}
        <div className="mt-32 space-y-16">
          <div className="space-y-4">
            <h3 className="text-4xl md:text-6xl font-raj font-bold uppercase tracking-widest text-white">
              Tournament <span className="text-[#39FF14] neon-glow">Rewards</span>
            </h3>
            <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Exclusively for the top 3 editors</p>
          </div>

          <div className="max-w-6xl mx-auto space-y-12">
            {/* 1st Place - Featured Card */}
            <div className="glass-morphism p-12 rounded-[2.5rem] border-2 border-[#39FF14]/40 relative group overflow-hidden max-w-3xl mx-auto">
              <div className="absolute inset-0 bg-[#39FF14]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex flex-col items-center">
                {/* Diamond Icon */}
                <div className="w-24 h-24 mb-6 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[#39FF14] blur-[30px] opacity-40 animate-pulse"></div>
                  <svg className="w-16 h-16 text-[#39FF14] filter drop-shadow-[0_0_10px_#39FF14]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3h12l4 9-10 9L2 12l4-9z" />
                    <path d="M11 3l-4 9 5 9 5-9-4-9" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                
                <div className="text-[#39FF14] font-bold tracking-[0.4em] uppercase text-sm mb-2">Grand Champion</div>
                <h4 className="text-6xl font-raj font-bold text-white mb-8 tracking-tighter uppercase">1ST PLACE</h4>
                
                <div className="space-y-3 text-xl font-raj text-gray-300 w-full max-w-md">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2 hover:text-[#39FF14] transition-colors">
                    <span>25 Telegram Stars</span>
                    <span className="text-[#39FF14] font-bold">✓</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2 hover:text-[#39FF14] transition-colors">
                    <span>AE & AM Private Assets</span>
                    <span className="text-[#39FF14] font-bold">✓</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2 hover:text-[#39FF14] transition-colors">
                    <span>75+ Motion PFPs</span>
                    <span className="text-[#39FF14] font-bold">✓</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2 hover:text-[#39FF14] transition-colors">
                    <span>Premium Editing Pack</span>
                    <span className="text-[#39FF14] font-bold">✓</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2nd & 3rd Place Grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="glass-morphism p-10 rounded-[2rem] border border-white/10 hover:border-[#39FF14]/40 transition-all text-left">
                <div className="text-3xl font-raj font-bold text-gray-400 mb-2 uppercase italic">2ND PLACE</div>
                <h5 className="text-2xl font-raj font-bold text-white mb-6 uppercase tracking-tight">Silver Competitor</h5>
                <ul className="space-y-3 text-gray-400 font-raj text-lg">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]"></div>
                    <span>75+ Premium Pfps</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]"></div>
                    <span>Premium Editing Pack</span>
                  </li>
                </ul>
              </div>

              <div className="glass-morphism p-10 rounded-[2rem] border border-white/10 hover:border-[#39FF14]/40 transition-all text-left">
                <div className="text-3xl font-raj font-bold text-gray-400 mb-2 uppercase italic">3RD PLACE</div>
                <h5 className="text-2xl font-raj font-bold text-white mb-6 uppercase tracking-tight">Bronze Competitor</h5>
                <ul className="space-y-3 text-gray-400 font-raj text-lg">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]"></div>
                    <span>Full Editing Pack</span>
                  </li>
                  <li className="flex items-center space-x-2 opacity-50">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                    <span>More coming soon...</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
