import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function WaterCausticsCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const container = mountRef.current
    if (!container) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' })
    } catch {
      return
    }

    const width = container.clientWidth || 1280
    const height = container.clientHeight || 600
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const uniforms = {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_res: { value: new THREE.Vector2(width, height) },
    }

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform vec2 u_res;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          float t = u_time * 0.35;
          vec2 p = uv * 4.5;

          float dist = distance(uv, u_mouse);
          float ripple = sin(dist * 24.0 - u_time * 3.0) * exp(-dist * 4.5) * 0.12;
          p += ripple;

          float c1 = sin(p.x * 1.4 + t + sin(p.y * 1.7 - t * 0.8));
          float c2 = cos(p.y * 1.6 - t * 1.1 + cos(p.x * 1.3 + t));
          float caustic = pow(clamp((c1 * c2) * 0.5 + 0.5, 0.0, 1.0), 4.0);

          vec3 col = mix(vec3(0.11, 0.37, 0.39), vec3(0.82, 0.94, 0.95), caustic);
          gl_FragColor = vec4(col, caustic * 0.38);
        }
      `,
    })

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(quad)

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      uniforms.u_mouse.value.set(
        (e.clientX - rect.left) / Math.max(rect.width, 1),
        1 - (e.clientY - rect.top) / Math.max(rect.height, 1),
      )
    }

    const onResize = () => {
      const w = container.clientWidth || 1280
      const h = container.clientHeight || 600
      renderer.setSize(w, h)
      uniforms.u_res.value.set(w, h)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('resize', onResize)

    let rafId = 0
    const clock = new THREE.Clock()
    const animate = () => {
      uniforms.u_time.value = clock.getElapsedTime()
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      quad.geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] mix-blend-screen"
    />
  )
}
