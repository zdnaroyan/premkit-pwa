import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const PL_LION_ICON = 'https://assets.football-logos.cc/logos/england/700x700/english-premier-league.ee1e9b08.png'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      includeAssets: ['images/*.png'],
      manifest: {
        name: 'PremKit — Arsip Jersey Klasik Premier League',
        short_name: 'PremKit',
        description: 'Katalog non-jual-beli jersey klasik terbaik dari 11 klub Premier League.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#FFFFFF',
        theme_color: '#FFFFFF',
        icons: [
          { src: PL_LION_ICON, sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: PL_LION_ICON, sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,webp,webmanifest}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/premkit-api\.vercel\.app\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'premkit-api-cache',
              expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/assets\.football-logos\.cc\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'premkit-icons-cache',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
