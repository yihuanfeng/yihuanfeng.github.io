<template>
  <section class="hero">
    <StarField />
    <div class="hero-content">
      <div class="hero-label">WELCOME TO</div>
      <h1 class="hero-title">冯意欢的实验室</h1>
      <p class="hero-subtitle">9岁 · 小学三年级 · 用代码探索宇宙的编程小达人</p>
      <div class="hero-actions">
        <a href="#timeline" class="btn-primary">开始探险 →</a>
        <a href="/demos/八大行星.html" target="_blank" rel="noopener" class="btn-secondary">🪐 太阳系</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import StarField from './StarField.vue'
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px 40px;
}
.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 700px;
}
.hero-label {
  font-size: 12px;
  color: var(--primary);
  font-weight: 600;
  letter-spacing: 4px;
  margin-bottom: 8px;
}
.hero-title {
  font-family: 'Baloo 2', cursive;
  font-size: clamp(36px, 8vw, 56px);
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary) 0%, #f472b6 50%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  margin-bottom: 12px;
}
.hero-subtitle {
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: 24px;
}
.hero-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
.btn-primary {
  padding: 12px 28px;
  background: linear-gradient(135deg, var(--primary-dark), var(--primary));
  color: white;
  border-radius: var(--radius-button);
  font-family: 'Baloo 2', cursive;
  font-weight: 600;
  font-size: 15px;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
  transition: all var(--transition-normal);
  text-decoration: none;
}
.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.5);
}
.btn-secondary {
  padding: 12px 28px;
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-button);
  font-family: 'Baloo 2', cursive;
  font-weight: 600;
  font-size: 15px;
  transition: all var(--transition-normal);
  text-decoration: none;
}
.btn-secondary:hover {
  border-color: var(--primary);
  background: var(--bg-card-hover);
  transform: translateY(-3px);
}
</style>
