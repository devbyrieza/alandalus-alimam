# 502 Bad Gateway Fix Commands

## Step 1: Run Diagnostic Script
Copy and run this script on your production server:

```bash
# Upload the diagnostic script
scp diagnose-502.sh user@your-server:/tmp/

# SSH into server and run diagnostics
ssh user@your-server
cd /tmp
chmod +x diagnose-502.sh
./diagnose-502.sh
```

## Step 2: Common Fixes Based on Diagnostic Results

### If Container is Not Running:
```bash
# Start containers manually
docker-compose up -d

# Check if they start properly
docker ps
docker logs pp-alimam-app
```

### If Health Check is Failing:
```bash
# Check if curl is available in container
docker exec pp-alimam-app which curl

# If curl is missing, rebuild image with curl
docker-compose build --no-cache app
docker-compose up -d
```

### If Database Connection Issues:
```bash
# Check database container
docker exec pp-alimam-db psql -U postgres -d pp_alimam -c "SELECT 1;"

# Test connection from app container
docker exec pp-alimam-app env | grep DATABASE_URL
```

### If Nginx Configuration Issues:
```bash
# Check nginx config for upstream
sudo cat /etc/nginx/sites-available/pesantren-alimam.com

# Reload nginx if config is correct
sudo nginx -t && sudo systemctl reload nginx
```

### If Port Conflicts:
```bash
# Check what's using port 3000
sudo lsof -i :3000

# Kill conflicting processes
sudo kill -9 <PID>
```

## Step 3: Coolify-Specific Fixes

### Check Coolify Deployment Logs:
```bash
# Check Coolify logs (if using Docker)
docker logs coolify

# Or check systemd service
sudo journalctl -u coolify -f
```

### Trigger Manual Deployment:
```bash
# Restart Coolify service
sudo systemctl restart coolify

# Or trigger webhook manually
curl -X POST https://your-coolify-instance.com/webhook/deploy \
  -H "Content-Type: application/json" \
  -d '{"repository": "pp-alimam"}'
```

## Step 4: Monitoring Setup

### Add Better Health Monitoring:
```bash
# Create monitoring script
cat > /tmp/monitor-app.sh << 'EOF'
#!/bin/bash
while true; do
    if ! curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        echo "$(date): App health check failed, restarting..."
        docker-compose restart app
    fi
    sleep 30
done
EOF

# Run as background service
nohup /tmp/monitor-app.sh > /tmp/monitor.log 2>&1 &
```

## Step 5: Prevention Measures

### Update Docker Health Check:
Add this to your docker-compose.yml healthcheck section:
```yaml
healthcheck:
  test: ["CMD", "sh", "-c", "curl -f http://localhost:3000/api/health || exit 1"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 60s
```

### Add Resource Limits:
```yaml
deploy:
  resources:
    limits:
      memory: 1G
    reservations:
      memory: 512M
```

## Emergency Recovery Commands

### Full Reset (Last Resort):
```bash
# Stop everything
docker-compose down

# Remove containers and volumes (WARNING: This deletes data!)
docker-compose down -v

# Rebuild and start
docker-compose build --no-cache
docker-compose up -d

# Check logs
docker logs -f pp-alimam-app
```

### Database Recovery:
```bash
# Backup current database
docker exec pp-alimam-db pg_dump -U postgres pp_alimam > backup.sql

# Restore if needed
docker exec -i pp-alimam-db psql -U postgres pp_alimam < backup.sql
```
