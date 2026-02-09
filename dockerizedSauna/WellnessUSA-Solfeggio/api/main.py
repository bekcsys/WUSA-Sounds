from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import threading
import time
import os
import subprocess
import platform
from pydub import AudioSegment
try:
    import simpleaudio as sa
    SIMPLEAUDIO_AVAILABLE = True
except ImportError:
    SIMPLEAUDIO_AVAILABLE = False
    print("Warning: simpleaudio not available, will use subprocess fallback")

app = FastAPI(title="Sound Player API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Audio player - try simpleaudio first, fallback to subprocess
AUDIO_AVAILABLE = True
current_audio_thread = None
current_playback_obj = None
current_audio_process = None
audio_lock = threading.Lock()
paused_audio_file = None
should_stop_audio = False
# Use subprocess if simpleaudio not available
USE_SUBPROCESS = not SIMPLEAUDIO_AVAILABLE


def check_audio_system():
    """Check if audio system is available"""
    # Check for available audio players
    if USE_SUBPROCESS:
        # Try to find mpg123 or afplay
        try:
            if platform.system() == "Darwin":  # macOS
                result = subprocess.run(
                    ['which', 'afplay'], capture_output=True, timeout=1)
                if result.returncode == 0:
                    return True, 'afplay'
            # Try mpg123
            result = subprocess.run(
                ['which', 'mpg123'], capture_output=True, timeout=1)
            if result.returncode == 0:
                return True, 'mpg123'
        except:
            pass
        return False, None
    else:
        return True, 'simpleaudio'


audio_check_result, audio_method = check_audio_system()
AUDIO_AVAILABLE = audio_check_result
if AUDIO_AVAILABLE:
    print(f"✓ Audio system available ({audio_method})")
else:
    print("✗ Audio system not available")

# Player state
class PlayerState:
    def __init__(self):
        self.current_track = 0
        self.is_playing = False
        self.is_paused = False
        self.volume = 1.0
        self.shuffle = False
        self.lock = threading.Lock()

player_state = PlayerState()

# Track list
TRACKS = [
    {"id": 0, "name": "OFF", "file": "/home/admin/Audio/aPower.mp3"},
    {"id": 1, "name": "174Hz Sine Wave", "file": "/home/admin/Audio/a174Hz.mp3"},
    {"id": 2, "name": "285Hz Sine Wave", "file": "/home/admin/Audio/a285Hz.mp3"},
    {"id": 3, "name": "396Hz Sine Wave", "file": "/home/admin/Audio/a396Hz.mp3"},
    {"id": 4, "name": "417Hz Sine Wave", "file": "/home/admin/Audio/a417Hz.mp3"},
    {"id": 5, "name": "528Hz Sine Wave", "file": "/home/admin/Audio/a528Hz.mp3"},
    {"id": 6, "name": "639Hz Sine Wave", "file": "/home/admin/Audio/a639Hz.mp3"},
    {"id": 7, "name": "741Hz Sine Wave", "file": "/home/admin/Audio/a741Hz.mp3"},
    {"id": 8, "name": "852Hz Sine Wave", "file": "/home/admin/Audio/a852Hz.mp3"},
    {"id": 9, "name": "963Hz Sine Wave", "file": "/home/admin/Audio/a963Hz.mp3"},
    {"id": 10, "name": "174 Meditation",
        "file": "/home/admin/Audio/174Meditation.mp3"},
    {"id": 11, "name": "285 Healing", "file": "/home/admin/Audio/285Healing.mp3"},
    {"id": 12, "name": "396 Freedom", "file": "/home/admin/Audio/396Fearless.mp3"},
    {"id": 13, "name": "417 Positivity",
        "file": "/home/admin/Audio/417Positivity.mp3"},
    {"id": 14, "name": "528 Love", "file": "/home/admin/Audio/528Confidence.mp3"},
    {"id": 15, "name": "639 Harmony", "file": "/home/admin/Audio/639Harmony.mp3"},
    {"id": 16, "name": "741 Expression",
        "file": "/home/admin/Audio/741Cleansing.mp3"},
    {"id": 17, "name": "852 Intuition", "file": "/home/admin/Audio/852Intuition.mp3"},
    {"id": 18, "name": "963 Enlightenment",
        "file": "/home/admin/Audio/963Enlightenment.mp3"},
    {"id": 19, "name": "Bowl Zen", "file": "/home/admin/Audio/Bowl01.mp3"},
    {"id": 20, "name": "Bowl Sings Peace", "file": "/home/admin/Audio/Bowl02.mp3"},
    {"id": 21, "name": "Bowl Sings Joy", "file": "/home/admin/Audio/Bowl03.mp3"},
    {"id": 22, "name": "Bowl Sings Love", "file": "/home/admin/Audio/Bowl04.mp3"},
    {"id": 23, "name": "Bowl Sings Heal", "file": "/home/admin/Audio/Bowl05.mp3"},
    {"id": 24, "name": "Bowl Sings Relax", "file": "/home/admin/Audio/Bowl06.mp3"},
    {"id": 25, "name": "174Hz Tri-Bowls",
        "file": "/home/admin/Audio/174TriBowl.mp3"},
    {"id": 26, "name": "285Hz Tri-Bowls",
        "file": "/home/admin/Audio/285TriBowl.mp3"},
    {"id": 27, "name": "396Hz Tri-Bowls",
        "file": "/home/admin/Audio/396TriBowl.mp3"},
]


def stop_audio():
    """Stop currently playing audio"""
    global current_audio_thread, current_playback_obj, current_audio_process, paused_audio_file, should_stop_audio
    with audio_lock:
        should_stop_audio = True
        if current_playback_obj:
            try:
                current_playback_obj.stop()
            except:
                pass
            current_playback_obj = None
        if current_audio_process:
            try:
                current_audio_process.terminate()
                current_audio_process.wait(timeout=0.5)
            except:
                try:
                    current_audio_process.kill()
                except:
                    pass
            current_audio_process = None
        if current_audio_thread:
            # Wait for thread to finish (with timeout)
            current_audio_thread.join(timeout=0.5)
            current_audio_thread = None
        paused_audio_file = None


def play_audio_loop(file_path):
    """Play audio file in a loop in a separate thread"""
    global current_playback_obj, current_audio_process, should_stop_audio

    if not AUDIO_AVAILABLE:
        print("Audio system not available")
        return False

    try:
        if not os.path.isfile(file_path):
            print(f"File not found: {file_path}")
            return False

        if USE_SUBPROCESS:
            # Use subprocess (mpg123 or afplay)
            while not should_stop_audio:
                try:
                    if audio_method == 'afplay':
                        # afplay doesn't support looping, so we need to restart
                        proc = subprocess.Popen(
                            ['afplay', file_path],
                            stdout=subprocess.DEVNULL,
                            stderr=subprocess.DEVNULL
                        )
                        current_audio_process = proc
                        proc.wait()
                        if should_stop_audio:
                            break
                    elif audio_method == 'mpg123':
                        # mpg123 supports looping
                        volume_gain = int(player_state.volume * 20)
                        proc = subprocess.Popen(
                            ['mpg123', '-q', '--loop', '-1', '--gain',
                                str(volume_gain), file_path],
                            stdout=subprocess.DEVNULL,
                            stderr=subprocess.DEVNULL,
                            preexec_fn=os.setsid
                        )
                        current_audio_process = proc
                        proc.wait()
                        if should_stop_audio:
                            break
                except Exception as e:
                    print(f"Error during playback: {e}")
                    break
            current_audio_process = None
        else:
            # Use simpleaudio
            audio = AudioSegment.from_mp3(file_path)

            # Apply volume
            volume_change = player_state.volume * 20 - 20  # Convert 0-1 to dB
            audio = audio + volume_change

            # Convert to raw audio data
            raw_audio = audio.raw_data

            # Play in loop until stopped
            while not should_stop_audio:
                try:
                    playback_obj = sa.play_buffer(
                        raw_audio,
                        num_channels=audio.channels,
                        bytes_per_sample=audio.sample_width,
                        sample_rate=audio.frame_rate
                    )
                    current_playback_obj = playback_obj
                    playback_obj.wait_done()

                    if should_stop_audio:
                        break
                except Exception as e:
                    print(f"Error during playback: {e}")
                    break

            current_playback_obj = None

        return True
    except Exception as e:
        print(f"Error playing {file_path}: {e}")
        import traceback
        traceback.print_exc()
        return False


def load_and_play(file_path, resume=False):
    """Load and play audio file"""
    global current_audio_thread, should_stop_audio

    if not AUDIO_AVAILABLE:
        print("Audio system not available")
        return False

    # Stop any currently playing audio (unless resuming)
    if not resume:
        stop_audio()
        time.sleep(0.1)

    should_stop_audio = False

    # Start playback in a separate thread
    current_audio_thread = threading.Thread(
        target=play_audio_loop,
        args=(file_path,),
        daemon=True
    )
    current_audio_thread.start()

    print(f"Playing: {file_path} (volume: {player_state.volume})")
    return True

# Pydantic models for request/response
class VolumeRequest(BaseModel):
    volume: float

# API Endpoints
@app.get("/")
async def root():
    return {"message": "Sound Player API", "status": "running"}


@app.get("/test")
async def test():
    """Simple test endpoint"""
    return {"status": "ok", "message": "API is working"}


@app.get("/health")
async def health():
    """Health check endpoint"""
    audio_files = [f for f in os.listdir(
        "/home/admin/Audio") if f.endswith('.mp3')] if os.path.isdir("/home/admin/Audio") else []
    return {
        "status": "healthy",
        "audio_available": AUDIO_AVAILABLE,
        "audio_files_count": len(audio_files),
        "total_tracks": len(TRACKS)
    }

@app.get("/tracks")
async def get_tracks():
    return {"tracks": TRACKS}

@app.get("/status")
async def get_status():
    with player_state.lock:
        track = TRACKS[player_state.current_track]
        return {
            "current_track": player_state.current_track,
            "track_name": track["name"],
            "is_playing": player_state.is_playing,
            "volume": player_state.volume,
            "shuffle": player_state.shuffle
        }


@app.post("/track/{track_id}")
async def set_track(track_id: int):
    if track_id < 0 or track_id >= len(TRACKS):
        raise HTTPException(
            status_code=400, detail=f"Invalid track ID. Must be 0-{len(TRACKS)-1}")

    with player_state.lock:
        player_state.current_track = track_id
        track = TRACKS[track_id]
        
        if track_id == 0:
            # Track 0 is OFF
            stop_audio()
            player_state.is_playing = False
            player_state.is_paused = False
            return {"status": "stopped", "track": track["name"], "track_id": track_id}
        
        # Play the track
        if load_and_play(track["file"]):
            player_state.is_playing = True
            player_state.is_paused = False
            return {"status": "playing", "track": track["name"], "track_id": track_id}
        else:
            player_state.is_playing = False
            raise HTTPException(
                status_code=500, detail=f"Could not load track: {track['name']}")


@app.post("/play")
async def play():
    try:
        with player_state.lock:
            if player_state.current_track == 0:
                raise HTTPException(
                    status_code=400, detail="Track 0 (OFF) cannot be played")

            if player_state.is_paused:
                # Resume
                track = TRACKS[player_state.current_track]
                if load_and_play(track["file"], resume=True):
                    player_state.is_playing = True
                    player_state.is_paused = False
                    print(f"Resumed track: {track['name']}")
                    return {"status": "resumed", "track": track["name"]}
                else:
                    raise HTTPException(
                        status_code=500, detail=f"Could not resume track: {track['name']}")

            # Start playing
            track = TRACKS[player_state.current_track]
            print(
                f"Attempting to play track: {track['name']} ({track['file']})")
            if load_and_play(track["file"]):
                player_state.is_playing = True
                player_state.is_paused = False
                print(f"Successfully started playing: {track['name']}")
                return {"status": "playing", "track": track["name"]}
            else:
                error_msg = f"Could not play track: {track['name']}"
                print(f"ERROR: {error_msg}")
                raise HTTPException(status_code=500, detail=error_msg)
    except HTTPException:
        raise
    except Exception as e:
        print(f"Exception in /play: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/pause")
async def pause():
    global paused_audio_file
    with player_state.lock:
        # Stop playback but remember the file
        if current_audio_thread:
            track = TRACKS[player_state.current_track]
            paused_audio_file = track["file"]
            stop_audio()
        player_state.is_playing = False
        player_state.is_paused = True
        return {"status": "paused"}

@app.post("/resume")
async def resume():
    global paused_audio_file
    with player_state.lock:
        if not player_state.is_paused:
            raise HTTPException(status_code=400, detail="Audio is not paused")
        
        # Resume by restarting playback of the paused file
        if paused_audio_file and os.path.isfile(paused_audio_file):
            if load_and_play(paused_audio_file, resume=True):
                player_state.is_playing = True
                player_state.is_paused = False
                return {"status": "resumed"}
            else:
                raise HTTPException(
                    status_code=500, detail="Could not resume playback")
        else:
            # Fallback: use current track
            track = TRACKS[player_state.current_track]
            if load_and_play(track["file"], resume=True):
                player_state.is_playing = True
                player_state.is_paused = False
                return {"status": "resumed"}
            else:
                raise HTTPException(
                    status_code=500, detail="Could not resume playback")

@app.post("/next")
async def next_track():
    with player_state.lock:
        if player_state.current_track >= len(TRACKS) - 1:
            player_state.current_track = 1  # Skip track 0 (OFF)
        else:
            player_state.current_track += 1

        track = TRACKS[player_state.current_track]
        
        if player_state.is_playing and track["id"] != 0:
            if load_and_play(track["file"]):
                player_state.is_paused = False
        
        return {"status": "changed", "track": track["name"], "track_id": track["id"]}

@app.post("/previous")
async def previous_track():
    with player_state.lock:
        if player_state.current_track <= 1:
            player_state.current_track = len(TRACKS) - 1
        else:
            player_state.current_track -= 1

        track = TRACKS[player_state.current_track]
        
        if player_state.is_playing and track["id"] != 0:
            if load_and_play(track["file"]):
                player_state.is_paused = False
        
        return {"status": "changed", "track": track["name"], "track_id": track["id"]}


@app.post("/volume")
async def set_volume(request: VolumeRequest):
    volume = max(0.0, min(1.0, request.volume))  # Clamp to 0.0-1.0
    
    with player_state.lock:
        player_state.volume = volume
        # Restart playback with new volume if playing
        if (current_audio_thread or current_audio_process) and player_state.is_playing and not player_state.is_paused:
            track = TRACKS[player_state.current_track]
            # Restart with new volume
            stop_audio()
            time.sleep(0.1)
            load_and_play(track["file"])

    return {"status": "updated", "volume": volume}

@app.post("/shuffle")
async def toggle_shuffle():
    with player_state.lock:
        player_state.shuffle = not player_state.shuffle
        return {"status": "success", "shuffle": player_state.shuffle}

if __name__ == "__main__":
    import uvicorn
    print("\n" + "="*50)
    print("Sound Player API - FastAPI Backend")
    print("="*50)
    print(f"Audio available: {AUDIO_AVAILABLE}")
    print(f"Total tracks: {len(TRACKS)}")
    print("="*50 + "\n")

    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
