<template>
  <main class="about-page">
    <div class="container about-content">
      <FadeContent :duration="0.7">
        <p class="about-eyebrow">ABOUT ME</p>
        <SplitText tag="h1" :text="'关于我'" class="about-heading" text-align="left" :delay="20" :duration="0.9" />
        <p class="about-intro">
          你好，我是冯意欢，今年 9 岁，小学三年级。我喜欢用代码创造有趣的东西——游戏、画画、还有科学小实验。
        </p>
      </FadeContent>

      <div class="story">
        <FadeContent v-for="section in story" :key="section.title" :delay="0.05">
          <article class="story-card card">
            <h2 class="story-title">
              <span class="story-mark" aria-hidden="true">{{ section.mark }}</span>
              {{ section.title }}
            </h2>
            <p class="story-text">{{ section.text }}</p>
            <ul v-if="section.list" class="story-list">
              <li v-for="item in section.list" :key="item">
                <span class="list-dot" aria-hidden="true"></span>
                {{ item }}
              </li>
            </ul>
          </article>
        </FadeContent>
      </div>

      <FadeContent :delay="0.1">
        <blockquote class="about-quote card">
          “代码是我的画笔，浏览器是我的画布。每一个作品都是我想象力的延伸。”
        </blockquote>

        <div class="about-actions">
          <router-link to="/" class="btn btn--ghost">← 返回首页</router-link>
          <a href="#works" class="btn btn--primary" @click.prevent="goHomeAndScroll">看看作品</a>
        </div>
      </FadeContent>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import SplitText from '../components/effects/SplitText.vue'
import FadeContent from '../components/effects/FadeContent.vue'

const router = useRouter()

const story = [
  {
    mark: '🌱',
    title: '开始',
    text: '我 7 岁的时候开始学编程。一开始只是觉得电脑很神奇，能做出各种东西。后来我发现，编程不只是敲代码，而是创造——把脑子里的想法变成真的能玩、能看的东西。'
  },
  {
    mark: '🌿',
    title: '成长',
    text: '学了两年编程，我做了不少作品：',
    list: [
      '游戏：2048 的经典版、反向版、自选棋盘版、道具版',
      '3D：用 Three.js 做的太阳系，能看到八大行星、月球和冥王星',
      '创意：声控涂鸦、声控魔法球、手势控制图形',
      '视觉：五角星烟花画板、电子万花尺',
      '科学：把瓶盖实验做成了互动网页'
    ]
  },
  {
    mark: '🌸',
    title: '未来',
    text: '我想继续做出更厉害的作品，学习更多编程知识。也许有一天，我能成为一个真正的程序员。'
  }
]

function goHomeAndScroll() {
  router.push('/').then(() => {
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })
  })
}
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  padding: 116px 0 80px;
}

.about-content {
  max-width: 720px;
}

.about-eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 4px;
  color: var(--primary);
  margin-bottom: 14px;
}

.about-heading {
  font-size: clamp(32px, 6vw, 44px);
  font-weight: 800;
  margin-bottom: 18px;
}

.about-intro {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 40px;
}

.story {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
}

.story-card {
  padding: 22px 24px;
}

.story-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  margin-bottom: 10px;
}

.story-mark {
  font-size: 20px;
  line-height: 1;
}

.story-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.8;
}

.story-list {
  list-style: none;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.story-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}

.list-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary);
  margin-top: 9px;
  flex-shrink: 0;
}

.about-quote {
  padding: 20px 24px;
  font-size: 15px;
  color: var(--text-secondary);
  border-left: 3px solid var(--primary);
  font-style: italic;
  margin-bottom: 32px;
}

.about-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
