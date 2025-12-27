
import { useEffect, useState } from "react"
import { HashRouter, Routes, Route, Navigate } from "react-router-dom"
import { Magic } from "magic-sdk"
import { OAuthExtension } from "@magic-ext/oauth"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Vote from "./pages/Vote"
import Gift from "./pages/Gift"
import Rate from "./pages/Rate"
import Admin from "./pages/Admin"

import { ROUTES, MAGIC_PUBLISHABLE_KEY } from "./constants"
import { User } from "./types"
import { db } from "./db"

// Singleton Magic instance with OAuth extension
const magic = new Magic(MAGIC_PUBLISHABLE_KEY, {
  extensions: [new OAuthExtension()]
});

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)

  // Auth sync utility
  const syncUserFromDB = (email: string, publicAddress: string, name?: string, picture?: string): User => {
    const existingUsers = db.getUsers();
    let foundUser = existingUsers.find(u => u.email === email || u.id === publicAddress);

    if (!foundUser) {
      foundUser = {
        id: publicAddress,
        email: email,
        name: name || email.split('@')[0],
        picture: picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        role: email === 'oryn179@gmail.com' || email.includes('admin') ? 'admin' : 'user',
        createdAt: Date.now(),
      };
      db.saveUsers([...existingUsers, foundUser]);
    }
    return foundUser;
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 1. Check if we just returned from a GitHub redirect
        const hash = window.location.hash;
        if (hash.includes('magic_oauth_state')) {
          const result = await (magic as any).oauth.getRedirectResult();
          const profile = result.oauth.userInfo;
          const authenticatedUser = syncUserFromDB(
            profile.email || `${profile.preferredUsername}@github.com`,
            result.magic.publicAddress,
            profile.name || profile.preferredUsername,
            profile.picture
          );
          setUser(authenticatedUser);
          // Clean the URL hash
          window.history.replaceState(null, '', window.location.pathname);
        } else {
          // 2. Standard session check
          const isLoggedIn = await magic.user.isLoggedIn();
          if (isLoggedIn) {
            const userInfo = await magic.user.getInfo();
            if (userInfo.email) {
              const authenticatedUser = syncUserFromDB(userInfo.email, userInfo.publicAddress!);
              setUser(authenticatedUser);
            }
          }
        }
      } catch (err) {
        console.error("Auth check failure:", err);
      } finally {
        setReady(true);
      }
    };

    initAuth();
  }, []);

  const handleGitHubLogin = async () => {
    try {
      await (magic as any).oauth.loginWithRedirect({
        provider: 'github',
        redirectURI: window.location.origin + window.location.pathname
      });
    } catch (e) {
      console.error("GitHub login initiation failed:", e);
      throw e;
    }
  };

  const handleLogout = async () => {
    try {
      await magic.user.logout();
      setUser(null);
    } catch (err) {
      console.error("Logout failure:", err);
    }
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-[#39FF14]/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#39FF14] rounded-full border-t-transparent animate-spin"></div>
        </div>
        <div className="text-[#39FF14] font-raj font-bold tracking-[0.4em] animate-pulse uppercase text-sm">
          ORYN_SECURE_LINKING
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="min-h-screen bg-black text-white selection:bg-[#39FF14] selection:text-black">
        <Navbar user={user} onLogout={handleLogout} />

        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.VOTE} element={<Vote user={user} onLogin={handleGitHubLogin} />} />
          <Route path={ROUTES.GIFT} element={<Gift user={user} />} />
          <Route path={ROUTES.RATE} element={<Rate user={user} />} />
          <Route path={ROUTES.ADMIN} element={<Admin user={user} />} />
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
        
        <footer className="py-20 border-t border-white/5 bg-black/50 text-center">
          <div className="container mx-auto px-6">
            <div className="font-raj font-bold text-2xl tracking-widest text-white/40 mb-4">
              ORYN<span className="text-[#39FF14]/40">SERVER</span> 2025
            </div>
            <p className="text-gray-600 text-xs uppercase tracking-[0.6em]">Authorized Personnel Only • GitHub Secure Handshake</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
}
