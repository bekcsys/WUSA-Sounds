'use client'

import { useState, useEffect } from 'react'
import PlayerControls from '@/components/mediaPlayer/PlayerControls'
import TrackDisplay from '@/components/mediaPlayer/TrackDisplay'
import VolumeControl from '@/components/mediaPlayer/VolumeControl'
import PatternScreen from '@/components/mediaPlayer/PatternScreen'
import FrequencyVisualization from '@/components/mediaPlayer/FrequencyVisualization'
import WelcomeScreen from '@/components/WelcomeScreen'
import MainMenu from '@/components/MainMenu'
import SolfeggioFrequencies from '@/components/SolfeggioFrequencies'
import EntertainmentMenu from '@/components/EntertainmentMenu'
import SessionTimer from '@/components/mediaPlayer/SessionTimer'
import Button from '@/components/shared/Button'
import { PlayerStatus } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Log API URL for debugging (only in browser)
if (typeof window !== 'undefined') {
  console.log('API_BASE_URL:', API_BASE_URL)
}

type Screen = 'welcome' | 'main-menu' | 'solfeggio' | 'ambient' | 'entertainment' | 'player'

export default function Home() {
  const [status, setStatus] = useState<PlayerStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome')
  const [sessionActive, setSessionActive] = useState(false)
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])


  const fetchStatus = async (isInitialLoad = false) => {
    try {
      console.log(`Fetching status from: ${API_BASE_URL}/status`)
      const response = await fetch(`${API_BASE_URL}/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Status endpoint error: ${response.status} ${response.statusText}`, errorText)
        throw new Error(`Status endpoint returned ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log('Status fetched successfully:', data)
      
      // Validate the response has required fields
      if (!data || typeof data.current_track === 'undefined') {
        throw new Error('Invalid status response format')
      }
      
      setStatus(data)
      
      // On initial load, restore session state if track is not OFF (track 0)
      if (isInitialLoad && data.current_track !== 0 && typeof window !== 'undefined') {
        const savedSession = localStorage.getItem('sessionState')
        if (savedSession !== null) {
          try {
            const sessionData = JSON.parse(savedSession)
            // Only restore if the saved track matches current track, or if playAll mode
            if (sessionData.trackId === data.current_track || sessionData.playAll) {
              setSessionActive(true)
              setCurrentScreen('player')
              // Restore session start time
              if (sessionData.startTime) {
                setSessionStartTime(sessionData.startTime)
              } else {
                const startTime = Date.now()
                setSessionStartTime(startTime)
                localStorage.setItem('sessionState', JSON.stringify({
                  trackId: sessionData.playAll ? -1 : data.current_track,
                  startTime,
                  playAll: sessionData.playAll || false
                }))
              }
            } else {
              // Track changed, update session
              const startTime = Date.now()
              setSessionActive(true)
              setCurrentScreen('player')
              setSessionStartTime(startTime)
              localStorage.setItem('sessionState', JSON.stringify({
                trackId: data.current_track,
                startTime,
                playAll: false
              }))
            }
          } catch (e) {
            console.error('Failed to parse saved session:', e)
            // If parsing fails, start new session
            if (data.current_track !== 0) {
              const startTime = Date.now()
              setSessionActive(true)
              setCurrentScreen('player')
              setSessionStartTime(startTime)
              localStorage.setItem('sessionState', JSON.stringify({
                trackId: data.current_track,
                startTime,
                playAll: false
              }))
            }
          }
        } else {
            // If no saved session but track is not OFF, start a new session
            if (data.current_track !== 0) {
              const startTime = Date.now()
              setSessionActive(true)
              setCurrentScreen('player')
              setSessionStartTime(startTime)
              localStorage.setItem('sessionState', JSON.stringify({
                trackId: data.current_track,
                startTime,
                playAll: false
              }))
            }
        }
      }
    } catch (error) {
      console.error('Failed to fetch status:', error)
      console.error('Error details:', {
        message: error instanceof Error ? error.message : String(error),
        apiUrl: API_BASE_URL,
        stack: error instanceof Error ? error.stack : undefined
      })
      
      // Only set error status if we don't have a valid status already
      // This prevents overwriting a good status with an error
      if (!status || status.track_name === 'Error loading status' || status.track_name === 'Loading...') {
        setStatus({
          current_track: 0,
          track_name: `Error: ${error instanceof Error ? error.message : 'Cannot connect to backend'}`,
          is_playing: false,
          volume: 1.0,
          shuffle: false
        })
      }
    } finally {
      if (isInitialLoad) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    // Initial load with session restoration
    fetchStatus(true)
    // Reduce polling to every 2 seconds for better performance
    const interval = setInterval(() => fetchStatus(false), 2000)
    return () => clearInterval(interval)
  }, [])

  const handleAction = async (action: string) => {
    // Optimistic update - update UI immediately for better responsiveness
    const optimisticUpdate = () => {
      if (!status) return
      
      const newStatus = { ...status }
      
      if (action === 'play') {
        newStatus.is_playing = true
      } else if (action === 'pause') {
        newStatus.is_playing = false
      } else if (action.startsWith('track/')) {
        const trackId = parseInt(action.split('/')[1])
        if (trackId >= 0 && trackId < 28) {
          newStatus.current_track = trackId
          newStatus.is_playing = trackId !== 0
        }
      } else if (action === 'next') {
        newStatus.current_track = newStatus.current_track >= 27 ? 1 : newStatus.current_track + 1
      } else if (action === 'previous') {
        newStatus.current_track = newStatus.current_track <= 1 ? 27 : newStatus.current_track - 1
      }
      
      setStatus(newStatus)
    }
    
    // Apply optimistic update immediately
    optimisticUpdate()
    
    try {
      const url = action.startsWith('track/') 
        ? `${API_BASE_URL}/track/${action.split('/')[1]}`
        : `${API_BASE_URL}/${action}`
      
      // Don't wait for response - fire and forget for better responsiveness
      fetch(url, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (response) => {
        if (!response.ok) {
          console.error(`API call failed: ${response.status}`)
          // Refresh status to get correct state
          fetchStatus(false)
          return
        }
        
        const result = await response.json()
        console.log(`API call successful:`, result)
        
        // Update status in background (non-blocking)
        setTimeout(() => fetchStatus(false), 100)
      }).catch((error) => {
        console.error(`Failed to ${action}:`, error)
        // Refresh status to get correct state on error
        fetchStatus(false)
      })
    } catch (error) {
      console.error(`Failed to ${action}:`, error)
      // Refresh status to get correct state
      fetchStatus(false)
    }
  }

  const handleVolumeChange = async (volume: number) => {
    // Optimistic update - update UI immediately
    if (status) {
      setStatus({ ...status, volume })
    }
    
    // Fire and forget - don't wait for response
    fetch(`${API_BASE_URL}/volume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ volume }),
    }).catch((error) => {
      console.error('Failed to set volume:', error)
      // Refresh status on error to get correct state
      fetchStatus(false)
    })
  }

  const handleStartSession = async (trackId: number, playAll: boolean = false) => {
    // Navigate to player screen immediately
    const startTime = Date.now()
    setSessionActive(true)
    setSessionStartTime(startTime)
    setCurrentScreen('player')
    setLoading(false) // Ensure loading is false so player screen can render
    
    // Save session state to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('sessionState', JSON.stringify({
        trackId: playAll ? -1 : trackId, // Use -1 to indicate "play all" mode
        startTime,
        playAll
      }))
    }
    
    // Then make API calls to start playback
    try {
      if (playAll) {
        // Enable shuffle mode to play all sounds
        const shuffleResponse = await fetch(`${API_BASE_URL}/shuffle`, { method: 'POST' })
        if (!shuffleResponse.ok) {
          console.error('Failed to enable shuffle:', shuffleResponse.statusText)
        }
        // Start with a random track (excluding OFF)
        const randomTrack = Math.floor(Math.random() * 27) + 1
        const trackResponse = await fetch(`${API_BASE_URL}/track/${randomTrack}`, { method: 'POST' })
        if (!trackResponse.ok) {
          const errorData = await trackResponse.json().catch(() => ({ detail: trackResponse.statusText }))
          console.error('Failed to set random track:', errorData)
        } else {
          await fetchStatus(false)
        }
      } else {
        // Set the selected track
        console.log(`Setting track to ${trackId}...`)
        const trackResponse = await fetch(`${API_BASE_URL}/track/${trackId}`, { method: 'POST' })
        if (!trackResponse.ok) {
          const errorData = await trackResponse.json().catch(() => ({ detail: trackResponse.statusText }))
          console.error('Failed to set track:', errorData)
          console.error(`API URL: ${API_BASE_URL}`)
          console.error(`Track ID: ${trackId}`)
        } else {
          const trackData = await trackResponse.json()
          console.log('Track set successfully:', trackData)
          await fetchStatus(false)
        }
      }
    } catch (error) {
      console.error('Error in handleStartSession API call:', error)
      console.error(`API_BASE_URL: ${API_BASE_URL}`)
      // Player screen is already shown, just log the error
    }
  }

  const handleBackToMainMenu = () => {
    // Navigate back to main menu without stopping playback
    setCurrentScreen('main-menu')
  }

  const handleBackToWelcome = async () => {
    // Stop any playing audio
    if (status?.is_playing) {
      try {
        await fetch(`${API_BASE_URL}/pause`, { method: 'POST' })
      } catch (error) {
        console.error('Failed to pause playback:', error)
      }
    }
    
    // Reset to track 0 (OFF)
    try {
      await fetch(`${API_BASE_URL}/track/0`, { method: 'POST' })
      await fetchStatus()
    } catch (error) {
      console.error('Failed to reset track:', error)
    }
    
    setSessionActive(false)
    setSessionStartTime(null)
    setCurrentScreen('welcome')
    
    // Clear session state from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sessionState')
    }
  }

  const handleEndSession = async () => {
    // Stop any playing audio
    if (status?.is_playing) {
      try {
        await fetch(`${API_BASE_URL}/pause`, { method: 'POST' })
      } catch (error) {
        console.error('Failed to pause playback:', error)
      }
    }

    setSessionActive(false)
    setSessionStartTime(null)
    
    // Clear session state from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sessionState')
    }
    
    // Navigate back to welcome screen
    setCurrentScreen('welcome')
  }

  if (currentScreen === 'welcome') {
    return (
      <WelcomeScreen 
        onSaunaControl={() => {
          // TODO: Navigate to sauna control screen
          console.log('Sauna Control clicked')
        }}
        onHealingFrequencies={() => setCurrentScreen('main-menu')}
        onMedia={() => setCurrentScreen('entertainment')}
      />
    )
  }

  if (currentScreen === 'main-menu') {
    return (
      <MainMenu
        onSelectOption={(option) => {
          if (option === 'solfeggio') {
            handleStartSession(10) // Start with first solfeggio frequency (track 10-18) and go directly to player
          } else if (option === 'sine-wave') {
            handleStartSession(1) // Start with first sine wave (track 1-9)
          } else if (option === 'bowls') {
            handleStartSession(19) // Start with first bowl sound (track 19-27)
          } else if (option === 'ambient') {
            setCurrentScreen('ambient') // Show coming soon message
          } else if (option === 'entertainment') {
            setCurrentScreen('entertainment')
          }
        }}
        onBack={() => setCurrentScreen('welcome')}
      />
    )
  }

  if (currentScreen === 'solfeggio') {
    return (
      <SolfeggioFrequencies
        onStartSession={async (trackId, playAll) => {
          await handleStartSession(trackId, playAll)
          setCurrentScreen('player')
        }}
        onBack={() => setCurrentScreen('main-menu')}
        onHome={handleBackToWelcome}
      />
    )
  }

  if (currentScreen === 'entertainment') {
    return (
      <EntertainmentMenu
        onBack={() => setCurrentScreen('main-menu')}
        onHome={handleBackToWelcome}
      />
    )
  }

  if (currentScreen === 'ambient') {
    // TODO: Create AmbientSounds component
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}>
        <div style={{
          textAlign: 'center',
          color: '#ffffff',
        }}>
          <h1 style={{ fontSize: 'clamp(32px, 6vw, 48px)', marginBottom: '20px' }}>Ambient Sounds</h1>
          <p style={{ fontSize: 'clamp(18px, 3vw, 24px)', marginBottom: '30px' }}>Coming Soon</p>
          <button
            onClick={() => setCurrentScreen('main-menu')}
            style={{
              padding: 'clamp(12px, 2.5vh, 18px) clamp(30px, 6vw, 50px)',
              fontSize: 'clamp(16px, 3vw, 20px)',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.7)',
              background: 'transparent',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50px',
              cursor: 'pointer',
            }}
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  if (currentScreen !== 'player' || !sessionActive) {
    return null
  }

  const colors = {
    bg: 'rgba(40, 40, 50, 0.3)',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(255, 255, 255, 0.1)',
    buttonBg: 'rgba(100, 200, 255, 0.2)',
    buttonBorder: 'rgba(100, 200, 255, 0.5)',
  }

  // Show loading only if we're actually loading and don't have status yet
  // But allow player screen to show even without status (it will show default state)
  if (loading && !status) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        fontSize: '24px',
        color: colors.text,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10,
      }}>
        Loading...
      </div>
    )
  }

  // Use default status if status is not available yet
  const currentStatus = status || {
    current_track: 0,
    track_name: 'Loading...',
    is_playing: false,
    volume: 1.0,
    shuffle: false
  }

  return (
    <>
      <FrequencyVisualization isPlaying={currentStatus.is_playing} volume={currentStatus.volume} />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10,
        padding: 'clamp(5px, 2vh, 15px) clamp(5px, 2vw, 15px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}>

      <main style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
          justifyContent: 'center',
          gap: 'clamp(8px, 2vh, 20px)',
        maxWidth: '700px',
        width: '100%',
          height: '100%',
          maxHeight: '100vh',
        position: 'relative',
        zIndex: 10,
          padding: 'clamp(5px, 2vh, 15px) clamp(5px, 2vw, 15px)',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}>
          <PatternScreen 
            isPlaying={currentStatus.is_playing} 
            currentTrack={currentStatus.current_track}
            trackName={currentStatus.track_name}
            sessionStartTime={sessionStartTime}
          />
        <PlayerControls 
          isPlaying={currentStatus.is_playing}
          onPlayPause={() => handleAction(currentStatus.is_playing ? 'pause' : 'play')}
          onNext={() => handleAction('next')}
          onPrevious={() => handleAction('previous')}
            onShuffle={() => handleAction('shuffle')}
            shuffle={currentStatus.shuffle}
        />
          <VolumeControl 
            volume={currentStatus.volume} 
            onVolumeChange={handleVolumeChange}
          />
          <div style={{
            display: 'flex',
            gap: 'clamp(12px, 2.5vw, 18px)',
            marginTop: 'clamp(10px, 2vh, 15px)',
            width: '100%',
            maxWidth: '600px',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Button
              onClick={handleBackToMainMenu}
              className="backButton"
            >
              Back
            </Button>
            <Button
              onClick={handleBackToWelcome}
              className="homeButton"
            >
              Home
            </Button>
          </div>
      </main>
      </div>
    </>
  )
}

