import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/forme-sophie/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png'],
      manifest: {
        name: 'Sophie en forme',
        short_name: 'En forme',
        description: 'Mon programme tonus, ventre plat & bonne humeur — en douceur 💗',
        lang: 'fr',
        start_url: '/forme-sophie/',
        scope: '/forme-sophie/',
        display: 'standalone',
        background_color: '#faf6f1',
        theme_color: '#cf7682',
        orientation: 'portrait',
        icons: [
          { src: '/forme-sophie/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/forme-sophie/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: '/forme-sophie/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
      },
    }),
  ],
})
