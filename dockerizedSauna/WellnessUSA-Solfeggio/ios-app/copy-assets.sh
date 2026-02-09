#!/bin/bash

# Script to copy audio files and images to iOS app assets

echo "Copying audio files..."
mkdir -p assets/audio
cp ../api/Audio/*.mp3 assets/audio/ 2>/dev/null || echo "Warning: Some audio files may be missing"

echo "Copying image assets..."
mkdir -p assets/images
cp ../frontend/public/L01-WUSA.png assets/images/ 2>/dev/null || echo "Warning: L01-WUSA.png not found"
cp ../frontend/public/SunaControlLogo.png assets/images/ 2>/dev/null || echo "Warning: SunaControlLogo.png not found"
cp ../frontend/public/SoundFreqenciesLogo.png assets/images/ 2>/dev/null || echo "Warning: SoundFreqenciesLogo.png not found"
cp ../frontend/public/EntertinmnetLogo.png assets/images/ 2>/dev/null || echo "Warning: EntertinmnetLogo.png not found"
cp ../frontend/public/Freqencies.png assets/images/ 2>/dev/null || echo "Warning: Freqencies.png not found"
cp ../frontend/public/AmbinetSounds.png assets/images/ 2>/dev/null || echo "Warning: AmbinetSounds.png not found"

echo "Assets copied!"
echo "Audio files: $(ls assets/audio/*.mp3 2>/dev/null | wc -l | xargs) files"
echo "Image files: $(ls assets/images/*.png 2>/dev/null | wc -l | xargs) files"
