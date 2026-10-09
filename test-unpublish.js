const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  const users = await prisma.pendaftar.findMany({
    where: { status_pendaftaran: "accepted" },
    select: { id: true, pengumuman: true }
  });
  console.log("Accepted users:", users.length);
  if (users.length > 0) {
      console.log("Testing unpublish on user:", users[0].id);
      
      try {
        await prisma.$transaction(async (tx) => {
            const res1 = await tx.pendaftar.updateMany({
                where: { id: { in: [users[0].id] } },
                data: {
                    status_pendaftaran: "tested",
                    updated_at: new Date()
                }
            });
            console.log("updateMany pendaftar:", res1);
            
            const res2 = await tx.pengumuman.upsert({
                where: { pendaftar_id: users[0].id },
                update: {
                    status_kelulusan: "Belum Lengkap",
                    is_published: false,
                    updated_at: new Date()
                },
                create: {
                    pendaftar_id: users[0].id,
                    status_kelulusan: "Belum Lengkap",
                    is_published: false,
                    tahun_ajaran_id: "dummy"
                }
            });
            console.log("upsert pengumuman:", res2);
        });
      } catch (e) {
          console.error("TRANSACTION FAILED:", e);
      }
  }
}
test().finally(() => prisma.$disconnect());
