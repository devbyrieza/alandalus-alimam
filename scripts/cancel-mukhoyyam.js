const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cancelMukhoyyamSchedules() {
  console.log('Mencari sesi ujian pada tanggal 22, 23, dan 24 September 2026...');

  const targetStartDate = new Date('2026-09-22T00:00:00.000+07:00');
  const targetEndDate = new Date('2026-09-25T00:00:00.000+07:00');

  const sessions = await prisma.examSession.findMany({
    where: {
      start_time: {
        gte: targetStartDate,
        lt: targetEndDate
      }
    }
  });

  console.log(`Ditemukan ${sessions.length} sesi ujian.`);

  let totalCancelled = 0;
  let affectedParents = [];

  for (const session of sessions) {
    const jadwals = await prisma.jadwalUjian.findMany({
      where: { exam_session_id: session.id },
      include: { pendaftar: true }
    });

    for (const jadwal of jadwals) {
      if (!jadwal.pendaftar) continue;
      
      affectedParents.push({
        nama_santri: jadwal.pendaftar.nama_lengkap,
        telepon_ortu: jadwal.pendaftar.no_wa_ayah || jadwal.pendaftar.no_wa_ibu || jadwal.pendaftar.telepon || "Tidak Ada Data WA",
        tanggal_sesi: session.start_time
      });

      await prisma.jadwalUjian.delete({ where: { id: jadwal.id } });

      await prisma.pendaftar.update({
        where: { id: jadwal.pendaftar_id },
        data: { notif_jadwal_tersedia_terkirim: false }
      });

      totalCancelled++;
    }

    await prisma.examSession.update({
      where: { id: session.id },
      data: { is_active: false }
    });
  }

  console.log('=============================================');
  console.log(`SUKSES: ${totalCancelled} Jadwal berhasil dibatalkan.`);
  console.log('=============================================');
  console.log('Daftar Orang Tua yang Terdampak (Silakan Broadcast WA):');
  
  affectedParents.forEach((p, i) => {
    console.log(`${i+1}. Santri: ${p.nama_santri} | WA: ${p.telepon_ortu} | Sesi Awal: ${p.tanggal_sesi.toLocaleString()}`);
  });
  console.log('=============================================');
}

cancelMukhoyyamSchedules()
  .catch(e => console.error('Gagal:', e))
  .finally(() => prisma.$disconnect());
