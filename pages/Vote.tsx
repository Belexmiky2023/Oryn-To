
import React, { useEffect, useState } from 'react';
import { Editor, User } from '../types';
import { db } from '../db';

interface VoteProps {
  user: User | null;
  onLogin: () => Promise<void>;
}

const Vote: React.FC<VoteProps> = ({ user, onLogin }) => {
  const [editors, setEditors] = useState<Editor[]>([]);
  const [votedId, setVotedId] = useState<string | null>(null);
  const [isCasting, setIsCasting] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    setEditors(db.getEditors());
    if (user?.votedForId) {
      setVotedId(user.votedForId);
    }
  }, [user]);

  const handleGitHubAuth = async () => {
    setIsLoggingIn(true);
    setLoginError('');
    try {
      await onLogin();
    } catch (err: any) {
      setLoginError('GitHub gateway timeout. Please retry.');
      setIsLoggingIn(false);
    }
  };

  const handleVote = (editorId: string) => {
    if (!user || votedId || isCasting) return;

    setIsCasting(true);
    
    // Finalize transmission
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
    }, 1200);
  };

  return (
    <div className="container mx-auto px-6 pt-40 pb-32 max-w-7xl">
      <div className="text-center mb-24 space-y-8">
        <div className="flex justify-center items-center space-x-6 mb-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#39FF14]/50"></div>
          <span className="text-sm text-[#39FF14] font-raj font-bold tracking-[0.8em] uppercase">Security Protocol 4.0</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#39FF14]/50"></div>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-raj font-bold uppercase tracking-tighter leading-none">
          CHOOSE YOUR <span className="text-[#39FF14] neon-glow">MASTER</span>
        </h1>
        
        <p className="text-gray-400 max-w-3xl mx-auto text-lg md:text-2xl font-light leading-relaxed">
          Verify your identity via GitHub to unlock your voting power. <br className="hidden md:block" />
          One permanent vote per developer account.
        </p>
        
        {!user && (
          <div className="flex flex-col items-center pt-12 animate-fade-in max-w-sm mx-auto w-full">
            <button
              onClick={handleGitHubAuth}
              disabled={isLoggingIn}
              className="github-button w-full py-5 rounded-2xl font-bold uppercase tracking-[0.4em] text-sm flex items-center justify-center space-x-4 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center space-x-3">
                {isLoggingIn ? (
                   <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                )}
                <span>{isLoggingIn ? 'Syncing...' : 'Log in via GitHub'}</span>
              </span>
            </button>
            
            {loginError && <p className="mt-4 text-red-500 text-[10px] font-bold uppercase tracking-widest">{loginError}</p>}
            
            <p className="text-[9px] text-gray-700 uppercase tracking-[0.6em] font-bold mt-10">
              OAuth 2.0 • Secured by Magic
            </p>
          </div>
        )}

        {user && (
          <div className="inline-flex items-center px-8 py-4 rounded-3xl glass-morphism border-[#39FF14]/40 mt-10 group transition-all">
            <div className="relative">
              <img src={user.picture} className="w-12 h-12 rounded-full border-2 border-[#39FF14] mr-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#39FF14] rounded-full animate-ping"></div>
            </div>
            <div className="text-left">
              <p className="text-[#39FF14] font-raj font-bold text-xl leading-none tracking-tight">
                IDENTITY: <span className="text-white uppercase">{user.name}</span>
              </p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1.5 font-bold">
                {votedId ? 'Status: Allocation Locked' : 'Status: Ready to Transmit'}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {editors.map((editor) => (
          <div 
            key={editor.id} 
            className={`group glass-morphism rounded-[3rem] overflow-hidden border transition-all duration-700 flex flex-col relative ${
              votedId === editor.id 
                ? 'border-[#39FF14] shadow-[0_0_60px_rgba(57,255,20,0.2)] scale-[1.05] z-10' 
                : votedId 
                ? 'opacity-40 grayscale pointer-events-none' 
                : 'border-white/5 hover:border-[#39FF14]/60 hover:-translate-y-4'
            }`}
          >
            {votedId === editor.id && <div className="success-beam"></div>}
            
            <div className="relative aspect-[16/10] overflow-hidden">
              <img 
                src={editor.thumbnail} 
                alt={editor.name} 
                className={`w-full h-full object-cover transition-all duration-1000 ${
                  votedId === editor.id ? 'grayscale-0 scale-110' : 'grayscale-[0.8] group-hover:grayscale-0 group-hover:scale-110'
                }`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div>
                   <h3 className="text-4xl font-raj font-bold text-white uppercase tracking-tighter leading-none group-hover:text-[#39FF14] transition-colors">
                    {editor.name}
                  </h3>
                </div>
                <div className={`px-5 py-2 glass-morphism rounded-full border flex items-center space-x-3 transition-all ${
                  votedId === editor.id ? 'border-[#39FF14] bg-[#39FF14]/20' : 'border-white/20'
                }`}>
                  <span className={`w-2 h-2 rounded-full bg-[#39FF14] ${votedId === editor.id ? 'animate-ping' : 'animate-pulse'}`}></span>
                  <span className="text-[#39FF14] font-bold font-raj text-lg tracking-widest">{editor.votes} <span className="text-[10px] opacity-60">V</span></span>
                </div>
              </div>
            </div>
            
            <div className="p-10 pt-8 space-y-8 flex-grow flex flex-col justify-between relative z-10">
              <p className="text-gray-500 text-sm italic leading-relaxed font-medium">
                High-tier editor with proficiency in kinetic typography and advanced masking.
              </p>

              <div className="space-y-4">
                <button 
                  onClick={() => window.open(editor.videoUrl, '_blank')}
                  className="w-full py-3.5 rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-all"
                >
                  Review Artifacts
                </button>
                
                <button
                  disabled={!user || !!votedId || isCasting}
                  onClick={() => handleVote(editor.id)}
                  className={`w-full py-6 rounded-3xl font-bold uppercase tracking-[0.3em] text-sm transition-all duration-700 relative overflow-hidden group ${
                    votedId === editor.id 
                      ? 'bg-[#39FF14] text-black shadow-[0_15px_40px_rgba(57,255,20,0.5)]' 
                      : !!votedId || !user
                      ? 'bg-gray-900 text-gray-800 cursor-not-allowed border-none'
                      : 'neon-button'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isCasting ? (
                      <span className="flex items-center space-x-3">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Transmitting</span>
                      </span>
                    ) : (
                      votedId === editor.id ? 'TRANSMITTED' : !!votedId ? 'SYSTEM_LOCKED' : user ? 'CAST VOTE' : 'GITHUB REQUIRED'
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
