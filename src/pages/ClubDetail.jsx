import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function ClubDetail({ clubs, jerseys }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const club = clubs.find((c) => String(c.id) === String(id)) || clubs[0]
  if (!club) return null

  const kit = (club.jerseys && club.jerseys[0]) || jerseys.find((j) => j.club_id === club.id)

  return (
    <div className="view-enter" style={{ position: 'relative' }}>
      <header className="top-header top-header--overlay">
        <button
          type="button"
          className="header-icon-btn"
          onClick={() => navigate('/clubs')}
          aria-label="Back"
        >
          <ArrowLeft size={20} strokeWidth={1.75} />
        </button>
        <span className="overlay-title">{club.name}</span>
        <span />
      </header>

      <section className="club-editorial-hero">
        <img className="club-editorial-crest" src={club.logo_url} alt={club.name} />
        <div className="club-editorial-sub">{club.nickname}</div>
      </section>

      <section className="club-overlap-section">
        <div className="overlap-label">PROFILE</div>
        <div className="club-fact-strip">
          <div className="club-fact-card">
            <div className="club-fact-num">{club.founded_year}</div>
            <div className="club-fact-key">Founded</div>
          </div>
          <div className="club-fact-card">
            <div className="club-fact-num">{club.city.split(' ')[0]}</div>
            <div className="club-fact-key">City</div>
          </div>
          <div className="club-fact-card">
            <div className="club-fact-num">{kit ? kit.season.slice(0, 4) : 'PL'}</div>
            <div className="club-fact-key">Kit Era</div>
          </div>
        </div>

        <p className="club-desc-block">
          {club.description} Home ground:{' '}
          <strong style={{ color: '#111', fontWeight: 600 }}>{club.stadium}</strong>.
        </p>

        {kit && (
          <>
            <div className="section-head">
              <h2 className="section-label">SIGNATURE KIT</h2>
              <button
                type="button"
                className="section-link"
                onClick={() => navigate(`/jerseys/${kit.id}`)}
              >
                Inspect
              </button>
            </div>
            <div className="kit-grid" style={{ gridTemplateColumns: '1fr' }}>
              <article
                className="kit-grid-card"
                onClick={() => navigate(`/jerseys/${kit.id}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  borderTop: '1px solid #ececec',
                  paddingTop: '18px',
                }}
              >
                <div className="kit-thumb" style={{ width: '116px', flexShrink: 0, marginBottom: 0 }}>
                  <img src={kit.image_url} alt={kit.title} />
                </div>
                <div>
                  <div className="kit-name">{kit.title}</div>
                  <div className="kit-meta">
                    {kit.season} &middot; {kit.manufacturer}
                  </div>
                  <div className="kit-meta" style={{ marginTop: '6px' }}>
                    Icon: {kit.iconic_player}
                  </div>
                </div>
              </article>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
