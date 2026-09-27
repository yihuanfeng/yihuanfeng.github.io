<template>
  <nav class="navbar" aria-label="主导航">
    <div class="container navbar-inner">
      <router-link to="/" class="navbar-brand" aria-label="返回首页">
        <span class="brand-mark" aria-hidden="true">Y</span>
        <span class="brand-text">Yihuan's Lab</span>
      </router-link>

      <div class="navbar-links">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :class="{ active: isActive(link.to) }"
        >
          {{ link.label }}
        </router-link>
      </div>

      <div class="navbar-actions">
        <ThemeToggle />
        <a
          href="https://github.com/yihuanfeng"
          target="_blank"
          rel="noopener"
          class="github-link"
          title="GitHub 主页"
          aria-label="GitHub 主页"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()

const links = [
  { to: '/', label: '首页' },
  { to: '/about', label: '关于' }
]

function isActive(path) {
  return route.path === path
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: color-mix(in srgb, var(--bg-main) 72%, transparent);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
  height: 60px;
}

.navbar-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-mark {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: linear-gradient(135deg, var(--primary-strong), var(--primary));
  color: #fff;
  font-family: 'Baloo 2', sans-serif;
  font-weight: 800;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-cta);
}

.brand-text {
  font-family: 'Baloo 2', sans-serif;
  font-weight: 800;
  font-size: 18px;
  letter-spacing: 0.2px;
}

.navbar-links {
  display: flex;
  gap: 6px;
}

.nav-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  transition: color var(--transition-fast), background var(--transition-fast);
}

.nav-link:hover {
  color: var(--primary);
  background: var(--bg-elevated);
}

.nav-link.active {
  color: var(--primary);
  background: var(--primary-soft);
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.github-link {
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  transition: color var(--transition-fast), background var(--transition-fast);
}

.github-link:hover {
  color: var(--primary);
  background: var(--bg-elevated);
}

@media (max-width: 640px) {
  .brand-text {
    font-size: 16px;
  }
  .nav-link {
    padding: 6px 12px;
    font-size: 13px;
  }
}
</style>
