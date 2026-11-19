import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import Header from '../components/Header.jsx'

export default function Home({ clubs, jerseys }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [heroIdx, setHeroIdx] = useState(0)
  const [leavingIdx, setLeavingIdx] = useState(null)

  useEffect(() => {
    if (!jerseys.length || query.trim()) return
    const timer = setInterval(() => {
      setHeroIdx((prev) => {
        setLeavingIdx(prev)
        setTimeout(() => setLeavingIdx(null), 900)
        return (prev + 1) % jerseys.length
      })
    }, 5000)
    return () => clearInterval(timer)
  }, [jerseys.length, query])

  const q = query.trim().toLowerCase()
  const filtered = jerseys.filter(
    (j) =>
      !q ||
      [j.title, j.season, j.manufacturer, j.iconic_player, j.clubs?.name]
        .join(' ')
        .toLowerCase()
        .includes(q),
  )

  const activeHero = jerseys[heroIdx] || jerseys[0]

  const renderKitCard = (j, key) => (
    <article
      key={key}
      className="kit-item"
      onClick={() => navigate(`/jerseys/${j.id}`)}
    >
      <div className="kit-thumb">
        <img src={j.image_url} alt={j.title} loading="lazy" />
      </div>
      <div className="kit-name">
        {j.clubs?.name} {j.season}
      </div>
      <div className="kit-meta">
        {j.manufacturer} &middot; {j.kit_type}
      </div>
    </article>
  )

  return (
    <div className="view-enter">
      <Header />
      <div className="content-container">
        <div className="search-wrap">
          <div className="search-pill">
            <Search size={16} strokeWidth={1.8} />
            <input
              type="text"
              placeholder="Cari jersey, klub, atau musim..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setQuery('')}
                aria-label="Hapus pencarian"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {!q && activeHero && (
          <div className="hero-wrap">
            <article
              className="hero-banner"
              onClick={() => navigate(`/jerseys/${activeHero.id}`)}
            >
              {jerseys.map((j, i) => (
                <div
                  key={j.id}
                  className={`hero-slide ${i === heroIdx ? 'active' : ''} ${i === leavingIdx ? 'leaving' : ''}`}
                >
                  <img src={j.image_url} alt={j.title} />
                </div>
              ))}
              <div className="hero-caption-wrap">
                <span className="hero-caption">KOLEKSI KLASIK</span>
                <span className="hero-subcaption">
                  {activeHero.clubs?.name} &middot; {activeHero.season}
                </span>
              </div>
            </article>
          </div>
        )}

        <div className="section-head">
          <h2 className="section-label">{q ? 'HASIL PENCARIAN' : 'JERSEY KLASIK'}</h2>
          <button type="button" className="section-link" onClick={() => navigate('/jerseys')}>
            Lihat Semua
          </button>
        </div>

        {filtered.length ? (
          !q ? (
            <div className="kit-marquee">
              <div className="kit-marquee-track">
                {[...filtered, ...filtered].map((j, idx) => renderKitCard(j, `${j.id}-${idx}`))}
              </div>
            </div>
          ) : (
            <div className="kit-strip">
              {filtered.map((j) => renderKitCard(j, j.id))}
            </div>
          )
        ) : (
          <div className="empty-msg">Jersey klasik untuk &ldquo;{query}&rdquo; tidak ditemukan.</div>
        )}

        <div className="section-head">
          <h2 className="section-label">ARSIP KLUB</h2>
          <button type="button" className="section-link" onClick={() => navigate('/clubs')}>
            {clubs.length} Klub
          </button>
        </div>

        <div className="looks-strip">
          {clubs.map((c) => (
            <article key={c.id} className="look-card" onClick={() => navigate(`/clubs/${c.id}`)}>
              <img src={c.logo_url} alt={c.name} loading="lazy" />
              <span className="look-club-label">{c.name}</span>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
