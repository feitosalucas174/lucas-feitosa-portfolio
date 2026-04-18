'use client'

import { useRef, useEffect } from 'react'

interface NeuralNode {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  pulsePhase: number
}

interface Pulse {
  fromIdx: number
  toIdx: number
  t: number
  speed: number
}

// Paleta azul
const C = {
  node:      '96,  165, 250',  // blue-400
  line:      '59,  130, 246',  // blue-500
  pulseCore: '219, 234, 254',  // blue-100
}

// ── Configurações de performance ──────────────────────────────────────
const TARGET_FPS   = 30          // limita a 30fps (era 60fps)
const FRAME_MS     = 1000 / TARGET_FPS
const MAX_PULSES   = 12          // era 35
const PULSE_CHANCE = 0.0004      // era 0.00065

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let rafId: number
    let lastFrameTime = 0
    let nodes: NeuralNode[] = []
    let pulses: Pulse[] = []
    let paused = false

    // Menos nós — suficiente para o efeito sem sobrecarregar o CPU
    const nodeCount = () => (canvas.width < 640 ? 22 : canvas.width < 1024 ? 35 : 50)
    const maxDist   = () => (canvas.width < 640 ? 100 : canvas.width < 1024 ? 130 : 150)

    const resize = () => {
      canvas.width  = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    const initNodes = () => {
      const count = nodeCount()
      nodes = Array.from({ length: count }, () => ({
        x:          Math.random() * canvas.width,
        y:          Math.random() * canvas.height,
        vx:         (Math.random() - 0.5) * 0.25,
        vy:         (Math.random() - 0.5) * 0.25,
        radius:     Math.random() * 1.5 + 0.8,
        opacity:    Math.random() * 0.4 + 0.25,
        pulsePhase: Math.random() * Math.PI * 2,
      }))
      pulses = []
    }

    const spawnPulse = (i: number, j: number) => {
      if (pulses.length >= MAX_PULSES) return
      pulses.push({ fromIdx: i, toIdx: j, t: 0, speed: Math.random() * 0.012 + 0.007 })
    }

    let frame = 0

    const animate = (now: number) => {
      rafId = requestAnimationFrame(animate)

      // Pula frames para manter 30fps
      if (now - lastFrameTime < FRAME_MS) return
      lastFrameTime = now

      if (paused) return

      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const dist   = maxDist()
      const distSq = dist * dist

      // ── Mover nós ───────────────────────────────────────────────────
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x <= 0 || n.x >= canvas.width)  n.vx *= -1
        if (n.y <= 0 || n.y >= canvas.height) n.vy *= -1
        n.x = Math.max(0, Math.min(canvas.width,  n.x))
        n.y = Math.max(0, Math.min(canvas.height, n.y))
      }

      // ── Conexões ─────────────────────────────────────────────────────
      // shadowBlur REMOVIDO — era o maior gargalo de performance
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx  = nodes[i].x - nodes[j].x
          const dy  = nodes[i].y - nodes[j].y
          const dSq = dx * dx + dy * dy
          if (dSq > distSq) continue

          const alpha = (1 - Math.sqrt(dSq) / dist) * 0.18
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.strokeStyle = `rgba(${C.line}, ${alpha})`
          ctx.lineWidth   = 0.5
          ctx.stroke()

          if (frame % 4 === 0 && Math.random() < PULSE_CHANCE) {
            spawnPulse(i, j)
          }
        }
      }

      // ── Nós ──────────────────────────────────────────────────────────
      // shadowBlur REMOVIDO — substituído por dois círculos sobrepostos
      for (const n of nodes) {
        const pulse = Math.sin(frame * 0.02 + n.pulsePhase) * 0.1
        const alpha = Math.min(1, n.opacity + pulse)

        // Halo leve sem shadowBlur
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${C.node}, ${alpha * 0.12})`
        ctx.fill()

        // Núcleo do nó
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${C.node}, ${alpha})`
        ctx.fill()
      }

      // ── Pulsos ───────────────────────────────────────────────────────
      pulses = pulses.filter(p => {
        p.t += p.speed
        if (p.t >= 1) return false

        const from = nodes[p.fromIdx]
        const to   = nodes[p.toIdx]
        if (!from || !to) return false

        const px = from.x + (to.x - from.x) * p.t
        const py = from.y + (to.y - from.y) * p.t

        // Halo sem RadialGradient (era caro) — círculos com alfa
        ctx.beginPath()
        ctx.arc(px, py, 5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${C.node}, 0.15)`
        ctx.fill()

        // Núcleo brilhante
        ctx.beginPath()
        ctx.arc(px, py, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${C.pulseCore}, 0.85)`
        ctx.fill()

        return true
      })
    }

    // Pausa quando a aba fica em segundo plano
    const onVisibility = () => { paused = document.hidden }
    document.addEventListener('visibilitychange', onVisibility)

    resize()
    initNodes()
    rafId = requestAnimationFrame(animate)

    const ro = new ResizeObserver(() => { resize(); initNodes() })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    />
  )
}
