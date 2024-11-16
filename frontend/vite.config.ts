import path from 'path'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import rollupNodePolyfills from 'rollup-plugin-node-polyfills'
import inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    rollupNodePolyfills(), // Polyfill Node.js modules
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      common: path.resolve(__dirname, 'src/common'),
      blocks: path.resolve(__dirname, 'src/blocks'),
      modules: path.resolve(__dirname, 'src/modules'),
      pages: path.resolve(__dirname, 'src/pages'),
      structure: path.resolve(__dirname, 'src/structure'),
      config: path.resolve(__dirname, 'src/config'),
      global: 'global-this', // Polyfill global to `globalThis`
      'node-fetch': 'cross-fetch',
      crypto: 'crypto-browserify',
      buffer: 'buffer',
      stream: 'stream-browserify',
    },
  },
  define: {
    global: 'window', // Define global as window for browser compatibility
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      plugins: [
        rollupNodePolyfills(),
        inject({
          global: ['global-this', 'default'], // Inject global polyfill
          process: 'process/browser', // Inject process polyfill
          Buffer: ['buffer', 'Buffer'], // Inject Buffer polyfill
        }),
      ],
    },
  },
})
