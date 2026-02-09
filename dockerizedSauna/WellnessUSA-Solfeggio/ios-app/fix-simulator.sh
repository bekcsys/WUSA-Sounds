#!/bin/bash

# Script to fix iOS Simulator issues

echo "🔧 Fixing iOS Simulator..."

# Kill all simulator processes
echo "1. Killing simulator processes..."
killall -9 Simulator 2>/dev/null
killall -9 com.apple.CoreSimulator.CoreSimulatorService 2>/dev/null
killall -9 com.apple.iphonesimulator 2>/dev/null

# Wait a moment
sleep 2

# Reset CoreSimulatorService
echo "2. Resetting CoreSimulatorService..."
sudo launchctl stop com.apple.CoreSimulator.CoreSimulatorService 2>/dev/null
sudo launchctl start com.apple.CoreSimulator.CoreSimulatorService 2>/dev/null

# Wait for service to start
sleep 3

# Check if Xcode is installed
if [ ! -d "/Applications/Xcode.app" ]; then
    echo "❌ Xcode is not installed. Please install Xcode from the App Store."
    exit 1
fi

# Check if command line tools are installed
if ! xcode-select -p &>/dev/null; then
    echo "⚠️  Xcode Command Line Tools not installed. Installing..."
    xcode-select --install
    echo "Please complete the installation and run this script again."
    exit 1
fi

# List available simulators
echo "3. Available iOS Simulators:"
xcrun simctl list devices available 2>/dev/null || echo "⚠️  Could not list simulators. Try opening Xcode and installing a simulator."

echo ""
echo "✅ Fix complete! Try running 'npm start' again."
echo ""
echo "If issues persist:"
echo "  1. Open Xcode → Preferences → Components → Download a simulator"
echo "  2. Or restart your Mac"
echo "  3. Or use Expo Go on a physical iPhone instead"
