import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: process.env.TMC_BASE_PATH || '/',
    build: { manifest: true },
    plugins: [
      {
        name: 'withhold-operational-counts',
        enforce: 'pre',
        transform(code, id) {
          if (!id.replace(/\\/g, '/').endsWith('/src/data/researchInitiatives.ts')) return;
          // Source reconciliation retains the supplied figures. Public bundles
          // withhold those fields until Statistics Unit publication approval.
          return {
            code: code.replace(/\b(currentParticipants|samplesCount):\s*'[^']*'/g,
              (_, key) => `${key}: 'Awaiting publication approval'`),
            map: null,
          };
        },
      },
      react(), tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // Allow the site to be opened from another device on the same Wi-Fi/LAN.
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      host: '0.0.0.0',
      port: 4173,
      strictPort: true,
    },
  };
});
