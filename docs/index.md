---
layout: home

hero:
  name: "冯意欢"
  text: ""
  tagline: "9岁 · 小学三年级 · 编程小达人"
  actions:
    - theme: brand
      text: "开始探险"
      link: /games/
    - theme: alt
      text: "太阳系"
      link: /demos/solar-system
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const canvas = document.createElement('canvas')
  canvas.id = 'hero-particles'
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none'
  document.body.appendChild(canvas)
  
  const ctx = canvas.getContext('2d')
  let w, h
  const particles = []
  const colors = ['#4F46E5', '#818CF8', '#F97316', '#FB923C', '#34D399']
  
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
      this.vx = (Math.random() - 0.5) * 0.8
      this.vy = (Math.random() - 0.5) * 0.8
      this.size = Math.random() * 4 + 2
      this.color = colors[Math.floor(Math.random() * colors.length)]
      this.opacity = Math.random() * 0.4 + 0.2
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
      ctx.fillStyle = this.color
      ctx.globalAlpha = this.opacity
      ctx.fill()
      ctx.globalAlpha = 1
    }
  }
  
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle())
  }
  
  function animate() {
    ctx.clearRect(0, 0, w, h)
    particles.forEach(p => { p.update(); p.draw() })
    requestAnimationFrame(animate)
  }
  animate()
})
</script>

## 关于我

我叫冯意欢，今年9岁。我喜欢用代码创造有趣的东西！

## 我的作品

<div class="category-grid">
  <a href="/games/" class="category-card">
    <span class="icon">🎮</span>
    <h3>趣味游戏</h3>
    <p>2048 多种玩法</p>
  </a>
  <a href="/demos/solar-system" class="category-card">
    <span class="icon">🪐</span>
    <h3>太阳系</h3>
    <p>3D 行星探索</p>
  </a>
  <a href="/creative/" class="category-card">
    <span class="icon">🎨</span>
    <h3>创意交互</h3>
    <p>声控涂鸦等</p>
  </a>
  <a href="/visual/" class="category-card">
    <span class="icon">✨</span>
    <h3>视觉效果</h3>
    <p>粒子星河等</p>
  </a>
  <a href="/science/" class="category-card">
    <span class="icon">🔬</span>
    <h3>科学实验</h3>
    <p>有趣的实验</p>
  </a>
</div>

> 每个作品都可以直接玩，快来探索！
