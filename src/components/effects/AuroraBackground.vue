<template>
  <div ref="containerRef" class="aurora-bg" aria-hidden="true"></div>
</template>

<script setup>
/**
 * 柔和极光背景 — 移植自 vue-bits 的 SoftAurora（MIT + Commons Clause）
 * 已调整为舒缓风格：低速、低亮度、柔和的靛蓝/蓝灰配色。
 */
import { Mesh, Program, Renderer, Triangle } from 'ogl'
import { onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  speed: { type: Number, default: 0.6 },
  scale: { type: Number, default: 0.85 },
  brightness: { type: Number, default: 0.75 },
  color1: { type: String, default: '#8aa4f0' },
  color2: { type: String, default: '#4f7ac9' },
  noiseFrequency: { type: Number, default: 1.6 },
  noiseAmplitude: { type: Number, default: 1.5 },
  bandHeight: { type: Number, default: 0.55 },
  bandSpread: { type: Number, default: 1.35 },
  octaveDecay: { type: Number, default: 0.15 },
  layerOffset: { type: Number, default: 0.6 },
  colorSpeed: { type: Number, default: 0.85 },
  enableMouseInteraction: { type: Boolean, default: true },
  mouseInfluence: { type: Number, default: 0.2 }
})

function hexToVec3(hex) {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255
  ]
}

// 亮色背景较浅会稀释光带，用更深更饱和的蓝紫并提高亮度；暗色沿用默认舒缓配色
const LIGHT_COLORS = { color1: '#6a8dff', color2: '#8a5cf0', brightness: 0.95 }

function applyThemeToProgram(program) {
  const light = document.documentElement.getAttribute('data-theme') === 'light'
  if (light) {
    program.uniforms.uColor1.value = hexToVec3(LIGHT_COLORS.color1)
    program.uniforms.uColor2.value = hexToVec3(LIGHT_COLORS.color2)
    program.uniforms.uBrightness.value = LIGHT_COLORS.brightness
  } else {
    program.uniforms.uColor1.value = hexToVec3(props.color1)
    program.uniforms.uColor2.value = hexToVec3(props.color2)
    program.uniforms.uBrightness.value = props.brightness
  }
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uScale;
uniform float uBrightness;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uNoiseFreq;
uniform float uNoiseAmp;
uniform float uBandHeight;
uniform float uBandSpread;
uniform float uOctaveDecay;
uniform float uLayerOffset;
uniform float uColorSpeed;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;

#define TAU 6.28318

vec3 gradientHash(vec3 p) {
  p = vec3(
    dot(p, vec3(127.1, 311.7, 234.6)),
    dot(p, vec3(269.5, 183.3, 198.3)),
    dot(p, vec3(169.5, 283.3, 156.9))
  );
  vec3 h = fract(sin(p) * 43758.5453123);
  float phi = acos(2.0 * h.x - 1.0);
  float theta = TAU * h.y;
  return vec3(cos(theta) * sin(phi), sin(theta) * cos(phi), cos(phi));
}

float quinticSmooth(float t) {
  float t2 = t * t;
  float t3 = t * t2;
  return 6.0 * t3 * t2 - 15.0 * t2 * t2 + 10.0 * t3;
}

vec3 cosineGradient(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(TAU * (c * t + d));
}

float perlin3D(float amplitude, float frequency, float px, float py, float pz) {
  float x = px * frequency;
  float y = py * frequency;

  float fx = floor(x); float fy = floor(y); float fz = floor(pz);
  float cx = ceil(x);  float cy = ceil(y);  float cz = ceil(pz);

  vec3 g000 = gradientHash(vec3(fx, fy, fz));
  vec3 g100 = gradientHash(vec3(cx, fy, fz));
  vec3 g010 = gradientHash(vec3(fx, cy, fz));
  vec3 g110 = gradientHash(vec3(cx, cy, fz));
  vec3 g001 = gradientHash(vec3(fx, fy, cz));
  vec3 g101 = gradientHash(vec3(cx, fy, cz));
  vec3 g011 = gradientHash(vec3(fx, cy, cz));
  vec3 g111 = gradientHash(vec3(cx, cy, cz));

  float d000 = dot(g000, vec3(x - fx, y - fy, pz - fz));
  float d100 = dot(g100, vec3(x - cx, y - fy, pz - fz));
  float d010 = dot(g010, vec3(x - fx, y - cy, pz - fz));
  float d110 = dot(g110, vec3(x - cx, y - cy, pz - fz));
  float d001 = dot(g001, vec3(x - fx, y - fy, pz - cz));
  float d101 = dot(g101, vec3(x - cx, y - fy, pz - cz));
  float d011 = dot(g011, vec3(x - fx, y - cy, pz - cz));
  float d111 = dot(g111, vec3(x - cx, y - cy, pz - cz));

  float sx = quinticSmooth(x - fx);
  float sy = quinticSmooth(y - fy);
  float sz = quinticSmooth(pz - fz);

  float lx00 = mix(d000, d100, sx);
  float lx10 = mix(d010, d110, sx);
  float lx01 = mix(d001, d101, sx);
  float lx11 = mix(d011, d111, sx);

  float ly0 = mix(lx00, lx10, sy);
  float ly1 = mix(lx01, lx11, sy);

  return amplitude * mix(ly0, ly1, sz);
}

float auroraGlow(float t, vec2 shift) {
  vec2 uv = gl_FragCoord.xy / uResolution.y;
  uv += shift;

  float noiseVal = 0.0;
  float freq = uNoiseFreq;
  float amp = uNoiseAmp;
  vec2 samplePos = uv * uScale;

  for (float i = 0.0; i < 3.0; i += 1.0) {
    noiseVal += perlin3D(amp, freq, samplePos.x, samplePos.y, t);
    amp *= uOctaveDecay;
    freq *= 2.0;
  }

  float yBand = uv.y * 5.0 - uBandHeight * 5.0;
  return 0.3 * max(exp(uBandSpread * (1.0 - 1.1 * abs(noiseVal + yBand))), 0.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float t = uSpeed * 0.4 * uTime;

  vec2 shift = vec2(0.0);
  if (uEnableMouse) {
    shift = (uMouse - 0.5) * uMouseInfluence;
  }

  vec3 col = vec3(0.0);
  col += 0.99 * auroraGlow(t, shift) * cosineGradient(uv.x + uTime * uSpeed * 0.2 * uColorSpeed, vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.3, 0.20, 0.20)) * uColor1;
  col += 0.99 * auroraGlow(t + uLayerOffset, shift) * cosineGradient(uv.x + uTime * uSpeed * 0.1 * uColorSpeed, vec3(0.5), vec3(0.5), vec3(2.0, 1.0, 0.0), vec3(0.5, 0.20, 0.25)) * uColor2;

  col *= uBrightness;
  float alpha = clamp(length(col), 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`

const containerRef = ref(null)
let cleanup = null

onMounted(() => {
  const container = containerRef.value
  if (!container) return

  const renderer = new Renderer({ alpha: true, premultipliedAlpha: false })
  const gl = renderer.gl
  gl.clearColor(0, 0, 0, 0)

  const currentMouse = [0.5, 0.5]
  let targetMouse = [0.5, 0.5]

  function handleMouseMove(e) {
    const rect = gl.canvas.getBoundingClientRect()
    targetMouse = [
      (e.clientX - rect.left) / rect.width,
      1.0 - (e.clientY - rect.top) / rect.height
    ]
  }

  function handleMouseLeave() {
    targetMouse = [0.5, 0.5]
  }

  renderer.setSize(container.offsetWidth, container.offsetHeight)

  const geometry = new Triangle(gl)
  const program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height] },
      uSpeed: { value: props.speed },
      uScale: { value: props.scale },
      uBrightness: { value: props.brightness },
      uColor1: { value: hexToVec3(props.color1) },
      uColor2: { value: hexToVec3(props.color2) },
      uNoiseFreq: { value: props.noiseFrequency },
      uNoiseAmp: { value: props.noiseAmplitude },
      uBandHeight: { value: props.bandHeight },
      uBandSpread: { value: props.bandSpread },
      uOctaveDecay: { value: props.octaveDecay },
      uLayerOffset: { value: props.layerOffset },
      uColorSpeed: { value: props.colorSpeed },
      uMouse: { value: new Float32Array([0.5, 0.5]) },
      uMouseInfluence: { value: props.mouseInfluence },
      uEnableMouse: { value: props.enableMouseInteraction }
    }
  })

  function resize() {
    renderer.setSize(container.offsetWidth, container.offsetHeight)
    program.uniforms.uResolution.value = [
      gl.canvas.width,
      gl.canvas.height,
      gl.canvas.width / gl.canvas.height
    ]
  }
  window.addEventListener('resize', resize)

  const mesh = new Mesh(gl, { geometry, program })
  container.appendChild(gl.canvas)

  // 跟随主题切换更新颜色与亮度（亮色更饱和，暗色保持默认）
  applyThemeToProgram(program)
  const themeObserver = new MutationObserver(() => {
    applyThemeToProgram(program)
  })
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  })

  if (props.enableMouseInteraction) {
    gl.canvas.addEventListener('mousemove', handleMouseMove)
    gl.canvas.addEventListener('mouseleave', handleMouseLeave)
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let animationFrameId = null
  let running = false

  function update(time) {
    if (!running) return
    animationFrameId = requestAnimationFrame(update)
    program.uniforms.uTime.value = time * 0.001

    if (props.enableMouseInteraction) {
      currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0])
      currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1])
      program.uniforms.uMouse.value[0] = currentMouse[0]
      program.uniforms.uMouse.value[1] = currentMouse[1]
    } else {
      program.uniforms.uMouse.value[0] = 0.5
      program.uniforms.uMouse.value[1] = 0.5
    }

    renderer.render({ scene: mesh })
  }

  function start() {
    if (running) return
    running = true
    animationFrameId = requestAnimationFrame(update)
  }

  function stop() {
    running = false
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  }

  // 页面隐藏时暂停渲染，省电且更顺滑
  function onVisibility() {
    if (document.hidden) stop()
    else start()
  }
  document.addEventListener('visibilitychange', onVisibility)

  if (reduceMotion) {
    // 减少动态效果：只渲染一帧静态画面
    program.uniforms.uTime.value = 1.5
    program.uniforms.uMouse.value[0] = 0.5
    program.uniforms.uMouse.value[1] = 0.5
    renderer.render({ scene: mesh })
  } else {
    start()
  }

  cleanup = () => {
    stop()
    themeObserver.disconnect()
    window.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', onVisibility)
    if (props.enableMouseInteraction) {
      gl.canvas.removeEventListener('mousemove', handleMouseMove)
      gl.canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
    if (gl.canvas.parentNode === container) {
      container.removeChild(gl.canvas)
    }
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
})

onBeforeUnmount(() => {
  cleanup?.()
})
</script>

<style scoped>
.aurora-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.8s ease;
}
</style>
