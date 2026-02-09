'use client'

import React, { useEffect, useState } from 'react'
import Button from './shared/Button'
import './MainMenu.css'

interface MainMenuProps {
  onSelectOption: (option: 'solfeggio' | 'ambient' | 'entertainment' | 'sine-wave' | 'bowls') => void
  onBack: () => void
}

const MainMenu: React.FC<MainMenuProps> = ({ onSelectOption, onBack }) => {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setShowContent(true)
  }, [])

  const menuOptions: Array<{
    id: 'solfeggio' | 'ambient' | 'entertainment' | 'sine-wave' | 'bowls'
    label: string
    description: string
    icon: string
    image?: string
  }> = [
    { id: 'solfeggio' as const, label: 'Solfeggio', description: 'sound frequencies', icon: '🎵', image: '/Freqencies.png' },
    { id: 'ambient' as const, label: 'Ambient', description: 'Rain, Ocean, Forest', icon: '🌊', image: '/AmbinetSounds.png' },
    { id: 'sine-wave' as const, label: 'SINE WAVE', description: 'pure tones', icon: '〰️', image: undefined },
    { id: 'bowls' as const, label: 'Bowl Sounds', description: 'Bowl sounds', icon: '🔔', image: undefined },
  ]

  return (
    <div className="mainMenuContainer">
      <div className={`contentWrapper ${showContent ? 'show' : 'hide'}`}>
        <div className="containerCard">
          <div className="titleSection">
            <h1 className="title">
              Sounds Frequencies
            </h1>
            <p className="subtitle">
              Select sound Frequencies
            </p>
          </div>
          <div className="buttonsRow">
            {menuOptions.map((option) => (
              <div
                key={option.id}
                className="menuOptionContainer"
              >
                <button
                  onClick={() => onSelectOption(option.id)}
                  className="roundedButton sizeMedium borderSlateBlue bgGradientBlue glowSlateBlue"
                >
                  {option.image ? (
                    <img 
                      src={option.image} 
                      alt={option.label}
                    />
                  ) : (
                    option.icon
                  )}
                </button>
                <div className="labelContainer">
                  <span className="menuLabel">
                    {option.label}
                  </span>
                  <span className="menuDescription">
                    {option.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Button
            onClick={onBack}
            className="homeButton"
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MainMenu
