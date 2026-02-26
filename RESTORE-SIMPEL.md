# 🪄 RESTORE DATA - CARA SUPER MUDAH

## 🎯 LANGKAH-LANGKAH (HANYA 2 COMMAND!)

### Step 1: SSH ke VPS
```bash
ssh root@72.61.141.50
```

### Step 2: Jalankan Script Ajaib
```bash
cd /path/to/pp-alimam && npx tsx scripts/restore-ajaib.ts
```

**GANTI `/path/to/pp-alimam`** dengan lokasi project Bapak di VPS.

Biasanya di:
- `/var/www/pp-alimam`
- `/home/pp-alimam`
- `/opt/pp-alimam`

Atau tanya Coolify:
```bash
cd $(coolify app dir) && npx tsx scripts/restore-ajaib.ts
```

---

## ✅ SELESAI!

Script akan otomatis:
1. ✅ Cari data 3 pendaftar (Azzam, Raylan, Sukari)
2. ✅ Buat profile jika belum ada
3. ✅ Link profile ke pendaftar
4. ✅ Set password login (NIK)

---

## 🔐 LOGIN SETELAH RESTORE

| Nama | Username | Password |
|------|----------|----------|
| Azzam | A250076 | NIK di database |
| Raylan | C250026 | NIK di database |
| Sukari | MTI2500001 | NIK di database |

---

## ⚠️ PENTING!

**NIK masih placeholder** (bukan NIK asli). 

Jika ingin update dengan NIK asli:

```bash
# Masuk database
psql -U postgres -d ppdb_alimam

# Update NIK
UPDATE pendaftar SET nik = 'NIK_ASLI_16_DIGIT' WHERE nomor_pendaftaran = 'A250076';
UPDATE pendaftar SET nik = 'NIK_ASLI_16_DIGIT' WHERE nomor_pendaftaran = 'C250026';
UPDATE pendaftar SET nik = 'NIK_ASLI_16_DIGIT' WHERE nomor_pendaftaran = 'MTI2500001';

# Keluar
\q
```

---

## 🆘 JIKA ERROR

**"command not found: npx"**
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
```

**"Cannot find module"**
```bash
# Install dependencies
npm install
```

**"Database connection error"**
```bash
# Cek DATABASE_URL di .env
cat .env | grep DATABASE_URL
```

---

**That's it!** Simpel kan? 🙏
