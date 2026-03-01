# Nginx Configuration Template for pp-alimam

## Working Nginx Configuration Example

Create this file at `/etc/nginx/sites-available/pesantren-alimam.com`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name pesantren-alimam.com www.pesantren-alimam.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
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
    
    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    
    # Main Proxy Configuration
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
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
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Health Check (Direct access for monitoring)
    location /health {
        access_log off;
        proxy_pass http://127.0.0.1:3000/api/health;
    }
    
    # Static Files Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://127.0.0.1:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options nosniff;
    }
    
    # Next.js Static Files
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

## Commands to Apply Configuration

```bash
# Create the config file
sudo nano /etc/nginx/sites-available/pesantren-alimam.com

# Enable the site
sudo ln -s /etc/nginx/sites-available/pesantren-alimam.com /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx

# Check nginx status
sudo systemctl status nginx
```

## Common Nginx Issues and Fixes

### 1. Upstream Server Not Found
```bash
# Check if app is running on port 3000
netstat -tlnp | grep :3000

# If not running, start the app
docker-compose up -d
```

### 2. Permission Issues
```bash
# Check nginx user
sudo ps aux | grep nginx

# Fix permissions if needed
sudo chown -R www-data:www-data /var/www/
```

### 3. SSL Certificate Issues
```bash
# Check certificate status
sudo certbot certificates

# Renew if needed
sudo certbot renew

# Test SSL configuration
sudo openssl s_client -connect pesantren-alimam.com:443
```

### 4. Log Analysis
```bash
# Real-time log monitoring
sudo tail -f /var/log/nginx/pesantren-alimam.com.error.log

# Search for specific errors
sudo grep "502" /var/log/nginx/pesantren-alimam.com.error.log

# Check upstream response times
sudo grep "upstream" /var/log/nginx/pesantren-alimam.com.access.log
```

## Testing the Configuration

```bash
# Test HTTP to HTTPS redirect
curl -I http://pesantren-alimam.com

# Test HTTPS response
curl -I https://pesantren-alimam.com

# Test API endpoint
curl https://pesantren-alimam.com/api/health

# Test with headers
curl -H "Host: pesantren-alimam.com" http://127.0.0.1/api/health
```
