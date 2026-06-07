<template>
  <button class="theme-toggle" @click="toggle" :title="isDark ? '切换日光模式' : '切换太空站模式'">
    {{ isDark ? '🌙' : '☀️' }}
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(true)

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) {
    isDark.value = saved === 'dark'
    document.documentElement.setAttribute('data-theme', saved)
  }
})

function toggle() {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}
</script>

<style scoped>
.theme-toggle {
  font-size: 18px;
  padding: 6px;
  border-radius: 50%;
  transition: transform var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
}
.theme-toggle:hover {
  transform: scale(1.2);
}
</style>
