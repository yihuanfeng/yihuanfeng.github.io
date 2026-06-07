<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <router-link to="/" class="navbar-brand">
        <span class="brand-icon">🧪</span>
        <span class="brand-text">Yihuan's Lab</span>
      </router-link>
      <div class="navbar-links">
        <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">首页</router-link>
        <router-link to="/about" class="nav-link" :class="{ active: $route.path === '/about' }">关于</router-link>
      </div>
      <div class="navbar-actions">
        <ThemeToggle />
        <a href="https://github.com/yihuanfeng" target="_blank" rel="noopener" class="github-link" title="GitHub">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import ThemeToggle from './ThemeToggle.vue'
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--bg-nav);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-card);
  height: 56px;
}
.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}
.brand-icon {
  font-size: 20px;
}
.brand-text {
  font-family: 'Baloo 2', cursive;
  font-weight: 800;
  font-size: 18px;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.navbar-links {
  display: flex;
  gap: 4px;
}
.nav-link {
  font-family: 'Baloo 2', cursive;
  font-weight: 600;
  font-size: 14px;
  color: var(--text-muted);
  padding: 6px 14px;
  border-radius: var(--radius-button);
  transition: all var(--transition-normal);
  text-decoration: none;
}
.nav-link:hover {
  color: var(--primary);
  background: var(--bg-card-hover);
}
.nav-link.active {
  color: white;
  background: var(--primary-dark);
}
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.github-link {
  color: var(--text-muted);
  transition: color var(--transition-normal);
  display: flex;
  align-items: center;
}
.github-link:hover {
  color: var(--primary);
}
@media (max-width: 768px) {
  .navbar-links {
    gap: 2px;
  }
  .nav-link {
    padding: 4px 10px;
    font-size: 13px;
  }
  .brand-text {
    font-size: 15px;
  }
}
</style>
