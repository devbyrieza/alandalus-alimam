/**
 * IMPORT SCRIPT: Restore data dari JSON ke database lokal
 * Jalankan: npx tsx migration/backup/import-data.ts
 *
 * PASTIKAN:
 * 1. DATABASE_URL di .env sudah mengarah ke database LOKAL
 * 2. Schema sudah di-push (npx prisma db push)
 * 3. File JSON backup sudah ada di folder ini
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();
const BACKUP_DIR = path.join(__dirname);

function loadJSON(filename: string): any[] {
  const filepath = path.join(BACKUP_DIR, `${filename}.json`);
  if (!fs.existsSync(filepath)) {
    console.log(`  ⚠ ${filename}.json tidak ditemukan, skip...`);
    return [];
  }
  const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  return data;
}

// Helper: convert string dates back to Date objects
function parseDates(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string') {
    // Check if it looks like a date string
    if (/^\d{4}-\d{2}-\d{2}T/.test(obj) || /^\d{4}-\d{2}-\d{2}$/.test(obj)) {
      return new Date(obj);
    }
    return obj;
  }
  if (Array.isArray(obj)) return obj.map(parseDates);
  if (typeof obj === 'object') {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = parseDates(value);
    }
    return result;
  }
  return obj;
}

async function importTable(
  name: string,
  data: any[],
  importFn: (items: any[]) => Promise<number>
): Promise<{ table: string; count: number; status: string }> {
  if (data.length === 0) {
    console.log(`  - ${name}: 0 records (skip)`);
    return { table: name, count: 0, status: 'skipped' };
  }

  try {
    const count = await importFn(data);
    console.log(`  ✓ ${name}: ${count} records imported`);
    return { table: name, count, status: 'success' };
  } catch (error: any) {
    console.error(`  ✗ ${name}: ERROR - ${error.message}`);
    return { table: name, count: 0, status: 'error' };
  }
}

async function main() {
  console.log('============================================');
  console.log('  IMPORT DATA → LOCAL DATABASE');
  console.log(`  ${new Date().toLocaleString('id-ID')}`);
  console.log('============================================');
  console.log('');

  // Safety check
  const dbUrl = process.env.DATABASE_URL || '';
  if (dbUrl.includes('supabase.co') || dbUrl.includes('pooler.supabase.com')) {
    console.error('⛔ BAHAYA: DATABASE_URL masih mengarah ke Supabase!');
    console.error('   Ubah DATABASE_URL ke database LOKAL sebelum import.');
    console.error('   Contoh: postgresql://postgres:password@localhost:5432/ppdb_alimam_test');
    process.exit(1);
  }

  console.log(`Target database: ${dbUrl.replace(/:[^@]+@/, ':***@')}`);
  console.log('');

  // Test connection
  console.log('Testing database connection...');
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('  ✓ Connected!\n');
  } catch (error: any) {
    console.error(`  ✗ Connection failed: ${error.message}`);
    process.exit(1);
  }

  // Ensure uuid-ossp extension
  try {
    await prisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  } catch {
    // Extension might already exist
  }

  console.log('Importing tables (in dependency order)...\n');
  const results = [];

  // 1. Profiles (no foreign keys to other app tables)
  const profiles = loadJSON('profiles').map(parseDates);
  results.push(await importTable('profiles', profiles, async (items) => {
    let count = 0;
    for (const item of items) {
      await prisma.profile.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
      count++;
    }
    return count;
  }));

  // 2. Tahun Ajaran (no foreign keys to other app tables)
  const tahunAjaran = loadJSON('tahun_ajaran').map(parseDates);
  results.push(await importTable('tahun_ajaran', tahunAjaran, async (items) => {
    let count = 0;
    for (const item of items) {
      await prisma.tahunAjaran.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
      count++;
    }
    return count;
  }));

  // 3. Pendaftar (depends on profiles, tahun_ajaran)
  const pendaftar = loadJSON('pendaftar').map(parseDates);
  results.push(await importTable('pendaftar', pendaftar, async (items) => {
    let count = 0;
    for (const item of items) {
      await prisma.pendaftar.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
      count++;
    }
    return count;
  }));

  // 4. Orang Tua (depends on pendaftar)
  const orangTua = loadJSON('orang_tua').map(parseDates);
  results.push(await importTable('orang_tua', orangTua, async (items) => {
    let count = 0;
    for (const item of items) {
      await prisma.orangTua.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
      count++;
    }
    return count;
  }));

  // 5. Dokumen (depends on pendaftar, profiles)
  const dokumen = loadJSON('dokumen').map(parseDates);
  results.push(await importTable('dokumen', dokumen, async (items) => {
    let count = 0;
    for (const item of items) {
      await prisma.dokumen.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
      count++;
    }
    return count;
  }));

  // 6. Pembayaran (depends on pendaftar, tahun_ajaran, profiles)
  const pembayaran = loadJSON('pembayaran').map(parseDates);
  results.push(await importTable('pembayaran', pembayaran, async (items) => {
    let count = 0;
    for (const item of items) {
      await prisma.pembayaran.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
      count++;
    }
    return count;
  }));

  // 7. Jadwal Ujian
  const jadwalUjian = loadJSON('jadwal_ujian').map(parseDates);
  results.push(await importTable('jadwal_ujian', jadwalUjian, async (items) => {
    let count = 0;
    for (const item of items) {
      await prisma.jadwalUjian.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
      count++;
    }
    return count;
  }));

  // 8. Nilai Ujian
  const nilaiUjian = loadJSON('nilai_ujian').map(parseDates);
  results.push(await importTable('nilai_ujian', nilaiUjian, async (items) => {
    let count = 0;
    for (const item of items) {
      await prisma.nilaiUjian.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
      count++;
    }
    return count;
  }));

  // 9. Data Rapor
  const dataRapor = loadJSON('data_rapor').map(parseDates);
  results.push(await importTable('data_rapor', dataRapor, async (items) => {
    let count = 0;
    for (const item of items) {
      await prisma.dataRapor.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
      count++;
    }
    return count;
  }));

  // 10. Data Prestasi
  const dataPrestasi = loadJSON('data_prestasi').map(parseDates);
  results.push(await importTable('data_prestasi', dataPrestasi, async (items) => {
    let count = 0;
    for (const item of items) {
      await prisma.dataPrestasi.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
      count++;
    }
    return count;
  }));

  // 11. Data Kesehatan
  const dataKesehatan = loadJSON('data_kesehatan').map(parseDates);
  results.push(await importTable('data_kesehatan', dataKesehatan, async (items) => {
    let count = 0;
    for (const item of items) {
      await prisma.dataKesehatan.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
      count++;
    }
    return count;
  }));

  // 12. Data Asrama
  const dataAsrama = loadJSON('data_asrama').map(parseDates);
  results.push(await importTable('data_asrama', dataAsrama, async (items) => {
    let count = 0;
    for (const item of items) {
      await prisma.dataAsrama.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
      count++;
    }
    return count;
  }));

  // 13. Pengumuman
  const pengumuman = loadJSON('pengumuman').map(parseDates);
  results.push(await importTable('pengumuman', pengumuman, async (items) => {
    let count = 0;
    for (const item of items) {
      await prisma.pengumuman.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
      count++;
    }
    return count;
  }));

  // 14. Reservasi PSB
  const reservasi = loadJSON('reservasi_psb').map(parseDates);
  results.push(await importTable('reservasi_psb', reservasi, async (items) => {
    let count = 0;
    for (const item of items) {
      await prisma.reservasiPSB.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
      count++;
    }
    return count;
  }));

  // 15. Data Perubahan Request
  const perubahanReq = loadJSON('data_perubahan_request').map(parseDates);
  results.push(await importTable('data_perubahan_request', perubahanReq, async (items) => {
    let count = 0;
    for (const item of items) {
      await prisma.dataPerubahanRequest.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
      count++;
    }
    return count;
  }));

  // 16. OTP Verifications (raw SQL)
  const otpData = loadJSON('otp_verifications');
  if (otpData.length > 0) {
    results.push(await importTable('otp_verifications', otpData, async (items) => {
      // Create table if not exists
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS otp_verifications (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          phone VARCHAR(20) NOT NULL,
          otp_hash VARCHAR(64) NOT NULL,
          expires_at TIMESTAMPTZ NOT NULL,
          attempts INT DEFAULT 0,
          otp_channel VARCHAR(20) DEFAULT 'sms',
          verified_at TIMESTAMPTZ,
          registration_data JSONB NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW()
        )
      `;

      let count = 0;
      for (const item of items) {
        await prisma.$executeRaw`
          INSERT INTO otp_verifications (id, phone, otp_hash, expires_at, attempts, otp_channel, verified_at, registration_data, created_at)
          VALUES (${item.id}::uuid, ${item.phone}, ${item.otp_hash}, ${item.expires_at}::timestamptz, ${item.attempts}, ${item.otp_channel}, ${item.verified_at}::timestamptz, ${JSON.stringify(item.registration_data)}::jsonb, ${item.created_at}::timestamptz)
          ON CONFLICT (id) DO NOTHING
        `;
        count++;
      }
      return count;
    }));
  }

  // Summary
  console.log('');
  console.log('============================================');
  console.log('  IMPORT SUMMARY');
  console.log('============================================');

  const totalImported = results.reduce((sum, r) => sum + r.count, 0);
  const successCount = results.filter(r => r.status === 'success').length;

  for (const r of results) {
    const icon = r.status === 'success' ? '✓' : r.status === 'skipped' ? '-' : '✗';
    console.log(`  ${icon} ${r.table}: ${r.count} records`);
  }

  console.log('');
  console.log(`  Total imported: ${totalImported} records`);
  console.log(`  Success: ${successCount} tables`);
  console.log('');
  console.log('Verifikasi dengan: npx prisma studio');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error('Fatal error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
