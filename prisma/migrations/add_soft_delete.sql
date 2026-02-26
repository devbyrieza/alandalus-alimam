-- Add soft delete columns to pendaftar table
ALTER TABLE pendaftar ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE pendaftar ADD COLUMN IF NOT EXISTS deleted_by UUID;

-- Create backup table for full data snapshots
CREATE TABLE IF NOT EXISTS pendaftar_backup (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pendaftar_id UUID NOT NULL,
  nomor_pendaftaran VARCHAR NOT NULL,
  nama_lengkap VARCHAR NOT NULL,
  backup_data JSONB NOT NULL,
  deleted_by UUID,
  deleted_by_name VARCHAR,
  deleted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  restored_at TIMESTAMPTZ,
  restored_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for quick lookup
CREATE INDEX IF NOT EXISTS idx_pendaftar_deleted_at ON pendaftar(deleted_at);
CREATE INDEX IF NOT EXISTS idx_pendaftar_backup_pendaftar_id ON pendaftar_backup(pendaftar_id);
