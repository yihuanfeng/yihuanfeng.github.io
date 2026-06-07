<template>
  <canvas ref="canvasRef" class="starfield"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const canvasRef = ref(null)
let scene, camera, renderer, animationId
let planet, glow, starPoints, starPositions, starVelocities
let mouseX = 0, mouseY = 0
let time = 0

onMounted(() => {
  const canvas = canvasRef.value
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 3000)
  camera.position.set(0, 0, 500)

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  const isMobile = window.innerWidth < 768
  const starCount = isMobile ? 3000 : 8000

  // 星空 — 带速度的星星
  const starGeo = new THREE.BufferGeometry()
  starPositions = new Float32Array(starCount * 3)
  starVelocities = new Float32Array(starCount * 3)
  const starSizes = new Float32Array(starCount)
  const starColors = new Float32Array(starCount * 3)
  const starPhases = new Float32Array(starCount) // 闪烁相位

  const colorPalette = [
    [1, 1, 1],           // 白色
    [0.65, 0.55, 0.98],  // 紫色
    [0.38, 0.65, 0.98],  // 蓝色
    [0.98, 0.75, 0.14],  // 金色
    [0.20, 0.83, 0.60],  // 绿色
    [0.96, 0.45, 0.71],  // 粉色
  ]

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3
    starPositions[i3] = (Math.random() - 0.5) * 3000
    starPositions[i3 + 1] = (Math.random() - 0.5) * 3000
    starPositions[i3 + 2] = (Math.random() - 0.5) * 2000 - 500

    // 缓慢漂移速度
    starVelocities[i3] = (Math.random() - 0.5) * 0.3
    starVelocities[i3 + 1] = (Math.random() - 0.5) * 0.2
    starVelocities[i3 + 2] = (Math.random() - 0.5) * 0.1

    starSizes[i] = Math.random() * 2.5 + 0.5
    starPhases[i] = Math.random() * Math.PI * 2

    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
    starColors[i3] = color[0]
    starColors[i3 + 1] = color[1]
    starColors[i3 + 2] = color[2]
  }

  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3))
  starGeo.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1))
  starGeo.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3))

  const starMat = new THREE.PointsMaterial({
    size: 1.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  })
  starPoints = new THREE.Points(starGeo, starMat)
  scene.add(starPoints)

  // 装饰行星 — 紫色渐变发光球
  const planetGeo = new THREE.SphereGeometry(30, 64, 64)
  const planetMat = new THREE.MeshPhongMaterial({
    color: 0x7c3aed,
    emissive: 0x4c1d95,
    emissiveIntensity: 0.3,
    shininess: 80
  })
  planet = new THREE.Mesh(planetGeo, planetMat)
  planet.position.set(250, 80, -200)
  scene.add(planet)

  // 行星光晕
  const glowGeo = new THREE.SphereGeometry(38, 32, 32)
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xa78bfa,
    transparent: true,
    opacity: 0.15
  })
  glow = new THREE.Mesh(glowGeo, glowMat)
  glow.position.copy(planet.position)
  scene.add(glow)

  // 行星轨道粒子环
  const orbitCount = 200
  const orbitGeo = new THREE.BufferGeometry()
  const orbitPos = new Float32Array(orbitCount * 3)
  for (let i = 0; i < orbitCount; i++) {
    const angle = (i / orbitCount) * Math.PI * 2
    const radius = 55 + Math.random() * 10
    orbitPos[i * 3] = 250 + Math.cos(angle) * radius
    orbitPos[i * 3 + 1] = 80 + Math.sin(angle) * radius * 0.3
    orbitPos[i * 3 + 2] = -200 + Math.sin(angle) * radius * 0.5
  }
  orbitGeo.setAttribute('position', new THREE.Float32BufferAttribute(orbitPos, 3))
  const orbitMat = new THREE.PointsMaterial({
    color: 0xa78bfa,
    size: 1.5,
    transparent: true,
    opacity: 0.4
  })
  const orbitParticles = new THREE.Points(orbitGeo, orbitMat)
  scene.add(orbitParticles)

  // 光源
  scene.add(new THREE.AmbientLight(0x333355, 0.5))
  const pointLight = new THREE.PointLight(0xa78bfa, 2, 600)
  pointLight.position.set(250, 80, -100)
  scene.add(pointLight)

  // 鼠标视差
  document.addEventListener('mousemove', onMouseMove)

  function onMouseMove(e) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2
  }

  function animate() {
    animationId = requestAnimationFrame(animate)
    time += 0.01

    // 星星漂移
    const posAttr = starPoints.geometry.getAttribute('position')
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      posAttr.array[i3] += starVelocities[i3]
      posAttr.array[i3 + 1] += starVelocities[i3 + 1]
      posAttr.array[i3 + 2] += starVelocities[i3 + 2]

      // 边界回绕
      if (posAttr.array[i3] > 1500) posAttr.array[i3] = -1500
      if (posAttr.array[i3] < -1500) posAttr.array[i3] = 1500
      if (posAttr.array[i3 + 1] > 1500) posAttr.array[i3 + 1] = -1500
      if (posAttr.array[i3 + 1] < -1500) posAttr.array[i3 + 1] = 1500
    }
    posAttr.needsUpdate = true

    // 星星整体闪烁 — 通过 opacity 微调
    starPoints.material.opacity = 0.7 + Math.sin(time * 0.5) * 0.1

    // 行星自转
    planet.rotation.y += 0.003

    // 行星轨道运动（缓慢绕行）
    const orbitAngle = time * 0.15
    planet.position.x = 250 + Math.cos(orbitAngle) * 30
    planet.position.y = 80 + Math.sin(orbitAngle) * 15
    glow.position.copy(planet.position)

    // 轨道粒子旋转
    orbitParticles.rotation.z += 0.002

    // 鼠标视差 — 相机微移
    camera.position.x += (mouseX * 15 - camera.position.x) * 0.02
    camera.position.y += (-mouseY * 10 - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)

    renderer.render(scene, camera)
  }
  animate()

  window.addEventListener('resize', onResize)
})

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', onResize)
  document.removeEventListener('mousemove', onMouseMove)
  renderer.dispose()
})
</script>

<style scoped>
.starfield {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style>
