
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './constants';
import { User, AppState } from './types';
import { db } from './db';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Vote from './pages/Vote';
import Gift from './pages/Gift';
import Rate from './pages/Rate';
import Admin from './pages/Admin';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Session persistent
    const stored = localStorage.getItem('oryn_current_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const handleLogin = (credential: string) => {
    // In a real app, send credential to backend for verification
    // Here we decode the JWT (simplified for demo)
    try {
      const payload = JSON.parse(atob(credential.split('.')[1]));
      
      const existingUsers = db.getUsers();
      let foundUser = existingUsers.find(u => u.email === payload.email);

      if (!foundUser) {
        // First time login
        foundUser = {
          id: payload.sub,
          email: payload.email,
          name: payload.name,
          picture: payload.picture,
          role: payload.email === 'oryn179@gmail.com' || payload.email.includes('admin') ? 'admin' : 'user',
          createdAt: Date.now(),
        };
        db.saveUsers([...existingUsers, foundUser]);
      }

      setUser(foundUser);
      localStorage.setItem('oryn_current_user', JSON.stringify(foundUser));
    } catch (e) {
      console.error("Login failed", e);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('oryn_current_user');
  };

  if (loading) return null;

  return (
    <Router>
      <div className="min-h-screen bg-black text-white relative">
        <Navbar user={user} onLogout={handleLogout} />
        
        <main>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.VOTE} element={<Vote user={user} onLogin={handleLogin} />} />
            <Route path={ROUTES.GIFT} element={<Gift user={user} />} />
            <Route path={ROUTES.RATE} element={<Rate user={user} />} />
            <Route path={ROUTES.ADMIN} element={<Admin user={user} />} />
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Routes>
        </main>

        <footer className="py-12 border-t border-gray-900 mt-20">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-[#39FF14] flex items-center justify-center">
                <span className="text-black font-bold text-sm">O</span>
              </div>
              <span className="font-raj font-bold text-xl text-white">ORYN SERVER</span>
            </div>
            <p className="text-gray-600 text-sm">&copy; 2025 Oryn Server. All rights reserved. Built for Video Editors.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">Discord</a>
              <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">Privacy</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
