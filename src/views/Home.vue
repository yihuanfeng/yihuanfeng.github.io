<template>
  <main class="home">
    <HeroSection />
    <Timeline />
    <SkillMap />
    <Milestones />
    <AboutSection />
    <footer class="footer">
      <p>Made with ❤️ and code · © {{ new Date().getFullYear() }} Yihuan 冯意欢</p>
    </footer>
  </main>
</template>

<script setup>
import HeroSection from '../components/HeroSection.vue'
import Timeline from '../components/Timeline.vue'
import SkillMap from '../components/SkillMap.vue'
import Milestones from '../components/Milestones.vue'
import AboutSection from '../components/AboutSection.vue'
</script>

<style scoped>
.footer {
  text-align: center;
  padding: 24px 20px;
  border-top: 1px solid var(--border-card);
  color: var(--text-muted);
  font-size: 12px;
}
</style>
