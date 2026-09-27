<template>
  <button
    class="theme-toggle"
    @click="toggle"
    :title="isDark ? '切换到亮色模式' : '切换到暗色模式'"
    :aria-label="isDark ? '切换到亮色模式' : '切换到暗色模式'"
  >
    <span class="toggle-track" :class="{ on: !isDark }">
      <span class="toggle-thumb" :class="{ on: !isDark }">{{ isDark ? '🌙' : '☀️' }}</span>
    </span>
  </button>
</template>

<script setup>
import { ref } from 'vue'

// 初始值直接读 <html> 上的 data-theme（index.html 内联脚本已提前设置，避免闪烁）
const isDark = ref(document.documentElement.getAttribute('data-theme') !== 'light')

function toggle() {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}
</script>

<style scoped>
.theme-toggle {
  padding: 4px;
  border-radius: var(--radius-pill);
  display: inline-flex;
  align-items: center;
}

.toggle-track {
  display: inline-flex;
  align-items: center;
  width: 46px;
  height: 26px;
  border-radius: var(--radius-pill);
  background: var(--bg-elevated);
  border: 1px solid var(--border-strong);
  padding: 2px;
  transition: background var(--transition-normal);
}

.toggle-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--bg-elevated);
  border: 1px solid var(--border-strong);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  transition: transform var(--transition-normal);
}

.toggle-thumb.on {
  transform: translateX(20px);
}
</style>
