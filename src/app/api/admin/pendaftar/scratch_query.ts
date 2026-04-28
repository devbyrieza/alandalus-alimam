import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  const pendaftar = await prisma.pendaftar.findFirst({
    where: { nomor_pendaftaran: 'ILI2600009' }
  });
  console.log("Pendaftar found in Al-Imam:", pendaftar);
}
run().catch(console.error).finally(() => prisma.$disconnect());
