'use client'

import { useRef, useEffect } from 'react'

// Representa um neurônio na rede
interface NeuralNode {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  pulsePhase: number  // fase individual para o brilho pulsante
}

// Representa um sinal viajando entre dois neurônios
interface Pulse {
  fromIdx: number
  toIdx: number
  t: number       // progresso 0 → 1
  speed: number
  reverse: boolean // direção do sinal
}

// Paleta de cores — azul elétrico / royal blue (sem ciano)
const C = {
  node:       '37,  99,  235',  // blue-600  — azul profundo
  nodeCore:   '96,  165, 250',  // blue-400  — azul brilhante
  line:       '59,  130, 246',  // blue-500  — azul médio para axônios
  pulseOuter: '96,  165, 250',  // blue-400  — halo do pulso
  pulseCore:  '219, 234, 254',  // blue-100  — núcleo branco-azulado
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    let nodes: NeuralNode[] = []
    let pulses: Pulse[] = []

    // Ajusta quantidade de nós conforme tamanho da tela
    const nodeCount = () => (canvas.width < 640 ? 38 : canvas.width < 1024 ? 60 : 90)
    const maxDist   = () => (canvas.width < 640 ? 110 : canvas.width < 1024 ? 140 : 170)

    // Sincroniza resolução do canvas com o tamanho real em tela
    const resize = () => {
      canvas.width  = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    // Inicializa nós com posição e velocidade aleatórias
    const initNodes = () => {
      const count = nodeCount()
      nodes = Array.from({ length: count }, () => ({
        x:          Math.random() * canvas.width,
        y:          Math.random() * canvas.height,
        vx:         (Math.random() - 0.5) * 0.3,
        vy:         (Math.random() - 0.5) * 0.3,
        radius:     Math.random() * 1.8 + 0.6,
        opacity:    Math.random() * 0.45 + 0.25,
        pulsePhase: Math.random() * Math.PI * 2,
      }))
      pulses = []
    }

    // Adiciona um pulso de sinal entre dois nós (limita total ativo)
    const spawnPulse = (i: number, j: number) => {
      if (pulses.length >= 35) return
      pulses.push({
        fromIdx: i,
        toIdx:   j,
        t:       0,
        speed:   Math.random() * 0.010 + 0.005,
        reverse: Math.random() < 0.5,
      })
    }

    let frame = 0

    const animate = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const dist = maxDist()
      const distSq = dist * dist

      // ── Mover nós e rebater nas bordas ──────────────────────────────
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x <= 0 || n.x >= canvas.width)  n.vx *= -1
        if (n.y <= 0 || n.y >= canvas.height) n.vy *= -1
        n.x = Math.max(0, Math.min(canvas.width,  n.x))
        n.y = Math.max(0, Math.min(canvas.height, n.y))
      }

      // ── Desenhar conexões (axônios) ─────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx  = nodes[i].x - nodes[j].x
          const dy  = nodes[i].y - nodes[j].y
          const dSq = dx * dx + dy * dy
          if (dSq > distSq) continue

          const d     = Math.sqrt(dSq)
          const alpha = (1 - d / dist) * 0.20

          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.strokeStyle = `rgba(${C.line}, ${alpha})`
          ctx.lineWidth   = 0.55
          ctx.stroke()

          // Chance de disparar um sinal por esta conexão
          if (frame % 3 === 0 && Math.random() < 0.00065) {
            spawnPulse(i, j)
          }
        }
      }

      // ── Desenhar neurônios ──────────────────────────────────────────
      for (const n of nodes) {
        // Brilho pulsante suave e individual
        const pulse = Math.sin(frame * 0.018 + n.pulsePhase) * 0.12
        const alpha = Math.min(1, n.opacity + pulse)

        ctx.shadowBlur  = 8
        ctx.shadowColor = `rgba(${C.node}, 0.35)`

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${C.nodeCore}, ${alpha})`
        ctx.fill()

        ctx.shadowBlur = 0
      }

      // ── Desenhar sinais viajando pelas conexões ────────────────────
      pulses = pulses.filter(p => {
        p.t += p.speed
        if (p.t >= 1) return false

        const from = nodes[p.fromIdx]
        const to   = nodes[p.toIdx]
        if (!from || !to) return false

        // Posição interpolada ao longo da aresta
        const t  = p.reverse ? 1 - p.t : p.t
        const px = from.x + (to.x - from.x) * t
        const py = from.y + (to.y - from.y) * t

        // Halo externo (glow)
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 7)
        glow.addColorStop(0,   `rgba(${C.pulseOuter}, 0.75)`)
        glow.addColorStop(0.5, `rgba(${C.pulseOuter}, 0.25)`)
        glow.addColorStop(1,   `rgba(${C.pulseOuter}, 0)`)
        ctx.beginPath()
        ctx.arc(px, py, 7, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Núcleo brilhante do pulso
        ctx.shadowBlur  = 10
        ctx.shadowColor = `rgba(${C.pulseCore}, 0.9)`
        ctx.beginPath()
        ctx.arc(px, py, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${C.pulseCore}, 0.95)`
        ctx.fill()
        ctx.shadowBlur = 0

        return true
      })

      rafId = requestAnimationFrame(animate)
    }

    resize()
    initNodes()
    animate()

    // Reconstrói ao redimensionar a janela
    const ro = new ResizeObserver(() => {
      resize()
      initNodes()
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
