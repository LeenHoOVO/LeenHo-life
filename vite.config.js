import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/LeenHo-life/",
  plugins: [vue()],
  server: {
    host: 'localhost',
    port: 5173,
    hmr: {
      host: 'localhost',
    },
    watch: {
      usePolling: true,
    },
  },
})
