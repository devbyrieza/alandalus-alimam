# 🚨 Nginx 502 Bad Gateway - IMMEDIATE FIX

## Current Situation
- ✅ Application deployed successfully
- ✅ App listening on port 3000 (Ready in 218ms)
- ❌ Nginx returning 502 Bad Gateway
- 🔧 **Root Cause**: Nginx upstream configuration wrong

## 🎯 IMMEDIATE ACTION REQUIRED

### SSH into your server and run:

```bash
# 1. Quick diagnosis (30 seconds)
curl -f http://localhost:3000/api/health && echo "✓ App working" || echo "✗ App not working"
sudo tail -10 /var/log/nginx/error.log

# 2. Quick fix (1 minute)
sudo sed -i 's|proxy_pass.*;|proxy_pass http://localhost:3000;|g' /etc/nginx/sites-available/pesantren-alimam.com
sudo nginx -t && sudo systemctl reload nginx

# 3. Test fix (30 seconds)
curl -I https://pesantren-alimam.com/api/health
```

## 📁 Files Created for You

1. **`fix-nginx-502.sh`** - Automated fix script
2. **`quick-nginx-fix.md`** - Emergency commands
3. **`diagnostic-commands.md`** - Full diagnostic flow
4. **`README-NGINX-FIX.md`** - This file

## 🔍 What's Happening

Your application is running perfectly, but nginx is trying to proxy to the wrong address. The logs show:
- App starts: "✓ Ready in 218ms"
- App listens: "http://0.0.0.0:3000"
- Nginx error: 502 Bad Gateway

## ⚡ The Fix

Change nginx `proxy_pass` from whatever it currently is to:
```nginx
proxy_pass http://localhost:3000;
```

This works because your app binds to `0.0.0.0:3000` which makes it accessible via localhost.

## 🚀 Alternative: Use Automated Script

```bash
# Download and run the fix script
wget https://raw.githubusercontent.com/your-repo/pp-alimam/main/fix-nginx-502.sh
chmod +x fix-nginx-502.sh
./fix-nginx-502.sh
```

## ✅ Success Criteria

After running the fix:
- [ ] `curl -I https://pesantren-alimam.com/api/health` returns 200 OK
- [ ] Site loads in browser without 502 error
- [ ] Nginx logs show no upstream errors

## 🆘 If Still Broken

1. Check current nginx config: `sudo cat /etc/nginx/sites-available/pesantren-alimam.com`
2. Verify app is running: `docker ps | grep alimam`
3. Check nginx logs: `sudo tail -f /var/log/nginx/error.log`
4. Test app directly: `curl http://localhost:3000/api/health`

## 📞 Next Steps

After fix is confirmed:
1. Monitor site for 5 minutes
2. Set up alerts for nginx errors
3. Document the working configuration
4. Test Coolify deployments still work

---

**RUN THE QUICK FIX COMMANDS NOW - This should resolve the issue immediately!**
