#!/bin/bash
# ============================================================================
# MIGRATE DATA: Supabase → PostgreSQL Lokal
# Copy data per-tabel, hanya kolom yang ada di Prisma schema
# ============================================================================

SUPABASE="postgresql://postgres.hcknodoayqarjbrzcgrp:SKBalimam26%21@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require"
LOCAL_DB="postgresql://ppdb_user:ppdb_password123@localhost:5432/ppdb_alimam"
BACKUP_DIR="$(dirname "$0")"

echo "============================================"
echo "  MIGRATE DATA: Supabase → Local"
echo "============================================"
echo ""

# 1. profiles
echo "[1/15] profiles..."
PGPASSWORD="SKBalimam26!" psql "$SUPABASE" -c "\COPY (SELECT id, role, full_name, email, phone, created_at, updated_at FROM profiles ORDER BY created_at) TO '$BACKUP_DIR/tbl_profiles.csv' WITH (FORMAT csv, HEADER true)" 2>&1
PGPASSWORD=ppdb_password123 psql "$LOCAL_DB" -c "\COPY profiles(id, role, full_name, email, phone, created_at, updated_at) FROM '$BACKUP_DIR/tbl_profiles.csv' WITH (FORMAT csv, HEADER true)" 2>&1
echo ""

# 2. tahun_ajaran
echo "[2/15] tahun_ajaran..."
PGPASSWORD="SKBalimam26!" psql "$SUPABASE" -c "\COPY (SELECT id, tahun_mulai, tahun_selesai, nama, is_active, tanggal_buka_pendaftaran, tanggal_tutup_pendaftaran, biaya_pendaftaran, link_tes_tertulis, deskripsi_tes_tertulis, created_at, updated_at FROM tahun_ajaran ORDER BY created_at) TO '$BACKUP_DIR/tbl_tahun_ajaran.csv' WITH (FORMAT csv, HEADER true)" 2>&1
PGPASSWORD=ppdb_password123 psql "$LOCAL_DB" -c "\COPY tahun_ajaran(id, tahun_mulai, tahun_selesai, nama, is_active, tanggal_buka_pendaftaran, tanggal_tutup_pendaftaran, biaya_pendaftaran, link_tes_tertulis, deskripsi_tes_tertulis, created_at, updated_at) FROM '$BACKUP_DIR/tbl_tahun_ajaran.csv' WITH (FORMAT csv, HEADER true)" 2>&1
echo ""

# 3. pendaftar (parent table - must be before children)
echo "[3/15] pendaftar..."
PGPASSWORD="SKBalimam26!" psql "$SUPABASE" -c "\COPY (SELECT id, user_id, tahun_ajaran_id, nomor_pendaftaran, nik, nama_lengkap, jenis_kelamin, jenjang, tempat_lahir, tanggal_lahir, alamat, rt, rw, kelurahan, kecamatan, kabupaten, provinsi, kode_pos, no_hp, email, asal_sekolah, npsn, alamat_sekolah, tahun_lulus, nisn, golongan_darah, anak_ke, jumlah_saudara, hobi, cita_cita, sumber_informasi, jumlah_hafalan, status_pendaftaran, data_lengkap, verifikasi_channel, kode_verifikasi, waktu_kirim_kode, waktu_verifikasi_kode, verifikasi_status, notifikasi_whatsapp_id, notifikasi_sms_id, created_at, updated_at FROM pendaftar WHERE user_id IS NOT NULL ORDER BY created_at) TO '$BACKUP_DIR/tbl_pendaftar.csv' WITH (FORMAT csv, HEADER true)" 2>&1
PGPASSWORD=ppdb_password123 psql "$LOCAL_DB" -c "\COPY pendaftar(id, user_id, tahun_ajaran_id, nomor_pendaftaran, nik, nama_lengkap, jenis_kelamin, jenjang, tempat_lahir, tanggal_lahir, alamat, rt, rw, kelurahan, kecamatan, kabupaten, provinsi, kode_pos, no_hp, email, asal_sekolah, npsn, alamat_sekolah, tahun_lulus, nisn, golongan_darah, anak_ke, jumlah_saudara, hobi, cita_cita, sumber_informasi, jumlah_hafalan, status_pendaftaran, data_lengkap, verifikasi_channel, kode_verifikasi, waktu_kirim_kode, waktu_verifikasi_kode, verifikasi_status, notifikasi_whatsapp_id, notifikasi_sms_id, created_at, updated_at) FROM '$BACKUP_DIR/tbl_pendaftar.csv' WITH (FORMAT csv, HEADER true)" 2>&1
echo ""

# 4. orang_tua
echo "[4/15] orang_tua..."
PGPASSWORD="SKBalimam26!" psql "$SUPABASE" -c "\COPY (SELECT id, pendaftar_id, nama_ayah, nik_ayah, tempat_lahir_ayah, tanggal_lahir_ayah, pendidikan_ayah, pekerjaan_ayah, penghasilan_ayah, no_hp_ayah, status_ayah, status_pernikahan_ayah, alamat_ayah, email_ayah, nama_ibu, nik_ibu, tempat_lahir_ibu, tanggal_lahir_ibu, pendidikan_ibu, pekerjaan_ibu, penghasilan_ibu, no_hp_ibu, status_ibu, status_pernikahan_ibu, alamat_ibu, email_ibu, nama_wali, nik_wali, tempat_lahir_wali, tanggal_lahir_wali, pendidikan_wali, pekerjaan_wali, penghasilan_wali, no_hp_wali, alamat_wali, rt_wali, rw_wali, kelurahan_wali, kecamatan_wali, kabupaten_wali, provinsi_wali, kode_pos_wali, hubungan_wali, created_at, updated_at FROM orang_tua ORDER BY created_at) TO '$BACKUP_DIR/tbl_orang_tua.csv' WITH (FORMAT csv, HEADER true)" 2>&1
PGPASSWORD=ppdb_password123 psql "$LOCAL_DB" -c "\COPY orang_tua(id, pendaftar_id, nama_ayah, nik_ayah, tempat_lahir_ayah, tanggal_lahir_ayah, pendidikan_ayah, pekerjaan_ayah, penghasilan_ayah, no_hp_ayah, status_ayah, status_pernikahan_ayah, alamat_ayah, email_ayah, nama_ibu, nik_ibu, tempat_lahir_ibu, tanggal_lahir_ibu, pendidikan_ibu, pekerjaan_ibu, penghasilan_ibu, no_hp_ibu, status_ibu, status_pernikahan_ibu, alamat_ibu, email_ibu, nama_wali, nik_wali, tempat_lahir_wali, tanggal_lahir_wali, pendidikan_wali, pekerjaan_wali, penghasilan_wali, no_hp_wali, alamat_wali, rt_wali, rw_wali, kelurahan_wali, kecamatan_wali, kabupaten_wali, provinsi_wali, kode_pos_wali, hubungan_wali, created_at, updated_at) FROM '$BACKUP_DIR/tbl_orang_tua.csv' WITH (FORMAT csv, HEADER true)" 2>&1
echo ""

# 5. dokumen
echo "[5/15] dokumen..."
PGPASSWORD="SKBalimam26!" psql "$SUPABASE" -c "\COPY (SELECT id, pendaftar_id, jenis_dokumen, file_name, file_path, file_size, file_type, is_verified, verified_by, verified_at, catatan, created_at, updated_at FROM dokumen ORDER BY created_at) TO '$BACKUP_DIR/tbl_dokumen.csv' WITH (FORMAT csv, HEADER true)" 2>&1
PGPASSWORD=ppdb_password123 psql "$LOCAL_DB" -c "\COPY dokumen(id, pendaftar_id, jenis_dokumen, file_name, file_path, file_size, file_type, is_verified, verified_by, verified_at, catatan, created_at, updated_at) FROM '$BACKUP_DIR/tbl_dokumen.csv' WITH (FORMAT csv, HEADER true)" 2>&1
echo ""

# 6. pembayaran
echo "[6/15] pembayaran..."
PGPASSWORD="SKBalimam26!" psql "$SUPABASE" -c "\COPY (SELECT id, pendaftar_id, tahun_ajaran_id, metode_pembayaran, jumlah, midtrans_order_id, midtrans_transaction_id, midtrans_transaction_status, midtrans_payment_type, midtrans_response_json, bukti_transfer_path, bukti_transfer_filename, status_pembayaran, verified_by, verified_at, catatan_verifikasi, expired_at, created_at, updated_at FROM pembayaran ORDER BY created_at) TO '$BACKUP_DIR/tbl_pembayaran.csv' WITH (FORMAT csv, HEADER true)" 2>&1
PGPASSWORD=ppdb_password123 psql "$LOCAL_DB" -c "\COPY pembayaran(id, pendaftar_id, tahun_ajaran_id, metode_pembayaran, jumlah, midtrans_order_id, midtrans_transaction_id, midtrans_transaction_status, midtrans_payment_type, midtrans_response_json, bukti_transfer_path, bukti_transfer_filename, status_pembayaran, verified_by, verified_at, catatan_verifikasi, expired_at, created_at, updated_at) FROM '$BACKUP_DIR/tbl_pembayaran.csv' WITH (FORMAT csv, HEADER true)" 2>&1
echo ""

# 7-15. Empty tables (jadwal_ujian, nilai_ujian, data_rapor, data_prestasi, data_kesehatan, data_asrama, pengumuman, reservasi_psb, data_perubahan_request)
for TBL in jadwal_ujian nilai_ujian data_rapor data_prestasi data_kesehatan data_asrama pengumuman reservasi_psb data_perubahan_request; do
    echo "[...] $TBL (checking)..."
    COUNT=$(PGPASSWORD="SKBalimam26!" psql "$SUPABASE" -t -c "SELECT count(*) FROM $TBL" 2>&1 | tr -d ' ')
    if [ "$COUNT" -gt 0 ] 2>/dev/null; then
        echo "  → $COUNT records found, exporting..."
        PGPASSWORD="SKBalimam26!" psql "$SUPABASE" -c "\COPY $TBL TO '$BACKUP_DIR/tbl_${TBL}.csv' WITH (FORMAT csv, HEADER true)" 2>&1
        PGPASSWORD=ppdb_password123 psql "$LOCAL_DB" -c "\COPY $TBL FROM '$BACKUP_DIR/tbl_${TBL}.csv' WITH (FORMAT csv, HEADER true)" 2>&1
    else
        echo "  → 0 records, skip"
    fi
    echo ""
done

echo "============================================"
echo "  VERIFIKASI"
echo "============================================"
PGPASSWORD=ppdb_password123 psql "$LOCAL_DB" -c "SELECT 'profiles' as tbl, count(*) FROM profiles UNION ALL SELECT 'tahun_ajaran', count(*) FROM tahun_ajaran UNION ALL SELECT 'pendaftar', count(*) FROM pendaftar UNION ALL SELECT 'orang_tua', count(*) FROM orang_tua UNION ALL SELECT 'dokumen', count(*) FROM dokumen UNION ALL SELECT 'pembayaran', count(*) FROM pembayaran ORDER BY tbl;" 2>&1

echo ""
echo "DONE!"
