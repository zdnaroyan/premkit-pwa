import { resolveMedia } from '../data/media.js'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://premkit-api.vercel.app'
const CACHE_KEY = 'premkit_archive_cache_v1'

export async function fetchArchive() {
  try {
    const [clubsRes, jerseysRes] = await Promise.all([
      fetch(`${API_BASE}/api/clubs`),
      fetch(`${API_BASE}/api/jerseys`),
    ])
    if (!clubsRes.ok || !jerseysRes.ok) throw new Error('API request failed')
    const [clubsRaw, jerseysRaw] = await Promise.all([clubsRes.json(), jerseysRes.json()])

    const clubMap = new Map()
    const clubs = clubsRaw.map((c) => {
      const club = { ...c, logo_url: resolveMedia(c.name, c.logo_url, 'logo') }
      clubMap.set(club.id, club)
      return club
    })

    const jerseys = jerseysRaw.map((j) => {
      const club = clubMap.get(j.club_id) || j.clubs || {}
      const name = club.name || ''
      return {
        ...j,
        image_url: resolveMedia(name, j.image_url, 'jersey'),
        clubs: { ...club, logo_url: resolveMedia(name, club.logo_url, 'logo') },
      }
    })

    clubs.forEach((c) => {
      c.jerseys = jerseys.filter((j) => j.club_id === c.id)
    })

    const payload = { clubs, jerseys, apiLive: true }
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ clubs, jerseys }))
    } catch (_) {}
    return payload
  } catch (err) {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        return { ...parsed, apiLive: false }
      }
    } catch (_) {}
    throw err
  }
}
