<template>
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="section-eyebrow">SKILLS</span>
        <ScrollReveal class="section-title">我常用的工具</ScrollReveal>
        <p class="section-desc">这些都是做上面那些作品时用到的。</p>
      </div>

      <div class="skills-grid">
        <FadeContent v-for="(s, i) in skills" :key="s.name" :delay="Math.min(i * 0.06, 0.3)">
          <div class="skill-card card card--hover">
            <span class="skill-icon" aria-hidden="true">{{ s.icon }}</span>
            <div>
              <h3 class="skill-name">{{ s.name }}</h3>
              <p class="skill-note">{{ s.note }}</p>
            </div>
          </div>
        </FadeContent>
      </div>
    </div>
  </section>
</template>

<script setup>
import ScrollReveal from './effects/ScrollReveal.vue'
import FadeContent from './effects/FadeContent.vue'

const skills = [
  { icon: '🧩', name: '图形化编程', note: '编程的起点，先学会把想法拆成一块块积木' },
  { icon: '🌐', name: 'HTML / CSS / JavaScript', note: '做网页和游戏的基础，我的作品都是它们写成的' },
  { icon: '🧊', name: 'Three.js', note: '用 3D 做出了太阳系，让星球在浏览器里转起来' },
  { icon: '🎨', name: 'Canvas 绘画', note: '画板、涂鸦、烟花这些作品都靠它实现' },
  { icon: '🤖', name: 'AI 辅助编程', note: '让 AI 帮我更快地把想法变成能玩的页面' }
]
</script>

<style scoped>
.section-title {
  font-size: clamp(26px, 4.5vw, 36px);
  margin-bottom: 10px;
}

.section-desc {
  color: var(--text-secondary);
  font-size: 15px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.skill-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 20px;
  height: 100%;
}

.skill-icon {
  font-size: 26px;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 2px;
}

.skill-name {
  font-size: 16px;
  margin-bottom: 4px;
}

.skill-note {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.65;
}

@media (max-width: 640px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
