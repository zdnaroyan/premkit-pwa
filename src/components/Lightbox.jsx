import { useEffect } from 'react'

export default function Lightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [image, onClose])

  return (
    <div
      className={`lightbox ${image ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Tampilan Detail Gambar Jersey"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button type="button" className="lightbox-close" onClick={onClose} aria-label="Tutup">
        &times;
      </button>
      {image && <img src={image.src} alt={image.alt} />}
    </div>
  )
}
