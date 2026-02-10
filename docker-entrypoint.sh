#!/bin/sh
set -e

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL is not set!"
  exit 1
fi

# Export DATABASE_URL explicitly just in case
export DATABASE_URL="${DATABASE_URL}"

echo "Starting application..."
# Start the application
exec node server.js
