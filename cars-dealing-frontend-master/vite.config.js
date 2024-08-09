import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/MyPhone': {
        target: 'https://1676.3cx.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/MyPhone/, '/MyPhone'),
      },
    },
  }
})
