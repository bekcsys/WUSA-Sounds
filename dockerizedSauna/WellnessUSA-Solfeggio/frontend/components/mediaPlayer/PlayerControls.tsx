import React, { useState } from 'react'

interface PlayerControlsProps {
  isPlaying: boolean
  onPlayPause: () => void
  onNext: () => void
  onPrevious: () => void
  onShuffle?: () => void
  shuffle?: boolean
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onShuffle,
  shuffle = false,
}) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  const borderColor = 'rgba(200, 200, 200, 0.3)'
  const bgColor = 'rgba(60, 60, 70, 0.3)'
  const textColor = '#d0d0d0'
  const playBorder = 'rgba(100, 200, 255, 0.5)'
  const playBg = isPlaying ? 'rgba(255, 100, 100, 0.2)' : 'rgba(100, 200, 255, 0.15)'

  const buttonBaseStyle: React.CSSProperties = {
    padding: '18px 28px',
    fontSize: '20px',
    border: `2px solid ${borderColor}`,
    backgroundColor: bgColor,
    color: textColor,
    cursor: 'pointer',
    borderRadius: '50%',
    width: 'clamp(60px, 8vw, 70px)',
    height: 'clamp(60px, 8vw, 70px)',
    minWidth: '60px',
    minHeight: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(40, 40, 50, 0.5)',
  }

  const playButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    width: 'clamp(75px, 10vw, 90px)',
    height: 'clamp(75px, 10vw, 90px)',
    minWidth: '75px',
    minHeight: '75px',
    border: `2px solid ${playBorder}`,
    backgroundColor: playBg,
    boxShadow: isPlaying
      ? '0 0 30px rgba(255, 100, 100, 0.5)'
      : '0 0 30px rgba(100, 200, 255, 0.3)',
  }

  const getButtonStyle = (buttonType: string): React.CSSProperties => {
    const isHovered = hoveredButton === buttonType
    let base: React.CSSProperties
    if (buttonType === 'play') {
      base = playButtonStyle
    } else if (buttonType === 'shuffle') {
      base = {
        ...buttonBaseStyle,
        backgroundColor: shuffle 
          ? 'rgba(100, 200, 255, 0.25)'
          : bgColor,
        border: shuffle
          ? '2px solid rgba(100, 200, 255, 0.6)'
          : buttonBaseStyle.border,
      }
    } else {
      base = buttonBaseStyle
    }
    const hoverBorder = 'rgba(200, 200, 200, 0.8)'
    const hoverBg = 'rgba(200, 200, 200, 0.2)'
    
    return {
      ...base,
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      border: isHovered ? `2px solid ${hoverBorder}` : base.border,
      backgroundColor: isHovered ? hoverBg : base.backgroundColor,
      boxShadow: isHovered
        ? '0 0 40px rgba(255, 255, 255, 0.4)'
        : base.boxShadow,
    }
  }

  const iconStyle: React.CSSProperties = {
    fontSize: 'clamp(22px, 4vw, 28px)',
    filter: 'drop-shadow(0 2px 4px rgba(40, 40, 50, 0.6))',
  }

  const shuffleButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    backgroundColor: shuffle 
      ? 'rgba(100, 200, 255, 0.25)'
      : bgColor,
    border: shuffle
      ? '2px solid rgba(100, 200, 255, 0.6)'
      : buttonBaseStyle.border,
  }

  return (
    <div style={{ 
      display: 'flex', 
      gap: 'clamp(10px, 3vw, 20px)', 
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 10,
      width: '100%',
      flexWrap: 'wrap',
      flexShrink: 0,
    }}>
      {onShuffle && (
        <button
          onClick={onShuffle}
          style={getButtonStyle('shuffle')}
          onMouseEnter={() => setHoveredButton('shuffle')}
          onMouseLeave={() => setHoveredButton(null)}
          aria-label={shuffle ? 'Disable shuffle' : 'Enable shuffle'}
        >
          <span style={iconStyle}>⇄</span>
        </button>
      )}
      <button
        onClick={onPrevious}
        style={getButtonStyle('previous')}
        onMouseEnter={() => setHoveredButton('previous')}
        onMouseLeave={() => setHoveredButton(null)}
        aria-label="Previous track"
      >
        <span style={iconStyle}>⏮</span>
      </button>
      <button
        onClick={onPlayPause}
        style={getButtonStyle('play')}
        onMouseEnter={() => setHoveredButton('play')}
        onMouseLeave={() => setHoveredButton(null)}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        <span style={iconStyle}>
          {isPlaying ? '⏸' : '▶'}
        </span>
      </button>
      <button
        onClick={onNext}
        style={getButtonStyle('next')}
        onMouseEnter={() => setHoveredButton('next')}
        onMouseLeave={() => setHoveredButton(null)}
        aria-label="Next track"
      >
        <span style={iconStyle}>⏭</span>
      </button>
    </div>
  )
}

export default PlayerControls

