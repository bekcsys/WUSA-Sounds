'use client'

import React, { useEffect, useState } from 'react'
import Button from './shared/Button'
import './SolfeggioFrequencies.css'

interface SolfeggioFrequenciesProps {
  onStartSession: (trackId: number, playAll?: boolean) => void
  onBack: () => void
  onHome: () => void
}

const SolfeggioFrequencies: React.FC<SolfeggioFrequenciesProps> = ({ onStartSession, onBack, onHome }) => {
  const [showContent, setShowContent] = useState(false)
  const [startIndex, setStartIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward')

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const frequencies = [
    { label: 'Meditation', hz: '174 Hz', trackId: 10, bgColor: 'rgb(140, 80, 255)', borderColor: 'rgba(140, 80, 255, 0.8)' },
    { label: 'Healing', hz: '285 Hz', trackId: 11, bgColor: 'rgb(100, 255, 150)', borderColor: 'rgba(100, 255, 150, 0.8)' },
    { label: 'Freedom', hz: '396 Hz', trackId: 12, bgColor: 'rgb(140, 80, 255)', borderColor: 'rgba(140, 80, 255, 0.8)' },
    { label: 'Positivity', hz: '417 Hz', trackId: 13, bgColor: 'rgb(100, 255, 150)', borderColor: 'rgba(100, 255, 150, 0.8)' },
    { label: 'Love', hz: '528 Hz', trackId: 14, bgColor: 'rgb(100, 255, 200)', borderColor: 'rgba(100, 255, 200, 0.8)' },
    { label: 'Harmony', hz: '639 Hz', trackId: 15, bgColor: 'rgb(80, 255, 220)', borderColor: 'rgba(80, 255, 220, 0.8)' },
    { label: 'Expression', hz: '741 Hz', trackId: 16, bgColor: 'rgb(255, 200, 100)', borderColor: 'rgba(255, 200, 100, 0.8)' },
    { label: 'Intuition', hz: '852 Hz', trackId: 17, bgColor: 'rgb(255, 150, 100)', borderColor: 'rgba(255, 150, 100, 0.8)' },
    { label: 'Enlightenment', hz: '963 Hz', trackId: 18, bgColor: 'rgb(255, 100, 150)', borderColor: 'rgba(255, 100, 150, 0.8)' },
  ]

  const itemsPerView = 3
  const stepSize = 3
  // Calculate max start index to ensure we only show complete groups of 3
  // With 9 items: groups are [0-2], [3-5], [6-8]
  // maxStartIndex should be 6 (to show the last group starting at index 6)
  const maxStartIndex = Math.floor((frequencies.length - 1) / itemsPerView) * itemsPerView

  const handlePrevious = () => {
    if (isAnimating || startIndex === 0) return
    setAnimationDirection('backward')
    setIsAnimating(true)
    // Always move back by exactly 3 items
    setStartIndex((prev) => Math.max(0, prev - stepSize))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handleNext = () => {
    // Disable next if we're at or past the last group
    if (isAnimating || startIndex >= maxStartIndex) return
    setAnimationDirection('forward')
    setIsAnimating(true)
    // Always move forward by exactly 3 items, but don't exceed maxStartIndex
    setStartIndex((prev) => {
      const nextIndex = prev + stepSize
      return nextIndex <= maxStartIndex ? nextIndex : maxStartIndex
    })
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Always show exactly 3 items - slice from startIndex to startIndex + 3
  const visibleFrequencies = frequencies.slice(startIndex, startIndex + itemsPerView)
  // Pad to ensure we always have exactly 3 items displayed (even if some are empty)
  const paddedFrequencies: (typeof frequencies[0] | null)[] = [...visibleFrequencies]
  while (paddedFrequencies.length < itemsPerView) {
    paddedFrequencies.push(null)
  }

  return (
    <div className="solfeggioContainer">
      <div className={`contentWrapper ${showContent ? 'show' : 'hide'}`}>
        <div className="containerCard withMargin">
          <div className="titleSection">
            <h1 className="title">
              Healing Frequencies
            </h1>
            <p className="subtitle">
              select healing frequency
            </p>
          </div>
          <div className="frequenciesGridContainer">
            <div className="frequenciesGridWrapper">
              <div className={`frequenciesGrid ${isAnimating ? `animating animating-${animationDirection}` : ''}`}>
                {paddedFrequencies.map((freq, idx) => {
                  if (!freq) {
                    return (
                      <div key={`empty-${startIndex}-${idx}`} className="frequencyOptionContainer empty" />
                    )
                  }
                  return (
                    <div key={`${startIndex}-${freq.trackId}`} className={`frequencyOptionContainer ${isAnimating ? `animating-${animationDirection}` : ''}`}>
                      <button
                        onClick={() => onStartSession(freq.trackId)}
                        className="roundedButton sizeSmall borderNordicBlue glowNordicBlue frequencyButton"
                        style={{
                          background: freq.bgColor,
                        }}
                      >
                        {freq.hz}
                      </button>
                      <div className="labelContainer">
                        <span className="frequencyLabel">
                          {freq.label}
                        </span>
                        <span className="frequencyHz">
                          {freq.hz}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="arrowControls">
              <button
                onClick={handlePrevious}
                className="navArrow navArrowLeft"
                disabled={startIndex === 0 || isAnimating}
                aria-label="Previous"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="navArrow navArrowRight"
                disabled={startIndex >= maxStartIndex || isAnimating}
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>
          <div className="navigationControls">
            <Button
              onClick={onBack}
              className="backButton"
            >
              Back
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

export default SolfeggioFrequencies
