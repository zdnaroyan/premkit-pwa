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
    <nav className="bottom-nav-wrap" aria-label="Navigasi Utama">
      <div className="bottom-nav">
        <button
          type="button"
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => navigate('/')}
          aria-label="Beranda"
          title="Beranda"
        >
          <img className="nav-lion" src={PL_LION_URL} alt="Beranda" />
          <span className="nav-label">Beranda</span>
          <span className="nav-dot" />
        </button>

        <button
          type="button"
          className={`nav-item ${activeTab === 'jerseys' ? 'active' : ''}`}
          onClick={() => navigate('/jerseys')}
          aria-label="Jersey Klasik"
          title="Jersey Klasik"
        >
          <Shirt size={20} strokeWidth={1.6} />
          <span className="nav-label">Jersey</span>
          <span className="nav-dot" />
        </button>

        <button
          type="button"
          className={`nav-item ${activeTab === 'clubs' ? 'active' : ''}`}
          onClick={() => navigate('/clubs')}
          aria-label="Klub"
          title="Klub"
        >
          <Shield size={20} strokeWidth={1.6} />
          <span className="nav-label">Klub</span>
          <span className="nav-dot" />
        </button>

        <button
          type="button"
          className={`nav-item ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => navigate('/about')}
          aria-label="Profil & Tentang"
          title="Profil"
        >
          <User size={20} strokeWidth={1.6} />
          <span className="nav-label">Profil</span>
          <span className="nav-dot" />
        </button>
      </div>
    </nav>
  )
}
