# iOS App Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
cd ios-app
npm install
```

### 2. Copy Assets

Run the copy script to copy audio files and images:

```bash
./copy-assets.sh
```

Or manually:

```bash
# Copy audio files
mkdir -p assets/audio
cp ../api/Audio/*.mp3 assets/audio/

# Copy images
mkdir -p assets/images
cp ../frontend/public/L01-WUSA.png assets/images/
cp ../frontend/public/SunaControlLogo.png assets/images/
cp ../frontend/public/SoundFreqenciesLogo.png assets/images/
cp ../frontend/public/EntertinmnetLogo.png assets/images/
cp ../frontend/public/Freqencies.png assets/images/
cp ../frontend/public/AmbinetSounds.png assets/images/
```

### 3. Update Image Imports

After copying images, you may need to update `assets/images/index.ts` if file names differ.

### 4. Run the App

```bash
npm start
```

Then press `i` to open iOS Simulator, or scan QR code with Expo Go on your iPhone.

## Building for Production

### Using Expo Build Service

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for iOS
eas build --platform ios
```

### Using Local Build

```bash
# Generate native iOS project
expo prebuild --platform ios

# Build with Xcode
cd ios
pod install
# Then open WellnessUSASolfeggio.xcworkspace in Xcode
```

## Important Notes

1. **Audio Files**: All MP3 files must be in `assets/audio/` directory
2. **Image Assets**: All images must be in `assets/images/` directory
3. **Background Audio**: Configured in `app.json` - allows audio to play in background
4. **Bundle Size**: All audio files are included in the app bundle, so the app size will be larger

## Troubleshooting

### Audio Files Not Found

- Verify files are in `assets/audio/` directory
- Check file names match exactly (case-sensitive)
- Rebuild the app after adding files

### Images Not Loading

- Verify images are in `assets/images/` directory
- Check `assets/images/index.ts` has correct require() statements
- Clear cache: `expo start -c`

### Build Errors

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Expo cache: `expo start -c`
- Update Expo: `npm install expo@latest`
