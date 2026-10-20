const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const all = await prisma.pendaftar.findMany({
    select: { id: true, nomor_pendaftaran: true, nama_lengkap: true, jenjang: true, status_pendaftaran: true, no_hp: true }
  });
  console.log('Al-Imam count:', all.length);
  all.forEach(p => console.log(`[${p.nomor_pendaftaran}] ${p.nama_lengkap} (${p.jenjang}) - ${p.status_pendaftaran} - ${p.no_hp}`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
