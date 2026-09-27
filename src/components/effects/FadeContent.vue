<template>
  <div ref="fadeRef" :class="classes" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup>
/**
 * 滚动渐入容器 — 基于 vue-bits 的 FadeContent（MIT + Commons Clause）改造。
 * 用 IntersectionObserver 触发，不依赖滚动位置缓存，页面底部元素也能可靠出现。
 */
import { onBeforeUnmount, onMounted, ref, useAttrs, computed } from 'vue'

const props = defineProps({
  blur: { type: Boolean, default: false },
  duration: { type: Number, default: 0.9 },
  ease: { type: String, default: 'power2.out' },
  delay: { type: Number, default: 0 },
  threshold: { type: Number, default: 0.12 },
  initialOpacity: { type: Number, default: 0 }
})

const attrs = useAttrs()
const fadeRef = ref(null)
const classes = computed(() => attrs.class)

let observer = null
let rafId = null
let timeoutId = null

onMounted(() => {
  const el = fadeRef.value
  if (!el) return

  el.style.opacity = String(props.initialOpacity)
  el.style.visibility = props.initialOpacity > 0 ? 'visible' : 'hidden'
  if (props.blur) el.style.filter = 'blur(10px)'
  el.style.willChange = 'opacity, filter, transform'

  const reveal = () => {
    observer?.disconnect()
    observer = null

    const start = performance.now()
    const fromOpacity = props.initialOpacity
    const durationMs = props.duration * 1000

    const step = (now) => {
      const p = Math.min((now - start) / durationMs, 1)
      const eased = 1 - Math.pow(1 - p, 3) // powerOut 近似
      el.style.opacity = String(fromOpacity + (1 - fromOpacity) * eased)
      if (props.blur) el.style.filter = `blur(${(1 - eased) * 10}px)`
      if (p < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        el.style.visibility = 'visible'
        el.style.opacity = '1'
        el.style.filter = 'blur(0px)'
        el.style.willChange = 'auto'
      }
    }

    const fire = () => {
      rafId = requestAnimationFrame(step)
    }

    if (props.delay > 0) {
      timeoutId = setTimeout(fire, props.delay * 1000)
    } else {
      fire()
    }
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) reveal()
    },
    { threshold: Math.min(Math.max(props.threshold, 0), 1) }
  )
  observer.observe(el)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
  if (rafId) cancelAnimationFrame(rafId)
  if (timeoutId) clearTimeout(timeoutId)
})
</script>
