/**
 * BACKUP SCRIPT: Export semua data dari Supabase ke JSON
 * Jalankan: npx tsx migration/backup/export-data.ts
 *
 * Script ini menggunakan Prisma (sudah terinstall) untuk export data,
 * jadi tidak perlu install pg_dump atau PostgreSQL client.
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();
const BACKUP_DIR = path.join(__dirname);
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

async function exportTable(name: string, queryFn: () => Promise<any[]>) {
  try {
    const data = await queryFn();
    const filename = path.join(BACKUP_DIR, `${name}.json`);
    fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`  ✓ ${name}: ${data.length} records → ${name}.json`);
    return { table: name, count: data.length, status: 'success' };
  } catch (error: any) {
    console.error(`  ✗ ${name}: ERROR - ${error.message}`);
    return { table: name, count: 0, status: 'error', error: error.message };
  }
}

async function main() {
  console.log('============================================');
  console.log('  BACKUP SUPABASE → JSON');
  console.log(`  ${new Date().toLocaleString('id-ID')}`);
  console.log('============================================');
  console.log('');
  console.log(`Backup directory: ${BACKUP_DIR}`);
  console.log('');

  // Test connection
  console.log('Testing database connection...');
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('  ✓ Connected to database!\n');
  } catch (error: any) {
    console.error(`  ✗ Connection failed: ${error.message}`);
    console.error('\nPastikan DATABASE_URL di .env.local benar!');
    process.exit(1);
  }

  console.log('Exporting tables...');
  const results = [];

  // 1. Profiles
  results.push(await exportTable('profiles', () =>
    prisma.profile.findMany({ orderBy: { created_at: 'asc' } })
  ));

  // 2. Tahun Ajaran
  results.push(await exportTable('tahun_ajaran', () =>
    prisma.tahunAjaran.findMany({ orderBy: { created_at: 'asc' } })
  ));

  // 3. Pendaftar
  results.push(await exportTable('pendaftar', () =>
    prisma.pendaftar.findMany({ orderBy: { created_at: 'asc' } })
  ));

  // 4. Orang Tua
  results.push(await exportTable('orang_tua', () =>
    prisma.orangTua.findMany({ orderBy: { created_at: 'asc' } })
  ));

  // 5. Dokumen
  results.push(await exportTable('dokumen', () =>
    prisma.dokumen.findMany({ orderBy: { created_at: 'asc' } })
  ));

  // 6. Pembayaran
  results.push(await exportTable('pembayaran', () =>
    prisma.pembayaran.findMany({ orderBy: { created_at: 'asc' } })
  ));

  // 7. Jadwal Seleksi
  results.push(await exportTable('jadwal_ujian', () =>
    prisma.jadwalUjian.findMany({ orderBy: { created_at: 'asc' } })
  ));

  // 8. Nilai Ujian
  results.push(await exportTable('nilai_ujian', () =>
    prisma.nilaiUjian.findMany({ orderBy: { created_at: 'asc' } })
  ));

  // 9. Data Rapor
  results.push(await exportTable('data_rapor', () =>
    prisma.dataRapor.findMany({ orderBy: { created_at: 'asc' } })
  ));

  // 10. Data Prestasi
  results.push(await exportTable('data_prestasi', () =>
    prisma.dataPrestasi.findMany({ orderBy: { created_at: 'asc' } })
  ));

  // 11. Data Kesehatan
  results.push(await exportTable('data_kesehatan', () =>
    prisma.dataKesehatan.findMany({ orderBy: { created_at: 'asc' } })
  ));

  // 12. Data Asrama
  results.push(await exportTable('data_asrama', () =>
    prisma.dataAsrama.findMany({ orderBy: { created_at: 'asc' } })
  ));

  // 13. Pengumuman
  results.push(await exportTable('pengumuman', () =>
    prisma.pengumuman.findMany({ orderBy: { created_at: 'asc' } })
  ));

  // 14. Reservasi PSB
  results.push(await exportTable('reservasi_psb', () =>
    prisma.reservasiPSB.findMany({ orderBy: { created_at: 'asc' } })
  ));

  // 15. Data Perubahan Request
  results.push(await exportTable('data_perubahan_request', () =>
    prisma.dataPerubahanRequest.findMany({ orderBy: { created_at: 'asc' } })
  ));

  // 16. OTP Verifications (raw query karena tidak di Prisma schema)
  results.push(await exportTable('otp_verifications', async () => {
    try {
      return await prisma.$queryRaw`SELECT * FROM otp_verifications ORDER BY created_at ASC`;
    } catch {
      console.log('    (tabel otp_verifications mungkin tidak ada atau kosong)');
      return [];
    }
  }));

  // Export Supabase Auth users (via raw query ke auth schema)
  results.push(await exportTable('auth_users', async () => {
    try {
      const users = await prisma.$queryRaw`
        SELECT id, email, phone, created_at, updated_at,
               raw_user_meta_data, role, email_confirmed_at
        FROM auth.users
        ORDER BY created_at ASC
      `;
      return users as any[];
    } catch {
      console.log('    (auth.users tidak bisa diakses - akan export dari Supabase dashboard)');
      return [];
    }
  }));

  // Summary
  console.log('');
  console.log('============================================');
  console.log('  BACKUP SUMMARY');
  console.log('============================================');

  const totalRecords = results.reduce((sum, r) => sum + r.count, 0);
  const successCount = results.filter(r => r.status === 'success').length;
  const errorCount = results.filter(r => r.status === 'error').length;

  console.log(`  Total tables: ${results.length}`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Errors: ${errorCount}`);
  console.log(`  Total records: ${totalRecords}`);
  console.log('');

  // Save summary
  const summary = {
    timestamp: new Date().toISOString(),
    database_url: process.env.DATABASE_URL?.replace(/:[^@]+@/, ':***@'), // hide password
    results,
    totalRecords,
  };

  fs.writeFileSync(
    path.join(BACKUP_DIR, 'backup-summary.json'),
    JSON.stringify(summary, null, 2),
    'utf-8'
  );

  console.log(`Summary saved to: backup-summary.json`);
  console.log('');

  if (errorCount > 0) {
    console.log('WARNING: Ada tabel yang gagal di-export!');
    console.log('Cek error di atas dan pastikan koneksi database benar.');
  } else {
    console.log('SEMUA BACKUP BERHASIL! ✓');
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error('Fatal error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
