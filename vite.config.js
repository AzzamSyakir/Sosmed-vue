import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 9999,
    hot: true
  },
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '@': path.resolve(__dirname, './src')
    },
  },
})
