import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PL_LION_URL } from '../data/media.js'

export default function Header({ showBack = false, backTo = -1, rightSlot = null }) {
  const navigate = useNavigate()

  return (
    <header className="top-header">
      <div className="top-header-inner">
        {showBack ? (
          <button
            type="button"
            className="header-icon-btn"
            onClick={() => navigate(backTo)}
            aria-label="Kembali"
          >
            <ArrowLeft size={20} strokeWidth={1.75} />
          </button>
        ) : (
          <span />
        )}

        <button
          type="button"
          className="header-brand"
          onClick={() => navigate('/')}
          aria-label="Beranda PremKit"
        >
          <img className="pl-lion" src={PL_LION_URL} alt="Logo Singa Premier League" />
          <span className="brand-wordmark">PREMKIT</span>
        </button>

        {rightSlot || <span />}
      </div>
    </header>
  )
}
