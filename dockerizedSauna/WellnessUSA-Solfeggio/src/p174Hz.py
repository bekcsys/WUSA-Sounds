import subprocess
from signal import pause
from gpiozero import Button
import os

# Initialize button with error handling
bPlay = None
BUTTON_AVAILABLE = False
try:
    bPlay = Button(pin=19, bounce_time=0.3)
    BUTTON_AVAILABLE = True
    print("Button initialized successfully")
except Exception as e:
    print(f"Button not available: {e}")
    BUTTON_AVAILABLE = False

xAlt = False
sAudio = '/home/admin/Audio/a174Hz.mp3'
fPlayAudio = None  # Will hold the subprocess.Popen object

def fPlay():
    global sAudio
    global xAlt
    global fPlayAudio

    if xAlt and fPlayAudio is not None:
        # Stop playing
        try:
            if fPlayAudio.poll() is None:  # Process is still running
                fPlayAudio.terminate()
                # Wait a moment for graceful termination
                try:
                    fPlayAudio.wait(timeout=2)
                except subprocess.TimeoutExpired:
                    # Force kill if it doesn't terminate gracefully
                    fPlayAudio.kill()
                    fPlayAudio.wait()
            print('STOP MP3 ' + sAudio)
        except Exception as e:
            print(f'ERROR stopping audio: {e}')
        finally:
            fPlayAudio = None
            xAlt = False
    else:
        # Start playing
        # Validate file exists before trying to play
        if not os.path.isfile(sAudio) or not os.access(sAudio, os.R_OK):
            print(f'ERROR: Audio file not found or not readable: {sAudio}')
            return
        
        try:
            # Use Popen instead of run to avoid blocking
            fPlayAudio = subprocess.Popen(
                ['mpg123', sAudio],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL
            )
            print('PLAY MP3 ' + sAudio)
            xAlt = True
        except FileNotFoundError:
            print('ERROR: mpg123 command not found. Ensure it is installed.')
            xAlt = False
        except Exception as e:
            print(f'ERROR playing audio: {e}')
            xAlt = False
            fPlayAudio = None

# Set up button handler only if button is available
if BUTTON_AVAILABLE:
    bPlay.when_pressed = fPlay
    pause()
else:
    print("Button not available. Script will exit.")
    # Keep script running for a short time to see any errors
    import time
    time.sleep(5)
