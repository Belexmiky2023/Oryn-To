
import React, { useEffect, useState } from 'react';
import { Editor, User } from '../types';
import { db } from '../db';

interface VoteProps {
  user: User | null;
  onLogin: (email: string) => Promise<void>;
}

const Vote: React.FC<VoteProps> = ({ user, onLogin }) => {
  const [editors, setEditors] = useState<Editor[]>([]);
  const [votedId, setVotedId] = useState<string | null>(null);
  const [isCasting, setIsCasting] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    setEditors(db.getEditors());
    if (user?.votedForId) {
      setVotedId(user.votedForId);
    }
  }, [user]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setLoginError('Please enter a valid email address');
      return;
    }

    setIsLoggingIn(true);
    setLoginError('');
    try {
      await onLogin(email);
    } catch (err) {
      setLoginError('Failed to send magic link. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleVote = (editorId: string) => {
    if (!user || votedId || isCasting) return;

    setIsCasting(true);
    
    setTimeout(() => {
      const updatedEditors = editors.map(e => 
        e.id === editorId ? { ...e, votes: e.votes + 1 } : e
      );
      setEditors(updatedEditors);
      db.saveEditors(updatedEditors);

      const users = db.getUsers();
      const updatedUsers = users.map(u => 
        u.id === user.id ? { ...u, votedForId: editorId } : u
      );
      db.saveUsers(updatedUsers);
      
      setVotedId(editorId);
      setIsCasting(false);
      
      const updatedUser = { ...user, votedForId: editorId };
      localStorage.setItem('oryn_current_user', JSON.stringify(updatedUser));
    }, 1200);
  };

  return (
    <div className="container mx-auto px-6 pt-32 pb-20 max-w-7xl">
      <div className="text-center mb-20 space-y-6">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <div className="h-px w-12 bg-[#39FF14]/30"></div>
          <span className="text-xs text-[#39FF14] font-bold tracking-[0.4em] uppercase">Secure Voting Active</span>
          <div className="h-px w-12 bg-[#39FF14]/30"></div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-raj font-bold uppercase tracking-tighter leading-none">
          CHOOSE YOUR <span className="text-[#39FF14] neon-glow">CHAMPION</span>
        </h1>
        
        <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
          One vote per secure account. Identity verified via <span className="text-[#39FF14] font-bold">Magic Link</span> technology.
        </p>
        
        {!user && (
          <div className="flex flex-col items-center pt-10 animate-fade-in max-w-md mx-auto w-full">
            <form onSubmit={handleEmailLogin} className="w-full space-y-4">
              <div className="relative group">
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#39FF14] focus:outline-none transition-all placeholder:text-gray-600"
                  disabled={isLoggingIn}
                />
                <div className="absolute inset-0 rounded-2xl bg-[#39FF14]/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
              </div>
              
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full neon-button py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-sm flex items-center justify-center space-x-3"
              >
                {isLoggingIn ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-[#39FF14]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending Link...</span>
                  </>
                ) : (
                  <span>Send Magic Link</span>
                )}
              </button>
            </form>
            
            {loginError && <p className="text-red-500 text-xs mt-4 font-bold uppercase tracking-widest">{loginError}</p>}
            
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.5em] font-bold mt-8">
              No Password Required • Passwordless Security
            </p>
          </div>
        )}

        {user && (
          <div className="inline-flex items-center px-6 py-3 rounded-2xl glass-morphism border border-[#39FF14]/30 mt-6 group transition-all hover:bg-[#39FF14]/5">
            <img src={user.picture} className="w-8 h-8 rounded-full border border-[#39FF14]/50 mr-4" />
            <div className="text-left">
              <p className="text-[#39FF14] font-raj font-bold text-lg leading-none">
                Authenticated: <span className="text-white">{user.name}</span>
              </p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                {votedId ? 'Status: Vote Transmitted & Locked' : 'Status: Ready for Selection'}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {editors.map((editor) => (
          <div 
            key={editor.id} 
            className={`group glass-morphism rounded-[2.5rem] overflow-hidden border transition-all duration-500 flex flex-col relative ${
              votedId === editor.id 
                ? 'border-[#39FF14] shadow-[0_0_50px_rgba(57,255,20,0.15)] scale-[1.03] animate-vote-success' 
                : 'border-white/5 hover:border-[#39FF14]/50 hover:-translate-y-2'
            }`}
          >
            {votedId === editor.id && <div className="success-beam"></div>}
            
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={editor.thumbnail} 
                alt={editor.name} 
                className={`w-full h-full object-cover transition-all duration-700 ${
                  votedId === editor.id ? 'grayscale-0 scale-105' : 'grayscale-[0.6] group-hover:grayscale-0 group-hover:scale-110'
                }`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              
              {votedId === editor.id && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="bg-[#39FF14] text-black font-raj font-bold text-xl px-8 py-2 rounded-full uppercase tracking-widest rotate-[-5deg] shadow-[0_0_30px_#39FF14] animate-bounce">
                    Confirmed
                  </div>
                </div>
              )}

              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                   <h3 className="text-3xl font-raj font-bold text-white uppercase tracking-tighter leading-none group-hover:text-[#39FF14] transition-colors">
                    {editor.name}
                  </h3>
                </div>
                <div className={`px-4 py-1.5 glass-morphism rounded-full border flex items-center space-x-2 transition-colors ${
                  votedId === editor.id ? 'border-[#39FF14] bg-[#39FF14]/10' : 'border-[#39FF14]/40'
                }`}>
                  <span className={`w-2 h-2 rounded-full bg-[#39FF14] ${votedId === editor.id ? 'animate-ping' : 'animate-pulse'}`}></span>
                  <span className="text-[#39FF14] font-bold font-raj text-sm tracking-widest">{editor.votes} VOTES</span>
                </div>
              </div>
            </div>
            
            <div className="p-8 pt-6 space-y-6 flex-grow flex flex-col justify-between relative z-10">
              <p className="text-gray-500 text-sm italic line-clamp-2">
                Expert in kinetic typography and seamless transition sequences. Watch the full edit to see the artistry.
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => window.open(editor.videoUrl, '_blank')}
                  className="w-full py-2.5 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:border-white/30 transition-all"
                >
                  Watch Preview
                </button>
                
                <button
                  disabled={!user || !!votedId || isCasting}
                  onClick={() => handleVote(editor.id)}
                  className={`w-full py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-sm transition-all duration-500 relative overflow-hidden group ${
                    votedId === editor.id 
                      ? 'bg-[#39FF14] text-black shadow-[0_10px_30px_rgba(57,255,20,0.4)]' 
                      : !!votedId
                      ? 'bg-gray-900 text-gray-700 cursor-not-allowed border border-white/5 opacity-50'
                      : !user
                      ? 'bg-gray-900 text-gray-700 cursor-not-allowed border border-white/5 opacity-50'
                      : 'neon-button'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isCasting ? (
                      <span className="flex items-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Transmitting</span>
                      </span>
                    ) : (
                      votedId === editor.id ? 'Voted Successfully' : !!votedId ? 'Vote Locked' : user ? 'Transmit Vote' : 'Auth Required'
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vote;
