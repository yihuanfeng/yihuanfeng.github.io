<template>
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="section-eyebrow">JOURNEY</span>
        <ScrollReveal class="section-title">编程之路</ScrollReveal>
      </div>

      <div class="milestones">
        <FadeContent v-for="(m, i) in milestones" :key="m.title" :delay="Math.min(i * 0.07, 0.28)">
          <div class="milestone card card--hover">
            <span class="milestone-index" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="milestone-icon" aria-hidden="true">{{ m.icon }}</span>
            <h3 class="milestone-title">{{ m.title }}</h3>
            <p class="milestone-desc">{{ m.desc }}</p>
          </div>
        </FadeContent>
      </div>
    </div>
  </section>
</template>

<script setup>
import ScrollReveal from './effects/ScrollReveal.vue'
import FadeContent from './effects/FadeContent.vue'

const milestones = [
  { icon: '🌱', title: '开始学编程', desc: '7 岁那年，发现代码可以把想法变成东西' },
  { icon: '🎮', title: '第一个完整游戏', desc: '做出 2048，从此一发不可收拾' },
  { icon: '🪐', title: '3D 突破', desc: '用 Three.js 做出能自由查看的太阳系' },
  { icon: '🚀', title: '12 个作品', desc: '游戏、沙盒世界、画画、科学实验，还在继续增加' }
]
</script>

<style scoped>
.section-title {
  font-size: clamp(26px, 4.5vw, 36px);
  margin-bottom: 10px;
}

.milestones {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.milestone {
  position: relative;
  padding: 24px 20px 22px;
  height: 100%;
  overflow: hidden;
}

.milestone-index {
  position: absolute;
  top: 12px;
  right: 16px;
  font-family: 'Baloo 2', sans-serif;
  font-size: 30px;
  font-weight: 800;
  color: var(--primary);
  opacity: 0.18;
  line-height: 1;
}

.milestone-icon {
  display: block;
  font-size: 30px;
  margin-bottom: 12px;
}

.milestone-title {
  font-size: 16px;
  margin-bottom: 6px;
}

.milestone-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.65;
}

@media (max-width: 640px) {
  .milestones {
    grid-template-columns: 1fr;
  }
}
</style>
