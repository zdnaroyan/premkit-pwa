import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { fetchArchive } from './services/api.js'
import BottomNav from './components/BottomNav.jsx'
import Lightbox from './components/Lightbox.jsx'
import Home from './pages/Home.jsx'
import Jerseys from './pages/Jerseys.jsx'
import JerseyDetail from './pages/JerseyDetail.jsx'
import Clubs from './pages/Clubs.jsx'
import ClubDetail from './pages/ClubDetail.jsx'
import About from './pages/About.jsx'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

export default function App() {
  const [clubs, setClubs] = useState([])
  const [jerseys, setJerseys] = useState([])
  const [apiLive, setApiLive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const raw = localStorage.getItem('premkit_saved_kits')
      return new Set(raw ? JSON.parse(raw) : [])
    } catch (_) {
      return new Set()
    }
  })
  const [lightboxImg, setLightboxImg] = useState(null)

  const loadData = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchArchive()
      setClubs(data.clubs)
      setJerseys(data.jerseys)
      setApiLive(data.apiLive)
    } catch (err) {
      setError(err.message || 'Gagal memuat katalog dari API.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const toggleSave = (kitId) => {
    setSavedIds((prev) => {
      const next = new Set(prev)
      if (next.has(kitId)) next.delete(kitId)
      else next.add(kitId)
      try {
        localStorage.setItem('premkit_saved_kits', JSON.stringify([...next]))
      } catch (_) {}
      return next
    })
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="stage-watermark" aria-hidden="true">
        <span>PREMKIT</span>
        <span>ARCHIVE</span>
        <span>PREMKIT</span>
      </div>

      <div className="phone-frame">
        <main className="app-main">
          {loading ? (
            <div className="empty-msg" style={{ paddingTop: '140px' }}>
              Loading classic archive...
            </div>
          ) : error ? (
            <div className="empty-msg" style={{ paddingTop: '120px' }}>
              <p style={{ marginBottom: '16px' }}>{error}</p>
              <button type="button" className="black-pill-btn" onClick={loadData}>
                RETRY
              </button>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Home clubs={clubs} jerseys={jerseys} />} />
              <Route path="/jerseys" element={<Jerseys jerseys={jerseys} />} />
              <Route
                path="/jerseys/:id"
                element={
                  <JerseyDetail
                    jerseys={jerseys}
                    clubs={clubs}
                    savedIds={savedIds}
                    onToggleSave={toggleSave}
                    onInspect={setLightboxImg}
                  />
                }
              />
              <Route path="/clubs" element={<Clubs clubs={clubs} />} />
              <Route path="/clubs/:id" element={<ClubDetail clubs={clubs} jerseys={jerseys} />} />
              <Route
                path="/about"
                element={
                  <About
                    clubsCount={clubs.length}
                    savedCount={savedIds.size}
                    apiLive={apiLive}
                  />
                }
              />
            </Routes>
          )}
        </main>

        <BottomNav />
      </div>

      <Lightbox image={lightboxImg} onClose={() => setLightboxImg(null)} />
    </BrowserRouter>
  )
}
