
import React from 'react';
import Countdown from '../components/Countdown';
import { ROUTES } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="relative pt-24 pb-20 overflow-hidden">
      {/* Background Neon Grid Effect */}
      <div className="absolute inset-0 z-[-1] opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#39FF14 1px, transparent 1px), linear-gradient(90deg, #39FF14 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>
      
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#39FF14]/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#39FF14]/5 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-6 text-center">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-block px-4 py-1 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/5 text-[#39FF14] text-xs font-bold tracking-[0.3em] uppercase mb-4 animate-bounce">
            2025 Global Edition • Live
          </div>
          <h1 className="text-6xl md:text-9xl font-bold font-raj tracking-tighter text-white leading-tight">
            ORYN <span className="text-[#39FF14] neon-glow">CUP</span>
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
        <div className="glass-morphism max-w-2xl mx-auto p-12 rounded-3xl border border-[#39FF14]/20 relative group overflow-hidden mb-20">
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

        {/* Rules Section */}
        <div className="mt-32 glass-morphism p-12 rounded-[3rem] border border-white/5 text-left max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <svg className="w-40 h-40 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
          </div>
          <h3 className="text-4xl font-raj font-bold uppercase mb-8 border-l-4 border-[#39FF14] pl-6">Tournament <span className="text-[#39FF14]">Rules</span></h3>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-[#39FF14] font-bold uppercase tracking-widest text-sm">01. Identity Verification</h4>
                <p className="text-gray-400">All voters must authenticate via GitHub OAuth. Only unique developer identities are eligible for voting power.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-[#39FF14] font-bold uppercase tracking-widest text-sm">02. Permanent Lock</h4>
                <p className="text-gray-400">Once a vote is cast, it is immutable and tied to your GitHub profile hash.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-[#39FF14] font-bold uppercase tracking-widest text-sm">03. Gifted Power</h4>
                <p className="text-gray-400">Extra votes obtained through gift packages are manually validated by the Oryn administration.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-[#39FF14] font-bold uppercase tracking-widest text-sm">04. Anti-Cheat</h4>
                <p className="text-gray-400">Farming accounts or botting GitHub identities will result in immediate disqualification and IP blacklisting.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
