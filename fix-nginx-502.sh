#!/bin/bash

echo "=== Fixing Nginx 502 Bad Gateway ==="
echo "Application is running, fixing nginx configuration..."

# 1. Check current nginx configuration
echo ""
echo "1. Current nginx configuration:"
sudo cat /etc/nginx/sites-available/pesantren-alimam.com 2>/dev/null || echo "Config file not found at standard location"

# 2. Find running containers
echo ""
echo "2. Running containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# 3. Find the application container
echo ""
echo "3. Finding application container:"
APP_CONTAINER=$(docker ps --filter "name=alimam" --format "{{.Names}}" | head -1)
echo "App container: $APP_CONTAINER"

# 4. Get container IP address
if [ ! -z "$APP_CONTAINER" ]; then
    CONTAINER_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' "$APP_CONTAINER")
    echo "Container IP: $CONTAINER_IP"
fi

# 5. Test connectivity from host to app
echo ""
echo "5. Testing connectivity:"
curl -f http://localhost:3000/api/health 2>/dev/null && echo "✓ localhost:3000 accessible" || echo "✗ localhost:3000 not accessible"

if [ ! -z "$CONTAINER_IP" ]; then
    curl -f http://$CONTAINER_IP:3000/api/health 2>/dev/null && echo "✓ Container IP accessible" || echo "✗ Container IP not accessible"
fi

# 6. Create correct nginx configuration
echo ""
echo "6. Creating nginx configuration..."

# Determine the correct upstream
UPSTREAM_SERVER="http://localhost:3000"
if [ ! -z "$CONTAINER_IP" ] && curl -f http://$CONTAINER_IP:3000/api/health >/dev/null 2>&1; then
    UPSTREAM_SERVER="http://$CONTAINER_IP:3000"
    echo "Using container IP as upstream: $UPSTREAM_SERVER"
else
    echo "Using localhost as upstream: $UPSTREAM_SERVER"
fi

# Create nginx config
cat > /tmp/pesantren-alimam.com.conf << EOF
server {
    listen 80;
    listen [::]:80;
    server_name pesantren-alimam.com www.pesantren-alimam.com;
    
    # Redirect to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name pesantren-alimam.com www.pesantren-alimam.com;
    
    # SSL Configuration (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/pesantren-alimam.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pesantren-alimam.com/privkey.pem;
    
    # SSL Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Logging
    access_log /var/log/nginx/pesantren-alimam.com.access.log;
    error_log /var/log/nginx/pesantren-alimam.com.error.log;
    
    # Main Proxy Configuration
    location / {
        proxy_pass $UPSTREAM_SERVER;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Buffer settings
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }
    
    # API Rate Limiting
    location /api/ {
        proxy_pass $UPSTREAM_SERVER;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    
    # Health Check (Direct access for monitoring)
    location /health {
        access_log off;
        proxy_pass $UPSTREAM_SERVER/api/health;
    }
    
    # Static Files Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass $UPSTREAM_SERVER;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options nosniff;
    }
    
    # Next.js Static Files
    location /_next/static/ {
        proxy_pass $UPSTREAM_SERVER;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
EOF

echo "Nginx configuration created at /tmp/pesantren-alimam.com.conf"
echo "Upstream server: $UPSTREAM_SERVER"

# 7. Test and apply configuration
echo ""
echo "7. Testing nginx configuration:"
sudo nginx -t -c /tmp/pesantren-alimam.com.conf

if [ $? -eq 0 ]; then
    echo "✓ Configuration test passed"
    echo ""
    echo "8. Applying configuration:"
    
    # Backup existing config
    sudo cp /etc/nginx/sites-available/pesantren-alimam.com /etc/nginx/sites-available/pesantren-alimam.com.backup.$(date +%s) 2>/dev/null
    
    # Apply new config
    sudo cp /tmp/pesantren-alimam.com.conf /etc/nginx/sites-available/pesantren-alimam.com
    
    # Ensure site is enabled
    sudo ln -sf /etc/nginx/sites-available/pesantren-alimam.com /etc/nginx/sites-enabled/
    
    # Reload nginx
    sudo systemctl reload nginx
    
    echo "✓ Configuration applied and nginx reloaded"
else
    echo "✗ Configuration test failed"
    exit 1
fi

# 8. Test the fix
echo ""
echo "9. Testing the fix:"
sleep 2
curl -I https://pesantren-alimam.com/api/health 2>/dev/null && echo "✓ Site is working!" || echo "✗ Still has issues"

echo ""
echo "=== Fix Complete ==="
echo "If still experiencing issues, check:"
echo "sudo tail -f /var/log/nginx/pesantren-alimam.com.error.log"
echo "docker logs \$APP_CONTAINER"
