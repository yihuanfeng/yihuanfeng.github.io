/**
 * 作品数据 — 描述基于各 demo 的实际内容核对过
 */
export const projects = [
  {
    id: '2048',
    icon: '🎮',
    name: '2048 经典版',
    description: '用方向键合并相同数字，看看你能不能合成 2048。',
    tag: '游戏',
    url: '/demos/2048.html'
  },
  {
    id: '2048-reverse',
    icon: '🎮',
    name: '2048 反向版',
    description: '把规则倒过来：数字从大到小合并，思路也要反转。',
    tag: '游戏',
    url: '/demos/2048 反向.html'
  },
  {
    id: '2048-custom',
    icon: '🎮',
    name: '2048 自选棋盘',
    description: '棋盘尺寸自己选，玩法由你掌控。',
    tag: '游戏',
    url: '/demos/2048 自选棋盘.html'
  },
  {
    id: '2048-powerup',
    icon: '🎮',
    name: '2048 道具版',
    description: '带道具的 2048：可以消除方块、让数字翻倍，策略性更强。',
    tag: '游戏',
    url: '/demos/2048 道具版.html'
  },
  {
    id: 'solar-system',
    icon: '🪐',
    name: '太阳系',
    description: '用 Three.js 做的 3D 太阳系，包含八大行星、月球和冥王星。',
    tag: '3D',
    url: '/demos/八大行星.html'
  },
  {
    id: 'voice-draw',
    icon: '🎨',
    name: '声控涂鸦',
    description: '对着麦克风说话，用声音控制画笔作画；还有橡皮擦、撤销和继续功能。',
    tag: '创意',
    url: '/demos/声控涂鸦.html'
  },
  {
    id: 'blue-orb',
    icon: '🎨',
    name: '声控魔法球',
    description: '一个会听声音的魔法球：你说话，它就跟着音量变大变小。',
    tag: '创意',
    url: '/demos/幻蓝灵球.html'
  },
  {
    id: 'gesture',
    icon: '🎨',
    name: '手势控制图形',
    description: '不用鼠标，用手势就能控制屏幕上的图形。',
    tag: '创意',
    url: '/demos/手势控制图形.html'
  },
  {
    id: 'particles',
    icon: '✨',
    name: '五角星烟花画板',
    description: '指尖一点，绽放五角星烟花，画出一片星空。',
    tag: '视觉',
    url: '/demos/第一课+粒子魔法+指尖星河.html'
  },
  {
    id: 'spirograph',
    icon: '✨',
    name: '电子万花尺',
    description: '像真的万花尺一样，转动出对称又有规律的图案。',
    tag: '视觉',
    url: '/demos/电子万花尺.html'
  },
  {
    id: 'bottle-cap',
    icon: '🔬',
    name: '弹出的瓶盖',
    description: '把科学小实验搬进浏览器，看看瓶盖是怎么弹出来的。',
    tag: '科学',
    url: '/demos/科学小实验-弹出的瓶盖.html'
  },
  {
    id: 'voxelcraft',
    icon: '⛏️',
    name: 'VoxelCraft 网页版',
    description: '网页版迷你沙盒世界：挖矿、搭方块、合成物品，还能穿过传送门进入下界。',
    tag: '沙盒',
    url: 'https://yihuanfeng.github.io/voxelcraft-web/game.html'
  }
]

export const categories = ['全部', '游戏', '3D', '创意', '视觉', '科学', '沙盒']

export const tagColors = {
  游戏: 'var(--tag-game)',
  '3D': 'var(--tag-3d)',
  创意: 'var(--tag-creative)',
  视觉: 'var(--tag-visual)',
  科学: 'var(--tag-science)',
  沙盒: 'var(--tag-sandbox)'
}

/** 每个分类的浅色底（用于标签背景） */
export const tagBgColors = {
  游戏: 'color-mix(in srgb, var(--tag-game) 16%, transparent)',
  '3D': 'color-mix(in srgb, var(--tag-3d) 16%, transparent)',
  创意: 'color-mix(in srgb, var(--tag-creative) 16%, transparent)',
  视觉: 'color-mix(in srgb, var(--tag-visual) 16%, transparent)',
  科学: 'color-mix(in srgb, var(--tag-science) 16%, transparent)',
  沙盒: 'color-mix(in srgb, var(--tag-sandbox) 16%, transparent)'
}
