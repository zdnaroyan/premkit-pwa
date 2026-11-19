import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header.jsx'

const DETAIL_TABS = [
  { key: 'SEJARAH', label: 'Sejarah' },
  { key: 'DESAIN', label: 'Desain' },
  { key: 'IKON', label: 'Ikon' },
  { key: 'DETAIL', label: 'Detail' },
]

export default function JerseyDetail({ jerseys, clubs, onInspect }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState('SEJARAH')

  const idx = Math.max(
    0,
    jerseys.findIndex((j) => String(j.id) === String(id)),
  )
  const kit = jerseys[idx] || jerseys[0]
  if (!kit) return null

  const club = kit.clubs || clubs.find((c) => c.id === kit.club_id) || {}

  return (
    <div className="view-enter">
      <Header showBack backTo="/jerseys" />

      <div className="content-container detail-responsive-grid">
        <div className="detail-stage-wrap">
          <img
            className="detail-kit-img"
            src={kit.image_url}
            alt={kit.title}
            onClick={() => onInspect({ src: kit.image_url, alt: kit.title })}
          />
        </div>

        <section className="detail-sheet">
          <div className="sheet-head">
            <div>
              <h1 className="sheet-title">{kit.title}</h1>
              <div className="sheet-subtitle">
                {kit.season} &middot; {kit.manufacturer} &middot; {kit.sponsor || 'Klasik'}
              </div>
            </div>
            <button
              type="button"
              className="black-pill-btn"
              onClick={() => navigate(`/clubs/${club.id}`)}
            >
              LIHAT KLUB
            </button>
          </div>

          <div className="circle-tabs" role="tablist">
            {DETAIL_TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                className={`circle-tab ${tab === t.key ? 'active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'SEJARAH' && <p className="sheet-copy">{kit.story}</p>}
          {tab === 'DESAIN' && <p className="sheet-copy">{kit.design_notes}</p>}
          {tab === 'IKON' && (
            <div className="spec-mini-list">
              <div>
                <div className="spec-mini-key">Pemain Ikonik</div>
                <div className="spec-mini-val">{kit.iconic_player}</div>
              </div>
              <div>
                <div className="spec-mini-key">Musim</div>
                <div className="spec-mini-val">{kit.season}</div>
              </div>
              <div>
                <div className="spec-mini-key">Klub</div>
                <div className="spec-mini-val">{club.name}</div>
              </div>
              <div>
                <div className="spec-mini-key">Stadion</div>
                <div className="spec-mini-val">{club.stadium}</div>
              </div>
            </div>
          )}
          {tab === 'DETAIL' && (
            <div className="spec-mini-list">
              <div>
                <div className="spec-mini-key">Pabrikan</div>
                <div className="spec-mini-val">{kit.manufacturer}</div>
              </div>
              <div>
                <div className="spec-mini-key">Sponsor</div>
                <div className="spec-mini-val">{kit.sponsor || '—'}</div>
              </div>
              <div>
                <div className="spec-mini-key">Tipe Jersey</div>
                <div className="spec-mini-val">{kit.kit_type}</div>
              </div>
              <div>
                <div className="spec-mini-key">Mode Katalog</div>
                <div className="spec-mini-val">Pameran · Non-Jual-Beli</div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
