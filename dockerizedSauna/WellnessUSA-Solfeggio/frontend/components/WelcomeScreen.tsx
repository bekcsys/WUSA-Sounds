'use client'

import React, { useEffect, useState } from 'react'
import Button from './shared/Button'
import './WelcomeScreen.css'

interface WelcomeScreenProps {
  onSaunaControl: () => void
  onHealingFrequencies: () => void
  onMedia: () => void
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSaunaControl, onHealingFrequencies, onMedia }) => {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="welcomeContainer">
      <div className={`contentWrapper ${showContent ? 'show' : 'hide'}`}>
        <div className="containerCard">
          {/* Company Logo */}
          <div className="logoContainer">
            <img 
              src="/L01-WUSA.png" 
              alt="WellnessUSA"
              className="logo"
            />
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 'clamp(20px, 4vw, 30px)',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 'clamp(10px, 2vh, 15px)',
            flexWrap: 'wrap',
          }}>
            <div className="welcomeButtonContainer">
              <Button
                onClick={onSaunaControl}
                className="startButton iconButton imageButton"
              >
                <img 
                  src="/SunaControlLogo.png" 
                  alt="Sauna Control"
                  className="buttonImage"
                />
              </Button>
              <span className="welcomeButtonLabel">
                SAUNA CONTROL
              </span>
            </div>
            <div className="welcomeButtonContainer">
              <Button
                onClick={onHealingFrequencies}
                className="startButton iconButton imageButton"
              >
                <img 
                  src="/SoundFreqenciesLogo.png" 
                  alt="Sound Frequencies"
                  className="buttonImage"
                />
              </Button>
              <span className="welcomeButtonLabel">
                SOUND Frequencies
              </span>
            </div>
            <div className="welcomeButtonContainer">
              <Button
                onClick={onMedia}
                className="startButton iconButton imageButton"
              >
                <img 
                  src="/EntertinmnetLogo.png" 
                  alt="Entertainment"
                  className="buttonImage"
                />
              </Button>
              <span className="welcomeButtonLabel">
                ENTERTAINMENT
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen
