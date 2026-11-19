import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import Header from '../components/Header.jsx'

export default function Clubs({ clubs }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const filtered = clubs.filter(
    (c) => !q || [c.name, c.nickname, c.city, c.stadium].join(' ').toLowerCase().includes(q),
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
              placeholder="Cari klub Premier League..."
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

        <div className="section-head">
          <h2 className="section-label">KLUB PREMIER LEAGUE</h2>
          <span className="section-link" style={{ cursor: 'default' }}>
            {filtered.length} KLUB
          </span>
        </div>

        {filtered.length ? (
          <div className="club-grid">
            {filtered.map((c) => (
              <article key={c.id} className="club-grid-item" onClick={() => navigate(`/clubs/${c.id}`)}>
                <div className="look-card">
                  <img src={c.logo_url} alt={c.name} loading="lazy" />
                </div>
                <div className="kit-name">{c.name}</div>
                <div className="kit-meta">
                  Berdiri {c.founded_year} &middot; {c.city}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-msg">Tidak ada klub yang cocok dengan &ldquo;{query}&rdquo;.</div>
        )}
      </div>
    </div>
  )
}
