# 🎨 创意工坊 - 个人作品展示网站

一个基于 VitePress 构建的个人创意作品展示网站，整合了多个 HTML5 交互作品。

## ✨ 作品列表

### 🎮 游戏
- 2048 经典版
- 2048 反向版
- 2048 自选棋盘
- 2048 道具版

### 🪐 3D展示
- 八大行星（Three.js）

### 🎨 创意交互
- 声控涂鸦
- 幻蓝灵球
- 手势控制图形

### ✨ 视觉效果
- 电子万花尺
- 粒子魔法·指尖星河

### 🔬 科学实验
- 科学小实验-弹出的瓶盖

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 📦 部署到 GitHub Pages

1. 在 GitHub 创建名为 `my-portfolio` 的仓库
2. 将代码推送到仓库
3. 进入仓库 Settings > Pages
4. Source 选择 "GitHub Actions"
5. 推送代码到 main 分支会自动触发部署

## 🛠️ 技术栈

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- HTML5 / CSS3 / JavaScript
- Canvas 2D / WebGL / Three.js
- Web Audio API

## 📝 自定义配置

编辑 `docs/.vitepress/config.mjs` 修改站点配置：
- 网站标题和描述
- 导航栏
- 侧边栏
- 社交链接

编辑 `docs/.vitepress/theme/style.css` 修改主题样式。
