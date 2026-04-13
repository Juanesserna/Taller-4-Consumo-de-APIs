import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt','gato-1200x630.png','192x192-ufos.png','512x512.png'],
      workbox:{
        navigateFallback:'/index.html',
        globPatterns:["**/*.{jsx,css,html,png,svg,ico,txt,jpg}"]
      },
      manifest: {
        name: 'App de gastos',
        short_name: 'ReactPWA',
        description: 'App de gastos desarrollada en React',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        screenshots: [
          {
            src: '/img/gato-1200x630.png',
            sizes: '1200x630',
            type: 'image/png',
            form_factor: 'narrow'//Narrow mobile
          },
          {
            src: '/img/gato-1200x630.png',
            sizes: '1200x630',
            type: 'image/png',
            form_factor: 'wide'//Wide Desktop
          }
        ],
        icons: [
          {
            src: '/img/192x192-ufos.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/img/512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
