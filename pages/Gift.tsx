
import React, { useState } from 'react';
import { GIFT_PACKAGES, COLORS } from '../constants';
import { User, Transaction } from '../types';
import { db } from '../db';

interface GiftProps {
  user: User | null;
}

const Gift: React.FC<GiftProps> = ({ user }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<typeof GIFT_PACKAGES[0] | null>(null);

  const handleConfirm = () => {
    if (!user || !selectedPackage) return;

    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userEmail: user.email,
      stars: selectedPackage.stars,
      votes: selectedPackage.votes,
      status: 'pending',
      timestamp: Date.now(),
    };

    const txs = db.getTransactions();
    db.saveTransactions([...txs, newTx]);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-6 pt-32 pb-20 text-center animate-fade-in flex items-center justify-center min-h-[70vh]">
        <div className="max-w-md w-full glass-morphism p-12 rounded-[2.5rem] border border-[#39FF14]/40 shadow-[0_0_60px_rgba(57,255,20,0.15)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#39FF14] to-transparent"></div>
          
          <div className="w-24 h-24 bg-[#39FF14] rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_30px_#39FF14]">
            <svg className="w-14 h-14 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-6xl font-raj font-bold mb-6 uppercase tracking-tighter">Done</h2>
          
          <p className="text-gray-400 mb-10 leading-relaxed font-medium">
            If your transaction is not applied within 24 hours, please DM us.
          </p>
          
          <a 
            href="https://t.me/oryn179" 
            target="_blank" 
            rel="noopener noreferrer"
            className="neon-button block w-full py-5 rounded-2xl font-bold uppercase tracking-[0.25em] text-sm shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
          >
            INBOX ADMIN
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 pt-32 pb-20 max-w-6xl">
      <div className="text-center mb-20 space-y-4">
        <h1 className="text-6xl md:text-7xl font-raj font-bold uppercase tracking-tighter mb-4">
          Gift <span className="text-[#39FF14]">Votes</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Support your favorite editors by purchasing additional voting power through Telegram stars.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
        {GIFT_PACKAGES.map((pkg) => (
          <div 
            key={pkg.id} 
            onClick={() => setSelectedPackage(pkg)}
            className={`cursor-pointer group glass-morphism p-12 rounded-[2rem] border transition-all duration-500 relative overflow-hidden flex flex-col items-center ${
              selectedPackage?.id === pkg.id ? 'border-[#39FF14] shadow-[0_0_40px_rgba(57,255,20,0.25)] bg-[#39FF14]/5 scale-[1.02]' : 'border-white/5 hover:border-[#39FF14]/40 hover:bg-white/5'
            }`}
          >
            {selectedPackage?.id === pkg.id && (
              <div className="absolute top-6 right-6 bg-[#39FF14] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-[0_0_10px_#39FF14]">Selected</div>
            )}
            
            <div className={`text-6xl font-raj font-bold mb-4 transition-transform duration-500 ${selectedPackage?.id === pkg.id ? 'text-[#39FF14] scale-110 neon-glow' : 'text-gray-300'}`}>
              {pkg.stars} ⭐
            </div>
            
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6"></div>
            
            <div className="text-5xl font-raj font-bold tracking-tight mb-2">{pkg.votes} VOTES</div>
            <div className="text-[#39FF14]/50 uppercase tracking-[0.3em] text-[10px] font-bold">Premium Boost</div>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto glass-morphism p-10 rounded-[2rem] border border-white/10 space-y-10 relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#39FF14]/5 rounded-full blur-[80px]"></div>
        
        <div className="space-y-4 relative z-10">
          <div className="flex items-center space-x-3">
             <div className="w-2 h-2 bg-[#39FF14] rounded-full"></div>
             <h3 className="font-bold uppercase tracking-[0.2em] text-xs text-gray-500">Payment Protocol</h3>
          </div>
          <p className="text-white font-raj text-3xl italic leading-tight">
            "Send the number of stars you want to <span className="text-[#39FF14] underline decoration-[#39FF14]/30">@Oryn179</span> on Telegram"
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
          <a 
            href="https://t.me/oryn179" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 neon-button text-center py-5 rounded-2xl font-bold uppercase tracking-widest text-xs"
          >
            Open Telegram
          </a>
          <button 
            disabled={!user || !selectedPackage}
            onClick={handleConfirm}
            className={`flex-1 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all duration-300 ${
              !user || !selectedPackage ? 'bg-gray-900 text-gray-700 cursor-not-allowed border border-white/5' : 'bg-white text-black hover:bg-[#39FF14] hover:text-black hover:shadow-[0_0_20px_#39FF14]'
            }`}
          >
            Confirm & Log Payment
          </button>
        </div>
        
        {!user && (
          <p className="text-center text-[10px] text-red-500/80 font-bold uppercase tracking-widest animate-pulse">
            Authentication Required to process confirmation
          </p>
        )}
      </div>
    </div>
  );
};

export default Gift;
