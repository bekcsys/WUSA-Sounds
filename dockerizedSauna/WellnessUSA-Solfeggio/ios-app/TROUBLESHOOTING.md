# iOS App Troubleshooting Guide

## Common Issues and Solutions

### 1. iOS Simulator Won't Start

**Error Messages:**
- `Unable to boot device because we cannot determine the runtime bundle`
- `CoreSimulatorService connection became invalid`
- `Connection refused`
- `No such file or directory`

**Solution 1: Run Fix Script**
```bash
cd ios-app
./fix-simulator.sh
```

**Solution 2: Manual Fix**
```bash
# Kill all simulator processes
killall -9 Simulator
killall -9 com.apple.CoreSimulator.CoreSimulatorService

# Restart the service
sudo launchctl stop com.apple.CoreSimulator.CoreSimulatorService
sudo launchctl start com.apple.CoreSimulator.CoreSimulatorService

# Wait a few seconds, then try again
npm start
```

**Solution 3: Install Simulator Runtime**
1. Open Xcode
2. Go to Xcode → Settings → Platforms (or Components)
3. Download an iOS Simulator runtime (e.g., iOS 17.0)
4. Wait for download to complete
5. Try `npm start` again

**Solution 4: Use Physical Device (Easiest)**
Instead of using the simulator, use Expo Go on your iPhone:
1. Install "Expo Go" from the App Store
2. Run `npm start`
3. Scan the QR code with your iPhone camera
4. The app will open in Expo Go

### 2. Audio Files Not Found

**Error:** `Audio file not found: [filename]`

**Solution:**
1. Make sure you've copied audio files:
   ```bash
   ./copy-assets.sh
   ```

2. Verify files exist:
   ```bash
   ls -la assets/audio/*.mp3
   ```

3. Check that `assets/audio/index.ts` has all files listed

4. File names are case-sensitive - make sure they match exactly

### 3. Images Not Loading

**Error:** Image component shows blank or error

**Solution:**
1. Copy images:
   ```bash
   ./copy-assets.sh
   ```

2. Verify images exist:
   ```bash
   ls -la assets/images/
   ```

3. Check `assets/images/index.ts` has correct require() statements

### 4. Expo CLI Not Found

**Error:** `expo: command not found`

**Solution:**
```bash
npm install -g expo-cli
# Or use npx
npx expo start
```

### 5. Node Modules Issues

**Error:** Various module not found errors

**Solution:**
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Expo cache
expo start -c
```

### 6. TypeScript Errors

**Error:** Type errors in components

**Solution:**
1. Make sure TypeScript is installed:
   ```bash
   npm install --save-dev typescript @types/react @types/react-native
   ```

2. Check `tsconfig.json` is correct

3. Restart TypeScript server in your IDE

### 7. Build Fails with "No Bundle URL"

**Solution:**
```bash
# Clear all caches
rm -rf .expo node_modules
npm install
expo start -c
```

### 8. App Crashes on Launch

**Solution:**
1. Check Metro bundler is running
2. Check console for specific error messages
3. Verify all assets are copied correctly
4. Try clearing cache: `expo start -c`

### 9. Audio Not Playing

**Solution:**
1. Check audio files are in `assets/audio/`
2. Verify file names match in `assets/audio/index.ts`
3. Check iOS permissions (should be automatic with Expo)
4. Try restarting the app

### 10. Volume Control Not Working

**Solution:**
1. Make sure `@react-native-community/slider` is installed:
   ```bash
   npm install @react-native-community/slider
   ```

2. For iOS, you may need to link it (Expo handles this automatically)

## Getting Help

If none of these solutions work:

1. **Check Expo Documentation**: https://docs.expo.dev/
2. **Check React Native Documentation**: https://reactnative.dev/
3. **Check Expo Forums**: https://forums.expo.dev/
4. **Check GitHub Issues**: Search for similar issues in Expo/React Native repos

## Useful Commands

```bash
# Start development server
npm start

# Start with cleared cache
expo start -c

# List available simulators
xcrun simctl list devices

# Kill all simulator processes
killall -9 Simulator

# Check Expo version
expo --version

# Update Expo
npm install -g expo-cli@latest
```
