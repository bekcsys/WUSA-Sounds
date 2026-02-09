'use client'

import React, { useEffect, useState, useRef } from 'react'
import Button from './shared/Button'
import './EntertainmentMenu.css'

interface EntertainmentMenuProps {
  onBack: () => void
  onHome: () => void
}

const EntertainmentMenu: React.FC<EntertainmentMenuProps> = ({ onBack, onHome }) => {
  const [showContent, setShowContent] = useState(false)
  const wheelRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const velocityRef = useRef(0)
  const draggingRef = useRef(false)
  const lastYRef = useRef(0)
  const animationActiveRef = useRef(true)
  const animationFrameRef = useRef<number>()

  const entertainmentOptions = [
    { id: 'spotify', label: 'Spotify', logo: 'Spotify.png', url: 'https://open.spotify.com' },
    { id: 'netflix', label: 'Netflix', logo: 'Netflix.png', url: 'https://www.netflix.com' },
    { id: 'youtube', label: 'YouTube', logo: 'YouTube.png', url: 'https://www.youtube.com' },
    { id: 'amazon-prime', label: 'Amazon Prime', logo: 'AmazonPrime.png', url: 'https://www.primevideo.com' },
    { id: 'hulu', label: 'Hulu', logo: 'Hulu.png', url: 'https://www.hulu.com' },
  ]

  const total = entertainmentOptions.length
  const angleStep = (2 * Math.PI) / total

  useEffect(() => {
    setShowContent(true)
  }, [])

  useEffect(() => {
    const wheel = wheelRef.current
    if (!wheel) return

    const cards = Array.from(wheel.querySelectorAll<HTMLElement>('.entertainment-card'))
    if (cards.length === 0) return

    const radiusY = 120
    const depthZ = 100

    const render = () => {
      cards.forEach((card, i) => {
        const angle = (i + offsetRef.current) * angleStep
        const s = Math.sin(angle)
        const c = Math.cos(angle)

        const y = s * radiusY
        const depth = (c + 1) / 2
        const z = depth * depthZ
        const scale = 0.8 + depth * 0.3
        const tiltX = -s * 18

        const opacityMin = 0.35
        const opacity = opacityMin + depth * (1 - opacityMin)

        card.style.transform = `translate3d(-50%, ${y}px, ${z}px) rotateX(${tiltX}deg) scale(${scale})`
        card.style.opacity = String(opacity)
        card.style.zIndex = String(100 + Math.round(depth * 100))
      })
    }

    const animate = () => {
      if (animationActiveRef.current) {
        if (Math.abs(velocityRef.current) > 0.00001) {
          offsetRef.current += velocityRef.current
          velocityRef.current *= 0.96
        } else {
          offsetRef.current += 0.004
        }
      }
      render()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      velocityRef.current += e.deltaY * 0.00007
    }

    const handlePointerDown = (e: PointerEvent) => {
      draggingRef.current = true
      lastYRef.current = e.clientY
      velocityRef.current = 0
      if (e.pointerId !== undefined) {
        wheel.setPointerCapture(e.pointerId)
      }
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return
      const dy = e.clientY - lastYRef.current
      lastYRef.current = e.clientY
      offsetRef.current += dy * 0.012
      velocityRef.current = dy * 0.001
    }

    const handlePointerUp = () => {
      draggingRef.current = false
    }

    wheel.addEventListener('wheel', handleWheel, { passive: false })
    wheel.addEventListener('pointerdown', handlePointerDown)
    wheel.addEventListener('pointermove', handlePointerMove)
    wheel.addEventListener('pointerup', handlePointerUp)
    wheel.addEventListener('pointercancel', handlePointerUp)
    wheel.addEventListener('pointerleave', handlePointerUp)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      wheel.removeEventListener('wheel', handleWheel)
      wheel.removeEventListener('pointerdown', handlePointerDown)
      wheel.removeEventListener('pointermove', handlePointerMove)
      wheel.removeEventListener('pointerup', handlePointerUp)
      wheel.removeEventListener('pointercancel', handlePointerUp)
      wheel.removeEventListener('pointerleave', handlePointerUp)
    }
  }, [angleStep, total])

  const handleSelect = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="entertainmentContainer">
      <div className={`contentWrapper ${showContent ? 'show' : 'hide'}`}>
        <div className="containerCard">
          <h1 className="title">
            Entertainment
          </h1>

          <div
            ref={wheelRef}
            className="wheel"
          >
            {entertainmentOptions.map((option) => (
              <button
                key={option.id}
                className="entertainment-card"
                onClick={() => handleSelect(option.url)}
              >
                <img 
                  src={`/${option.logo}`}
                  alt={option.label}
                  className="entertainmentLogo"
                />
                <span>{option.label}</span>
              </button>
            ))}
          </div>

          <div className="buttonGroup">
            <Button
              onClick={onBack}
              className="backButton"
            >
              Sounds Frequencies
            </Button>
            <Button
              onClick={onHome}
              className="homeButton"
            >
              Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntertainmentMenu
