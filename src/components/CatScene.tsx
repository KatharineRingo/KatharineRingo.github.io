import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReducedMotion } from '../hooks'

type Props = { petCount: number; onPet: () => void }

const FUR = 0x5b7bb5
const FUR_LIGHT = 0xdbe7ff
const EYE = 0x38bdf8

function buildCat() {
  const disposables: { dispose(): void }[] = []
  const mat = (color: number, extra: THREE.MeshStandardMaterialParameters = {}) => {
    const m = new THREE.MeshStandardMaterial({ color, roughness: 0.55, ...extra })
    disposables.push(m)
    return m
  }
  const geo = <T extends THREE.BufferGeometry>(g: T) => (disposables.push(g), g)
  const mesh = (g: THREE.BufferGeometry, m: THREE.Material) => {
    const o = new THREE.Mesh(g, m)
    o.castShadow = true
    return o
  }

  const fur = mat(FUR)
  const light = mat(FUR_LIGHT)
  const dark = mat(0x0b1e3f, { roughness: 0.2 })
  const eyeMat = mat(EYE, { emissive: EYE, emissiveIntensity: 0.35, roughness: 0.15 })
  const nose = mat(0xf9a8d4)

  const cat = new THREE.Group()

  // body
  const body = mesh(geo(new THREE.SphereGeometry(1, 40, 32)), fur)
  body.scale.set(0.95, 0.85, 1.25)
  body.position.set(0, 0.95, -0.2)
  cat.add(body)
  const belly = mesh(geo(new THREE.SphereGeometry(0.7, 32, 24)), light)
  belly.scale.set(0.85, 0.9, 0.55)
  belly.position.set(0, 0.88, 0.72)
  cat.add(belly)

  // legs
  const legGeo = geo(new THREE.CapsuleGeometry(0.17, 0.5, 6, 12))
  for (const [x, z] of [[-0.45, 0.55], [0.45, 0.55], [-0.5, -0.85], [0.5, -0.85]]) {
    const leg = mesh(legGeo, fur)
    leg.position.set(x, 0.35, z)
    cat.add(leg)
    const paw = mesh(geo(new THREE.SphereGeometry(0.2, 16, 12)), light)
    paw.scale.set(1, 0.55, 1.2)
    paw.position.set(x, 0.08, z + 0.05)
    cat.add(paw)
  }

  // head
  const head = new THREE.Group()
  head.position.set(0, 1.95, 0.75)
  cat.add(head)
  const skull = mesh(geo(new THREE.SphereGeometry(0.78, 40, 32)), fur)
  skull.scale.set(1.1, 0.95, 0.95)
  head.add(skull)
  const muzzle = mesh(geo(new THREE.SphereGeometry(0.32, 24, 16)), light)
  muzzle.scale.set(1.3, 0.85, 0.9)
  muzzle.position.set(0, -0.22, 0.6)
  head.add(muzzle)
  const noseMesh = mesh(geo(new THREE.SphereGeometry(0.08, 16, 12)), nose)
  noseMesh.scale.set(1.3, 0.8, 0.8)
  noseMesh.position.set(0, -0.08, 0.86)
  head.add(noseMesh)

  const earGeo = geo(new THREE.ConeGeometry(0.3, 0.6, 4))
  const innerEarGeo = geo(new THREE.ConeGeometry(0.17, 0.38, 4))
  for (const side of [-1, 1]) {
    const ear = mesh(earGeo, fur)
    ear.position.set(side * 0.48, 0.68, 0)
    ear.rotation.set(0, Math.PI / 4, side * -0.35)
    head.add(ear)
    const inner = mesh(innerEarGeo, nose)
    inner.position.set(side * 0.47, 0.62, 0.1)
    inner.rotation.set(0.15, Math.PI / 4, side * -0.35)
    head.add(inner)
  }

  const eyes: THREE.Group[] = []
  for (const side of [-1, 1]) {
    const eye = new THREE.Group()
    eye.position.set(side * 0.3, 0.12, 0.66)
    const ball = mesh(geo(new THREE.SphereGeometry(0.14, 24, 16)), eyeMat)
    const pupil = mesh(geo(new THREE.SphereGeometry(0.07, 16, 12)), dark)
    pupil.scale.set(0.55, 1.4, 0.6)
    pupil.position.z = 0.1
    eye.add(ball, pupil)
    head.add(eye)
    eyes.push(eye)
  }

  const whiskerMat = new THREE.LineBasicMaterial({ color: 0xe2ecff })
  disposables.push(whiskerMat)
  for (const side of [-1, 1]) {
    for (const dy of [-0.05, 0.05]) {
      const g = geo(new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(side * 0.3, -0.2 + dy, 0.75),
        new THREE.Vector3(side * 0.95, -0.12 + dy * 3, 0.6),
      ]))
      head.add(new THREE.Line(g, whiskerMat))
    }
  }

  // tail: chain of nested segments so each one bends relative to its parent
  const tailRoot = new THREE.Group()
  tailRoot.position.set(0, 1.1, -1.35)
  tailRoot.rotation.x = -0.9
  cat.add(tailRoot)
  const tailSegs: THREE.Group[] = []
  const segGeo = geo(new THREE.CapsuleGeometry(0.11, 0.22, 4, 10))
  let parent: THREE.Object3D = tailRoot
  for (let i = 0; i < 7; i++) {
    const seg = new THREE.Group()
    seg.position.y = i === 0 ? 0 : 0.26
    const m = mesh(segGeo, i === 6 ? light : fur)
    m.position.y = 0.13
    seg.add(m)
    parent.add(seg)
    tailSegs.push(seg)
    parent = seg
  }

  return { cat, head, eyes, tailSegs, disposables }
}

export default function CatScene({ petCount, onPet }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const hopRef = useRef(0)

  useEffect(() => {
    if (petCount > 0) hopRef.current = 1
  }, [petCount])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const reduced = prefersReducedMotion()

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(0, 2.2, 7.5)
    camera.lookAt(0, 1.3, 0)

    scene.add(new THREE.HemisphereLight(0xdbeafe, 0x1e3a8a, 1.4))
    const sun = new THREE.DirectionalLight(0xffffff, 2)
    sun.position.set(3, 6, 4)
    sun.castShadow = true
    sun.shadow.mapSize.set(1024, 1024)
    scene.add(sun)
    const rim = new THREE.DirectionalLight(0x60a5fa, 1.5)
    rim.position.set(-4, 3, -3)
    scene.add(rim)

    const floorGeo = new THREE.CircleGeometry(2.4, 48)
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.25 })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    scene.add(floor)

    const { cat, head, eyes, tailSegs, disposables } = buildCat()
    cat.rotation.y = -0.35
    scene.add(cat)

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount
      if (!w || !h) return
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(mount)
    resize()

    const pointer = new THREE.Vector2()
    const onMove = (e: PointerEvent) => {
      pointer.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove)

    const clock = new THREE.Clock()
    let frame = 0
    let nextBlink = 2
    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(mount)

    const tick = () => {
      frame = requestAnimationFrame(tick)
      if (!visible) return
      const dt = Math.min(clock.getDelta(), 0.1)
      const t = clock.elapsedTime

      // head follows pointer
      head.rotation.y += (pointer.x * 0.7 + 0.35 - head.rotation.y) * 0.08
      head.rotation.x += (pointer.y * 0.35 - head.rotation.x) * 0.08

      // tail sway
      tailSegs.forEach((s, i) => {
        s.rotation.z = Math.sin(t * 2 - i * 0.5) * 0.18
        s.rotation.x = 0.12 + Math.sin(t * 1.3 - i * 0.4) * 0.05
      })

      // breathing + blink
      cat.scale.y = 1 + Math.sin(t * 2.2) * 0.012
      nextBlink -= dt
      const blink = nextBlink < 0 ? Math.max(0.1, Math.abs(Math.cos((nextBlink * Math.PI) / 0.15))) : 1
      if (nextBlink < -0.15) nextBlink = 2 + Math.random() * 3
      eyes.forEach(e => (e.scale.y = blink))

      // hop when petted
      if (hopRef.current > 0) {
        hopRef.current = Math.max(0, hopRef.current - dt * 1.8)
        const p = 1 - hopRef.current
        cat.position.y = Math.sin(p * Math.PI) * 0.6
        cat.rotation.y = -0.35 + Math.sin(p * Math.PI * 2) * 0.25
      }

      renderer.render(scene, camera)
    }
    if (reduced) {
      renderer.render(scene, camera)
    } else {
      tick()
    }

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      disposables.forEach(d => d.dispose())
      floorGeo.dispose()
      floorMat.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="cat-canvas"
      data-testid="cat-canvas"
      role="img"
      aria-label="Interactive 3D blue cat that watches your cursor. Click to pet it."
      onClick={onPet}
    />
  )
}
