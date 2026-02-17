#!/bin/bash
set -e

# Ensure storage directory exists and is writable
if [ ! -d "/app/storage_data" ]; then
    mkdir -p /app/storage_data
fi

# Try to fix permissions if running as root (rare in this setup but good for completeness)
# In production, this might fail if running as non-root, so we suppress errors
chown -R nextjs:nodejs /app/storage_data 2>/dev/null || true
chmod -R 755 /app/storage_data 2>/dev/null || true

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
