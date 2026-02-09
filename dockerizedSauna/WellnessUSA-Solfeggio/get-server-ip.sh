#!/usr/bin/env bash
# Get the server's IP address on the local network (excludes localhost and docker)

# Try to get the IP from the active network interface
# First, try common WiFi interfaces
for interface in wlan0 wlan1 eth0 eth1 enp0s25; do
  if ip addr show "$interface" 2>/dev/null | grep -q "inet "; then
    ip addr show "$interface" | grep "inet " | awk '{print $2}' | cut -d/ -f1 | head -n1
    exit 0
  fi
done

# If no interface found, try to get IP from hostname
SERVER_IP=$(hostname -I | awk '{print $1}')
if [ -n "$SERVER_IP" ] && [ "$SERVER_IP" != "127.0.0.1" ]; then
  echo "$SERVER_IP"
  exit 0
fi

# Fallback to localhost if no network interface found
echo "127.0.0.1"
exit 0
