import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const disableHmr = env.DISABLE_HMR === 'true';

  return {
    // GitHub Pages project:
    // https://barin-law.github.io/barinlaw/
    base: '/barinlaw/',

    plugins: [
      react(),
      tailwindcss(),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    server: {
      // AI Studio may disable HMR while editing.
      hmr: !disableHmr,

      // Disable file watching when HMR is disabled.
      watch: disableHmr ? null : {},
    },
  };
});
