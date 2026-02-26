# 📋 SOLUSI RESTORE DATA - 3 Pendaftar

## 🔍 SITUASI SAAT INI

Bapak tidak ingat data lengkap ketiga pendaftar (NIK, nomor pendaftaran, dll). Berdasarkan pencarian di backup:

### ✅ Data yang Ditemukan (dari Excel):

| Nama | Nomor Pendaftaran | Jenjang | Status |
|------|------------------|---------|--------|
| **muhammad Azzam Al hafiz** | A250076 | MTs Putra | TIDAK LULUS |
| **Raylan Akbar** | C250026 | SMA Putra | TIDAK LULUS |
| **Ahmad Sukari Tes** | ❌ TIDAK DITEMUKAN | MTs | - |

### ❌ Data yang HILANG:
- **NIK** (tidak ada di backup Excel)
- **Nomor Pendaftaran Ahmad Sukari** (tidak ada di Excel)
- **Email & No HP** (tidak lengkap)

---

## 🛠️ SOLUSI

### OPTION 1: Gunakan NIK Sementara (Tercepat)

1. **Jalankan script restore dengan NIK placeholder:**
   ```bash
   # Di lokal
   npx tsx scripts/restore-3-pendaftar.ts
   
   # Di production VPS (via SSH)
   ssh root@72.61.141.50
   cd /path/to/pp-alimam
   npx tsx scripts/restore-3-pendaftar.ts
   ```

2. **Update NIK nanti** setelah dapat data asli dari pendaftar

3. **Login sementara:**
   - Username: A250076 (Azzam), C250026 (Raylan)
   - Password: 3201000000000002 (Azzam), 3201000000000003 (Raylan)

### OPTION 2: Cari Data dari WhatsApp/Chat (Lebih Akurat)

Jika Bapak pernah chat dengan pendaftar/wali mereka:

1. **Cari di WhatsApp** dengan keyword:
   - "A250076" atau "Azzam"
   - "C250026" atau "Raylan"
   - "Sukari"

2. **Biasanya ada foto formulir** atau data yang dikirim calon pendaftar

3. **Update script** dengan data yang ditemukan

### OPTION 3: Hubungi Pendaftar Langsung (Paling Akurat)

Kirim WhatsApp ke ketiga pendaftar:

```
Assalamu'alaikum,

Mohon maaf mengganggu, kami dari admin PPDB ingin konfirmasi data:
- Nama: [Nama Pendaftar]
- NIK: [Mohon diisi]
- No. Pendaftaran: [Mohon diisi jika ada]

Data diperlukan untuk melengkapi sistem. Terima kasih.
```

---

## 📝 SCRIPT YANG SUDAH DIBUAT

### 1. `scripts/restore-3-pendaftar.ts`
Script otomatis untuk restore 3 pendaftar dengan data dari Excel.

**Cara pakai:**
```bash
# Edit script, update NIK dengan data asli (jika ada)
# Lalu jalankan:
npx tsx scripts/restore-3-pendaftar.ts
```

### 2. `check-restored-users.ts` (sudah dipulihkan)
Script untuk verifikasi data setelah restore.

```bash
npx tsx check-restored-users.ts
```

### 3. `scripts/restore-3-pendaftar-manual.sql`
Script SQL manual jika prefer update langsung via database.

---

## 🔧 CARA AMBIL NIK DARI DATABASE PRODUCTION

Jika data SUDAH ADA di production tapi tidak bisa login:

1. **SSH ke VPS:**
   ```bash
   ssh root@72.61.141.50
   ```

2. **Masuk ke database:**
   ```bash
   psql -U postgres -d ppdb_alimam
   ```

3. **Query data pendaftar:**
   ```sql
   SELECT 
       nama_lengkap,
       nomor_pendaftaran,
       nik,
       no_hp,
       email
   FROM pendaftar
   WHERE nama_lengkap ILIKE '%Azzam%'
      OR nama_lengkap ILIKE '%Raylan%'
      OR nama_lengkap ILIKE '%Sukari%';
   ```

4. **Copy NIK yang muncul** dan update di script

---

## 📊 STATUS LOGIN

Login pendaftar memerlukan:
- **NIK** (16 digit)
- **Nomor Pendaftaran** (A250076, C250026, dll)

**Rumus login:**
```
Username: Nomor Pendaftaran
Password: NIK
```

Jika NIK salah/placeholder, login akan gagal dengan pesan:
> "NIK atau Nomor Pendaftaran tidak ditemukan"

---

## 🆘 TROUBLESHOOTING

### "NIK atau Nomor Pendaftaran tidak ditemukan"
- NIK tidak 16 digit
- NIK tidak cocok dengan database
- Data belum ada di production

### "Script tidak bisa connect ke database"
- Set DATABASE_URL dengan benar
- Untuk production: gunakan connection string PostgreSQL VPS

### "Data tidak muncul setelah restore"
- Cek dengan: `npx tsx check-restored-users.ts`
- Pastikan script jalan tanpa error

---

## 📞 KONTAK

Jika masih ada masalah:
1. Cek log di VPS: `/var/log/coolify/pp-alimam/`
2. Docker logs: `docker logs pp-alimam-app`
3. Atau hubungi tim IT

---

**Last Updated:** 2026-02-25  
**Files:** `scripts/restore-3-pendaftar.ts`, `check-restored-users.ts`
