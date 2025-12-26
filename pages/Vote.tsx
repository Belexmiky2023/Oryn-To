
import React, { useEffect, useState } from 'react';
import { Editor, User } from '../types';
import { db } from '../db';
import { GOOGLE_CLIENT_ID } from '../constants';

interface VoteProps {
  user: User | null;
  onLogin: (credential: string) => void;
}

const Vote: React.FC<VoteProps> = ({ user, onLogin }) => {
  const [editors, setEditors] = useState<Editor[]>([]);
  const [votedId, setVotedId] = useState<string | null>(null);
  const [isCasting, setIsCasting] = useState(false);

  useEffect(() => {
    setEditors(db.getEditors());
    if (user?.votedForId) {
      setVotedId(user.votedForId);
    }

    // Fix: Using type assertion to access 'google' on window as it's loaded via external script
    const google = (window as any).google;
    if (google && !user) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: any) => onLogin(response.credential),
      });
      google.accounts.id.renderButton(
        document.getElementById('google-login-btn'),
        { theme: 'filled_black', size: 'large', width: 280, shape: 'pill' }
      );
    }
  }, [user]);

  const handleVote = (editorId: string) => {
    if (!user || votedId || isCasting) return;

    setIsCasting(true);
    
    // Simulate server delay for premium feel
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
      
      // Update persistent session
      const updatedUser = { ...user, votedForId: editorId };
      localStorage.setItem('oryn_current_user', JSON.stringify(updatedUser));
    }, 800);
  };

  return (
    <div className="container mx-auto px-6 pt-32 pb-20 max-w-7xl">
      <div className="text-center mb-20 space-y-6">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <div className="h-px w-12 bg-[#39FF14]/30"></div>
          <span className="text-xs text-[#39FF14] font-bold tracking-[0.4em] uppercase">Voting System Active</span>
          <div className="h-px w-12 bg-[#39FF14]/30"></div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-raj font-bold uppercase tracking-tighter leading-none">
          CHOOSE YOUR <span className="text-[#39FF14] neon-glow">CHAMPION</span>
        </h1>
        
        <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
          The power is in your hands. Support your favorite motion artist. Remember: <span className="text-white font-bold italic">One vote per account, permanently locked.</span>
        </p>
        
        {!user && (
          <div className="flex flex-col items-center pt-10 space-y-6 animate-fade-in">
            <div id="google-login-btn" className="glow-pulse rounded-full overflow-hidden border border-[#39FF14]/20"></div>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.5em] font-bold">
              Secure Google OAuth 2.0 Identity Required
            </p>
          </div>
        )}

        {user && (
          <div className="inline-flex items-center px-6 py-3 rounded-2xl glass-morphism border border-[#39FF14]/30 mt-6 group transition-all hover:bg-[#39FF14]/5">
            <img src={user.picture} className="w-8 h-8 rounded-full border border-[#39FF14]/50 mr-4" />
            <div className="text-left">
              <p className="text-[#39FF14] font-raj font-bold text-lg leading-none">
                Logged in as: <span className="text-white">{user.name}</span>
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
            className={`group glass-morphism rounded-[2.5rem] overflow-hidden border transition-all duration-500 flex flex-col ${
              votedId === editor.id 
                ? 'border-[#39FF14] shadow-[0_0_40px_rgba(57,255,20,0.1)] scale-[1.03]' 
                : 'border-white/5 hover:border-[#39FF14]/50 hover:-translate-y-2'
            }`}
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={editor.thumbnail} 
                alt={editor.name} 
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                   <h3 className="text-3xl font-raj font-bold text-white uppercase tracking-tighter leading-none group-hover:text-[#39FF14] transition-colors">
                    {editor.name}
                  </h3>
                </div>
                <div className="px-4 py-1.5 glass-morphism rounded-full border border-[#39FF14]/40 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse"></span>
                  <span className="text-[#39FF14] font-bold font-raj text-sm tracking-widest">{editor.votes} VOTES</span>
                </div>
              </div>
            </div>
            
            <div className="p-8 pt-6 space-y-6 flex-grow flex flex-col justify-between">
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
                      ? 'bg-gray-900 text-gray-700 cursor-not-allowed border border-white/5'
                      : !user
                      ? 'bg-gray-900 text-gray-700 cursor-not-allowed border border-white/5 opacity-50'
                      : 'neon-button'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isCasting ? (
                      <span className="flex space-x-1">
                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:0.4s]"></span>
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
