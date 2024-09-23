import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import {VitePWA} from "vite-plugin-pwa";
import { fileURLToPath, URL } from 'url';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  // base: import.meta.env.BASE_URL || '/app',
  plugins: [vue(), vueDevTools(), VitePWA({
    registerType: 'prompt',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'DTsoFHIR',
      short_name: 'DTsoFHIR',
      description: 'A visualisation panel for display the FHIR data in Digital platform.',
      theme_color: '#ffffff',
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: true,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
  resolve: {
    alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // base: "/DigitalTWINonFHIRFrontend/",
  build: {
    outDir: "./build",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    host: "0.0.0.0",
    port: 3005,
    open: true,
    cors: true,
  }
})
