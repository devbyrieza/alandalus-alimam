const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixStuckPendaftar() {
  try {
    // Find all Pendaftar who are locked in 'docs_uploaded' OR 'docs_verified'
    // BUT they have at least one document with is_verified = false AND catatan != null (i.e. rejected)
    const stuckPendaftars = await prisma.pendaftar.findMany({
      where: {
        status_pendaftaran: { in: ['docs_uploaded', 'docs_verified'] },
        dokumen: {
          some: {
            is_verified: false,
            catatan: { not: null }
          }
        }
      },
      select: { id: true, nama_lengkap: true, status_pendaftaran: true }
    });

    console.log(`Found ${stuckPendaftars.length} stuck pendaftars.`);

    for (const p of stuckPendaftars) {
      console.log(`Fixing ${p.nama_lengkap} (${p.status_pendaftaran}) -> docs_rejected`);
      await prisma.pendaftar.update({
        where: { id: p.id },
        data: { status_pendaftaran: 'docs_rejected' }
      });
    }
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

fixStuckPendaftar();
