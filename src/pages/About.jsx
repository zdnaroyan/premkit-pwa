import Header from '../components/Header.jsx'
import { PL_LION_URL } from '../data/media.js'

export default function About({ clubsCount, savedCount, apiLive }) {
  return (
    <div className="view-enter">
      <Header />
      <section className="about-hero">
        <div className="about-badge-box">
          <img src={PL_LION_URL} alt="Premier League Lion" />
        </div>
        <div className="brand-wordmark" style={{ fontSize: '24px', marginBottom: '8px' }}>
          PREMKIT
        </div>
        <p className="sheet-copy" style={{ maxWidth: '300px', margin: '0 auto' }}>
          Curated non-commercial archive of classic Premier League football shirts across eleven clubs.
        </p>
      </section>

      <div className="about-rows">
        <div className="about-row">
          <span className="about-row-k">API Status</span>
          <span className="about-row-v">
            {apiLive ? 'Live · premkit-api.vercel.app' : 'Offline Cache Active'}
          </span>
        </div>
        <div className="about-row">
          <span className="about-row-k">Clubs</span>
          <span className="about-row-v">{clubsCount} Premier League Clubs</span>
        </div>
        <div className="about-row">
          <span className="about-row-k">Saved Kits</span>
          <span className="about-row-v">{savedCount} Bookmarked</span>
        </div>
        <div className="about-row">
          <span className="about-row-k">Catalog Mode</span>
          <span className="about-row-v">Exhibition · Non-Commercial</span>
        </div>
        <div className="about-row">
          <span className="about-row-k">Stack</span>
          <span className="about-row-v">React Vite PWA · Express · Supabase</span>
        </div>
        <div className="about-row">
          <span className="about-row-k">Hosting</span>
          <span className="about-row-v">Vercel</span>
        </div>
      </div>
    </div>
  )
}
