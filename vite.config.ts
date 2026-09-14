import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },

  server: {
    // HMR is disabled in AI Studio through the DISABLE_HMR environment variable.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    hmr: process.env.DISABLE_HMR !== 'true',

    // Disable file watching to reduce CPU usage during AI Studio edits.
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
}));
