<template>
  <div ref="magnetRef" :class="wrapperClassName" :style="{ position: 'relative', display: 'inline-block' }">
    <div
      :class="innerClassName"
      :style="{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: transitionStyle,
        willChange: 'transform'
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
/**
 * 磁吸效果 — 移植自 vue-bits 的 Magnet（MIT + Commons Clause）
 * 强度已调低，移动更克制。
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  padding: { type: Number, default: 60 },
  disabled: { type: Boolean, default: false },
  magnetStrength: { type: Number, default: 3 },
  activeTransition: { type: String, default: 'transform 0.3s ease-out' },
  inactiveTransition: { type: String, default: 'transform 0.5s ease-in-out' },
  wrapperClassName: { type: String, default: '' },
  innerClassName: { type: String, default: '' }
})

defineOptions({ inheritAttrs: false })

const magnetRef = ref(null)
const isActive = ref(false)
const position = ref({ x: 0, y: 0 })

const transitionStyle = computed(() => (isActive.value ? props.activeTransition : props.inactiveTransition))

const handleMouseMove = (e) => {
  if (!magnetRef.value || props.disabled) return

  const { left, top, width, height } = magnetRef.value.getBoundingClientRect()
  const centerX = left + width / 2
  const centerY = top + height / 2

  const distX = Math.abs(centerX - e.clientX)
  const distY = Math.abs(centerY - e.clientY)

  if (distX < width / 2 + props.padding && distY < height / 2 + props.padding) {
    isActive.value = true
    position.value = {
      x: (e.clientX - centerX) / props.magnetStrength,
      y: (e.clientY - centerY) / props.magnetStrength
    }
  } else {
    isActive.value = false
    position.value = { x: 0, y: 0 }
  }
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>
