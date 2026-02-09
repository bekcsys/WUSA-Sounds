#!/usr/bin/env bash
set -Eeuo pipefail

echo "=============================================="
echo " Setting up auto-start for JJ9 Hz Sound Player "
echo "=============================================="

BASE_DIR="/home/admin/Python"
SYSTEMD_DIR="/etc/systemd/system"

BACKEND_SCRIPT="$BASE_DIR/start-backend.sh"
FRONTEND_SCRIPT="$BASE_DIR/start-frontend.sh"

BACKEND_SERVICE="$BASE_DIR/sound-player-backend.service"
FRONTEND_SERVICE="$BASE_DIR/sound-player-frontend.service"

# ---- Sanity checks ----
for f in "$BACKEND_SCRIPT" "$FRONTEND_SCRIPT" "$BACKEND_SERVICE" "$FRONTEND_SERVICE"; do
  if [ ! -f "$f" ]; then
    echo "❌ Missing file: $f"
    exit 1
  fi
done

# ---- Make startup scripts executable ----
echo "✔ Making startup scripts executable"
chmod +x "$BACKEND_SCRIPT"
chmod +x "$FRONTEND_SCRIPT"

# ---- Copy systemd service files ----
echo "✔ Installing systemd service files"
sudo cp "$BACKEND_SERVICE" "$SYSTEMD_DIR/"
sudo cp "$FRONTEND_SERVICE" "$SYSTEMD_DIR/"

# ---- Ensure correct permissions ----
sudo chmod 644 "$SYSTEMD_DIR/sound-player-backend.service"
sudo chmod 644 "$SYSTEMD_DIR/sound-player-frontend.service"

# ---- Reload systemd ----
echo "✔ Reloading systemd"
sudo systemctl daemon-reload

# ---- Enable services at boot ----
echo "✔ Enabling services to start on boot"
sudo systemctl enable sound-player-backend.service
sudo systemctl enable sound-player-frontend.service

echo ""
echo "✅ Services installed and enabled successfully!"
echo ""

echo "▶ Start services now:"
echo "  sudo systemctl start sound-player-backend"
e
