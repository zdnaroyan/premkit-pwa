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
        <div className="top-header-inner">
          <button
            type="button"
            className="header-icon-btn"
            onClick={() => navigate('/clubs')}
            aria-label="Kembali"
          >
            <ArrowLeft size={20} strokeWidth={1.75} />
          </button>
          <span className="overlay-title">{club.name}</span>
          <span />
        </div>
      </header>

      <section className="club-editorial-hero">
        <img className="club-editorial-crest" src={club.logo_url} alt={club.name} />
        <div className="club-editorial-sub">{club.nickname}</div>
      </section>

      <section className="club-overlap-section content-container">
        <div className="overlap-label">PROFIL KLUB</div>
        <div className="club-fact-strip">
          <div className="club-fact-card">
            <div className="club-fact-num">{club.founded_year}</div>
            <div className="club-fact-key">Berdiri</div>
          </div>
          <div className="club-fact-card">
            <div className="club-fact-num">{club.city.split(' ')[0]}</div>
            <div className="club-fact-key">Kota</div>
          </div>
          <div className="club-fact-card">
            <div className="club-fact-num">{kit ? kit.season.slice(0, 4) : 'PL'}</div>
            <div className="club-fact-key">Era Jersey</div>
          </div>
        </div>

        <p className="club-desc-block">
          {club.description} Stadion kandang:{' '}
          <strong style={{ color: '#111', fontWeight: 600 }}>{club.stadium}</strong>.
        </p>

        {kit && (
          <>
            <div className="section-head">
              <h2 className="section-label">JERSEY KLASIK ANDALAN</h2>
              <button
                type="button"
                className="section-link"
                onClick={() => navigate(`/jerseys/${kit.id}`)}
              >
                Lihat Detail
              </button>
            </div>
            <div className="club-signature-wrap">
              <article
                className="club-signature-card"
                onClick={() => navigate(`/jerseys/${kit.id}`)}
              >
                <div className="kit-thumb club-signature-thumb">
                  <img src={kit.image_url} alt={kit.title} />
                </div>
                <div>
                  <div className="kit-name">{kit.title}</div>
                  <div className="kit-meta">
                    {kit.season} &middot; {kit.manufacturer} &middot; {kit.kit_type}
                  </div>
                  <div className="kit-meta" style={{ marginTop: '6px' }}>
                    Pemain Ikonik: {kit.iconic_player}
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
