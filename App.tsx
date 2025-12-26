
import { useEffect, useState } from "react"
import { HashRouter, Routes, Route, Navigate } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Vote from "./pages/Vote"
import Gift from "./pages/Gift"
import Rate from "./pages/Rate"
import Admin from "./pages/Admin"

import { ROUTES } from "./constants"
import { User } from "./types"
import { db } from "./db"

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("oryn_current_user")
    if (stored) setUser(JSON.parse(stored))
    setReady(true)
  }, [])

  const handleLogin = (credential: string) => {
    try {
      const payload = JSON.parse(atob(credential.split('.')[1]));
      const existingUsers = db.getUsers();
      let foundUser = existingUsers.find(u => u.email === payload.email);

      if (!foundUser) {
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
    setUser(null)
    localStorage.removeItem("oryn_current_user")
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#39FF14]/20 border-t-[#39FF14] rounded-full animate-spin mb-4"></div>
        <div className="text-[#39FF14] font-raj font-bold tracking-[0.5em] animate-pulse uppercase">
          Initializing Oryn Server
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
