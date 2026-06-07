<template>
  <section class="skill-section">
    <h2 class="section-title">🗺️ 技能星图</h2>
    <div class="skills">
      <div class="skill-tag" v-for="skill in skills" :key="skill.name">
        <span class="skill-icon">{{ skill.icon }}</span>
        <span class="skill-name">{{ skill.name }}</span>
        <span class="skill-stars">{{ skill.stars }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
const skills = [
  { icon: '🎨', name: '图形化编程', stars: '⭐⭐⭐' },
  { icon: '🤖', name: 'AI 编程', stars: '⭐⭐' }
]
</script>

<style scoped>
.skill-section {
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
.skills {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.skill-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-button);
  font-size: 13px;
  font-weight: 600;
  color: var(--primary);
  transition: all var(--transition-normal);
}
.skill-tag:hover {
  border-color: var(--primary);
  background: var(--bg-card-hover);
}
.skill-icon {
  font-size: 16px;
}
.skill-name {
  font-family: 'Baloo 2', cursive;
}
</style>
