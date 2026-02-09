'use client'

import React, { useEffect, useRef } from 'react'

interface FrequencyVisualizationProps {
  isPlaying: boolean
  volume: number
}

const FrequencyVisualization: React.FC<FrequencyVisualizationProps> = ({ isPlaying, volume }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let time = 0
    const bars = 64
    const barWidth = canvas.width / bars

    const animate = () => {
      if (!ctx) return

      // Clear canvas - let body background show through
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (isPlaying) {
        // Draw frequency bars - more subtle
        for (let i = 0; i < bars; i++) {
          const x = i * barWidth
          const barHeight = isPlaying
            ? (Math.sin(time * 0.01 + i * 0.1) * 0.5 + 0.5) *
              (Math.random() * 0.3 + 0.7) *
              canvas.height *
              0.4 *
              volume
            : 0

          // Create gradient for each bar - reduced opacity
          const barGradient = ctx.createLinearGradient(x, canvas.height, x, canvas.height - barHeight)
          const hue = (i / bars) * 360 + time * 0.5
          barGradient.addColorStop(0, `hsla(${hue}, 70%, 50%, 0.15)`)
          barGradient.addColorStop(1, `hsla(${hue}, 90%, 60%, 0.25)`)

          ctx.fillStyle = barGradient
          ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight)

          // Add subtle glow effect
          ctx.shadowBlur = 10
          ctx.shadowColor = `hsla(${hue}, 70%, 50%, 0.2)`
        }

        // Draw wave pattern overlay - more subtle
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
        ctx.lineWidth = 1
        ctx.beginPath()
        for (let x = 0; x < canvas.width; x += 2) {
          const y =
            canvas.height / 2 +
            Math.sin((x * 0.01 + time * 0.02) * Math.PI) * 30 * volume
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        // Draw circular waves - more subtle
        ctx.strokeStyle = `rgba(100, 150, 255, ${0.08 * volume})`
        ctx.lineWidth = 1
        for (let i = 0; i < 3; i++) {
          ctx.beginPath()
          const radius = 50 + (time * 2 + i * 30) % 200
          ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2)
          ctx.stroke()
        }
      }

      time += 1
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, volume])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 5,
        pointerEvents: 'none',
      }}
    />
  )
}

export default FrequencyVisualization

