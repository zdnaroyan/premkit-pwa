import Header from '../components/Header.jsx'
import { PL_LION_URL } from '../data/media.js'

export default function About({ clubsCount, apiLive }) {
  return (
    <div className="view-enter">
      <Header />
      <div className="content-container about-container">
        <section className="about-hero">
          <div className="about-badge-box">
            <img src={PL_LION_URL} alt="Logo Singa Premier League" />
          </div>
          <div className="brand-wordmark" style={{ fontSize: '24px', marginBottom: '8px' }}>
            PREMKIT
          </div>
          <p className="sheet-copy" style={{ maxWidth: '380px', margin: '0 auto' }}>
            Arsip digital non-jual-beli yang mengkurasi jersey klasik terbaik dari sebelas klub Premier League.
          </p>
        </section>

        <div className="about-rows">
          <div className="about-row">
            <span className="about-row-k">Status API</span>
            <span className="about-row-v">
              {apiLive ? 'Terhubung · premkit-api.vercel.app' : 'Mode Cache Offline Aktif'}
            </span>
          </div>
          <div className="about-row">
            <span className="about-row-k">Jumlah Klub</span>
            <span className="about-row-v">{clubsCount} Klub Premier League</span>
          </div>
          <div className="about-row">
            <span className="about-row-k">Koleksi</span>
            <span className="about-row-v">1 Jersey Terbaik per Klub</span>
          </div>
          <div className="about-row">
            <span className="about-row-k">Tujuan Aplikasi</span>
            <span className="about-row-v">Katalog Pameran · Non-Jual-Beli</span>
          </div>
          <div className="about-row">
            <span className="about-row-k">Teknologi</span>
            <span className="about-row-v">React Vite PWA · Express · Supabase</span>
          </div>
          <div className="about-row">
            <span className="about-row-k">Hosting</span>
            <span className="about-row-v">Vercel</span>
          </div>
        </div>
      </div>
    </div>
  )
}
