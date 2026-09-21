-- SQL SCRIPT TO DELETE DUPLICATE PENDAFTAR
-- Target: MTA2600019 (Muhammad Yahya Ayyash - Draft)
-- Keep: MTA2600016 (Muhammad Yahya Ayyash - Data Lengkap)

-- 1. Backup to pendaftar_backup (optional but recommended)
-- Note: This requires the pendaftar_backup table to exist
INSERT INTO pendaftar_backup (id, pendaftar_id, nomor_pendaftaran, nama_lengkap, backup_data, deleted_at, deleted_by_name)
SELECT 
    gen_random_uuid(), 
    id, 
    nomor_pendaftaran, 
    nama_lengkap, 
    to_jsonb(pendaftar.*), 
    now(), 
    'Antigravity AI (Duplicate Cleanup)'
FROM pendaftar 
WHERE nomor_pendaftaran = 'MTA2600019';

-- 2. Soft delete the pendaftar
UPDATE pendaftar 
SET 
    deleted_at = now(),
    updated_at = now()
WHERE nomor_pendaftaran = 'MTA2600019'
AND deleted_at IS NULL;

-- 3. Verify
SELECT id, nomor_pendaftaran, nama_lengkap, status_pendaftaran, deleted_at 
FROM pendaftar 
WHERE nomor_pendaftaran IN ('MTA2600016', 'MTA2600019');
