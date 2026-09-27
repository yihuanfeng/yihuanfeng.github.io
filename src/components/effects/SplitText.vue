<template>
  <component :is="tag" ref="elRef" :class="['split-parent', className]" :style="elStyle">{{ text }}</component>
</template>

<script setup>
/**
 * 逐字浮现文字 — 移植自 vue-bits 的 SplitText（MIT + Commons Clause）
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText as GSAPSplitText } from 'gsap/SplitText'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

gsap.registerPlugin(ScrollTrigger, GSAPSplitText)

const props = defineProps({
  text: { type: String, required: true },
  className: { type: String, default: '' },
  delay: { type: Number, default: 40 },
  duration: { type: Number, default: 1.1 },
  ease: { type: String, default: 'power3.out' },
  splitType: { type: String, default: 'chars' },
  from: { type: Object, default: () => ({ opacity: 0, y: 28 }) },
  to: { type: Object, default: () => ({ opacity: 1, y: 0 }) },
  threshold: { type: Number, default: 0.1 },
  rootMargin: { type: String, default: '-80px' },
  tag: { type: String, default: 'p' },
  textAlign: { type: String, default: 'center' }
})

const elRef = ref(null)
const fontsLoaded = ref(false)
const animationCompleted = ref(false)

const scrollTriggerStart = computed(() => {
  const startPct = (1 - props.threshold) * 100
  const mm = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(props.rootMargin || '')
  const mv = mm ? parseFloat(mm[1]) : 0
  const mu = mm ? mm[2] || 'px' : 'px'
  const sign = mv === 0 ? '' : mv < 0 ? `-=${Math.abs(mv)}${mu}` : `+=${mv}${mu}`
  return `top ${startPct}%${sign}`
})

const elStyle = computed(() => ({
  textAlign: props.textAlign,
  wordWrap: 'break-word',
  willChange: 'transform, opacity'
}))

function assignTargets(self) {
  if (props.splitType.includes('chars') && self.chars?.length) return self.chars
  if (props.splitType.includes('words') && self.words?.length) return self.words
  if (props.splitType.includes('lines') && self.lines?.length) return self.lines
  return self.chars ?? self.words ?? self.lines ?? []
}

function destroyInstance() {
  const el = elRef.value
  if (!el) return
  ScrollTrigger.getAll().forEach((st) => {
    if (st.trigger === el) st.kill()
  })
  try {
    el._rbsplitInstance?.revert()
  } catch {
    // 忽略
  }
  el._rbsplitInstance = undefined
}

function initAnimation() {
  const el = elRef.value
  if (!el || !props.text || !fontsLoaded.value) return
  if (animationCompleted.value) return

  destroyInstance()

  const start = scrollTriggerStart.value

  const splitInstance = new GSAPSplitText(el, {
    type: props.splitType,
    smartWrap: true,
    autoSplit: props.splitType === 'lines',
    linesClass: 'split-line',
    wordsClass: 'split-word',
    charsClass: 'split-char',
    reduceWhiteSpace: false,
    onSplit: (self) => {
      const targets = assignTargets(self)
      return gsap.fromTo(
        targets,
        { ...props.from },
        {
          ...props.to,
          duration: props.duration,
          ease: props.ease,
          stagger: props.delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
            anticipatePin: 0.4
          },
          onComplete: () => {
            animationCompleted.value = true
          },
          willChange: 'transform, opacity',
          force3D: true
        }
      )
    }
  })

  el._rbsplitInstance = splitInstance
}

onMounted(() => {
  if (document.fonts.status === 'loaded') {
    fontsLoaded.value = true
  } else {
    document.fonts.ready.then(() => {
      fontsLoaded.value = true
    })
  }
})

watch(fontsLoaded, (loaded) => {
  if (loaded) initAnimation()
})

watch(
  () => [props.text, props.delay, props.duration, props.ease, props.splitType, fontsLoaded.value],
  () => {
    if (!fontsLoaded.value) return
    animationCompleted.value = false
    initAnimation()
  }
)

onBeforeUnmount(() => {
  destroyInstance()
})
</script>

<style scoped>
.split-parent {
  overflow: hidden;
  display: inline-block;
  white-space: normal;
}

.split-parent :deep(.split-char),
.split-parent :deep(.split-word) {
  display: inline-block;
  will-change: transform, opacity;
}

.split-parent :deep(.split-line) {
  display: inline-block;
  overflow: hidden;
}
</style>
