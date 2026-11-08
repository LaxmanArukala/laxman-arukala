import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/laxman-arukala/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // three.js is lazy-loaded on its own and is expected to be large.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          animation: ['gsap', 'lenis'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
