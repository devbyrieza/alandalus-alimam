const fs = require('fs');
const file = "c:/Users/itpua/Dev/Work/al-andalus/alandalus-alimam/src/app/api/admin/pengumuman/publish/route.ts";
let content = fs.readFileSync(file, "utf8");

const fixed = `    // Use transaction for consistency
    await prisma.$transaction(async (tx) => {
      // Bulk update status pendaftaran
      await tx.pendaftar.updateMany({
        where: { id: { in: pendaftar_ids } },
        data: {
          status_pendaftaran: new_status,
          updated_at: new Date() } });

      // Upsert records in Pengumuman table so they appear in student dashboard
      for (const user of updatedUsers) {
        if (new_status === "tested") {
          await tx.pengumuman.deleteMany({ where: { pendaftar_id: user.id } });
        } else {
          await tx.pengumuman.upsert({
            where: { pendaftar_id: user.id },
            update: {
              status_kelulusan: displayStatus,
              is_published: new_status !== "tested",
              published_at: new Date(),
              published_by: session.id,
              updated_at: new Date() },
            create: {
              pendaftar_id: user.id,
              status_kelulusan: displayStatus,
              is_published: new_status !== "tested",
              published_at: new Date(),
              published_by: session.id,
              tahun_ajaran_id: user.tahun_ajaran_id } });
        }
      }
    });`;

content = content.replace(/    \/\/ Use transaction for consistency[\s\S]*?    \}\);\n\n    await invalidateAdminPendaftarCache/m, fixed + "\n\n    await invalidateAdminPendaftarCache");
fs.writeFileSync(file, content);
