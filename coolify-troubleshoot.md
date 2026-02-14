# Coolify Deployment Troubleshooting Guide

## Coolify-Specific Issues and Solutions

### 1. Check Coolify Service Status

```bash
# If Coolify is running as Docker container
docker ps | grep coolify
docker logs coolify --tail 50

# If running as systemd service
sudo systemctl status coolify
sudo journalctl -u coolify -f
```

### 2. Verify Coolify Configuration

Check these key files on your Coolify server:

```bash
# Coolify environment file
sudo cat /opt/coolify/.env

# Docker compose file for Coolify
sudo cat /opt/coolify/docker-compose.yml

# Check webhook configuration
sudo ls -la /opt/coolify/webhooks/
```

### 3. Manual Webhook Trigger

```bash
# Test webhook endpoint (replace with your actual webhook URL)
curl -X POST https://your-coolify-instance.com/api/v1/webhooks/deploy \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -d '{
    "applicationId": "your-app-id",
    "branch": "main",
    "commitSha": "latest"
  }'
```

### 4. Coolify Database Issues

```bash
# Check Coolify database
docker exec coolify-db psql -U coolify -d coolify -c "SELECT * FROM applications;"

# Check deployment logs
docker exec coolify-db psql -U coolify -d coolify -c "SELECT * FROM deployment_logs ORDER BY created_at DESC LIMIT 10;"
```

### 5. Fix Common Coolify Issues

#### Issue: Webhooks Not Triggering
```bash
# Restart Coolify services
cd /opt/coolify
docker-compose restart

# Check webhook permissions
sudo chown -R coolify:coolify /opt/coolify/webhooks/
```

#### Issue: Deployment Fails
```bash
# Clear Coolify cache
docker exec coolify rm -rf /app/storage/applications/*/build

# Reset deployment state
docker exec coolify-db psql -U coolify -d coolify -c "UPDATE applications SET status='idle' WHERE id='your-app-id';"
```

### 6. Coolify + Docker Integration

Ensure your application is properly configured for Coolify:

```yaml
# Add to your docker-compose.yml
version: '3.8'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    restart: always
    labels:
      - "coolify.application.id=${COOLIFY_APP_ID}"
      - "coolify.deployment.id=${COOLIFY_DEPLOYMENT_ID}"
    environment:
      - COOLIFY_APP_ID=${COOLIFY_APP_ID}
      - COOLIFY_DEPLOYMENT_ID=${COOLIFY_DEPLOYMENT_ID}
```

### 7. Monitoring Coolify Health

```bash
# Create health check script
cat > /tmp/coolify-health.sh << 'EOF'
#!/bin/bash
COOLIFY_URL="https://your-coolify-instance.com"
API_TOKEN="your-api-token"

# Check Coolify API health
curl -H "Authorization: Bearer $API_TOKEN" \
     "$COOLIFY_URL/api/v1/health" || echo "Coolify API down"

# Check application status
curl -H "Authorization: Bearer $API_TOKEN" \
     "$COOLIFY_URL/api/v1/applications" | jq '.[] | {name, status}'
EOF

chmod +x /tmp/coolify-health.sh
./tmp/coolify-health.sh
```

### 8. Automated Recovery Script

```bash
# Create automated recovery for Coolify
cat > /tmp/coolify-recovery.sh << 'EOF'
#!/bin/bash

LOG_FILE="/var/log/coolify-recovery.log"

log() {
    echo "$(date): $1" >> $LOG_FILE
}

# Check if Coolify is responding
if ! curl -f https://your-coolify-instance.com/health > /dev/null 2>&1; then
    log "Coolify health check failed, attempting recovery..."
    
    # Restart Coolify services
    cd /opt/coolify
    docker-compose restart
    
    # Wait for startup
    sleep 30
    
    # Check again
    if curl -f https://your-coolify-instance.com/health > /dev/null 2>&1; then
        log "Coolify recovery successful"
    else
        log "Coolify recovery failed, manual intervention required"
        # Send alert (configure your preferred alerting method)
    fi
fi
EOF

chmod +x /tmp/coolify-recovery.sh

# Add to crontab for every 5 minutes
echo "*/5 * * * * /tmp/coolify-recovery.sh" | crontab -
```

### 9. Environment Variables Checklist

Ensure these are set in Coolify:

```bash
# Required for Next.js app
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=postgresql://user:password@host:5432/database
NEXT_PUBLIC_API_URL=https://pesantren-alimam.com

# Coolify specific
COOLIFY_APP_ID=your-app-id
COOLIFY_DEPLOYMENT_ID=deployment-id
COOLIFY_WEBHOOK_SECRET=webhook-secret
```

### 10. Debug Deployment Pipeline

```bash
# Enable debug logging in Coolify
echo "LOG_LEVEL=debug" >> /opt/coolify/.env

# Restart to apply
cd /opt/coolify
docker-compose restart

# Monitor debug logs
docker logs -f coolify
```

## Quick Recovery Commands

```bash
# Full Coolify restart
cd /opt/coolify
docker-compose down
docker-compose up -d

# Clear all caches
docker system prune -f
docker volume prune -f

# Rebuild and redeploy your app
docker-compose -f /path/to/your/docker-compose.yml build --no-cache
docker-compose -f /path/to/your/docker-compose.yml up -d
```
