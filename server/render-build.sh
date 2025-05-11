#!/usr/bin/env bash
# This is a build script for Render to handle the server subdirectory in your monorepo
# Save this as 'render-build.sh' in your server directory

# Exit on error
set -o errexit

# Navigate to the server directory
cd server

# Install dependencies
npm install

# You can add additional build steps here if needed
echo "Build completed successfully!" 