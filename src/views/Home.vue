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
import HeroSection from '../components/HeroSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import SkillMap from '../components/SkillMap.vue'
import Milestones from '../components/Milestones.vue'
import AboutTeaser from '../components/AboutTeaser.vue'

const year = new Date().getFullYear()
</script>
