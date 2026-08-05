import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const users = await prisma.user.findMany({
    where: { name: { contains: 'Iman', mode: 'insensitive' } },
  });
  console.log("Users:", JSON.stringify(users, null, 2));

  const pendaftars = await prisma.pendaftar.findMany({
    where: { nama_lengkap: { contains: 'Iman', mode: 'insensitive' } },
  });
  console.log("Pendaftars:", JSON.stringify(pendaftars, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
