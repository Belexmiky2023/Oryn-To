
import React, { useState, useEffect } from 'react';
import { User, Editor, Transaction, Rating } from '../types';
import { db } from '../db';

interface AdminProps {
  user: User | null;
}

const Admin: React.FC<AdminProps> = ({ user }) => {
  const [editors, setEditors] = useState<Editor[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [txs, setTxs] = useState<Transaction[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'votes' | 'gifts' | 'stats'>('users');
  
  // Form state for adding editors
  const [newEditorName, setNewEditorName] = useState('');
  const [newEditorThumbnail, setNewEditorThumbnail] = useState('');

  useEffect(() => {
    if (user?.role === 'admin') {
      refreshData();
    }
  }, [user]);

  const refreshData = () => {
    setEditors(db.getEditors());
    setUsers(db.getUsers());
    setTxs(db.getTransactions());
    setRatings(db.getRatings());
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-center space-y-4 p-8 glass-morphism rounded-3xl border-red-900/30">
          <div className="text-red-500 text-7xl font-bold font-raj tracking-tighter mb-4 animate-pulse">403</div>
          <h1 className="text-2xl font-raj text-white uppercase tracking-widest">Unauthorized Access</h1>
          <p className="text-gray-500 max-w-xs mx-auto">This area is protected by Level 10 encryption. Admin credentials required.</p>
          <div className="pt-4">
            <a href="/" className="text-xs text-[#39FF14] underline underline-offset-4 uppercase tracking-widest font-bold">Return to Mainframe</a>
          </div>
        </div>
      </div>
    );
  }

  const approveTx = (txId: string) => {
    const updatedTxs = txs.map(t => {
      if (t.id === txId) {
        const userRef = users.find(u => u.id === t.userId);
        if (userRef?.votedForId) {
          const updatedEditors = editors.map(e => 
            e.id === userRef.votedForId ? { ...e, votes: e.votes + t.votes } : e
          );
          db.saveEditors(updatedEditors);
          setEditors(updatedEditors);
        }
        return { ...t, status: 'approved' as const };
      }
      return t;
    });
    db.saveTransactions(updatedTxs);
    setTxs(updatedTxs);
  };

  const adjustVote = (editorId: string, amount: number) => {
    const updatedEditors = editors.map(e => 
      e.id === editorId ? { ...e, votes: Math.max(0, e.votes + amount) } : e
    );
    db.saveEditors(updatedEditors);
    setEditors(updatedEditors);
  };

  const removeEditor = (editorId: string) => {
    if (!window.confirm("Are you sure you want to remove this editor?")) return;
    const updatedEditors = editors.filter(e => e.id !== editorId);
    db.saveEditors(updatedEditors);
    setEditors(updatedEditors);
  };

  const addEditor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEditorName) return;
    const newEditor: Editor = {
      id: Math.random().toString(36).substr(2, 9),
      name: newEditorName,
      thumbnail: newEditorThumbnail || `https://picsum.photos/seed/${newEditorName}/800/450`,
      videoUrl: '',
      votes: 0
    };
    const updated = [...editors, newEditor];
    db.saveEditors(updated);
    setEditors(updated);
    setNewEditorName('');
    setNewEditorThumbnail('');
  };

  const avgRating = ratings.length > 0 
    ? (ratings.reduce((acc, curr) => acc + curr.score, 0) / ratings.length).toFixed(1)
    : 'N/A';

  return (
    <div className="container mx-auto px-6 pt-32 pb-20 max-w-7xl">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 border-b border-gray-800 pb-8 gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-[#39FF14] glow-pulse"></div>
            <span className="text-xs text-[#39FF14] font-bold tracking-[0.3em] uppercase">Security Level: Maximum</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-raj font-bold uppercase tracking-tighter text-white">
            Admin <span className="text-[#39FF14]">Command Center</span>
          </h1>
          <p className="text-gray-500 mt-2">Authenticated: <span className="text-white font-medium">{user.email}</span></p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {(['users', 'votes', 'gifts', 'stats'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 border ${
                activeTab === tab ? 'bg-[#39FF14] text-black border-[#39FF14] shadow-[0_0_15px_rgba(57,255,20,0.4)]' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-morphism rounded-3xl overflow-hidden border border-white/5 min-h-[500px]">
        {activeTab === 'users' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                <tr>
                  <th className="px-8 py-5">Identified User</th>
                  <th className="px-8 py-5">Auth Email</th>
                  <th className="px-8 py-5">Ingress Timestamp</th>
                  <th className="px-8 py-5">Locked Vote</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-5 flex items-center space-x-3">
                      <img src={u.picture} className="w-10 h-10 rounded-full border border-white/10 group-hover:border-[#39FF14]/50 transition-colors" />
                      <span className="font-bold font-raj text-lg">{u.name}</span>
                    </td>
                    <td className="px-8 py-5 text-gray-400 font-mono text-sm">{u.email}</td>
                    <td className="px-8 py-5 text-gray-500 text-xs">{new Date(u.createdAt).toLocaleString()}</td>
                    <td className="px-8 py-5">
                      {u.votedForId ? (
                        <div className="flex items-center space-x-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]"></div>
                           <span className="text-[#39FF14] font-bold text-xs uppercase tracking-wider">
                            {editors.find(e => e.id === u.votedForId)?.name || 'Editor Removed'}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-700 italic text-xs uppercase tracking-tighter">No action taken</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'votes' && (
          <div className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {editors.map(e => (
                <div key={e.id} className="glass-morphism p-6 rounded-2xl border border-white/10 space-y-4 hover:border-[#39FF14]/30 transition-all group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold font-raj text-2xl uppercase tracking-tight">{e.name}</h3>
                      <p className="text-[10px] text-gray-500 font-mono uppercase">ID: {e.id}</p>
                    </div>
                    <div className="text-3xl font-raj font-bold text-[#39FF14] neon-glow">{e.votes}</div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button onClick={() => adjustVote(e.id, 1)} className="flex-1 bg-[#39FF14]/10 border border-[#39FF14]/20 hover:bg-[#39FF14] hover:text-black py-2 rounded-lg text-[10px] font-bold uppercase transition-all">+1</button>
                    <button onClick={() => adjustVote(e.id, -1)} className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 py-2 rounded-lg text-[10px] font-bold uppercase transition-all">-1</button>
                    <button onClick={() => removeEditor(e.id)} className="px-3 bg-red-900/20 border border-red-900/40 hover:bg-red-600 hover:text-white py-2 rounded-lg text-[10px] font-bold uppercase transition-all">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-xl bg-white/5 p-8 rounded-3xl border border-white/10">
              <h3 className="font-raj font-bold text-xl uppercase mb-6 tracking-widest text-[#39FF14]">Add New Competitor</h3>
              <form onSubmit={addEditor} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-1 block">Editor Alias</label>
                  <input 
                    type="text" 
                    value={newEditorName}
                    onChange={(e) => setNewEditorName(e.target.value)}
                    placeholder="Enter editor name..."
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#39FF14] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-1 block">Thumbnail URL (Optional)</label>
                  <input 
                    type="text" 
                    value={newEditorThumbnail}
                    onChange={(e) => setNewEditorThumbnail(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#39FF14] focus:outline-none transition-colors"
                  />
                </div>
                <button type="submit" className="neon-button w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm">Deploy Competitor</button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'gifts' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                <tr>
                  <th className="px-8 py-5">Sender Identity</th>
                  <th className="px-8 py-5">Quantum Package</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Operational Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {txs.map(t => (
                  <tr key={t.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-5">
                      <div className="text-white font-bold font-raj text-lg">{t.userEmail}</div>
                      <div className="text-[10px] text-gray-500 uppercase font-mono">{new Date(t.timestamp).toLocaleString()}</div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-[#39FF14] font-bold font-raj text-xl">{t.stars} STARS</div>
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">+{t.votes} ALLOCATED VOTES</div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.1em] ${
                        t.status === 'approved' ? 'bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20' : 'bg-yellow-900/20 text-yellow-500 border border-yellow-900/40'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      {t.status === 'pending' && (
                        <div className="flex justify-end space-x-2">
                          <button onClick={() => approveTx(t.id)} className="bg-[#39FF14] text-black text-[10px] font-bold px-4 py-2 rounded-lg hover:bg-white transition-all uppercase tracking-widest">Approve</button>
                          <button className="bg-red-600/20 text-red-500 border border-red-600/30 text-[10px] font-bold px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest">Reject</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {txs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center text-gray-600 uppercase tracking-widest font-bold text-sm italic">
                      No transactions detected in current session
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="p-12 space-y-16">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-morphism p-10 rounded-3xl border border-white/5 relative group overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-7xl font-raj font-bold text-[#39FF14] neon-glow relative">{users.length}</div>
                <div className="text-gray-500 uppercase tracking-widest text-[10px] font-bold mt-4 relative">Registered Entities</div>
              </div>
              <div className="glass-morphism p-10 rounded-3xl border border-white/5 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-7xl font-raj font-bold text-blue-400 relative">{avgRating}</div>
                <div className="text-gray-500 uppercase tracking-widest text-[10px] font-bold mt-4 relative">Experience Rating Avg</div>
              </div>
              <div className="glass-morphism p-10 rounded-3xl border border-white/5 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-7xl font-raj font-bold text-purple-400 relative">{txs.length}</div>
                <div className="text-gray-500 uppercase tracking-widest text-[10px] font-bold mt-4 relative">Star Conversions</div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 border-b border-gray-800 pb-4">
                <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_red]"></div>
                <h3 className="text-2xl font-raj font-bold uppercase tracking-widest">Live Audit Records</h3>
              </div>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-4 scrollbar-thin">
                {users.slice().reverse().map((u, i) => (
                  <div key={i} className="text-xs text-gray-500 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all flex justify-between items-center">
                    <div>
                      <span className="text-white font-bold">{u.email}</span>
                      <span className="ml-2">initiated secure handshake via Google OAuth 2.0.</span>
                    </div>
                    <span className="font-mono text-[10px] bg-black/50 px-2 py-1 rounded text-gray-600">{new Date(u.createdAt).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
