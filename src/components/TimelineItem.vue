<template>
  <div class="timeline-item fade-in-up" ref="itemRef">
    <div class="timeline-dot" :style="{ background: tagColor }"></div>
    <a :href="project.url" target="_blank" rel="noopener" class="timeline-card">
      <div class="card-icon">{{ project.icon }}</div>
      <div class="card-content">
        <div class="card-name">{{ project.name }}</div>
        <div class="card-desc">{{ project.description }}</div>
      </div>
      <span class="card-tag" :style="{ background: tagColorBg, color: tagColor }">{{ project.tag }}</span>
    </a>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { tagColors } from '../data/projects.js'

const props = defineProps({
  project: { type: Object, required: true }
})

const itemRef = ref(null)

const tagColor = computed(() => tagColors[props.project.tag] || 'var(--primary)')
const tagColorBg = computed(() => {
  const map = {
    '游戏': 'rgba(251, 146, 60, 0.15)',
    '3D': 'rgba(96, 165, 250, 0.15)',
    '创意': 'rgba(244, 114, 182, 0.15)',
    '视觉': 'rgba(167, 139, 250, 0.15)',
    '科学': 'rgba(52, 211, 153, 0.15)'
  }
  return map[props.project.tag] || 'rgba(167, 139, 250, 0.15)'
})

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.1 }
  )
  if (itemRef.value) observer.observe(itemRef.value)
})
</script>

<style scoped>
.timeline-item {
  position: relative;
  padding-left: 28px;
  margin-bottom: 12px;
}
.timeline-dot {
  position: absolute;
  left: 0;
  top: 18px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  animation: pulse 2s infinite;
  z-index: 1;
}
.timeline-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-card);
  padding: 14px 16px;
  transition: all var(--transition-normal);
  text-decoration: none;
  cursor: pointer;
}
.timeline-card:hover {
  border-color: var(--border-card-hover);
  background: var(--bg-card-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
}
.card-icon {
  font-size: 28px;
  flex-shrink: 0;
}
.card-content {
  flex: 1;
  min-width: 0;
}
.card-name {
  font-family: 'Baloo 2', cursive;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2px;
}
.card-desc {
  font-size: 12px;
  color: var(--text-muted);
}
.card-tag {
  font-size: 10px;
  padding: 3px 10px;
  border-radius: var(--radius-tag);
  font-weight: 600;
  flex-shrink: 0;
}
</style>
