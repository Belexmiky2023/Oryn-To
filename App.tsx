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

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#39FF14]">
        Loading Oryn Server...
      </div>
    )
  }

  return (
    <HashRouter>
      <div className="min-h-screen bg-black text-white">
        <Navbar user={user} onLogout={() => {
          setUser(null)
          localStorage.removeItem("oryn_current_user")
        }} />

        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.VOTE} element={<Vote user={user} />} />
          <Route path={ROUTES.GIFT} element={<Gift user={user} />} />
          <Route path={ROUTES.RATE} element={<Rate user={user} />} />
          <Route path={ROUTES.ADMIN} element={<Admin user={user} />} />
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
