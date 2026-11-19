import { useLocation, useNavigate } from 'react-router-dom'
import { Shirt, Shield, User } from 'lucide-react'
import { PL_LION_URL } from '../data/media.js'

export default function BottomNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const activeTab = pathname.startsWith('/jerseys')
    ? 'jerseys'
    : pathname.startsWith('/clubs')
      ? 'clubs'
      : pathname.startsWith('/about')
        ? 'about'
        : 'home'

  return (
    <nav className="bottom-nav" aria-label="Bottom Navigation">
      <button
        type="button"
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => navigate('/')}
        aria-label="Home"
      >
        <img className="nav-lion" src={PL_LION_URL} alt="Home" />
        <span className="nav-dot" />
      </button>

      <button
        type="button"
        className={`nav-item ${activeTab === 'jerseys' ? 'active' : ''}`}
        onClick={() => navigate('/jerseys')}
        aria-label="Classic Jerseys"
      >
        <Shirt size={20} strokeWidth={1.6} />
        <span className="nav-dot" />
      </button>

      <button
        type="button"
        className={`nav-item ${activeTab === 'clubs' ? 'active' : ''}`}
        onClick={() => navigate('/clubs')}
        aria-label="Clubs"
      >
        <Shield size={20} strokeWidth={1.6} />
        <span className="nav-dot" />
      </button>

      <button
        type="button"
        className={`nav-item ${activeTab === 'about' ? 'active' : ''}`}
        onClick={() => navigate('/about')}
        aria-label="Profile & About"
      >
        <User size={20} strokeWidth={1.6} />
        <span className="nav-dot" />
      </button>
    </nav>
  )
}
