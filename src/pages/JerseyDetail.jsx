import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Header from '../components/Header.jsx'

const DETAIL_TABS = [
  { key: 'HISTORY', label: 'History' },
  { key: 'DESIGN', label: 'Design' },
  { key: 'ICON', label: 'Icon' },
  { key: 'SPECS', label: 'Specs' },
]

export default function JerseyDetail({ jerseys, clubs, savedIds, onToggleSave, onInspect }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState('HISTORY')

  const idx = Math.max(
    0,
    jerseys.findIndex((j) => String(j.id) === String(id)),
  )
  const kit = jerseys[idx] || jerseys[0]
  if (!kit) return null

  const club = kit.clubs || clubs.find((c) => c.id === kit.club_id) || {}
  const isSaved = savedIds.has(kit.id)
  const dotIndices = [0, 1, 2, 3, 4].map((o) => (idx - 2 + o + jerseys.length) % jerseys.length)

  return (
    <div className="view-enter">
      <Header
        showBack
        backTo="/jerseys"
        rightSlot={
          <button
            type="button"
            className="header-icon-btn"
            onClick={() => onToggleSave(kit.id)}
            aria-label="Save kit"
          >
            <Heart
              size={20}
              strokeWidth={1.7}
              fill={isSaved ? '#111111' : 'none'}
              color="#111111"
            />
          </button>
        }
      />

      <div className="detail-stage-wrap">
        <img
          className="detail-kit-img"
          src={kit.image_url}
          alt={kit.title}
          onClick={() => onInspect({ src: kit.image_url, alt: kit.title })}
        />
        <div className="vertical-dots" aria-label="Switch featured kits">
          {dotIndices.map((i) => (
            <button
              key={jerseys[i].id}
              type="button"
              className={`v-dot ${i === idx ? 'active' : ''}`}
              onClick={() => navigate(`/jerseys/${jerseys[i].id}`)}
              aria-label={jerseys[i].clubs?.name}
            />
          ))}
        </div>
      </div>

      <section className="detail-sheet">
        <div className="sheet-head">
          <div>
            <h1 className="sheet-title">{kit.title}</h1>
            <div className="sheet-subtitle">
              {kit.season} &middot; {kit.manufacturer} &middot; {kit.sponsor || 'Classic'}
            </div>
          </div>
          <button
            type="button"
            className="black-pill-btn"
            onClick={() => navigate(`/clubs/${club.id}`)}
          >
            VIEW CLUB
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

        {tab === 'HISTORY' && <p className="sheet-copy">{kit.story}</p>}
        {tab === 'DESIGN' && <p className="sheet-copy">{kit.design_notes}</p>}
        {tab === 'ICON' && (
          <div className="spec-mini-list">
            <div>
              <div className="spec-mini-key">Iconic Player</div>
              <div className="spec-mini-val">{kit.iconic_player}</div>
            </div>
            <div>
              <div className="spec-mini-key">Season</div>
              <div className="spec-mini-val">{kit.season}</div>
            </div>
            <div>
              <div className="spec-mini-key">Club</div>
              <div className="spec-mini-val">{club.name}</div>
            </div>
            <div>
              <div className="spec-mini-key">Stadium</div>
              <div className="spec-mini-val">{club.stadium}</div>
            </div>
          </div>
        )}
        {tab === 'SPECS' && (
          <div className="spec-mini-list">
            <div>
              <div className="spec-mini-key">Manufacturer</div>
              <div className="spec-mini-val">{kit.manufacturer}</div>
            </div>
            <div>
              <div className="spec-mini-key">Sponsor</div>
              <div className="spec-mini-val">{kit.sponsor || '—'}</div>
            </div>
            <div>
              <div className="spec-mini-key">Kit Type</div>
              <div className="spec-mini-val">{kit.kit_type}</div>
            </div>
            <div>
              <div className="spec-mini-key">Archive Mode</div>
              <div className="spec-mini-val">Exhibition Only</div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
