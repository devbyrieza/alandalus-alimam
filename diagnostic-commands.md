# Nginx 502 Diagnostic Commands

## Run These Commands First

### 1. Check Current Nginx Configuration
```bash
# Show current nginx config
sudo cat /etc/nginx/sites-available/pesantren-alimam.com

# Check if config is enabled
ls -la /etc/nginx/sites-enabled/ | grep pesantren

# Test nginx syntax
sudo nginx -t
```

### 2. Check Application Status
```bash
# List running containers
docker ps

# Find application container specifically
docker ps | grep -E "(alimam|pp-alimam|qkcs8ok8gg848o88ckckwkks)"

# Check application logs
docker logs $(docker ps --filter "name=alimam" --format "{{.Names}}" | head -1) --tail 20

# Test application directly
curl -f http://localhost:3000/api/health
```

### 3. Check Nginx Error Logs
```bash
# Main nginx error log
sudo tail -50 /var/log/nginx/error.log

# Site-specific error log
sudo tail -50 /var/log/nginx/pesantren-alimam.com.error.log

# Real-time monitoring
sudo tail -f /var/log/nginx/pesantren-alimam.com.error.log
```

### 4. Network Connectivity Tests
```bash
# Test if nginx can reach app
curl -f http://localhost:3000/api/health

# Test with headers like nginx would
curl -H "Host: pesantren-alimam.com" http://localhost:3000/api/health

# Check port binding
netstat -tlnp | grep :3000
netstat -tlnp | grep :80
netstat -tlnp | grep :443

# Check if nginx is running
sudo systemctl status nginx
```

### 5. Container Network Analysis
```bash
# Get container details
docker inspect $(docker ps --filter "name=alimam" --format "{{.Names}}" | head -1)

# Check container networking
docker network ls
docker network inspect bridge

# Get container IP
CONTAINER=$(docker ps --filter "name=alimam" --format "{{.Names}}" | head -1)
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $CONTAINER
```

## Expected Results

### If Application is Working:
- `curl http://localhost:3000/api/health` should return `{"status":"ok"}`
- Docker container should be "Up" status
- No errors in application logs

### If Nginx is Problem:
- Nginx error logs will show "upstream server not found" or "connection refused"
- `sudo nginx -t` should pass (syntax OK)
- Application works directly but not through nginx

### Common Error Messages:
- `connect() failed (111: Connection refused)` → Wrong upstream address
- `no live upstreams` → Upstream server not responding
- `host not found` → DNS resolution issue

## Quick Diagnosis Flow

1. **Test app directly**: `curl http://localhost:3000/api/health`
2. **Check nginx config**: `sudo cat /etc/nginx/sites-available/pesantren-alimam.com`
3. **Look for proxy_pass line**: Should be `proxy_pass http://localhost:3000;`
4. **Check nginx logs**: `sudo tail -20 /var/log/nginx/error.log`
5. **Fix upstream**: Update proxy_pass to correct address
6. **Reload nginx**: `sudo systemctl reload nginx`

## Most Common Fix

Change nginx config from:
```nginx
proxy_pass http://wrong-address:3000;
```

To:
```nginx
proxy_pass http://localhost:3000;
```

Because your app is listening on `0.0.0.0:3000` which is accessible via localhost.
