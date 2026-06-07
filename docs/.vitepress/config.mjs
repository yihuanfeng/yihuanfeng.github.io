import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Yihuan's Lab",
  description: '9岁编程小达人的创意空间 - 包含2048游戏、3D行星展示、科学实验等互动作品',
  base: '/',

  // 📌 SEO 相关 head 配置
  head: [
    // Favicon
    ['link', { rel: 'icon', href: '/favicon.ico' }],

    // 基础 Meta
    ['meta', { name: 'theme-color', content: '#EEF2FF' }],
    ['meta', { name: 'author', content: 'Yihuan 冯意欢' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'keywords', content: '编程, 科学实验, 2048游戏, Three.js, 儿童编程, 创意作品, HTML5游戏' }],

    // Open Graph (社交分享)
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: "Yihuan's Lab" }],
    ['meta', { property: 'og:title', content: "Yihuan's Lab - 创意编程作品集" }],
    ['meta', { property: 'og:description', content: '9岁编程小达人的创意空间，包含互动游戏、3D展示、科学实验等作品' }],
    ['meta', { property: 'og:image', content: 'https://yihuanfeng.github.io/og-image.png' }],
    ['meta', { property: 'og:url', content: 'https://yihuanfeng.github.io/' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@yihuanfeng' }],
    ['meta', { name: 'twitter:title', content: "Yihuan's Lab - 创意编程作品集" }],
    ['meta', { name: 'twitter:description', content: '9岁编程小达人的创意空间' }],
    ['meta', { name: 'twitter:image', content: 'https://yihuanfeng.github.io/og-image.png' }],

    // Canonical URL
    ['link', { rel: 'canonical', href: 'https://yihuanfeng.github.io/' }],
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/about' },
    ],

    // 作品页面导航
    sidebar: {
      '/games/': [
        {
          text: '🎮 游戏',
          items: [
            { text: '2048 经典版', link: '/games/2048' },
            { text: '2048 反向版', link: '/games/2048-reverse' },
            { text: '2048 自选棋盘', link: '/games/2048-custom' },
            { text: '2048 道具版', link: '/games/2048-powerup' },
          ]
        }
      ],
      '/creative/': [
        {
          text: '🎨 创意交互',
          items: [
            { text: '声控涂鸦', link: '/creative/voice-draw' },
            { text: '幻蓝灵球', link: '/creative/blue-orb' },
            { text: '手势控制图形', link: '/creative/gesture' },
          ]
        }
      ],
      '/science/': [
        {
          text: '🔬 科学实验',
          items: [
            { text: '弹出的瓶盖', link: '/science/bottle-cap' },
          ]
        }
      ],
      '/visual/': [
        {
          text: '✨ 视觉效果',
          items: [
            { text: '电子万花尺', link: '/visual/spirograph' },
            { text: '粒子魔法·指尖星河', link: '/visual/particles' },
          ]
        }
      ],
      '/demos/': [
        {
          text: '🪐 3D展示',
          items: [
            { text: '八大行星', link: '/demos/planets' },
          ]
        }
      ],
    },

    footer: {
      message: 'Made with ❤️ and code',
      copyright: `© ${new Date().getFullYear()} Yihuan 冯意欢`
    },

    // 社会化链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yihuanfeng' }
    ]
  }
})
