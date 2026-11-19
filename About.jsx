import { ExternalLink } from 'lucide-react'
import Header from '../components/Header.jsx'
import { PL_LION_URL } from '../data/media.js'

const REPOS = [
  {
    label: 'GitHub Frontend',
    name: 'premkit-pwa',
    url: 'https://github.com/zdnaroyan/premkit-pwa',
  },
  {
    label: 'GitHub Backend',
    name: 'premkit-api',
    url: 'https://github.com/zdnaroyan/premkit-api',
  },
]

export default function About({ clubsCount, apiLive }) {
  return (
    <div className="view-enter">
      <Header />
      <div className="content-container about-container">
        {/* 1. Identitas & Deskripsi Aplikasi */}
        <section className="about-hero">
          <div className="about-badge-box">
            <img src={PL_LION_URL} alt="Logo Singa Premier League" />
          </div>
          <div className="brand-wordmark" style={{ fontSize: '24px', marginBottom: '4px' }}>
            PREMKIT
          </div>
          <div className="about-version">VERSI 1.0.0</div>
          <p className="sheet-copy" style={{ maxWidth: '400px', margin: '10px auto 0' }}>
            Arsip digital non-jual-beli yang mengkurasi satu jersey klasik terbaik dari sebelas klub Premier League.
          </p>
        </section>

        {/* 2. Ringkasan Arsip (3 Kartu Fakta Warm Stone) */}
        <div className="club-fact-strip about-facts">
          <div className="club-fact-card">
            <div className="club-fact-num">{clubsCount || 11}</div>
            <div className="club-fact-key">Klub</div>
          </div>
          <div className="club-fact-card">
            <div className="club-fact-num">{clubsCount || 11}</div>
            <div className="club-fact-key">Jersey</div>
          </div>
          <div className="club-fact-card">
            <div className="club-fact-num">PWA</div>
            <div className="club-fact-key">Offline-Ready</div>
          </div>
        </div>

        {/* 3. Profil Pembuat (Praktikan) */}
        <section className="about-section">
          <h2 className="about-section-label">PROFIL PEMBUAT</h2>
          <div className="creator-card">
            <div className="creator-top">
              <div className="creator-avatar" aria-hidden="true">ZA</div>
              <div className="creator-info">
                <div className="creator-name">Zaidan Ali Arroyan</div>
                <div className="creator-nim">NIM 21120124140117</div>
                <div className="creator-course">Praktikum Pemrograman Perangkat Bergerak</div>
              </div>
            </div>

            <div className="repo-links">
              {REPOS.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-pill"
                >
                  <span>{repo.label}</span>
                  <ExternalLink size={13} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Informasi Teknis & Tautan API */}
        <section className="about-section">
          <h2 className="about-section-label">ARSITEKTUR TEKNIS</h2>
          <div className="about-rows" style={{ margin: 0 }}>
            <div className="about-row">
              <span className="about-row-k">Web Service (API)</span>
              <a
                href="https://premkit-api.vercel.app/api/jerseys"
                target="_blank"
                rel="noopener noreferrer"
                className="about-row-link"
              >
                <span>{apiLive ? 'premkit-api.vercel.app' : 'Cache Offline Aktif'}</span>
                <ExternalLink size={12} strokeWidth={1.8} />
              </a>
            </div>
            <div className="about-row">
              <span className="about-row-k">Frontend</span>
              <span className="about-row-v">React + Vite PWA</span>
            </div>
            <div className="about-row">
              <span className="about-row-k">Backend &amp; DB</span>
              <span className="about-row-v">Node.js · Express · Supabase</span>
            </div>
            <div className="about-row">
              <span className="about-row-k">Hosting</span>
              <span className="about-row-v">Vercel</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
