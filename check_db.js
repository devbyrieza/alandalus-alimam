const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const fathi = await prisma.pendaftar.findFirst({ where: { nomor_pendaftaran: "MTA2700004" }, select: { id: true, status_pendaftaran: true } });
  if (fathi) {
    console.log("Fathi status:", fathi.status_pendaftaran);
    const p = await prisma.pengumuman.findUnique({ where: { pendaftar_id: fathi.id } });
    console.log("Pengumuman record:", p);
    
    // forcefully delete it
    if (p) {
        await prisma.pengumuman.delete({ where: { id: p.id }});
        console.log("Deleted pengumuman!");
    }
  } else {
    console.log("Fathi not found");
  }
}
run().finally(() => prisma.$disconnect());
