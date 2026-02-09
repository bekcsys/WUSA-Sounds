# WellnessUSA Solfeggio - iOS App

Native iOS application for the WellnessUSA Solfeggio Sound Player. Built with React Native and Expo.

## Features

- **Native Audio Playback**: Uses Expo AV for high-quality audio playback
- **All Audio Files Bundled**: All MP3 files are included in the app bundle
- **Offline Support**: Works completely offline, no backend required
- **Native iOS Experience**: Optimized for iOS with native controls

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (via Xcode) or physical iOS device
- Xcode (for iOS development)

## Setup

### 1. Install Dependencies

```bash
cd ios-app
npm install
```

### 2. Copy Audio Files

Copy all audio files from `../api/Audio/` to `ios-app/assets/audio/`:

```bash
mkdir -p assets/audio
cp ../api/Audio/*.mp3 assets/audio/
```

### 3. Copy Image Assets

Copy image files from `../frontend/public/` to `ios-app/assets/images/`:

```bash
mkdir -p assets/images
cp ../frontend/public/L01-WUSA.png assets/images/
cp ../frontend/public/SunaControlLogo.png assets/images/
cp ../frontend/public/SoundFreqenciesLogo.png assets/images/
cp ../frontend/public/EntertinmnetLogo.png assets/images/
cp ../frontend/public/Freqencies.png assets/images/
cp ../frontend/public/AmbinetSounds.png assets/images/
```

## Running the App

### Development Mode

```bash
npm start
```

Then:
- Press `i` to open iOS Simulator
- **For iPhone**: Install "Expo Go" from App Store, then open Expo Go app → Tap "Scan QR Code" → Scan the QR code (don't use iPhone Camera app!)
- See `CONNECT-IPHONE.md` for detailed connection instructions

### Build for Production

```bash
# Build iOS app
expo build:ios

# Or use EAS Build (recommended)
eas build --platform ios
```

## Project Structure

```
ios-app/
├── App.tsx                 # Main app component
├── components/             # React Native components
│   ├── WelcomeScreen.tsx
│   ├── MainMenu.tsx
│   ├── PlayerScreen.tsx
│   ├── SolfeggioFrequencies.tsx
│   ├── EntertainmentMenu.tsx
│   ├── mediaPlayer/        # Player components
│   └── shared/             # Shared components
├── services/
│   └── AudioPlayer.ts      # Native audio service
├── assets/
│   ├── audio/              # All MP3 files (bundled in app)
│   └── images/             # Image assets
├── app.json                # Expo configuration
└── package.json            # Dependencies
```

## Audio Files

All audio files are bundled in the app at `assets/audio/`. The app includes:

- **Track 0**: OFF (aPower.mp3)
- **Tracks 1-9**: Sine Waves (a174Hz.mp3 through a963Hz.mp3)
- **Tracks 10-18**: Solfeggio Frequencies (174Meditation.mp3 through 963Enlightenment.mp3)
- **Tracks 19-27**: Bowl Sounds (Bowl01.mp3 through 396TriBowl.mp3)

## Key Differences from Web Version

1. **No Backend Required**: Audio playback is handled natively by Expo AV
2. **Files Bundled**: All audio files are included in the app bundle
3. **Native Performance**: Uses native iOS audio APIs for better performance
4. **Background Playback**: Supports background audio playback (configured in app.json)

## Troubleshooting

### iOS Simulator Not Starting

If you see errors like:
- `Unable to boot device because we cannot determine the runtime bundle`
- `CoreSimulatorService connection became invalid`
- `Connection refused`

**Quick Fix:**
```bash
./fix-simulator.sh
```

**Manual Fix:**
1. Kill simulator processes:
   ```bash
   killall -9 Simulator
   killall -9 com.apple.CoreSimulator.CoreSimulatorService
   ```

2. Restart CoreSimulatorService:
   ```bash
   sudo launchctl stop com.apple.CoreSimulator.CoreSimulatorService
   sudo launchctl start com.apple.CoreSimulator.CoreSimulatorService
   ```

3. Open Xcode → Preferences → Components → Download a simulator runtime

4. **Alternative**: Use Expo Go on a physical iPhone instead:
   ```bash
   npm start
   # Scan QR code with Expo Go app
   ```

### Audio Not Playing

1. Check that audio files are in `assets/audio/` directory
2. Verify file names match exactly (case-sensitive)
3. Check iOS permissions for audio playback

### Build Errors

1. Make sure all dependencies are installed: `npm install`
2. Clear cache: `expo start -c`
3. Rebuild: `expo build:ios --clear-cache`

### Missing Images

Ensure all image files are copied to `assets/images/` and referenced correctly in `assets/images/index.ts`.

## Development Notes

- Uses Expo AV for audio playback (native iOS AVFoundation)
- Audio files are loaded as assets and bundled with the app
- Supports background audio playback
- Volume control uses native iOS volume system
- All player state is managed in-memory (no backend)

## Building for App Store

1. Configure app.json with your bundle identifier
2. Set up App Store Connect
3. Build with EAS: `eas build --platform ios --profile production`
4. Submit to App Store: `eas submit --platform ios`
