import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  // Required because the app is hosted inside the /barinlaw/ repository path.
  base: '/barinlaw/',

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },

  server: {
    // HMR is disabled in AI Studio through the DISABLE_HMR environment variable.
    hmr: process.env.DISABLE_HMR !== 'true',

    // Disable file watching during AI Studio edits.
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
}));
