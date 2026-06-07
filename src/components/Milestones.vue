<template>
  <section class="milestones-section">
    <h2 class="section-title">🏅 里程碑</h2>
    <div class="milestones-scroll">
      <div class="milestone-card" v-for="m in milestones" :key="m.name">
        <div class="milestone-icon">{{ m.icon }}</div>
        <div class="milestone-name">{{ m.name }}</div>
        <div class="milestone-desc">{{ m.desc }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
const milestones = [
  { icon: '🌱', name: '开始编程', desc: '7岁' },
  { icon: '🎮', name: '首个游戏', desc: '2048' },
  { icon: '🪐', name: '3D 突破', desc: 'Three.js' },
  { icon: '🚀', name: '10+ 作品', desc: '持续创造' }
]
</script>

<style scoped>
.milestones-section {
  max-width: 720px;
  margin: 0 auto;
  padding: 20px 20px 40px;
}
.section-title {
  font-family: 'Baloo 2', cursive;
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
}
.milestones-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;
}
.milestones-scroll::-webkit-scrollbar {
  height: 4px;
}
.milestone-card {
  min-width: 110px;
  padding: 16px 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-card);
  text-align: center;
  transition: all var(--transition-normal);
  flex-shrink: 0;
}
.milestone-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}
.milestone-icon {
  font-size: 28px;
  margin-bottom: 6px;
}
.milestone-name {
  font-family: 'Baloo 2', cursive;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2px;
}
.milestone-desc {
  font-size: 10px;
  color: var(--text-muted);
}
</style>
