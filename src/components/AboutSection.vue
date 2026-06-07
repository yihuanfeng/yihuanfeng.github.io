<template>
  <section class="about-section">
    <div class="about-toggle" @click="expanded = !expanded">
      <div class="about-summary">
        <span class="about-icon">👨‍🚀</span>
        <div>
          <div class="about-title">关于我</div>
          <div class="about-one-liner">我叫冯意欢，喜欢用代码创造有趣的东西！</div>
        </div>
      </div>
      <span class="about-arrow" :class="{ expanded }">{{ expanded ? '▲' : '▼' }}</span>
    </div>
    <div class="about-detail" v-if="expanded">
      <div class="story-section">
        <h3>🌱 开始</h3>
        <p>我7岁的时候开始学编程。一开始只是觉得电脑很神奇，能做出各种东西。后来我发现，编程也可以很有趣，不只是敲代码，而是创造！</p>
      </div>
      <div class="story-section">
        <h3>🌿 成长</h3>
        <p>学了两年编程，我做过了很多作品：游戏、3D 太阳系、声控涂鸦、粒子效果、科学实验……代码对我来说就像魔法一样，能把想象变成真的。</p>
      </div>
      <div class="story-section">
        <h3>🌸 未来</h3>
        <p>我想以后做出更厉害的作品，学习更多编程知识。也许有一天能成为一个真正的程序员！</p>
      </div>
      <blockquote class="about-quote">代码是我的画笔，浏览器是我的画布。每一个作品都是我想象力的延伸。</blockquote>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const expanded = ref(false)
</script>

<style scoped>
.about-section {
  max-width: 720px;
  margin: 0 auto;
  padding: 20px 20px 60px;
}
.about-toggle {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-card);
  padding: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all var(--transition-normal);
}
.about-toggle:hover {
  border-color: var(--primary);
}
.about-summary {
  display: flex;
  align-items: center;
  gap: 12px;
}
.about-icon {
  font-size: 24px;
}
.about-title {
  font-family: 'Baloo 2', cursive;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
}
.about-one-liner {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}
.about-arrow {
  color: var(--primary);
  font-size: 12px;
  transition: transform var(--transition-normal);
}
.about-arrow.expanded {
  transform: rotate(180deg);
}
.about-detail {
  margin-top: 16px;
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-card);
  animation: fadeInUp 0.3s ease;
}
.story-section {
  margin-bottom: 16px;
}
.story-section h3 {
  font-family: 'Baloo 2', cursive;
  font-size: 16px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 6px;
}
.story-section p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.8;
}
.about-quote {
  margin-top: 16px;
  padding: 14px 18px;
  background: linear-gradient(135deg, var(--primary-dark), var(--primary));
  border-radius: var(--radius-card);
  color: white;
  font-family: 'Baloo 2', cursive;
  font-size: 14px;
  border: none;
}
</style>
