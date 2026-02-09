import React from 'react'

interface TrackDisplayProps {
  trackName: string
}

const TrackDisplay: React.FC<TrackDisplayProps> = ({ trackName }) => {
  return (
    <div style={{
      padding: 'clamp(8px, 2vh, 15px) clamp(12px, 3vw, 25px)',
      fontSize: 'clamp(14px, 3vw, 22px)',
      fontWeight: '600',
      fontFamily: 'var(--font-scandia)',
      textAlign: 'center',
      height: 'auto',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      color: '#ffffff',
      textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
      position: 'relative',
      zIndex: 10,
      letterSpacing: '0.5px',
      width: '100%',
      maxWidth: '600px',
    }}>
      <span style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #a0d0ff 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        {trackName}
      </span>
    </div>
  )
}

export default TrackDisplay

