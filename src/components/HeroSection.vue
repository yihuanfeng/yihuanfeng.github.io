<template>
  <section class="hero">
    <div class="hero-inner">
      <p class="hero-eyebrow">WELCOME TO MY LAB</p>

      <SplitText
        tag="h1"
        :text="title"
        class="hero-title"
        text-align="center"
        :delay="26"
        :duration="1.05"
      />

      <p class="hero-subtitle">
        你好，我是冯意欢。今年 9 岁，用代码做游戏、画画、做小实验。
      </p>

      <div class="hero-stats">
        <div class="stat">
          <CountUp :to="projectCount" class="stat-num" />
          <span class="stat-label">个作品</span>
        </div>
        <div class="stat-divider" aria-hidden="true"></div>
        <div class="stat">
          <CountUp :to="categoryCount" class="stat-num" />
          <span class="stat-label">种类型</span>
        </div>
        <div class="stat-divider" aria-hidden="true"></div>
        <div class="stat">
          <CountUp :to="2" class="stat-num" />
          <span class="stat-label">年编程</span>
        </div>
      </div>

      <div class="hero-actions">
        <Magnet :magnet-strength="4">
          <a href="#works" class="btn btn--primary">看看作品</a>
        </Magnet>
        <Magnet :magnet-strength="4">
          <router-link to="/about" class="btn btn--ghost">关于我</router-link>
        </Magnet>
      </div>

      <a href="#works" class="hero-scroll" aria-label="向下滚动">
        <span class="scroll-dot"></span>
      </a>
    </div>
  </section>
</template>

<script setup>
import { projects, categories } from '../data/projects.js'
import SplitText from './effects/SplitText.vue'
import CountUp from './effects/CountUp.vue'
import Magnet from './effects/Magnet.vue'

const title = '冯意欢的实验室'
const projectCount = projects.length
// 分类数不包含「全部」筛选项
const categoryCount = categories.length - 1
</script>

<style scoped>
.hero {
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 108px 24px 72px;
}

.hero-inner {
  max-width: 760px;
  width: 100%;
  text-align: center;
}

.hero-eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 4px;
  color: var(--primary);
  margin-bottom: 18px;
}

.hero-title {
  font-size: clamp(38px, 8vw, 64px);
  font-weight: 800;
  line-height: 1.15;
}

/* SplitText 会把文字拆进子 span，渐变需要逐个字符应用 */
.hero-title :deep(.split-char) {
  background: linear-gradient(120deg, var(--primary) 0%, #b9c6f7 55%, var(--accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* 亮色模式背景浅，浅蓝白段会隐形，换更深一档的渐变保证可读 */
/* 注意：只能用 background-image，background 简写会把 background-clip 重置为 border-box，标题会变成实心色块 */
[data-theme='light'] .hero-title :deep(.split-char) {
  background-image: linear-gradient(120deg, var(--primary-strong) 0%, var(--primary) 55%, var(--accent) 100%);
}

.hero-subtitle {
  margin: 20px auto 0;
  max-width: 520px;
  font-size: 16px;
  color: var(--text-secondary);
}

.hero-stats {
  display: inline-flex;
  align-items: center;
  gap: 26px;
  margin-top: 34px;
  padding: 18px 34px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  backdrop-filter: blur(6px);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-num {
  font-family: 'Baloo 2', sans-serif;
  font-size: 26px;
  font-weight: 800;
  color: var(--primary);
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: var(--border-strong);
}

.hero-actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  margin-top: 34px;
  flex-wrap: wrap;
}

.hero-scroll {
  display: block;
  margin: 56px auto 0;
  width: 22px;
  height: 34px;
  border: 2px solid var(--border-strong);
  border-radius: var(--radius-pill);
  position: relative;
  opacity: 0.7;
}

.scroll-dot {
  position: absolute;
  left: 50%;
  top: 7px;
  width: 4px;
  height: 8px;
  border-radius: var(--radius-pill);
  background: var(--primary);
  transform: translateX(-50%);
  animation: scroll-hint 1.8s ease-in-out infinite;
}

@keyframes scroll-hint {
  0%,
  100% {
    transform: translate(-50%, 0);
    opacity: 0.9;
  }
  50% {
    transform: translate(-50%, 8px);
    opacity: 0.3;
  }
}

@media (max-width: 640px) {
  .hero {
    padding-top: 96px;
  }
  .hero-stats {
    gap: 18px;
    padding: 14px 22px;
  }
  .stat-num {
    font-size: 22px;
  }
}
</style>
