import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '冯意欢的创意空间',
  description: '9岁编程小达人的个人作品展示',
  base: '/',
  appearance: 'dark',
  
  themeConfig: {
    nav: [
      { text: '🏠 首页', link: '/' },
      { text: '🎮 游戏', link: '/games/' },
      { text: '🪐 3D展示', link: '/demos/solar-system' },
      { text: '🎨 创意交互', link: '/creative/' },
      { text: '✨ 视觉效果', link: '/visual/' },
      { text: '🔬 科学实验', link: '/science/' },
    ],
    
    sidebar: {
      '/games/': [
        {
          text: '🎮 游戏',
          items: [
            { text: '2048 经典版', link: '/games/2048' },
            { text: '2048 反向版', link: '/games/2048-reverse' },
            { text: '2048 自选棋盘', link: '/games/2048-custom' },
            { text: '2048 道具版', link: '/games/2048-items' },
          ]
        }
      ],
      '/creative/': [
        {
          text: '🎨 创意交互',
          items: [
            { text: '声控涂鸦', link: '/creative/voice-doodle' },
            { text: '幻蓝灵球', link: '/creative/blue-sphere' },
            { text: '手势控制图形', link: '/creative/gesture-shape' },
          ]
        }
      ],
      '/visual/': [
        {
          text: '✨ 视觉效果',
          items: [
            { text: '电子万花尺', link: '/visual/spirograph' },
            { text: '粒子魔法·指尖星河', link: '/visual/particle-magic' },
          ]
        }
      ],
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yihuanfeng' }
    ],
    
    footer: {
      message: '用 ❤️ 和代码创造的创意作品',
      copyright: 'Copyright © 2024'
    }
  },
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#1a1a2e' }]
  ]
})
