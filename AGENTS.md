# AGENTS.md

本文件为 AI 编码代理提供项目约定，避免重复踩已知的坑。改代码前先读。

## 项目概览

冯意欢的个人作品集网站（Yihuan's Lab）——9 岁创作者的编程作品集。
Vite + Vue 3 + Vue Router SPA，部署到 GitHub Pages（main 分支 push 自动构建部署）。
首页由极光背景 + Hero + 作品集 + 技能 + 里程碑 + 关于组成，另有独立 /about 页。

## 常用命令

```bash
npm install          # 安装依赖
npm run dev          # 开发服务器
npm run build        # 构建到 dist/
npm run preview      # 本地预览构建产物（http://localhost:4173/）
```

每次改完代码必须 `npm run build` 验证构建通过，再重启 `npm run preview` 实测。

## 目录结构

```
public/demos/                    # 11 个静态 demo HTML（中文文件名，勿改）
src/data/projects.js             # 作品数据唯一权威源
src/components/effects/          # 动效组件（移植自 vue-bits，已改纯 JS + scoped）
  AuroraBackground.vue           #   极光背景（ogl WebGL）
  SplitText.vue / ScrollReveal.vue / CountUp.vue / FadeContent.vue / Magnet.vue
src/components/                  # 页面组件（NavBar/HeroSection/ProjectsSection/...）
src/views/                       # Home.vue / About.vue
src/styles/                      # variables.css / global.css / animations.css
vite.config.js                   # manualChunks 分包 + 404.html 兜底
.github/workflows/deploy.yml     # GitHub Pages 自动部署
```

## 作品数据（src/data/projects.js）

- `projects` 数组：每项 `{ id, icon, name, description, tag, url }`；`url` 指向 `/demos/<中文文件名>.html` 或外部完整 URL。
- `categories`：筛选分类数组（不含「全部」）；`tagColors` / `tagBgColors`：分类颜色映射。
- 新增作品只改这一个文件。首页统计（作品数 / 类型数）从 `projects.length` 与 `categories.length - 1` 自动计算。
- 新增分类必须同时：`categories` 加一项、`tagColors`/`tagBgColors` 加映射、`src/styles/variables.css` 定义 `--tag-xxx`（dark 与 light 两套都要加）。
- **对象键 "3D" 必须带引号**（裸写 `3D:` 会导致 Rollup 语法错误，build 失败）。

## 样式约定（重点，都是踩过的坑）

- **主题级规则必须写在 `src/styles/global.css`**，不要写在组件 scoped 样式里。
- 坑 1：scoped 样式里写 `:global([data-theme='light']) .class` 会被编译器处理成全局规则 `[data-theme=light]{...}`，限定类名丢失、规则作用到整个 `<html>`（曾导致整页变透明）。
- 坑 2：覆盖文字渐变色时用 `background-image`，不要用 `background` 简写——简写会重置 `background-clip: text` 为默认值，标题会变成实心渐变矩形。
- 主题色板在 `variables.css`：暗色（`:root`）与亮色（`[data-theme='light']`）两套，组件样式一律用 `var(--xxx)`。
- 动效遵循舒缓风格：低速、低亮度、柔和蓝紫配色；`prefers-reduced-motion` 时降级为静态；页面隐藏时暂停渲染。

## 动效组件注意

- `FadeContent` 已实现为 IntersectionObserver + rAF 手写缓动。不要改回 gsap/ScrollTrigger 版——它在页面最后一个元素上 `start/end` 定位失效、永不触发。
- `AuroraBackground` 颜色随主题切换：亮色用更饱和的蓝紫（`#6a8dff` / `#8a5cf0`，brightness 0.95），暗色用默认（`#8aa4f0` / `#4f7ac9`，0.75）；通过 MutationObserver 监听 `html[data-theme]` 更新 shader uniform，勿删。

## 部署

- push main 触发 GitHub Actions：`npm ci && npm run build && upload-pages-artifact`。
- build 时 `closeBundle` 插件复制 `index.html` → `dist/404.html`，保证 GitHub Pages 直接访问 /about 不 404。
- 构建产物约 294KB（gzip 112KB），JS 分包为 vendor-vue / vendor-effects / 主包。

## 验证清单（改完必查）

1. `npm run build` 通过。
2. 预览 http://localhost:4173/：暗色/亮色主题切换正常（标题可读、极光可见）。
3. 作品筛选（每个分类点一遍）、demo 链接可打开、控制台 0 报错。
4. 统计数字与项目实际数量一致。
