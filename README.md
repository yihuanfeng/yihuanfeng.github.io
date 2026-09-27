# 🧪 冯意欢的实验室 — Yihuan's Lab

9 岁小创作者的编程作品集，基于 Vite + Vue 3 构建，包含游戏、3D、创意、视觉与科学实验等互动作品。

## ✨ 特性

- **柔和极光背景** — WebGL 渲染（ogl），低速舒缓、支持鼠标轻量视差，页面隐藏时自动暂停渲染
- **作品集展示** — 12 个作品按分类筛选，卡片滚动渐入
- **文字动效** — 标题逐字浮现、区块标题滚动揭示、数字滚动（GSAP + vue-bits 组件移植）
- **亮暗双模式** — 深浅两套主题，本地记忆、无闪烁切换
- **响应式** — 适配桌面和移动端
- **SPA 路由兜底** — 构建时自动生成 404.html，GitHub Pages 直接访问 /about 也不 404

## 🎮 作品列表

| 分类 | 作品 |
|------|------|
| 🎮 游戏 | 2048 经典版、反向版、自选棋盘、道具版 |
| 🪐 3D | 太阳系（Three.js，含八大行星、月球与冥王星） |
| 🎨 创意 | 声控涂鸦、声控魔法球、手势控制图形 |
| ✨ 视觉 | 五角星烟花画板、电子万花尺 |
| 🔬 科学 | 弹出的瓶盖 |
| ⛏️ 沙盒 | VoxelCraft 网页版（挖矿、搭建、合成） |

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build

# 预览构建结果
npm run preview
```

## 📦 部署

推送到 main 分支会自动通过 GitHub Actions 部署到 GitHub Pages。

## 🛠️ 技术栈

- [Vite](https://vite.dev/) + [Vue 3](https://vuejs.org/) — 构建工具和框架
- [Vue Router](https://router.vuejs.org/) — 路由
- [GSAP](https://gsap.com/) — 滚动与文字动画
- [ogl](https://oframe.github.io/ogl/) — WebGL 极光背景
- 动效组件移植自 [vue-bits](https://github.com/DavidHDev/vue-bits)（MIT + Commons Clause 许可，仅限非商业使用）
