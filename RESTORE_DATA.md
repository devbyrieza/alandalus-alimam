# 📋 RESTORE DATA PENDAFTAR - 3 Pendaftar

## 🎯 Tujuan
Memulihkan data 3 pendaftar yang sudah dikembalikan ke database:
1. **Ahmad Sukari Tes**
2. **muhammad Azzam Al hafiz** (A250076)
3. **Raylan Akbar** (C250026)

## 🔍 Masalah Saat Ini

Berdasarkan pemeriksaan database production:
- ✅ Data 3 pendaftar sudah ada di database (Primary data: ID, Nama, Nomor Pendaftaran)
- ✅ Akun Profile sudah ada (bisa login)
- ❌ **NIK masih placeholder** (bukan NIK asli)
- ❌ **Login tidak berfungsi** karena NIK tidak sesuai

### Kenapa Login Tidak Bisa?
Sistem login pendaftar memerlukan:
- **NIK** (16 digit) 
- **Nomor Pendaftaran**

Kedua data harus **cocok persis** dengan yang ada di database. Saat ini NIK di database masih placeholder, jadi login gagal.

## 🛠️ Solusi

### Option A: Jalankan Script Restore (Recommended)

1. **Update NIK di Script**
   Buka file `scripts/restore-three-users.ts` dan update NIK dengan data asli:

   ```typescript
   const RESTORE_DATA = [
       {
           nama_lengkap: 'Ahmad Sukari Tes',
           nomor_pendaftaran: 'MTI2500001', // Update dengan nomor asli
           nik: '3201xxxxxxxxxxxxxx', // ⚠️ UPDATE DENGAN NIK ASLI!
           // ...
       },
       // ... update lainnya
   ];
   ```

2. **Jalankan Script ke Production**
   
   Cara 1: Via SSH ke VPS
   ```bash
   # SSH ke VPS
   ssh root@72.61.141.50
   
   # Masuk ke folder project
   cd /path/to/pp-alimam
   
   # Set environment variable untuk production database
   export PRODUCTION_DATABASE_URL="postgresql://user:password@localhost:5432/ppdb_alimam"
   
   # Jalankan script
   npx tsx scripts/restore-three-users.ts
   ```

   Cara 2: Via Docker (jika pakai Coolify)
   ```bash
   # Jalankan di dalam container
   docker exec -it pp-alimam-app npx tsx scripts/restore-three-users.ts
   ```

3. **Verifikasi**
   ```bash
   npx tsx scripts/check-restored-users.ts
   ```

### Option B: Commit-Push-Redeploy

Jika perubahan belum di-deploy ke production:

1. **Commit perubahan**
   ```bash
   git add .
   git commit -m "fix: restore 3 pendaftar data dengan NIK yang benar"
   git push origin main
   ```

2. **Redeploy di Coolify**
   - Buka Coolify dashboard
   - Pilih project `pp-alimam`
   - Klik "Redeploy"
   - Tunggu hingga deployment selesai

3. **Jalankan migration (jika perlu)**
   ```bash
   npx prisma migrate deploy
   ```

## 📝 Data Pendaftar yang Dipulihkan

| Nama | Nomor Pendaftaran | NIK (Update!) | Jenjang |
|------|------------------|---------------|---------|
| Ahmad Sukari Tes | MTI2500001 | ⚠️ UPDATE | MTs |
| muhammad Azzam Al hafiz | A250076 | ⚠️ UPDATE | MTs |
| Raylan Akbar | C250026 | ⚠️ UPDATE | SMA |

### ⚠️ PENTING: Update NIK!

**NIK harus diisi dengan NIK asli** dari data pendaftar. Jika NIK tidak ada:
1. Cek formulir pendaftaran asli (jika ada backup)
2. Hubungi pendaftar untuk konfirmasi NIK
3. Gunakan NIK sementara (16 digit), lalu update manual di database

## 🔐 Login Setelah Restore

Setelah script dijalankan, pendaftar bisa login dengan:
- **Username**: Nomor Pendaftaran (contoh: A250076)
- **Password**: NIK (16 digit, contoh: 3201000000000001)

## 📊 Status Data

| Komponen | Status | Keterangan |
|----------|--------|------------|
| Primary Data (Pendaftar) | ✅ OK | ID, Nama, Nomor Pendaftaran sudah ada |
| Akun Login (Profile) | ✅ OK | Profile sudah terhubung |
| NIK | ⚠️ PLACEHOLDER | Perlu update dengan NIK asli |
| Dokumen Lampiran | ❌ KOSONG | Terhapus cascade, perlu upload ulang |
| Pembayaran | ❌ KOSONG | Status pembayaran kosong |

## 🆘 Troubleshooting

### Error: "NIK atau Nomor Pendaftaran tidak ditemukan"
- Pastikan NIK 16 digit dan sesuai dengan database
- Pastikan Nomor Pendaftaran sama persis (case-sensitive)

### Error: "Connection refused"
- Pastikan DATABASE_URL sudah benar
- Untuk production, gunakan koneksi langsung ke PostgreSQL

### Data tidak muncul setelah script dijalankan
- Cek apakah script berjalan tanpa error
- Verifikasi dengan: `npx tsx scripts/check-restored-users.ts`

## 📞 Kontak

Jika ada masalah, hubungi tim IT atau cek log di:
- `/var/log/coolify/pp-alimam/` (production)
- `docker logs pp-alimam-app` (docker)

---
**Last Updated**: 2026-02-25
**Script**: `scripts/restore-three-users.ts`
**Verification**: `scripts/check-restored-users.ts`
