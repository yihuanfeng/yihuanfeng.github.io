<template>
  <section id="timeline" class="timeline-section">
    <div class="section-header">
      <h2 class="section-title">📡 航行时间线</h2>
      <span class="section-badge">{{ projects.length }}个作品</span>
    </div>
    <div class="timeline">
      <div class="timeline-line"></div>
      <div v-for="year in years" :key="year" class="timeline-year">
        <div class="year-marker">
          <div class="year-dot"></div>
          <span class="year-label">{{ year }}</span>
        </div>
        <TimelineItem
          v-for="project in getProjectsByYear(year)"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { projects } from '../data/projects.js'
import TimelineItem from './TimelineItem.vue'

const years = computed(() => {
  const set = new Set(projects.map(p => p.year))
  return [...set].sort((a, b) => b - a)
})

function getProjectsByYear(year) {
  return projects.filter(p => p.year === year)
}
</script>

<style scoped>
.timeline-section {
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 20px;
}
.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}
.section-title {
  font-family: 'Baloo 2', cursive;
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
}
.section-badge {
  font-size: 11px;
  color: var(--text-muted);
  padding: 2px 10px;
  background: var(--bg-card);
  border-radius: var(--radius-tag);
}
.timeline {
  position: relative;
  padding-left: 8px;
}
.timeline-line {
  position: absolute;
  left: 5px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--primary), var(--tag-3d), var(--tag-science), var(--accent), var(--tag-creative), rgba(167, 139, 250, 0.1));
}
.timeline-year {
  margin-bottom: 16px;
}
.year-marker {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.year-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 10px rgba(167, 139, 250, 0.5);
  position: relative;
  left: -1px;
}
.year-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--primary);
}
</style>
