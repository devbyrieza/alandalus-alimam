# 502 Bad Gateway Emergency Fix Guide

## 🚨 Current Issue
- **Site**: https://pesantren-alimam.com/
- **Error**: 502 Bad Gateway (nginx/1.24.0 Ubuntu)
- **Problem**: Coolify not triggering, application not responding

## 📋 Immediate Action Plan

### Step 1: Run Diagnostic Script (5 minutes)
```bash
# SSH into your production server
ssh user@your-server-ip

# Download and run the diagnostic script
wget https://raw.githubusercontent.com/your-repo/pp-alimam/main/diagnose-502.sh
chmod +x diagnose-502.sh
./diagnose-502.sh
```

### Step 2: Apply Quick Fixes (Based on diagnostics)

#### If containers are not running:
```bash
cd /path/to/your/app
docker-compose up -d
```

#### If health checks are failing:
```bash
# Rebuild with proper dependencies
docker-compose build --no-cache app
docker-compose up -d
```

#### If nginx configuration is broken:
```bash
# Apply the working nginx config
sudo cp nginx-config-check.md /tmp/nginx-config.txt
# Follow the steps in nginx-config-check.md
```

### Step 3: Test the Fix
```bash
# Test locally first
curl -I http://localhost:3000/api/health

# Test through nginx
curl -I https://pesantren-alimam.com/api/health
```

## 🔧 Files Created for You

1. **`diagnose-502.sh`** - Automated diagnostic script
2. **`fix-502-commands.md`** - Complete command reference
3. **`nginx-config-check.md`** - Working nginx configuration
4. **`coolify-troubleshoot.md`** - Coolify-specific fixes

## 🎯 Most Likely Causes (in order)

1. **Application container crashed** (70% probability)
2. **Health check failing** causing restarts (15% probability)
3. **Nginx upstream misconfiguration** (10% probability)
4. **Database connection issues** (5% probability)

## 📞 Support Commands

### Check Everything at Once:
```bash
# This one-liner checks all critical services
docker ps | grep pp-alimam && \
curl -f http://localhost:3000/api/health && \
sudo nginx -t && \
echo "All systems OK" || echo "Issues found - check logs"
```

### Real-time Monitoring:
```bash
# Monitor all relevant logs in real-time
tail -f /var/log/nginx/error.log &
docker logs -f pp-alimam-app &
docker logs -f pp-alimam-db &
```

## ⚡ Emergency Recovery (If all else fails)

```bash
# WARNING: This will cause brief downtime
cd /path/to/your/app
docker-compose down
docker system prune -f
docker-compose build --no-cache
docker-compose up -d

# Monitor startup
docker logs -f pp-alimam-app
```

## 🔄 Prevention After Fix

1. **Set up monitoring alerts**
2. **Configure backup nginx config**
3. **Add automated health checks**
4. **Test Coolify webhooks regularly**

## 📊 Expected Timeline

- **Diagnosis**: 5-10 minutes
- **Quick Fix**: 2-5 minutes  
- **Full Recovery**: 10-20 minutes
- **Monitoring Setup**: 15-30 minutes

## ✅ Success Criteria

- [ ] Site loads without 502 error
- [ ] `/api/health` returns 200 OK
- [ ] Coolify deployments trigger automatically
- [ ] All containers running healthy
- [ ] Nginx logs show no errors

---

**Run the diagnostic script first, then use the specific fix based on what you find!**
