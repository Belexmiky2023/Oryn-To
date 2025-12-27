
import { useEffect, useState } from "react"
import { HashRouter, Routes, Route, Navigate } from "react-router-dom"
import { Magic } from "magic-sdk"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Vote from "./pages/Vote"
import Gift from "./pages/Gift"
import Rate from "./pages/Rate"
import Admin from "./pages/Admin"

import { ROUTES, MAGIC_PUBLISHABLE_KEY } from "./constants"
import { User } from "./types"
import { db } from "./db"

// Singleton Magic instance
const magic = new Magic(MAGIC_PUBLISHABLE_KEY);

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await magic.user.isLoggedIn();
        if (isLoggedIn) {
          // Fix: Replace getMetadata() with getInfo() for modern Magic SDK support
          const userInfo = await magic.user.getInfo();
          const email = userInfo.email!;
          const existingUsers = db.getUsers();
          let foundUser = existingUsers.find(u => u.email === email);

          if (!foundUser) {
            foundUser = {
              id: userInfo.publicAddress!,
              email: email,
              name: email.split('@')[0], // Use email prefix as name
              picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`, // Deterministic avatar
              role: email === 'oryn179@gmail.com' || email.includes('admin') ? 'admin' : 'user',
              createdAt: Date.now(),
            };
            db.saveUsers([...existingUsers, foundUser]);
          }
          setUser(foundUser);
        } else {
          // Clear local cache if magic session expired
          localStorage.removeItem("oryn_current_user");
        }
      } catch (err) {
        console.error("Auth check failed", err);
      } finally {
        setReady(true);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async (email: string) => {
    try {
      await magic.auth.loginWithMagicLink({ email });
      // Fix: Replace getMetadata() with getInfo() for modern Magic SDK support
      const userInfo = await magic.user.getInfo();
      const userEmail = userInfo.email!;
      
      const existingUsers = db.getUsers();
      let foundUser = existingUsers.find(u => u.email === userEmail);

      if (!foundUser) {
        foundUser = {
          id: userInfo.publicAddress!,
          email: userEmail,
          name: userEmail.split('@')[0],
          picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`,
          role: userEmail === 'oryn179@gmail.com' || userEmail.includes('admin') ? 'admin' : 'user',
          createdAt: Date.now(),
        };
        db.saveUsers([...existingUsers, foundUser]);
      }

      setUser(foundUser);
      localStorage.setItem('oryn_current_user', JSON.stringify(foundUser));
    } catch (e) {
      console.error("Magic login failed", e);
      throw e;
    }
  };

  const handleLogout = async () => {
    try {
      await magic.user.logout();
      setUser(null);
      localStorage.removeItem("oryn_current_user");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#39FF14]/20 border-t-[#39FF14] rounded-full animate-spin mb-4"></div>
        <div className="text-[#39FF14] font-raj font-bold tracking-[0.5em] animate-pulse uppercase">
          Initializing Security
        </div>
      </div>
    )
  }

  return (
    <HashRouter>
      <div className="min-h-screen bg-black text-white">
        <Navbar user={user} onLogout={handleLogout} />

        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.VOTE} element={<Vote user={user} onLogin={handleLogin} />} />
          <Route path={ROUTES.GIFT} element={<Gift user={user} />} />
          <Route path={ROUTES.RATE} element={<Rate user={user} />} />
          <Route path={ROUTES.ADMIN} element={<Admin user={user} />} />
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
