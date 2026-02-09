# Connecting iPhone to Expo Development Server

## Method 1: Using Expo Go App (Recommended)

### Step 1: Install Expo Go
1. Open App Store on your iPhone
2. Search for "Expo Go"
3. Install the app

### Step 2: Start Development Server
```bash
cd ios-app
npm start
```

### Step 3: Connect Your iPhone

**Option A: Same Wi-Fi Network (Easiest)**
1. Make sure your iPhone and Mac are on the **same Wi-Fi network**
2. In the terminal, you'll see a QR code
3. Open **Expo Go** app on your iPhone
4. Tap "Scan QR Code" in Expo Go
5. Scan the QR code from the terminal

**Option B: Using Tunnel (If Wi-Fi doesn't work)**
```bash
npm start -- --tunnel
```
Then scan the QR code with Expo Go app.

**Option C: Manual Connection**
1. In the terminal, you'll see something like:
   ```
   Metro waiting on exp://192.168.1.100:8081
   ```
2. Open Expo Go app on your iPhone
3. Tap "Enter URL manually"
4. Enter the URL shown in terminal (e.g., `exp://192.168.1.100:8081`)

## Method 2: Using Development Build (For Production-like Testing)

If you want to test with a standalone app (not Expo Go):

```bash
# Build development client
eas build --profile development --platform ios

# Or use local build
expo run:ios --device
```

## Troubleshooting

### QR Code Says "Not Usable Data"

This happens when:
- You're scanning with iPhone Camera app instead of Expo Go
- The QR code format is incorrect

**Solution:**
1. **Don't use iPhone Camera app** - it won't work
2. **Use Expo Go app** - Open Expo Go → Tap "Scan QR Code" → Scan the QR code
3. Or use manual connection method above

### Can't Connect on Same Wi-Fi

**Solution:**
1. Check both devices are on same Wi-Fi:
   ```bash
   # On Mac, check IP
   ifconfig | grep "inet "
   ```
2. Make sure firewall allows connections:
   ```bash
   # Allow Node.js through firewall
   # System Preferences → Security & Privacy → Firewall → Options
   ```
3. Use tunnel mode:
   ```bash
   npm start -- --tunnel
   ```

### Expo Go Can't Find Server

**Solution:**
1. Make sure Metro bundler is running (`npm start`)
2. Check the URL in terminal matches what you're entering
3. Try restarting:
   ```bash
   # Stop server (Ctrl+C)
   # Clear cache and restart
   npm start -- --clear
   ```

### Connection Timeout

**Solution:**
1. Check your Mac's IP address hasn't changed
2. Restart both Expo Go app and development server
3. Use tunnel mode for more reliable connection

## Quick Start Commands

```bash
# Standard start (same Wi-Fi)
npm start

# With tunnel (works across networks)
npm start -- --tunnel

# Clear cache and start
npm start -- --clear

# Start and open on device automatically
npm start -- --ios
```

## Testing Checklist

- [ ] Expo Go installed on iPhone
- [ ] iPhone and Mac on same Wi-Fi
- [ ] Development server running (`npm start`)
- [ ] Using Expo Go app to scan (not Camera app)
- [ ] Firewall allows Node.js connections
