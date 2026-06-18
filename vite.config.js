import { defineConfig } from 'vite';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        learning_path: resolve(__dirname, 'learning_path.html'),
        progress: resolve(__dirname, 'progress.html'),
        profile: resolve(__dirname, 'profile.html'),
        letter_drop: resolve(__dirname, 'letter_drop.html'),
        word_drop: resolve(__dirname, 'word_drop.html'),
        quiz_time: resolve(__dirname, 'quiz_time.html'),
      }
    }
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,woff}'],
        maximumFileSizeToCacheInBytes: 10485760, // 10MB
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: {
        name: 'KLPS Pangire Learner',
        short_name: 'KLPS Pangire',
        description: 'A fun and interactive educational platform for primary school students.',
        theme_color: '#f4fafd',
        background_color: '#f4fafd',
        display: 'standalone',
        icons: [
          {
            src: 'assets/preview_klps.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
