import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署設定
  // 如果你的 repo 名稱是 Mindful-News，則 base 應該設為 '/Mindful-News/'
  // 如果部署到 username.github.io，則設為 '/'
  base: '/Mindful-News/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
