const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tas = await prisma.tahunAjaran.findMany();
  console.log("=== TAHUN AJARAN ===");
  console.dir(tas);

  const pendaftars = await prisma.pendaftar.findMany({
    where: { tahun_ajaran_id: tas.find(t => t.tahun_mulai === 2027).id },
    select: { id: true, nama_lengkap: true, no_pendaftaran: true }
  });
  console.log("=== PENDAFTAR 2027 ===");
  console.dir(pendaftars);
}

main().catch(console.error).finally(() => prisma.$disconnect());
