<template>
  <section class="section--tight">
    <div class="container">
      <FadeContent>
        <div class="about-teaser card">
          <div class="about-inner">
            <span class="about-mark" aria-hidden="true">Y</span>
            <div class="about-copy">
              <h2 class="about-title">关于我</h2>
              <p class="about-text">
                我叫冯意欢，今年 9 岁。7 岁开始学编程，现在喜欢用代码做游戏、画画和科学小实验。
              </p>
              <router-link to="/about" class="about-link">
                了解更多
                <span aria-hidden="true">→</span>
              </router-link>
            </div>
            <blockquote class="about-quote">
              “代码是我的画笔，浏览器是我的画布。”
            </blockquote>
          </div>
        </div>
      </FadeContent>
    </div>
  </section>
</template>

<script setup>
import FadeContent from './effects/FadeContent.vue'
</script>

<style scoped>
.about-teaser {
  padding: 28px;
}

.about-inner {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.about-mark {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--primary-strong), var(--primary));
  color: #fff;
  font-family: 'Baloo 2', sans-serif;
  font-weight: 800;
  font-size: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: var(--shadow-cta);
}

.about-copy {
  flex: 1;
  min-width: 220px;
}

.about-title {
  font-size: 18px;
  margin-bottom: 4px;
}

.about-text {
  font-size: 14px;
  color: var(--text-secondary);
}

.about-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
  transition: gap var(--transition-fast);
}

.about-link:hover {
  gap: 10px;
}

.about-quote {
  border-left: 3px solid var(--primary);
  padding-left: 16px;
  font-size: 14px;
  color: var(--text-secondary);
  font-style: italic;
  max-width: 280px;
}

@media (max-width: 640px) {
  .about-inner {
    flex-direction: column;
    align-items: flex-start;
  }
  .about-quote {
    max-width: 100%;
  }
}
</style>
