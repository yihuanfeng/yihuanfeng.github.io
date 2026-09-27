<template>
  <component :is="tag" ref="containerRef" :class="['scroll-reveal', containerClassName]">
    <p :class="['scroll-reveal-text', textClassName]">
      <template v-for="(segment, index) in splitText" :key="index">
        <span v-if="segment.isWord" class="scroll-reveal-word">{{ segment.text }}</span>
        <template v-else>{{ segment.text }}</template>
      </template>
    </p>
  </component>
</template>

<script setup>
/**
 * 滚动揭示标题 — 移植自 vue-bits 的 ScrollReveal（MIT + Commons Clause）
 * 已调缓：旋转与模糊更轻，适合舒缓风格。
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { computed, nextTick, onMounted, onUnmounted, useSlots, ref } from 'vue'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  enableBlur: { type: Boolean, default: true },
  baseOpacity: { type: Number, default: 0.15 },
  baseRotation: { type: Number, default: 2 },
  blurStrength: { type: Number, default: 3 },
  containerClassName: { type: String, default: '' },
  textClassName: { type: String, default: '' },
  rotationEnd: { type: String, default: 'bottom bottom' },
  wordAnimationEnd: { type: String, default: 'bottom bottom' },
  tag: { type: String, default: 'h2' }
})

const slots = useSlots()
const containerRef = ref(null)

const text = computed(() => {
  const nodes = slots.default?.() ?? []
  const extract = (list) =>
    list
      .map((vnode) => {
        if (typeof vnode.children === 'string') return vnode.children
        if (Array.isArray(vnode.children)) return extract(vnode.children)
        return ''
      })
      .join('')
  return extract(nodes)
})

const splitText = computed(() =>
  text.value.split(/(\s+)/).map((segment) => ({
    text: segment,
    isWord: !segment.match(/^\s+$/)
  }))
)

let tweens = []

onMounted(async () => {
  await nextTick()

  const el = containerRef.value
  if (!el) return

  const wordElements = el.querySelectorAll('.scroll-reveal-word')

  tweens.push(
    gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: props.baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: props.rotationEnd,
          scrub: true
        }
      }
    )
  )

  tweens.push(
    gsap.fromTo(
      wordElements,
      { opacity: props.baseOpacity, willChange: 'opacity' },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.04,
        scrollTrigger: {
          trigger: el,
          start: 'top bottom-=20%',
          end: props.wordAnimationEnd,
          scrub: true
        }
      }
    )
  )

  if (props.enableBlur) {
    tweens.push(
      gsap.fromTo(
        wordElements,
        { filter: `blur(${props.blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.04,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=20%',
            end: props.wordAnimationEnd,
            scrub: true
          }
        }
      )
    )
  }
})

onUnmounted(() => {
  tweens.forEach((t) => {
    t.scrollTrigger?.kill()
    t.kill()
  })
  tweens = []
})
</script>

<style scoped>
.scroll-reveal {
  margin: 0;
}

.scroll-reveal-text {
  font-size: clamp(1.5rem, 4vw, 2.1rem);
  line-height: 1.45;
  font-weight: 700;
  font-family: 'Baloo 2', 'PingFang SC', sans-serif;
  margin: 0;
}

.scroll-reveal-word {
  display: inline-block;
  will-change: transform, opacity;
}
</style>
