# Quick Nginx 502 Fix Commands

## Emergency Commands (Run on Production Server)

### 1. Diagnose the Issue
```bash
# Check nginx error logs
sudo tail -20 /var/log/nginx/error.log

# Check site-specific logs
sudo tail -20 /var/log/nginx/pesantren-alimam.com.error.log

# Find running containers
docker ps | grep alimam

# Test if app is accessible locally
curl -f http://localhost:3000/api/health
```

### 2. Quick Fix - Update Nginx Upstream
```bash
# Edit nginx config
sudo nano /etc/nginx/sites-available/pesantren-alimam.com

# Find the proxy_pass line and change to:
proxy_pass http://localhost:3000;

# Test config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### 3. Alternative - Use Container IP
```bash
# Get container IP
APP_CONTAINER=$(docker ps --filter "name=alimam" --format "{{.Names}}" | head -1)
CONTAINER_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' "$APP_CONTAINER")

# Update nginx config to use container IP
sudo sed -i "s|proxy_pass .*;|proxy_pass http://$CONTAINER_IP:3000;|g" /etc/nginx/sites-available/pesantren-alimam.com

# Test and reload
sudo nginx -t && sudo systemctl reload nginx
```

### 4. Test the Fix
```bash
# Test health endpoint
curl -I https://pesantren-alimam.com/api/health

# Test main site
curl -I https://pesantren-alimam.com

# Check nginx status
sudo systemctl status nginx
```

### 5. If Still Failing - Full Reset
```bash
# Backup current config
sudo cp /etc/nginx/sites-available/pesantren-alimam.com /root/nginx-backup.conf

# Use working config
sudo bash -c 'cat > /etc/nginx/sites-available/pesantren-alimam.com << EOF
server {
    listen 80;
    listen [::]:80;
    server_name pesantren-alimam.com www.pesantren-alimam.com;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name pesantren-alimam.com www.pesantren-alimam.com;
    
    ssl_certificate /etc/letsencrypt/live/pesantren-alimam.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pesantren-alimam.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF'

# Test and reload
sudo nginx -t && sudo systemctl reload nginx
```

### 6. Verify Application Container
```bash
# Check if app is actually running
docker ps | grep alimam

# If not running, start it
docker start $(docker ps -a --filter "name=alimam" --format "{{.Names}}" | head -1)

# Check logs
docker logs $(docker ps --filter "name=alimam" --format "{{.Names}}" | head -1) --tail 20
```

### 7. Monitor After Fix
```bash
# Watch nginx logs in real-time
sudo tail -f /var/log/nginx/pesantren-alimam.com.error.log &

# Test site every 30 seconds
while true; do
    echo "$(date): Testing site..."
    curl -s https://pesantren-alimam.com/api/health > /dev/null && echo "✓ OK" || echo "✗ FAILED"
    sleep 30
done
```

## Most Likely Fix
Change the nginx proxy_pass from whatever it currently is to:
```nginx
proxy_pass http://localhost:3000;
```

This works because your application is listening on `0.0.0.0:3000` which is accessible via localhost on the same host.
