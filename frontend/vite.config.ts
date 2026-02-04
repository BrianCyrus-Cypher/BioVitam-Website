/// <reference types="vitest" />
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    allowedHosts: [
      'olivia-bulbar-tomasa.ngrok-free.dev'
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunking for better caching
          if (id.includes('node_modules')) {
            // Separate React and related libs (but keep them together to avoid circular deps)
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router') || 
                id.includes('scheduler') || id.includes('prop-types')) {
              return 'react-vendor';
            }
            // Separate Framer Motion for animation
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            // Separate UI libraries
            if (id.includes('lucide-react') || id.includes('class-variance-authority') || 
                id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'ui-vendor';
            }
            // Separate large libraries
            if (id.includes('axios') || id.includes('zod')) {
              return 'utils-vendor';
            }
            // Everything else in vendor
            return 'vendor';
          }
        },
        // Optimize asset file names for caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.');
          const ext = info?.[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/woff2?|ttf|otf|eot/i.test(ext || '')) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    // Optimize minification (using esbuild for faster builds)
    minify: 'esbuild',
    target: 'es2020',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Source maps for production debugging (optional)
    sourcemap: false,
    // Report compressed size for analysis
    reportCompressedSize: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
