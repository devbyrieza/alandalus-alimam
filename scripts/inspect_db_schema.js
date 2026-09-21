const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const columns = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'pendaftar';
    `;
    console.log("=== COLUMNS IN PENDAFTAR TABLE ===");
    console.log(columns.map(c => c.column_name).join(', '));

    const count = await prisma.$queryRaw`SELECT COUNT(*) FROM pendaftar;`;
    console.log("\nTotal rows in pendaftar table:", count);

    const rows = await prisma.$queryRaw`
      SELECT p.id, p.nomor_pendaftaran, p.nama_lengkap, p.jenis_kelamin, p.jenjang, p.kelas_masuk, p.no_hp, p.status_pendaftaran,
             o.nama_ayah, o.no_hp_ayah, o.nama_ibu, o.no_hp_ibu, o.nama_wali, o.no_hp_wali
      FROM pendaftar p
      LEFT JOIN orang_tua o ON o.pendaftar_id = p.id;
    `;
    console.log("\n=== ALL PENDAFTAR IN DB ===");
    console.table(rows);

  } catch (err) {
    console.error("Error inspecting DB:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
