import React from 'react'
import './VolumeControl.css'

interface VolumeControlProps {
  volume: number
  onVolumeChange: (volume: number) => void
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onVolumeChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    onVolumeChange(newVolume)
  }

  const getVolumeIcon = () => {
    if (volume === 0) return '🔇'
    if (volume < 0.33) return '🔈'
    if (volume < 0.66) return '🔉'
    return '🔊'
  }

  return (
    <div className="volumeControlContainer dark">
      <div className="volumeControlRow">
        <span className="volumeIcon">
          {getVolumeIcon()}
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleChange}
          className="volumeSlider"
          style={{
            background: `linear-gradient(to right, 
              rgba(100, 200, 255, 0.8) 0%, 
              rgba(100, 200, 255, 0.8) ${volume * 100}%, 
              rgba(255, 255, 255, 0.2) ${volume * 100}%, 
              rgba(255, 255, 255, 0.2) 100%)`,
          }}
        />
        <span className="volumePercentage">
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  )
}

export default VolumeControl

