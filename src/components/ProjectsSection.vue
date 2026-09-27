<template>
  <section id="works" class="section">
    <div class="container">
      <div class="section-head">
        <span class="section-eyebrow">WORKS</span>
        <ScrollReveal class="section-title">我的作品</ScrollReveal>
        <p class="section-desc">
          一共 {{ projects.length }} 个作品，点击卡片就能直接体验。
        </p>
      </div>

      <div class="filters" role="tablist" aria-label="作品分类">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-chip"
          :class="{ active: activeCat === cat }"
          role="tab"
          :aria-selected="activeCat === cat"
          @click="activeCat = cat"
        >
          {{ cat }}
        </button>
      </div>

      <div class="grid">
        <FadeContent
          v-for="(p, i) in filteredProjects"
          :key="p.id"
          class="grid-item"
          :delay="Math.min(i * 0.05, 0.3)"
        >
          <a :href="p.url" target="_blank" rel="noopener" class="project-card card card--hover">
            <span class="project-icon" aria-hidden="true">{{ p.icon }}</span>
            <div class="project-body">
              <h3 class="project-name">{{ p.name }}</h3>
              <p class="project-desc">{{ p.description }}</p>
            </div>
            <span
              class="tag project-tag"
              :style="{ color: tagColors[p.tag], background: tagBgColors[p.tag] }"
            >
              {{ p.tag }}
            </span>
          </a>
        </FadeContent>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { projects, categories, tagColors, tagBgColors } from '../data/projects.js'
import ScrollReveal from './effects/ScrollReveal.vue'
import FadeContent from './effects/FadeContent.vue'

const activeCat = ref('全部')

const filteredProjects = computed(() =>
  activeCat.value === '全部' ? projects : projects.filter((p) => p.tag === activeCat.value)
)
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

.filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.filter-chip {
  padding: 7px 18px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.filter-chip:hover {
  color: var(--primary);
  border-color: var(--border-strong);
}

.filter-chip.active {
  color: var(--primary);
  background: var(--primary-soft);
  border-color: transparent;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 18px;
}

.project-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  height: 100%;
  position: relative;
}

.project-icon {
  font-size: 30px;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 2px;
}

.project-body {
  flex: 1;
  min-width: 0;
}

.project-name {
  font-size: 17px;
  margin-bottom: 4px;
}

.project-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.65;
}

.project-tag {
  position: absolute;
  top: 14px;
  right: 14px;
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
