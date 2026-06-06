---
layout: home

hero:
  name: "冯意欢"
  text: ""
  tagline: "9岁 · 小学三年级 · 编程小达人"
  actions:
    - theme: brand
      text: 🎮 看我的作品
      link: /games/
    - theme: alt
      text: 🪐 3D太阳系
      link: /demos/solar-system

features:
  - icon: 👧
    title: 关于我
    details: 我叫冯意欢，今年9岁，小学三年级。学习编程2年，喜欢用代码创造有趣的东西。
  - icon: 🎨
    title: 创作理念
    details: 我相信代码可以像画笔一样创造美。每个作品都是一次新的冒险！
  - icon: 🚀
    title: 未来目标
    details: 继续学习更多知识，做出更酷的作品，也许未来能成为一名优秀的程序员！
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 粒子背景效果
  const canvas = document.createElement('canvas')
  canvas.id = 'hero-particles'
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.zIndex = '-1'
  canvas.style.pointerEvents = 'none'
  document.body.appendChild(canvas)
  
  const ctx = canvas.getContext('2d')
  let w, h
  const particles = []
  
  function resize() {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)
  
  class Particle {
    constructor() {
      this.x = Math.random() * w
      this.y = Math.random() * h
      this.vx = (Math.random() - 0.5) * 0.5
      this.vy = (Math.random() - 0.5) * 0.5
      this.size = Math.random() * 2 + 0.5
      this.opacity = Math.random() * 0.5 + 0.1
    }
    update() {
      this.x += this.vx
      this.y += this.vy
      if (this.x < 0 || this.x > w) this.vx *= -1
      if (this.y < 0 || this.y > h) this.vy *= -1
    }
    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(108, 92, 231, ${this.opacity})`
      ctx.fill()
    }
  }
  
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle())
  }
  
  function animate() {
    ctx.clearRect(0, 0, w, h)
    particles.forEach(p => {
      p.update()
      p.draw()
    })
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(108, 92, 231, ${0.1 * (1 - dist / 150)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
    requestAnimationFrame(animate)
  }
  animate()
})
</script>

## 👋 你好，我是冯意欢！

<div class="demo-card">
  <h3>🌟 我的编程之旅</h3>
  <p>我从7岁开始学习编程，现在已经能独立开发各种有趣的网页作品了。从最初简单的页面，到现在能做出 3D 太阳系、声控涂鸦、粒子动画这些酷炫效果，每一次创作都让我充满成就感。</p>
  <p>编程对我来说不只是写代码，而是<strong>把想象变成现实</strong>的魔法。我喜欢尝试新技术，挑战更有难度的项目。</p>
</div>

## 📊 我的作品

<div class="category-grid">
  <a href="/games/" class="category-card">
    <span class="icon">🎮</span>
    <h3>趣味游戏</h3>
    <p>2048 经典版、反向版、自选棋盘、道具版</p>
  </a>
  <a href="/demos/solar-system" class="category-card">
    <span class="icon">🪐</span>
    <h3>3D展示</h3>
    <p>基于 Three.js 的太阳系模拟</p>
  </a>
  <a href="/creative/" class="category-card">
    <span class="icon">🎨</span>
    <h3>创意交互</h3>
    <p>声控涂鸦、幻蓝灵球、手势控制</p>
  </a>
  <a href="/visual/" class="category-card">
    <span class="icon">✨</span>
    <h3>视觉效果</h3>
    <p>电子万花尺、粒子魔法指尖星河</p>
  </a>
  <a href="/science/" class="category-card">
    <span class="icon">🔬</span>
    <h3>科学实验</h3>
    <p>弹出的瓶盖等科学小实验</p>
  </a>
</div>

## 💬 我想说

> "代码是我的画笔，浏览器是我的画布。每一个作品都是我想象力的延伸。未来我想学习更多编程语言，做出更厉害的东西！"

---

> 💡 **欢迎探索**：点击上方分类卡片或导航栏，浏览我的所有作品。每个作品都可以直接交互体验！
