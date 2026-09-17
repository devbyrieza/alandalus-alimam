const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkYuni() {
  try {
    const yuni = await prisma.pendaftar.findFirst({
      where: {
        nama_lengkap: { contains: 'Yuni Dwi Fazrin' }
      },
      include: {
        dokumen: true
      }
    });

    if (yuni) {
      console.log('Found:', yuni.nama_lengkap);
      console.log('Status:', yuni.status_pendaftaran);
      console.log('Documents:');
      yuni.dokumen.forEach(d => {
        console.log(`- ${d.jenis_dokumen}: verified=${d.is_verified}, catatan=${d.catatan}`);
      });
    } else {
      console.log('Yuni Dwi Fazrin not found in DB!');
    }
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

checkYuni();
