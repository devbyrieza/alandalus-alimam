const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.pendaftar.findFirst({
    where: {
      nama_lengkap: {
        contains: 'Iman Prayogo',
        mode: 'insensitive'
      }
    }
  });

  if (user) {
    console.log('Found user:', user.id, user.nama_lengkap, user.status_pendaftaran);
    await prisma.pendaftar.update({
      where: { id: user.id },
      data: { status_pendaftaran: 'selection' }
    });
    console.log('Status updated to selection! Now he can take the test directly.');
  } else {
    console.log('User Iman Prayogo not found');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
