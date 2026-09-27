import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * 构建结束后把 index.html 复制为 404.html。
 * GitHub Pages 会用 404.html 兜底，保证 SPA 路由（如 /about）
 * 在直接访问或刷新时也能正常加载。
 */
function spa404Fallback() {
  return {
    name: 'spa-404-fallback',
    closeBundle() {
      const fs = require('node:fs')
      const path = require('node:path')
      const dist = path.resolve(__dirname, 'dist')
      fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'))
    }
  }
}

export default defineConfig({
  plugins: [vue(), spa404Fallback()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router'],
          'vendor-effects': ['gsap', 'ogl']
        }
      }
    }
  }
})
