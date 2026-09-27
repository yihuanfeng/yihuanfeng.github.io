<template>
  <div class="app-shell">
    <AuroraBackground />
    <NavBar />
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import AuroraBackground from './components/effects/AuroraBackground.vue'
</script>

<style scoped>
.app-shell {
  position: relative;
  min-height: 100vh;
}
</style>
