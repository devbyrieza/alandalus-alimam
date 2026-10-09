const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const totalL = await prisma.pendaftar.count({ where: { jenis_kelamin: 'L' }});
  const totalP = await prisma.pendaftar.count({ where: { jenis_kelamin: 'P' }});
  const total = await prisma.pendaftar.count();
  console.log('=== DB Al-Imam Al-Islami (alandalus-alimam) ===');
  console.log('Total Pendaftar:', total);
  console.log('Laki-laki (L) - harus MIGRASI ke Ulul Albaab:', totalL);
  console.log('Perempuan (P) - TETAP di sini:', totalP);
  
  const sampleL = await prisma.pendaftar.findMany({ where: { jenis_kelamin: 'L' }, select: { id: true, nama_lengkap: true, nomor_pendaftaran: true, status_pendaftaran: true, jenjang: true }, take: 5 });
  console.log('\nSample Putra di Al-Imam (top 5):');
  sampleL.forEach(d => console.log(' -', d.nama_lengkap, '|', d.nomor_pendaftaran, '|', d.jenjang, '|', d.status_pendaftaran));
}
run().finally(() => prisma.$disconnect());
