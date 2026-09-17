const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const pendaftar = await prisma.$queryRaw`SELECT id, nama_lengkap FROM "Pendaftar" WHERE nama_lengkap ILIKE '%Yuni Dwi%' LIMIT 1`;
    if (!pendaftar || pendaftar.length === 0) {
      console.log('Not found');
      return;
    }
    const pId = pendaftar[0].id;
    console.log('Found:', pendaftar[0].nama_lengkap);

    const docs = await prisma.$queryRaw`SELECT jenis_dokumen, file_name, file_type FROM "Dokumen" WHERE pendaftar_id = ${pId}`;
    console.log(docs);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
run();
