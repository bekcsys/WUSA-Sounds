#!/bin/bash

# Script to fix corrupted iOS Simulator device

echo "🔧 Fixing corrupted iOS Simulator device..."

# The corrupted device ID from the error
CORRUPTED_DEVICE_ID="9909B21D-8747-42A1-8006-BDE0A0771F83"

# Kill all simulator processes first
echo "1. Stopping all simulator processes..."
killall -9 Simulator 2>/dev/null
killall -9 com.apple.CoreSimulator.CoreSimulatorService 2>/dev/null
sleep 2

# Try to delete the corrupted device
echo "2. Attempting to delete corrupted device..."
xcrun simctl delete "$CORRUPTED_DEVICE_ID" 2>/dev/null && echo "   ✓ Deleted corrupted device" || echo "   ⚠️  Could not delete device (may already be deleted)"

# List available runtimes
echo ""
echo "3. Checking available iOS runtimes..."
RUNTIMES=$(xcrun simctl list runtimes 2>/dev/null | grep -i "iOS" | head -1 | awk -F'(' '{print $2}' | awk -F')' '{print $1}')

if [ -z "$RUNTIMES" ]; then
    echo "   ❌ No iOS runtimes found!"
    echo ""
    echo "   Please install an iOS runtime:"
    echo "   1. Open Xcode"
    echo "   2. Go to Xcode → Settings → Platforms (or Components)"
    echo "   3. Download an iOS Simulator runtime (e.g., iOS 17.0)"
    echo "   4. Wait for download to complete"
    exit 1
else
    echo "   ✓ Found runtime: $RUNTIMES"
fi

# Get the latest iOS runtime
LATEST_RUNTIME=$(xcrun simctl list runtimes 2>/dev/null | grep -i "iOS" | tail -1 | awk -F'(' '{print $2}' | awk -F')' '{print $1}')

# Create a new iPhone simulator
echo ""
echo "4. Creating new iPhone 15 simulator..."
NEW_DEVICE=$(xcrun simctl create "iPhone 15" "iPhone 15" "$LATEST_RUNTIME" 2>/dev/null)

if [ -n "$NEW_DEVICE" ]; then
    echo "   ✓ Created new device: $NEW_DEVICE"
    echo "   Device name: iPhone 15"
else
    echo "   ⚠️  Could not create device automatically"
    echo ""
    echo "   Please create a simulator manually:"
    echo "   1. Open Xcode"
    echo "   2. Go to Window → Devices and Simulators"
    echo "   3. Click '+' to add a new simulator"
    echo "   4. Choose iPhone 15 or iPhone 14"
    echo "   5. Choose the latest iOS version"
fi

echo ""
echo "✅ Fix complete!"
echo ""
echo "Next steps:"
echo "  1. Run: npm start"
echo "  2. Press 'i' to open iOS Simulator"
echo ""
echo "Or use Expo Go on your iPhone (recommended):"
echo "  1. Install 'Expo Go' from App Store"
echo "  2. Run: npm start"
echo "  3. Scan QR code with your iPhone"
