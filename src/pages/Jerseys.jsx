import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import Header from '../components/Header.jsx'

function matchesDecade(season, dec) {
  if (dec === 'SEMUA') return true
  const y = parseInt(String(season).slice(0, 4), 10)
  if (dec === '1990-AN') return y >= 1990 && y < 2000
  if (dec === '2000-AN') return y >= 2000 && y < 2010
  if (dec === '2010-AN') return y >= 2010 && y < 2020
  return true
}

export default function Jerseys({ jerseys }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [decade, setDecade] = useState('SEMUA')

  const q = query.trim().toLowerCase()
  const filtered = jerseys.filter((j) => {
    if (!matchesDecade(j.season, decade)) return false
    if (!q) return true
    return [j.title, j.season, j.manufacturer, j.iconic_player, j.clubs?.name]
      .join(' ')
      .toLowerCase()
      .includes(q)
  })

  return (
    <div className="view-enter">
      <Header />
      <div className="content-container">
        <div className="search-wrap">
          <div className="search-pill">
            <Search size={16} strokeWidth={1.8} />
            <input
              type="text"
              placeholder="Cari jersey klasik..."
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

        <div className="filter-strip">
          {['SEMUA', '1990-AN', '2000-AN', '2010-AN'].map((d) => (
            <button
              key={d}
              type="button"
              className={`filter-pill ${decade === d ? 'active' : ''}`}
              onClick={() => setDecade(d)}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="section-head">
          <h2 className="section-label">JERSEY KLASIK</h2>
          <span className="section-link" style={{ cursor: 'default' }}>
            {filtered.length} ARSIP
          </span>
        </div>

        {filtered.length ? (
          <div className="kit-grid">
            {filtered.map((j) => (
              <article
                key={j.id}
                className="kit-grid-card"
                onClick={() => navigate(`/jerseys/${j.id}`)}
              >
                <div className="kit-thumb">
                  <img src={j.image_url} alt={j.title} loading="lazy" />
                </div>
                <div className="kit-name">
                  {j.clubs?.name}
                  <br />
                  {j.season} {j.kit_type}
                </div>
                <div className="kit-meta">
                  {j.manufacturer} &middot; {j.sponsor || 'Klasik'}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-msg">Tidak ada jersey yang cocok dengan &ldquo;{query}&rdquo;.</div>
        )}
      </div>
    </div>
  )
}
