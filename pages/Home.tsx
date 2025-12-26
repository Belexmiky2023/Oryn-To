
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
          <Countdown />
        </div>

        {/* CTA Section */}
        <div className="glass-morphism max-w-2xl mx-auto p-12 rounded-3xl border border-[#39FF14]/20 relative">
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

        {/* Prize Preview */}
        <div className="mt-32 space-y-12">
          <h3 className="text-4xl font-raj font-bold uppercase tracking-widest border-b border-gray-800 pb-4 inline-block">
            Tournament <span className="text-[#39FF14]">Prizes</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { rank: '1ST PLACE', prize: '$500 + Custom PC', glow: 'from-yellow-500/20' },
              { rank: '2ND PLACE', prize: '$200 + Plugin Suite', glow: 'from-slate-300/20' },
              { rank: '3RD PLACE', prize: '$100 + VIP Role', glow: 'from-orange-500/20' },
            ].map((item, i) => (
              <div key={i} className={`group glass-morphism p-8 rounded-2xl border border-white/10 hover:border-[#39FF14]/50 transition-all cursor-default overflow-hidden relative`}>
                <div className={`absolute inset-0 bg-gradient-to-tr ${item.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative z-10">
                  <div className="text-5xl font-raj font-bold mb-4">{i + 1}</div>
                  <div className="text-[#39FF14] font-bold tracking-widest mb-2 uppercase">{item.rank}</div>
                  <div className="text-2xl font-raj text-white">{item.prize}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
