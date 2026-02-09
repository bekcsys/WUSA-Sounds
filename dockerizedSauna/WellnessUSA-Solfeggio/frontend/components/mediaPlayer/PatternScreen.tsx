'use client'

import React, { useEffect, useRef, useState } from 'react'

interface PatternScreenProps {
  isPlaying?: boolean
  currentTrack?: number
  trackName?: string
  sessionStartTime?: number | null
}

const PatternScreen: React.FC<PatternScreenProps> = ({ isPlaying = false, currentTrack = 0, trackName = '', sessionStartTime = null }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const timeRef = useRef(0)
  const [displayName, setDisplayName] = useState(trackName)
  const [fadeOpacity, setFadeOpacity] = useState(1)
  const previousTrackRef = useRef(currentTrack)
  const [elapsed, setElapsed] = useState(0)

  // Determine pattern type based on track
  const getPatternType = (trackId: number): string => {
    if (trackId === 0) return 'off'
    if (trackId >= 1 && trackId <= 9) return 'sine' // Sine waves
    if (trackId >= 10 && trackId <= 18) return 'meditation' // Meditation tracks
    if (trackId >= 19 && trackId <= 24) return 'bowl' // Bowl tracks
    if (trackId >= 25 && trackId <= 27) return 'tribowl' // Tri-bowl tracks
    return 'default'
  }

  const patternType = getPatternType(currentTrack)

  // Get frequency-based color scheme
  const getFrequencyColors = (trackId: number) => {
    // Color schemes based on frequency ranges and track types
    if (trackId === 0) return { primary: 'rgba(150, 150, 150, 1)', secondary: 'rgba(100, 100, 100, 0.8)', glow: 'rgba(150, 150, 150, 0.6)' }
    
    // Low frequencies (174Hz, 285Hz, 396Hz) - Deep blues and purples
    if (trackId === 1 || trackId === 10) return { primary: 'rgba(100, 150, 255, 1)', secondary: 'rgba(80, 120, 220, 0.8)', glow: 'rgba(100, 150, 255, 0.8)' }
    if (trackId === 2 || trackId === 11) return { primary: 'rgba(120, 100, 255, 1)', secondary: 'rgba(100, 80, 220, 0.8)', glow: 'rgba(120, 100, 255, 0.8)' }
    if (trackId === 3 || trackId === 12) return { primary: 'rgba(140, 80, 255, 1)', secondary: 'rgba(120, 60, 220, 0.8)', glow: 'rgba(140, 80, 255, 0.8)' }
    
    // Mid frequencies (417Hz, 528Hz, 639Hz) - Greens and cyans
    if (trackId === 4 || trackId === 13) return { primary: 'rgba(100, 255, 150, 1)', secondary: 'rgba(80, 220, 120, 0.8)', glow: 'rgba(100, 255, 150, 0.8)' }
    if (trackId === 5 || trackId === 14) return { primary: 'rgba(100, 255, 200, 1)', secondary: 'rgba(80, 220, 180, 0.8)', glow: 'rgba(100, 255, 200, 0.8)' }
    if (trackId === 6 || trackId === 15) return { primary: 'rgba(80, 255, 220, 1)', secondary: 'rgba(60, 220, 200, 0.8)', glow: 'rgba(80, 255, 220, 0.8)' }
    
    // High frequencies (741Hz, 852Hz, 963Hz) - Yellows, oranges, and pinks
    if (trackId === 7 || trackId === 16) return { primary: 'rgba(255, 200, 100, 1)', secondary: 'rgba(220, 180, 80, 0.8)', glow: 'rgba(255, 200, 100, 0.8)' }
    if (trackId === 8 || trackId === 17) return { primary: 'rgba(255, 150, 100, 1)', secondary: 'rgba(220, 120, 80, 0.8)', glow: 'rgba(255, 150, 100, 0.8)' }
    if (trackId === 9 || trackId === 18) return { primary: 'rgba(255, 100, 150, 1)', secondary: 'rgba(220, 80, 120, 0.8)', glow: 'rgba(255, 100, 150, 0.8)' }
    
    // Bowl tracks - Warm golden tones
    if (trackId >= 19 && trackId <= 24) return { primary: 'rgba(255, 220, 120, 1)', secondary: 'rgba(255, 200, 100, 0.8)', glow: 'rgba(255, 220, 120, 0.8)' }
    
    // Tri-bowl tracks - Vibrant multi-color
    if (trackId >= 25 && trackId <= 27) return { primary: 'rgba(100, 255, 200, 1)', secondary: 'rgba(150, 200, 255, 0.8)', glow: 'rgba(100, 255, 200, 0.8)' }
    
    // Default
    return { primary: 'rgba(150, 200, 255, 1)', secondary: 'rgba(120, 180, 220, 0.8)', glow: 'rgba(150, 200, 255, 0.8)' }
  }

  const colors = getFrequencyColors(currentTrack)
  const [glowIntensity, setGlowIntensity] = useState(1)

  // Animate glow intensity
  useEffect(() => {
    if (!isPlaying || currentTrack === 0) {
      setGlowIntensity(1)
      return
    }

    let animationFrame: number
    let time = 0

    const animate = () => {
      time += 0.05
      // Pulse between 0.6 and 1.2 for dynamic glow
      const intensity = 0.8 + Math.sin(time) * 0.4
      setGlowIntensity(intensity)
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isPlaying, currentTrack])

  // Session timer
  useEffect(() => {
    if (!sessionStartTime) {
      setElapsed(0)
      return
    }

    const interval = setInterval(() => {
      const now = Date.now()
      setElapsed(Math.floor((now - sessionStartTime) / 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [sessionStartTime])

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Handle track name transitions (Apple iTunes style)
  useEffect(() => {
    if (currentTrack !== previousTrackRef.current && trackName) {
      // Fade out current name
      setFadeOpacity(0)
      
      // After fade out completes, change text and fade in
      const timeout = setTimeout(() => {
        setDisplayName(trackName)
        // Small delay before fade in for smooth transition
        setTimeout(() => {
          setFadeOpacity(1)
        }, 50)
      }, 200) // Half of transition duration
      
      previousTrackRef.current = currentTrack
      
      return () => clearTimeout(timeout)
    } else if (trackName && !displayName) {
      // Initial load - no transition needed
      setDisplayName(trackName)
      setFadeOpacity(1)
      previousTrackRef.current = currentTrack
    }
  }, [currentTrack, trackName])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const container = canvas.parentElement
    if (!container) return

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    resizeCanvas()
    
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas()
    })
    resizeObserver.observe(container)

    const drawPattern = () => {
      if (!ctx || !canvas) return

      // Get actual canvas dimensions
      const width = canvas.width
      const height = canvas.height

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      if (!isPlaying || currentTrack === 0) {
        // Static state when not playing
        ctx.fillStyle = 'rgba(60, 60, 75, 0.3)'
        ctx.fillRect(0, 0, width, height)
        return
      }

      const time = timeRef.current
      const centerX = width / 2
      const centerY = height / 2
      const currentColors = colors

      // Base background
      ctx.fillStyle = 'rgba(40, 40, 55, 0.2)'
      ctx.fillRect(0, 0, width, height)

      // Scale line width based on canvas size
      const baseLineWidth = Math.max(2, width / 150)

      // Extract RGB values from color strings for dynamic effects
      const extractRGB = (colorStr: string) => {
        const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
        return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : [150, 200, 255]
      }

      const [r, g, b] = extractRGB(currentColors.primary)
      const [r2, g2, b2] = extractRGB(currentColors.secondary)

      switch (patternType) {
        case 'sine':
          // Sine wave pattern - flowing waves with frequency colors
          const sineAmplitude = height * 0.2
          const glowPulse = 0.7 + Math.sin(time * 0.1) * 0.3
          
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.9 * glowPulse})`
          ctx.lineWidth = baseLineWidth * 1.5
          ctx.shadowBlur = 15 * glowIntensity
          ctx.shadowColor = currentColors.glow
          ctx.beginPath()
          for (let x = 0; x < width; x += 2) {
            const y = centerY + Math.sin((x * 0.03 + time * 0.1) * Math.PI) * sineAmplitude
            if (x === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.stroke()

          // Multiple sine waves with varying colors
          for (let i = 1; i <= 3; i++) {
            const blendR = Math.floor(r + (r2 - r) * (i / 3))
            const blendG = Math.floor(g + (g2 - g) * (i / 3))
            const blendB = Math.floor(b + (b2 - b) * (i / 3))
            ctx.strokeStyle = `rgba(${blendR}, ${blendG}, ${blendB}, ${0.5 / i * glowPulse})`
            ctx.lineWidth = baseLineWidth
            ctx.shadowBlur = 10 * glowIntensity / i
            ctx.beginPath()
            for (let x = 0; x < width; x += 2) {
              const y = centerY + Math.sin((x * 0.03 + time * 0.1 + i) * Math.PI) * (sineAmplitude / i)
              if (x === 0) ctx.moveTo(x, y)
              else ctx.lineTo(x, y)
            }
            ctx.stroke()
          }
          ctx.shadowBlur = 0
          break

        case 'meditation':
          // Meditation pattern - expanding circles with frequency colors
          const maxRadius = Math.min(width, height) * 0.4
          for (let i = 0; i < 7; i++) {
            const radius = ((time * 2 + i * 20) % maxRadius) + maxRadius * 0.1
            const alpha = (1 - (radius / maxRadius)) * 0.7 * glowIntensity
            const blendR = Math.floor(r + (r2 - r) * (i / 7))
            const blendG = Math.floor(g + (g2 - g) * (i / 7))
            const blendB = Math.floor(b + (b2 - b) * (i / 7))
            ctx.strokeStyle = `rgba(${blendR}, ${blendG}, ${blendB}, ${alpha})`
            ctx.lineWidth = baseLineWidth * 1.5
            ctx.shadowBlur = 20 * alpha
            ctx.shadowColor = currentColors.glow
            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
            ctx.stroke()
          }
          // Central point with glow
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.9 * glowIntensity})`
          ctx.shadowBlur = 30 * glowIntensity
          ctx.shadowColor = currentColors.glow
          ctx.beginPath()
          ctx.arc(centerX, centerY, baseLineWidth * 2, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
          break

        case 'bowl':
          // Bowl pattern - ripples with frequency colors
          const maxRippleRadius = Math.min(width, height) * 0.35
          const rippleCount = 4
          for (let i = 0; i < rippleCount; i++) {
            const offset = (time * 3 + i * 15) % maxRippleRadius
            const radius = maxRippleRadius * 0.2 + offset
            const alpha = (1 - (offset / maxRippleRadius)) * 0.9 * glowIntensity
            const blendR = Math.floor(r + (r2 - r) * (i / rippleCount))
            const blendG = Math.floor(g + (g2 - g) * (i / rippleCount))
            const blendB = Math.floor(b + (b2 - b) * (i / rippleCount))
            ctx.strokeStyle = `rgba(${blendR}, ${blendG}, ${blendB}, ${alpha})`
            ctx.lineWidth = baseLineWidth * 1.5
            ctx.shadowBlur = 25 * alpha
            ctx.shadowColor = currentColors.glow
            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
            ctx.stroke()
          }
          // Central glow with frequency color
          const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRippleRadius * 0.3)
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.7 * glowIntensity})`)
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, width, height)
          ctx.shadowBlur = 0
          break

        case 'tribowl':
          // Tri-bowl pattern - three expanding circles with frequency colors
          const spacing = Math.min(width, height) * 0.25
          const positions = [
            { x: centerX - spacing, y: centerY - spacing * 0.6 },
            { x: centerX + spacing, y: centerY - spacing * 0.6 },
            { x: centerX, y: centerY + spacing * 0.8 }
          ]
          positions.forEach((pos, idx) => {
            for (let i = 0; i < 2; i++) {
              const offset = (time * 2 + i * 10 + idx * 5) % (spacing * 0.4)
              const radius = spacing * 0.15 + offset
              const alpha = (1 - (offset / (spacing * 0.4))) * 0.8 * glowIntensity
              const colorShift = (idx * 120) % 360 // Rotate hue for each position
              const hueR = Math.floor(r + Math.sin(colorShift * Math.PI / 180) * 50)
              const hueG = Math.floor(g + Math.sin((colorShift + 120) * Math.PI / 180) * 50)
              const hueB = Math.floor(b + Math.sin((colorShift + 240) * Math.PI / 180) * 50)
              ctx.strokeStyle = `rgba(${Math.max(0, Math.min(255, hueR))}, ${Math.max(0, Math.min(255, hueG))}, ${Math.max(0, Math.min(255, hueB))}, ${alpha})`
              ctx.lineWidth = baseLineWidth * 1.5
              ctx.shadowBlur = 20 * alpha
              ctx.shadowColor = currentColors.glow
              ctx.beginPath()
              ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
              ctx.stroke()
            }
          })
          ctx.shadowBlur = 0
          break

        default:
          // Default pattern - simple pulse with frequency colors
          const pulseRadius = Math.min(width, height) * 0.15 + Math.sin(time * 0.1) * Math.min(width, height) * 0.1
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.6 * glowIntensity})`
          ctx.lineWidth = baseLineWidth * 1.5
          ctx.shadowBlur = 20 * glowIntensity
          ctx.shadowColor = currentColors.glow
          ctx.beginPath()
          ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2)
          ctx.stroke()
          ctx.shadowBlur = 0
      }

      timeRef.current += 1
      animationFrameRef.current = requestAnimationFrame(drawPattern)
    }

    if (isPlaying && currentTrack !== 0) {
      drawPattern()
    }

    return () => {
      resizeObserver.disconnect()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, currentTrack, patternType])

  return (
    <div style={{
      width: '100%',
      maxWidth: '450px',
      aspectRatio: '450 / 320',
      maxHeight: 'calc(100vh * 0.35)',
      flexShrink: 1,
      border: '10px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingBottom: 'clamp(15px, 8vh, 35px)',
      background: 'rgb(1, 51, 73)',
      fontSize: '16px',
      color: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 8px 32px rgba(30, 30, 45, 0.4)',
      position: 'relative',
      zIndex: 10,
      overflow: 'hidden',
    }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
      <div style={{
        position: 'relative', 
        zIndex: 1, 
        textAlign: 'center',
        width: '100%',
        padding: '0 20px',
        opacity: fadeOpacity,
        transition: 'opacity 0.4s ease-in-out',
      }}>
        <div style={{
          fontSize: 'clamp(18px, 3.5vw, 26px)',
          fontWeight: '800',
          color: colors.primary,
          textShadow: `
            0 0 ${2 * glowIntensity}px ${colors.glow},
            0 0 ${4 * glowIntensity}px ${colors.secondary},
            0 2px 8px rgba(40, 40, 50, 0.9),
            0 4px 12px rgba(40, 40, 50, 0.7)
          `,
          letterSpacing: '0.8px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitTextStroke: `0.5px ${colors.primary}`,
          filter: `brightness(${1.05 + glowIntensity * 0.1}) contrast(1.1)`,
          transition: 'filter 0.1s ease-out, text-shadow 0.1s ease-out',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          marginBottom: sessionStartTime ? 'clamp(8px, 1.5vh, 12px)' : '0',
        }}>
          {displayName || (isPlaying ? 'Playing...' : 'Paused')}
        </div>
        {sessionStartTime && (
          <div style={{
            fontSize: 'clamp(11px, 2vw, 16px)',
            fontFamily: '"DS-Digital", "Courier New", "Courier", monospace',
            color: colors.secondary,
            letterSpacing: '4px',
            fontWeight: '400',
            textShadow: `
              0 0 ${3 * glowIntensity}px ${colors.glow},
              0 0 ${6 * glowIntensity}px ${colors.secondary},
              0 2px 4px rgba(40, 40, 50, 0.9)
            `,
            opacity: 0.85,
            marginTop: 'clamp(6px, 1.2vh, 10px)',
            fontVariantNumeric: 'tabular-nums',
            WebkitTextStroke: `0.3px ${colors.secondary}`,
            filter: `brightness(${1.1 + glowIntensity * 0.15})`,
          }}>
            {formatTime(elapsed)}
        </div>
        )}
      </div>
    </div>
  )
}

export default PatternScreen

