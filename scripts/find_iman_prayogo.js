const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`
    SELECT p.id, p.nomor_pendaftaran, p.nama_lengkap, p.jenis_kelamin, p.jenjang, p.no_hp, p.status_pendaftaran,
           o.nama_ayah, o.no_hp_ayah, o.nama_ibu, o.no_hp_ibu
    FROM pendaftar p
    LEFT JOIN orang_tua o ON o.pendaftar_id = p.id
    WHERE p.nama_lengkap ILIKE '%iman%' OR p.nama_lengkap ILIKE '%prayogo%';
  `;
  console.log("=== DB RESULT FOR IMAN PRAYOGO ===");
  console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
