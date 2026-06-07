<template>
  <main class="about-page">
    <StarField />
    <div class="about-content">
      <h1 class="about-heading">👨‍🚀 关于我</h1>
      <p class="about-intro">我叫冯意欢，今年9岁，小学三年级。我喜欢用代码创造有趣的东西！</p>

      <div class="story-section">
        <h2>🌱 开始</h2>
        <p>我7岁的时候开始学编程。一开始只是觉得电脑很神奇，能做出各种东西。后来我发现，编程也可以很有趣，不只是敲代码，而是创造！</p>
      </div>

      <div class="story-section">
        <h2>🌿 成长</h2>
        <p>学了两年编程，我做过了很多作品：</p>
        <ul>
          <li>🎮 <strong>游戏</strong>：2048 各种版本，还有更多在计划中</li>
          <li>🪐 <strong>3D</strong>：用 Three.js 做了太阳系，可以看到八大行星</li>
          <li>🎨 <strong>创意</strong>：声控涂鸦、手势控制、魔法球...</li>
          <li>✨ <strong>视觉</strong>：粒子效果、万花尺图案...</li>
          <li>🔬 <strong>科学</strong>：把科学实验变成互动的网页</li>
        </ul>
      </div>

      <div class="story-section">
        <h2>🌸 未来</h2>
        <p>我想以后做出更厉害的作品，学习更多编程知识。也许有一天能成为一个真正的程序员！</p>
      </div>

      <blockquote class="quote">代码是我的画笔，浏览器是我的画布。每一个作品都是我想象力的延伸。</blockquote>

      <router-link to="/" class="back-link">← 返回首页</router-link>
    </div>
  </main>
</template>

<script setup>
import StarField from '../components/StarField.vue'
</script>

<style scoped>
.about-page {
  position: relative;
  min-height: 100vh;
  padding-top: 56px;
}
.about-content {
  position: relative;
  z-index: 1;
  max-width: 680px;
  margin: 0 auto;
  padding: 60px 20px;
}
.about-heading {
  font-family: 'Baloo 2', cursive;
  font-size: 32px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 16px;
}
.about-intro {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 32px;
}
.story-section {
  margin-bottom: 28px;
}
.story-section h2 {
  font-family: 'Baloo 2', cursive;
  font-size: 20px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 10px;
}
.story-section p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.8;
}
.story-section ul {
  list-style: none;
  padding: 0;
}
.story-section li {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 2;
}
.story-section strong {
  color: var(--accent);
}
.quote {
  margin: 32px 0;
  padding: 18px 24px;
  background: linear-gradient(135deg, var(--primary-dark), var(--primary));
  border-radius: var(--radius-card);
  color: white;
  font-family: 'Baloo 2', cursive;
  font-size: 15px;
  border: none;
}
.back-link {
  display: inline-block;
  margin-top: 24px;
  color: var(--primary);
  font-weight: 600;
  font-size: 14px;
  transition: color var(--transition-normal);
}
.back-link:hover {
  color: var(--accent);
}
</style>
