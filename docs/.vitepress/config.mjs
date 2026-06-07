import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Yihuan's Lab",
  description: '9岁编程小达人的创意空间',
  base: '/',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/about' },
    ],
    
    footer: {
      message: 'Made with ❤️ and code',
      copyright: `© ${new Date().getFullYear()} Yihuan`
    }
  },
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#EEF2FF' }]
  ]
})
