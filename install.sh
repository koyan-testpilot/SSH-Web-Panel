#!/bin/bash

set -e

echo "=== SSH Web Panel Installer ==="

# 1. Install Node.js if not present
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js not found. Installing Node.js (LTS)..."
  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

# 2. Clone the repo (replace with your repo URL)
if [ ! -d "ssh-server-web-panel" ]; then
  git clone https://github.com/koyan-testpilot/SSH-Web-Panel.git
  cd ssh-server-web-panel
else
  cd ssh-server-web-panel
  git pull
fi

# 3. Install dependencies
npm install

# 4. Prompt for Gemini API Key
if [ ! -f ".env.local" ]; then
  read -p "Enter your Gemini API Key: " GEMINI_API_KEY
  echo "GEMINI_API_KEY=$GEMINI_API_KEY" > .env.local
fi

# 5. Build the app
npm run build

# 6. Install serve if not present
if ! command -v serve >/dev/null 2>&1; then
  npm install -g serve
fi

echo "=== Installation Complete ==="
echo "To start the web panel, run:"
echo "  serve -s dist"
echo "Or:"
echo "  npm start"