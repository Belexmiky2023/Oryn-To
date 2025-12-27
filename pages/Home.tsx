
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

        {/* Prize Preview Section */}
        <div className="mt-32 space-y-16">
          <div className="space-y-4">
            <h3 className="text-4xl md:text-6xl font-raj font-bold uppercase tracking-widest text-white">
              Tournament <span className="text-[#39FF14] neon-glow">Rewards</span>
            </h3>
            <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Exclusive High-Tier Loot</p>
          </div>

          <div className="max-w-6xl mx-auto space-y-12">
            {/* 1st Place - Diamond Tier */}
            <div className="glass-morphism p-12 rounded-[2.5rem] border-2 border-[#39FF14]/40 relative group overflow-hidden max-w-3xl mx-auto transform transition-all hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/10 to-transparent"></div>
              <div className="relative z-10 flex flex-col items-center">
                {/* Centered Diamond Icon */}
                <div className="w-32 h-32 mb-8 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[#39FF14] blur-[40px] opacity-50 animate-pulse"></div>
                  <svg className="w-20 h-20 text-[#39FF14] filter drop-shadow-[0_0_15px_#39FF14]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3h12l4 9-10 9L2 12l4-9z" />
                    <path d="M11 3l-4 9 5 9 5-9-4-9" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                
                <div className="text-[#39FF14] font-bold tracking-[0.5em] uppercase text-sm mb-2">Grand Champion Tier</div>
                <h4 className="text-6xl font-raj font-bold text-white mb-8 tracking-tighter uppercase">1ST PLACE</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg font-raj text-gray-300 w-full px-4">
                  {[
                    "25 Telegram Stars",
                    "AE and AM Stuff",
                    "75+ Pfps",
                    "Premium Editing Pack",
                    "VIP Server Role",
                    "Exclusive Channel Access"
                  ].map((prize, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-2 hover:text-[#39FF14] transition-colors">
                      <span className="text-left">{prize}</span>
                      <span className="text-[#39FF14] font-bold">✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2nd & 3rd Place Grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="glass-morphism p-10 rounded-[2rem] border border-white/10 hover:border-[#39FF14]/40 transition-all text-left group">
                <div className="text-3xl font-raj font-bold text-gray-400 mb-2 uppercase italic group-hover:text-white transition-colors">2ND PLACE</div>
                <h5 className="text-2xl font-raj font-bold text-white mb-6 uppercase tracking-tight">Silver Competitor</h5>
                <ul className="space-y-4 text-gray-400 font-raj text-lg">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-[#39FF14]"></div>
                    <span>75+ pfp</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-[#39FF14]"></div>
                    <span>Premium EDITING Pack</span>
                  </li>
                </ul>
              </div>

              <div className="glass-morphism p-10 rounded-[2rem] border border-white/10 hover:border-[#39FF14]/40 transition-all text-left group">
                <div className="text-3xl font-raj font-bold text-gray-400 mb-2 uppercase italic group-hover:text-white transition-colors">3RD PLACE</div>
                <h5 className="text-2xl font-raj font-bold text-white mb-6 uppercase tracking-tight">Bronze Competitor</h5>
                <ul className="space-y-4 text-gray-400 font-raj text-lg">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-[#39FF14]"></div>
                    <span>Editing Pack</span>
                  </li>
                  <li className="flex items-center space-x-3 opacity-50">
                    <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                    <span>Certificate of Honor</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Live Leaderboard Feature */}
        <div className="mt-32 max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <h3 className="text-3xl font-raj font-bold uppercase tracking-tight">Live <span className="text-[#39FF14]">Standings</span></h3>
            <span className="text-[10px] text-[#39FF14] font-bold uppercase tracking-widest animate-pulse">Updated Real-Time</span>
          </div>
          <div className="space-y-3 text-left">
            {[
              { rank: 1, name: 'Ghost Vfx', score: 210, trend: 'up' },
              { rank: 2, name: 'Zade FX', score: 124, trend: 'steady' },
              { rank: 3, name: 'Nebula Edits', score: 89, trend: 'down' }
            ].map((entry) => (
              <div key={entry.rank} className="glass-morphism p-4 px-6 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-[#39FF14]/20 transition-all">
                <div className="flex items-center space-x-6">
                  <span className={`text-2xl font-raj font-bold ${entry.rank === 1 ? 'text-[#39FF14]' : 'text-gray-500'}`}>0{entry.rank}</span>
                  <span className="text-xl font-raj font-bold text-white">{entry.name}</span>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="text-right">
                    <div className="text-xs text-gray-600 uppercase font-bold">Total Votes</div>
                    <div className="text-xl font-raj font-bold text-[#39FF14]">{entry.score}</div>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${entry.trend === 'up' ? 'text-green-500' : entry.trend === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
                    {entry.trend === 'up' ? '▲' : entry.trend === 'down' ? '▼' : '●'}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                <p className="text-gray-400">All voters must authenticate via Magic Link. Only unique, non-suspicious email identities are eligible for voting power.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-[#39FF14] font-bold uppercase tracking-widest text-sm">02. Permanent Lock</h4>
                <p className="text-gray-400">Once a vote is cast, it is immutable. You cannot change your vote for another editor after submission.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-[#39FF14] font-bold uppercase tracking-widest text-sm">03. Gifted Power</h4>
                <p className="text-gray-400">Extra votes obtained through gift packages are applied within 24 hours of admin verification on Telegram.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-[#39FF14] font-bold uppercase tracking-widest text-sm">04. Anti-Cheat</h4>
                <p className="text-gray-400">Any attempt to manipulate the vote count using automated scripts will result in immediate DQ and IP ban.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
