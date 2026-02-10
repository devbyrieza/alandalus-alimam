#!/bin/sh
set -e

# Create .env file from environment variables
echo "DATABASE_URL=${DATABASE_URL}" > .env

# Start the application
exec node server.js
