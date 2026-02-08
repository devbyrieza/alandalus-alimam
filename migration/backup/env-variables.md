# Environment Variables - PPDB AL-IMAM

## PRODUCTION (VPS)

```env
# ============================================
# DATABASE - PostgreSQL Self-hosted
# ============================================
DATABASE_URL=postgresql://ppdb_user:STRONG_PASSWORD@localhost:5432/ppdb_alimam
DIRECT_URL=postgresql://ppdb_user:STRONG_PASSWORD@localhost:5432/ppdb_alimam

# ============================================
# APPLICATION
# ============================================
NEXT_PUBLIC_BASE_URL=https://yourdomain.sch.id
NODE_ENV=production

# ============================================
# MIDTRANS (Payment Gateway)
# ============================================
# PENTING: Ganti ke production key saat go-live
MIDTRANS_SERVER_KEY=Mid-server-_wezICIZ7g4SHaF5JBhxleH2s
MIDTRANS_IS_PRODUCTION=false

# ============================================
# TWILIO (WhatsApp & SMS - OTP)
# ============================================
TWILIO_ACCOUNT_SID=AC_YOUR_TWILIO_SID
TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER=+1234567890

# ============================================
# SUPABASE AUTH (AKAN DIHAPUS setelah migrasi auth)
# Sementara masih diperlukan jika auth belum dimigrasikan
# ============================================
# NEXT_PUBLIC_SUPABASE_URL=https://hcknodoayqarjbrzcgrp.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=<key>
# SUPABASE_SERVICE_ROLE_KEY=<key>
```

## LOCAL TESTING

```env
DATABASE_URL=postgresql://postgres:YOUR_LOCAL_PASSWORD@localhost:5432/ppdb_alimam_test
DIRECT_URL=postgresql://postgres:YOUR_LOCAL_PASSWORD@localhost:5432/ppdb_alimam_test
NEXT_PUBLIC_BASE_URL=http://localhost:3000
MIDTRANS_SERVER_KEY=Mid-server-_wezICIZ7g4SHaF5JBhxleH2s
MIDTRANS_IS_PRODUCTION=false
TWILIO_ACCOUNT_SID=AC_YOUR_TWILIO_SID
TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER=+1234567890
```

## CATATAN PENTING

1. **DATABASE_URL**: Ganti password dengan yang kuat untuk production
2. **MIDTRANS**: Saat ini sandbox mode. Ganti key dan set `MIDTRANS_IS_PRODUCTION=true` saat go-live
3. **TWILIO**: Credentials yang sama bisa dipakai di production
4. **Supabase Auth vars**: Akan dihapus setelah migrasi auth selesai
5. **JANGAN** commit file ini ke git!
