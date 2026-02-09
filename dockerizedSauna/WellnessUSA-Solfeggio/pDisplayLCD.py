from gpiozero import Button
from signal import pause
import pygame
import time
import os

# Initialize LCD with error handling
lcd = None
LCD_AVAILABLE = False
try:
    from RPLCD.i2c import CharLCD
    lcd = CharLCD(i2c_expander='PCF8574', address=0x27, port=1, cols=16, rows=2, dotsize=8)
    LCD_AVAILABLE = True
    print("LCD initialized successfully")
except (ImportError, OSError, Exception) as e:
    print(f"LCD not available: {e}")
    LCD_AVAILABLE = False

# Initialize buttons with error handling
bNext = None
bPlay = None
bPrevious = None
BUTTONS_AVAILABLE = False
try:
    bNext = Button(pin=26, bounce_time=0.2)
    bPlay = Button(pin=13, bounce_time=0.2)
    bPrevious = Button(pin=19, bounce_time=0.2)
    BUTTONS_AVAILABLE = True
    print("Buttons initialized successfully")
except Exception as e:
    print(f"Buttons not available: {e}")
    BUTTONS_AVAILABLE = False

sMessage = 'Text Display Message'
iCount = 0

xAlt = False
sAudio = '/home/admin/Audio/aPower01.mp3'

def fIncrementUp():
	global sMessage
	global iCount
	global sAudio
	if iCount != 27:
		iCount += 1
	else:
		iCount = 0
		
	match iCount:
		case 0:
			sMessage = 'JJ9 Hz Player 00\r\n      OFF     '
			sAudio = '/home/admin/Audio/aPower.mp3'
		case 1:
			sMessage = 'JJ9 Hz Player 01\r\n174Hz Sine Wave'
			sAudio = '/home/admin/Audio/a174Hz.mp3'	
		case 2:
			sMessage = 'JJ9 Hz Player 02\r\n285Hz Sine Wave'
			sAudio = '/home/admin/Audio/a285Hz.mp3'	
		case 3:
			sMessage = 'JJ9 Hz Player 03\r\n396Hz Sine Wave'
			sAudio = '/home/admin/Audio/a396Hz.mp3'	
		case 4:
			sMessage = 'JJ9 Hz Player 04\r\n417Hz Sine Wave'
			sAudio = '/home/admin/Audio/a417Hz.mp3'			
		case 5:
			sMessage = 'JJ9 Hz Player 05\r\n528Hz Sine Wave'
			sAudio = '/home/admin/Audio/a528Hz.mp3'	
		case 6:
			sMessage = 'JJ9 Hz Player 06\r\n639Hz Sine Wave'
			sAudio = '/home/admin/Audio/a639Hz.mp3'
		case 7:
			sMessage = 'JJ9 Hz Player 07\r\n741Hz Sine Wave'
			sAudio = '/home/admin/Audio/a741Hz.mp3'		
		case 8:
			sMessage = 'JJ9 Hz Player 08\r\n852Hz Sine Wave'
			sAudio = '/home/admin/Audio/a852Hz.mp3'
		case 9:
			sMessage = 'JJ9 Hz Player 09\r\n963Hz Sine Wave'
			sAudio = '/home/admin/Audio/a963Hz.mp3'	
		case 10:
			sMessage = 'JJ9 Hz Player 10\r\n174 Meditation'
			sAudio = '/home/admin/Audio/174Meditation.mp3'
		case 11:
			sMessage = 'JJ9 Hz Player 11\r\n285 Healing'
			sAudio = '/home/admin/Audio/285Healing.mp3'	
		case 12:
			sMessage = 'JJ9 Hz Player 12\r\n396 Fearless'
			sAudio = '/home/admin/Audio/396Fearless.mp3'	
		case 13:
			sMessage = 'JJ9 Hz Player 13\r\n417 Positivity'
			sAudio = '/home/admin/Audio/417Positivity.mp3'		
		case 14:
			sMessage = 'JJ9 Hz Player 14\r\n528 Confidence'
			sAudio = '/home/admin/Audio/528Confidence.mp3'		
		case 15:
			sMessage = 'JJ9 Hz Player 15\r\n639 Harmony'
			sAudio = '/home/admin/Audio/639Harmony.mp3'	
		case 16:
			sMessage = 'JJ9 Hz Player 16\r\n741 Cleansing'
			sAudio = '/home/admin/Audio/741Cleansing.mp3'		
		case 17:
			sMessage = 'JJ9 Hz Player 17\r\n852 Intuition'
			sAudio = '/home/admin/Audio/852Intuition.mp3'		
		case 18:
			sMessage = 'JJ9 Hz Player 18\r\n963 Enlighten'
			sAudio = '/home/admin/Audio/963Enlightenment.mp3'		
		case 19:
			sMessage = 'JJ9 Hz Player 19\r\nBowl Zen'
			sAudio = '/home/admin/Audio/Bowl01.mp3'		
		case 20:
			sMessage = 'JJ9 Hz Player 20\r\nBowl Sings Peace'
			sAudio = '/home/admin/Audio/Bowl02.mp3'			
		case 21:
			sMessage = 'JJ9 Hz Player 21\r\nBowl Sings Joy'
			sAudio = '/home/admin/Audio/Bowl03.mp3'			
		case 22:
			sMessage = 'JJ9 Hz Player 22\r\nBowl Sings Love'
			sAudio = '/home/admin/Audio/Bowl04.mp3'				
		case 23:
			sMessage = 'JJ9 Hz Player 23\r\nBowl Sings Heal'
			sAudio = '/home/admin/Audio/Bowl05.mp3'			
		case 24:
			sMessage = 'JJ9 Hz Player 24\r\nBowl Sings Relax'
			sAudio = '/home/admin/Audio/Bowl06.mp3'			
		case 25:
			sMessage = 'JJ9 Hz Player 25\r\n174Hz Tri-Bowls'
			sAudio = '/home/admin/Audio/174TriBowl.mp3'			
		case 26:
			sMessage = 'JJ9 Hz Player 26\r\n285Hz Tri-Bowls'
			sAudio = '/home/admin/Audio/285TriBowl.mp3'			
		case 27:
			sMessage = 'JJ9 Hz Player 27\r\n396Hz Tri-Bowls'
			sAudio = '/home/admin/Audio/396TriBowl.mp3'
				
	# Clear the display
	if LCD_AVAILABLE and lcd is not None:
		try:
			lcd.clear()
			lcd.write_string(sMessage)
		except Exception as e:
			print(f"Error updating LCD: {e}")
	
def fIncrementDown():
	global sMessage
	global iCount
	global sAudio
	
	if iCount != 0:
		iCount -= 1
	else:
		iCount = 27
		
	match iCount:
		case 0:
			sMessage = 'JJ9 Hz Player 00\r\n      Off      '
			sAudio = '/home/admin/Audio/aPower.mp3'
		case 1:
			sMessage = 'JJ9 Hz Player 01\r\n174Hz Sine Wave'
			sAudio = '/home/admin/Audio/a174Hz.mp3'	
		case 2:
			sMessage = 'JJ9 Hz Player 02\r\n285Hz Sine Wave'
			sAudio = '/home/admin/Audio/a285Hz.mp3'	
		case 3:
			sMessage = 'JJ9 Hz Player 03\r\n396Hz Sine Wave'
			sAudio = '/home/admin/Audio/a396Hz.mp3'	
		case 4:
			sMessage = 'JJ9 Hz Player 04\r\n417Hz Sine Wave'
			sAudio = '/home/admin/Audio/a417Hz.mp3'			
		case 5:
			sMessage = 'JJ9 Hz Player 05\r\n528Hz Sine Wave'
			sAudio = '/home/admin/Audio/a528Hz.mp3'	
		case 6:
			sMessage = 'JJ9 Hz Player 06\r\n639Hz Sine Wave'
			sAudio = '/home/admin/Audio/a639Hz.mp3'
		case 7:
			sMessage = 'JJ9 Hz Player 07\r\n741Hz Sine Wave'
			sAudio = '/home/admin/Audio/a741Hz.mp3'		
		case 8:
			sMessage = 'JJ9 Hz Player 08\r\n852Hz Sine Wave'
			sAudio = '/home/admin/Audio/a852Hz.mp3'
		case 9:
			sMessage = 'JJ9 Hz Player 09\r\n963Hz Sine Wave'
			sAudio = '/home/admin/Audio/a963Hz.mp3'	
		case 10:
			sMessage = 'JJ9 Hz Player 10\r\n174 Meditation'
			sAudio = '/home/admin/Audio/174Meditation.mp3'
		case 11:
			sMessage = 'JJ9 Hz Player 11\r\n285 Healing'
			sAudio = '/home/admin/Audio/285Healing.mp3'	
		case 12:
			sMessage = 'JJ9 Hz Player 12\r\n396 Fearless'
			sAudio = '/home/admin/Audio/396Fearless.mp3'	
		case 13:
			sMessage = 'JJ9 Hz Player 13\r\n417 Positivity'
			sAudio = '/home/admin/Audio/417Positivity.mp3'		
		case 14:
			sMessage = 'JJ9 Hz Player 14\r\n528 Confidence'
			sAudio = '/home/admin/Audio/528Confidence.mp3'		
		case 15:
			sMessage = 'JJ9 Hz Player 15\r\n639 Harmony'
			sAudio = '/home/admin/Audio/639Harmony.mp3'	
		case 16:
			sMessage = 'JJ9 Hz Player 16\r\n741 Cleansing'
			sAudio = '/home/admin/Audio/741Cleansing.mp3'		
		case 17:
			sMessage = 'JJ9 Hz Player 17\r\n852 Intuition'
			sAudio = '/home/admin/Audio/852Intuition.mp3'		
		case 18:
			sMessage = 'JJ9 Hz Player 18\r\n963 Enlighten'
			sAudio = '/home/admin/Audio/963Enlightenment.mp3'		
		case 19:
			sMessage = 'JJ9 Hz Player 19\r\nBowl Zen'
			sAudio = '/home/admin/Audio/Bowl01.mp3'		
		case 20:
			sMessage = 'JJ9 Hz Player 20\r\nBowl Sings Peace'
			sAudio = '/home/admin/Audio/Bowl02.mp3'			
		case 21:
			sMessage = 'JJ9 Hz Player 21\r\nBowl Sings Joy'
			sAudio = '/home/admin/Audio/Bowl03.mp3'			
		case 22:
			sMessage = 'JJ9 Hz Player 22\r\nBowl Sings Love'
			sAudio = '/home/admin/Audio/Bowl04.mp3'				
		case 23:
			sMessage = 'JJ9 Hz Player 23\r\nBowl Sings Heal'
			sAudio = '/home/admin/Audio/Bowl05.mp3'			
		case 24:
			sMessage = 'JJ9 Hz Player 24\r\nBowl Sings Relax'
			sAudio = '/home/admin/Audio/Bowl06.mp3'			
		case 25:
			sMessage = 'JJ9 Hz Player 25\r\n174Hz Tri-Bowls'
			sAudio = '/home/admin/Audio/174TriBowl.mp3'			
		case 26:
			sMessage = 'JJ9 Hz Player 26\r\n285Hz Tri-Bowls'
			sAudio = '/home/admin/Audio/285TriBowl.mp3'			
		case 27:
			sMessage = 'JJ9 Hz Player 27\r\n396Hz Tri-Bowls'
			sAudio = '/home/admin/Audio/396TriBowl.mp3'
				
	# Clear the display
	if LCD_AVAILABLE and lcd is not None:
		try:
			lcd.clear()
			lcd.write_string(sMessage)
		except Exception as e:
			print(f"Error updating LCD: {e}")

def fPlay():
	global iCount
	global sAudio
	
	if iCount != 0:
		# Validate file exists before trying to load
		if not os.path.isfile(sAudio) or not os.access(sAudio, os.R_OK):
			print(f'ERROR: Audio file not found or not readable: {sAudio}')
			return
		
		try:
			pygame.mixer.music.stop()
			print('STOP MP3')
			time.sleep(1)
			pygame.mixer.music.load(sAudio)
			pygame.mixer.music.play(-1, fade_ms=500)
			print('PLAY MP3 ' + sAudio)
		except pygame.error as e:
			print(f'ERROR loading/playing audio: {e}')
		except Exception as e:
			print(f'ERROR: Unexpected error playing audio: {e}')
	else:
		try:
			pygame.mixer.music.stop()
			print('STOP MP3')
		except Exception as e:
			print(f'ERROR stopping audio: {e}')

# Set up button handlers only if buttons are available
if BUTTONS_AVAILABLE:
    bNext.when_pressed = fIncrementUp
    bPrevious.when_pressed = fIncrementDown
    bPlay.when_pressed = fPlay
else:
    print("Warning: Buttons not available, button handlers not set")

# Initialize display
if LCD_AVAILABLE and lcd is not None:
    try:
        lcd.write_string('JJ9 Hz Player 00\r\n   Powered Up')
    except Exception as e:
        print(f"Error writing to LCD on startup: {e}")

# Initialize pygame mixer with error handling
AUDIO_AVAILABLE = False
try:
    pygame.mixer.init(44100, -16, 2, 4096)  # (frequency, size, channels, buffer)
    AUDIO_AVAILABLE = True
    print("Audio initialized successfully")
except pygame.error as e:
    print(f"Warning: Audio initialization failed: {e}")
    print("Attempting to initialize with dummy audio driver...")
    try:
        os.environ['SDL_AUDIODRIVER'] = 'dummy'
        pygame.mixer.init()
        AUDIO_AVAILABLE = False
        print("Running with dummy audio driver (no sound output)")
    except Exception as e2:
        print(f"Critical: Could not initialize pygame mixer: {e2}")
        AUDIO_AVAILABLE = False

# Play welcome sound if audio is available
if AUDIO_AVAILABLE:
    welcome_file = '/home/admin/Audio/aPower01.mp3'
    if os.path.isfile(welcome_file) and os.access(welcome_file, os.R_OK):
        try:
            pygame.mixer.music.load(welcome_file)
            pygame.mixer.music.play(fade_ms=0)
            print(f"Playing welcome sound: {welcome_file}")
        except Exception as e:
            print(f"Could not play welcome sound: {e}")
    else:
        print(f"Welcome sound file not found: {welcome_file}")

# Only pause if buttons are available, otherwise keep script running
if BUTTONS_AVAILABLE:
    pause()
else:
    print("Buttons not available. Script will exit.")
    # Keep script running for a short time to see any errors
    time.sleep(5)
