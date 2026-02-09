'use client'

import React, { useEffect, useState } from 'react'

interface SessionTimerProps {
  startTime: number | null
}

const SessionTimer: React.FC<SessionTimerProps> = ({ startTime }) => {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!startTime) {
      setElapsed(0)
      return
    }

    const interval = setInterval(() => {
      const now = Date.now()
      setElapsed(Math.floor((now - startTime) / 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div style={{
      padding: 'clamp(10px, 2vh, 15px) clamp(20px, 4vw, 30px)',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      borderRadius: '15px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      minWidth: '200px',
      justifyContent: 'center',
    }}>
      <div style={{
        fontSize: 'clamp(20px, 4vw, 28px)',
        color: '#64c8ff',
        fontWeight: '600',
        fontFamily: 'var(--font-scandia)',
        letterSpacing: '2px',
      }}>
        {formatTime(elapsed)}
      </div>
      <div style={{
        fontSize: 'clamp(12px, 2vw, 14px)',
        fontFamily: 'var(--font-scandia)',
        color: 'rgba(255, 255, 255, 0.6)',
      }}>
        Session Time
      </div>
    </div>
  )
}

export default SessionTimer

