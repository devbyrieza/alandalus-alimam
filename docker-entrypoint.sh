#!/bin/sh
set -e

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL is not set!"
  exit 1
fi

# Export DATABASE_URL explicitly just in case
export DATABASE_URL="${DATABASE_URL}"

# Log masked DATABASE_URL for debugging
echo "Starting application..."
echo "DATABASE_URL is set."
echo "DATABASE_URL (masked): ${DATABASE_URL:0:15}...${DATABASE_URL: -5}"

# Start the application
exec node server.js
