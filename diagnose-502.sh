#!/bin/bash

echo "=== 502 Bad Gateway Diagnostic Script ==="
echo "Running diagnostics for pesantren-alimam.com"
echo "=========================================="

# 1. Check Docker container status
echo ""
echo "1. Checking Docker container status..."
docker ps -a | grep pp-alimam
echo ""

# 2. Check container logs
echo "2. Checking application container logs..."
docker logs pp-alimam-app --tail 50
echo ""

# 3. Check database container logs
echo "3. Checking database container logs..."
docker logs pp-alimam-db --tail 20
echo ""

# 4. Test health endpoint manually
echo "4. Testing health endpoint..."
curl -f http://localhost:3000/api/health || echo "Health check failed"
echo ""

# 5. Check nginx status and configuration
echo "5. Checking nginx status..."
sudo systemctl status nginx
echo ""

echo "5a. Checking nginx error logs..."
sudo tail -50 /var/log/nginx/error.log
echo ""

echo "5b. Checking nginx configuration..."
sudo nginx -t
echo ""

# 6. Check network connectivity
echo "6. Checking network connectivity..."
netstat -tlnp | grep :3000
netstat -tlnp | grep :80
netstat -tlnp | grep :443
echo ""

# 7. Check system resources
echo "7. Checking system resources..."
free -h
df -h
docker stats --no-stream
echo ""

# 8. Check database connectivity from app container
echo "8. Testing database connectivity..."
docker exec pp-alimam-app curl -f http://postgres:5432 || echo "DB connection test failed"
echo ""

echo "=== Diagnostic Complete ==="
echo "Review the output above to identify the issue"
