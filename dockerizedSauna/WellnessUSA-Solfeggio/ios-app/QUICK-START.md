# Quick Start - Connect iPhone

## ⚠️ Important: Don't Use iPhone Camera App!

The iPhone Camera app **cannot** read Expo QR codes. You **must** use the **Expo Go** app.

## Step-by-Step Instructions

### 1. Install Expo Go on iPhone
- Open **App Store** on your iPhone
- Search for **"Expo Go"**
- Install it (it's free)

### 2. Make Sure iPhone and Mac Are on Same Wi-Fi
- Both devices must be on the **same Wi-Fi network**

### 3. Start Development Server
```bash
cd ios-app
npm start
```

You'll see a QR code in the terminal.

### 4. Connect with Expo Go (NOT Camera App!)

**Correct Way:**
1. Open **Expo Go** app on your iPhone (not Camera app!)
2. Tap **"Scan QR Code"** button in Expo Go
3. Point your iPhone at the QR code in the terminal
4. The app will load automatically

**Wrong Way (This gives "not usable data"):**
- ❌ Using iPhone Camera app
- ❌ Scanning from a screenshot
- ❌ Using a different QR code scanner

## Alternative: Manual Connection

If QR code doesn't work:

1. In the terminal, look for a line like:
   ```
   Metro waiting on exp://192.168.1.100:8081
   ```

2. Open **Expo Go** app on iPhone

3. Tap **"Enter URL manually"**

4. Type the URL from terminal (e.g., `exp://192.168.1.100:8081`)

5. Tap **"Connect"**

## If Still Not Working

### Use Tunnel Mode (Works Across Networks)
```bash
npm start -- --tunnel
```

This creates a tunnel that works even if devices are on different networks.

### Check Connection
```bash
# On Mac, check your IP address
ifconfig | grep "inet " | grep -v 127.0.0.1
```

Make sure this IP matches what Expo shows in terminal.

## Troubleshooting

**"Not usable data" error:**
- ✅ You're using Expo Go app (correct)
- ❌ You're using iPhone Camera app (wrong)

**Can't connect:**
- Check both devices on same Wi-Fi
- Try tunnel mode: `npm start -- --tunnel`
- Restart Expo Go app
- Restart development server

**App loads but shows errors:**
- Make sure you've copied audio files: `./copy-assets.sh`
- Check all dependencies installed: `npm install`
