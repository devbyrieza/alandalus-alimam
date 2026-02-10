#!/bin/sh
set -e

# Export DATABASE_URL to ensure it's available to the Node.js process
export DATABASE_URL="${DATABASE_URL}"

# Start the application
exec node server.js
