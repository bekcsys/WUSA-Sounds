# WellnessUSA Solfeggio Sound Player

A web-based sound frequency player with Solfeggio frequencies, sine waves, and bowl sounds. Built with FastAPI backend and Next.js frontend, optimized for standalone desktop use.

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Audio files in `api/Audio/` directory (MP3 format)

### Three Simple Commands

**1. Build and Start**
```bash
make start
```
Starts both frontend and backend. Access at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

**2. Stop**
```bash
make stop
```

**3. Clean Up**
```bash
make clean-all
```
Removes all containers, images, and build artifacts.

## Testing the API

### Quick Health Check

**Using Makefile:**
```bash
make health    # Check backend health and audio system status
make test      # Test all API endpoints
```

**Using curl:**
```bash
# Test if API is running
curl http://localhost:8000/

# Check health status
curl http://localhost:8000/health

# Get current player status
curl http://localhost:8000/status
```

### Complete API Testing Guide

#### 1. **Root Endpoint** - Verify API is running
```bash
curl http://localhost:8000/
```
**Expected Response:**
```json
{
  "message": "Sound Player API",
  "status": "running"
}
```

#### 2. **Test Endpoint** - Simple connectivity test
```bash
curl http://localhost:8000/test
```
**Expected Response:**
```json
{
  "status": "ok",
  "message": "API is working"
}
```

#### 3. **Health Check** - Verify system status
```bash
curl http://localhost:8000/health
```
**Expected Response:**
```json
{
  "status": "healthy",
  "audio_available": true,
  "audio_files_count": 28,
  "total_tracks": 28
}
```

#### 4. **Get All Tracks** - List available tracks
```bash
curl http://localhost:8000/tracks
```
**Expected Response:** JSON array with all 28 tracks (id, name, file path)

#### 5. **Get Current Status** - Check player state
```bash
curl http://localhost:8000/status
```
**Expected Response:**
```json
{
  "current_track": 0,
  "track_name": "OFF",
  "is_playing": false,
  "volume": 1.0,
  "shuffle": false
}
```

#### 6. **Set Track** - Select and play a track
```bash
# Play track 10 (174 Meditation)
curl -X POST http://localhost:8000/track/10

# Play track 1 (174Hz Sine Wave)
curl -X POST http://localhost:8000/track/1

# Stop (track 0)
curl -X POST http://localhost:8000/track/0
```
**Expected Response:**
```json
{
  "status": "playing",
  "track": "174 Meditation",
  "track_id": 10
}
```

#### 7. **Play/Pause Controls**
```bash
# Start playing current track
curl -X POST http://localhost:8000/play

# Pause playback
curl -X POST http://localhost:8000/pause

# Resume playback
curl -X POST http://localhost:8000/resume
```
**Expected Response:**
```json
{
  "status": "playing",
  "track": "174 Meditation"
}
```

#### 8. **Track Navigation**
```bash
# Next track
curl -X POST http://localhost:8000/next

# Previous track
curl -X POST http://localhost:8000/previous
```
**Expected Response:**
```json
{
  "status": "changed",
  "track": "285 Healing",
  "track_id": 11
}
```

#### 9. **Volume Control**
```bash
# Set volume to 50%
curl -X POST http://localhost:8000/volume \
  -H "Content-Type: application/json" \
  -d '{"volume": 0.5}'

# Set volume to 100%
curl -X POST http://localhost:8000/volume \
  -H "Content-Type: application/json" \
  -d '{"volume": 1.0}'

# Mute (0%)
curl -X POST http://localhost:8000/volume \
  -H "Content-Type: application/json" \
  -d '{"volume": 0.0}'
```
**Expected Response:**
```json
{
  "status": "updated",
  "volume": 0.5
}
```

#### 10. **Shuffle Toggle**
```bash
curl -X POST http://localhost:8000/shuffle
```
**Expected Response:**
```json
{
  "status": "success",
  "shuffle": true
}
```

### Testing with Pretty JSON Output

For better readability, pipe responses through `jq` or `python -m json.tool`:

```bash
# Using jq (if installed)
curl http://localhost:8000/status | jq

# Using Python
curl http://localhost:8000/status | python3 -m json.tool
```

### Complete Test Sequence

Here's a complete test sequence to verify all functionality:

```bash
# 1. Check API is running
curl http://localhost:8000/test

# 2. Check health
curl http://localhost:8000/health

# 3. Get initial status
curl http://localhost:8000/status

# 4. Play a track (track 10 - 174 Meditation)
curl -X POST http://localhost:8000/track/10

# 5. Check status (should show is_playing: true)
curl http://localhost:8000/status

# 6. Pause
curl -X POST http://localhost:8000/pause

# 7. Resume
curl -X POST http://localhost:8000/resume

# 8. Change volume
curl -X POST http://localhost:8000/volume \
  -H "Content-Type: application/json" \
  -d '{"volume": 0.7}'

# 9. Next track
curl -X POST http://localhost:8000/next

# 10. Previous track
curl -X POST http://localhost:8000/previous

# 11. Stop (track 0)
curl -X POST http://localhost:8000/track/0
```

### Testing Track Categories

**Solfeggio Frequencies (Tracks 10-18):**
```bash
curl -X POST http://localhost:8000/track/10  # 174 Meditation
curl -X POST http://localhost:8000/track/14 # 528 Love
curl -X POST http://localhost:8000/track/18 # 963 Enlightenment
```

**Sine Waves (Tracks 1-9):**
```bash
curl -X POST http://localhost:8000/track/1  # 174Hz Sine Wave
curl -X POST http://localhost:8000/track/5  # 528Hz Sine Wave
curl -X POST http://localhost:8000/track/9  # 963Hz Sine Wave
```

**Bowl Sounds (Tracks 19-27):**
```bash
curl -X POST http://localhost:8000/track/19 # Bowl Zen
curl -X POST http://localhost:8000/track/25 # 174Hz Tri-Bowls
```

### Error Testing

Test error handling:

```bash
# Invalid track ID (should return 400)
curl -X POST http://localhost:8000/track/999

# Invalid volume (should clamp to 0.0-1.0)
curl -X POST http://localhost:8000/volume \
  -H "Content-Type: application/json" \
  -d '{"volume": 2.0}'
```

## Other Useful Commands

```bash
make help          # Show all available commands
make logs          # View application logs
make logs-backend  # View backend logs only
make logs-frontend # View frontend logs only
make restart       # Restart the application
make status        # Show container status
make rebuild       # Clean and rebuild from scratch
make verify        # Verify build configuration
```

## Project Structure

```
├── api/              # FastAPI backend
│   ├── main.py       # API server
│   ├── Dockerfile    # Backend container definition
│   └── Audio/        # Audio files (copied during build)
├── frontend/         # Next.js frontend
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   └── Dockerfile    # Frontend container definition
├── docker-compose.yml # Docker orchestration
└── Makefile          # Build and deployment commands
```

## API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Root endpoint - API status |
| GET | `/test` | Simple connectivity test |
| GET | `/health` | Health check with audio system status |
| GET | `/tracks` | Get all available tracks |
| GET | `/status` | Get current player status |
| POST | `/track/{track_id}` | Set and play a specific track (0-27) |
| POST | `/play` | Start/resume playback |
| POST | `/pause` | Pause playback |
| POST | `/resume` | Resume paused playback |
| POST | `/next` | Play next track |
| POST | `/previous` | Play previous track |
| POST | `/volume` | Set volume (0.0-1.0) |
| POST | `/shuffle` | Toggle shuffle mode |

## Track Categories

- **Track 0**: OFF (stops playback)
- **Tracks 1-9**: Sine Waves (pure tones)
- **Tracks 10-18**: Solfeggio Frequencies (meditation tracks)
- **Tracks 19-27**: Bowl Sounds (singing bowls and tri-bowls)

## Features

- **Solfeggio Frequencies**: Tracks 10-18 (174Hz to 963Hz)
- **Sine Waves**: Tracks 1-9 (pure tones)
- **Bowl Sounds**: Tracks 19-27 (meditation bowls)
- Category-based playback (shuffle/next/prev work within selected category)
- Interactive media player with visualizations
- Volume control
- Shuffle mode
- Play/Pause/Resume controls

## Audio Files

Audio files must be placed in the `api/Audio/` directory in the repository. These files are copied into the Docker image during build, making the application fully standalone.

**To add audio files:**
1. Place all `.mp3` files in `api/Audio/` directory
2. The Makefile will verify files exist before building

**Required audio files:**
- `aPower.mp3` (track 0)
- `a174Hz.mp3` through `a963Hz.mp3` (tracks 1-9)
- `174Meditation.mp3` through `963Enlightenment.mp3` (tracks 10-18)
- `Bowl01.mp3` through `Bowl06.mp3` (tracks 19-24)
- `174TriBowl.mp3` through `396TriBowl.mp3` (tracks 25-27)

## Troubleshooting

### API Not Responding

**Check if backend is running:**
```bash
make status
docker-compose ps
```

**View backend logs:**
```bash
make logs-backend
# or
docker-compose logs backend
```

**Test connectivity:**
```bash
curl http://localhost:8000/test
```

### Audio Not Playing

**Check audio system status:**
```bash
curl http://localhost:8000/health | python3 -m json.tool
```

**Check backend logs for audio errors:**
```bash
docker-compose logs backend | grep -i audio
```

**Note:** On macOS with Docker, audio playback may require additional configuration. The backend will use mpg123 as a fallback if simpleaudio is not available.

### Frontend Can't Connect to Backend

**Verify API URL:**
- Check browser console (F12) for API_BASE_URL
- Should be `http://localhost:8000`
- Verify backend is running on port 8000

**Check CORS:**
- Backend should allow all origins (`allow_origins=["*"]`)
- Check browser console for CORS errors

### Rebuild from Scratch

```bash
make clean-all
make start
```

### Check Container Status

```bash
make status
# or
docker-compose ps
```

## Development

### Backend (FastAPI)
- Located in `api/main.py`
- Uses FastAPI with async endpoints
- Audio playback via pydub + simpleaudio (fallback to mpg123)

### Frontend (Next.js)
- Located in `frontend/`
- React with TypeScript
- Optimistic UI updates for better responsiveness

## License

[Add your license information here]
