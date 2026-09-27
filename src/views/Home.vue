<template>
  <main>
    <HeroSection />
    <ProjectsSection />
    <SkillMap />
    <Milestones />
    <AboutTeaser />
    <footer class="site-footer">
      <div class="container">
        <p>Made with ❤️ and code · © {{ year }} Yihuan 冯意欢</p>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import HeroSection from '../components/HeroSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import SkillMap from '../components/SkillMap.vue'
import Milestones from '../components/Milestones.vue'
import AboutTeaser from '../components/AboutTeaser.vue'

const route = useRoute()
const year = new Date().getFullYear()

// 从其他页面经「作品」导航进入时（/#works），落地后滚动到作品区
onMounted(() => {
  if (route.hash === '#works') {
    nextTick(() => {
      document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })
    })
  }
})
</script>
