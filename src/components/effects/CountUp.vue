<template>
  <span ref="elementRef" :class="className">{{ displayText }}</span>
</template>

<script setup>
/**
 * 数字滚动 — 移植自 vue-bits 的 CountUp（MIT + Commons Clause）
 */
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'

const props = defineProps({
  to: { type: Number, required: true },
  from: { type: Number, default: 0 },
  direction: { type: String, default: 'up' },
  delay: { type: Number, default: 0 },
  duration: { type: Number, default: 2 },
  className: { type: String, default: '' },
  startWhen: { type: Boolean, default: true },
  separator: { type: String, default: '' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' }
})

const elementRef = ref(null)
const displayValue = ref(props.direction === 'down' ? props.to : props.from)
const isInView = ref(false)
const animationId = ref(null)
const hasStarted = ref(false)

let intersectionObserver = null
let velocity = 0
let startTime = 0

const damping = computed(() => 20 + 40 * (1 / props.duration))
const stiffness = computed(() => 100 * (1 / props.duration))

const displayText = computed(() => {
  const value = Math.round(displayValue.value)
  let formatted = String(value)
  if (props.separator) {
    formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, props.separator)
  }
  return `${props.prefix}${formatted}${props.suffix}`
})

const springAnimation = (timestamp) => {
  if (!startTime) startTime = timestamp

  const target = props.direction === 'down' ? props.from : props.to
  const current = displayValue.value

  const displacement = target - current
  const springForce = displacement * stiffness.value
  const dampingForce = velocity * damping.value
  const acceleration = springForce - dampingForce

  velocity += acceleration * 0.016
  displayValue.value += velocity * 0.016

  if (Math.abs(displacement) > 0.01 || Math.abs(velocity) > 0.01) {
    animationId.value = requestAnimationFrame(springAnimation)
  } else {
    displayValue.value = target
    animationId.value = null
  }
}

const startAnimation = () => {
  if (hasStarted.value || !isInView.value || !props.startWhen) return

  hasStarted.value = true

  setTimeout(() => {
    startTime = 0
    velocity = 0
    animationId.value = requestAnimationFrame(springAnimation)
  }, props.delay * 1000)
}

const setupIntersectionObserver = () => {
  if (!elementRef.value) return

  intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !isInView.value) {
        isInView.value = true
        startAnimation()
      }
    },
    { threshold: 0, rootMargin: '0px' }
  )

  intersectionObserver.observe(elementRef.value)
}

const cleanup = () => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
    animationId.value = null
  }
  if (intersectionObserver) {
    intersectionObserver.disconnect()
    intersectionObserver = null
  }
}

watch(
  [() => props.from, () => props.to, () => props.direction],
  () => {
    displayValue.value = props.direction === 'down' ? props.to : props.from
    hasStarted.value = false
  },
  { immediate: true }
)

onMounted(() => {
  setupIntersectionObserver()
})

onUnmounted(() => {
  cleanup()
})
</script>
