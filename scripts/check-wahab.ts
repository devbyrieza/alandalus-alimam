import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const users = await prisma.profile.findMany({
    where: {
      full_name: { contains: 'wahab', mode: 'insensitive' }
    }
  });
  console.log('Found:', JSON.stringify(users, null, 2));
}
main().then(() => prisma.$disconnect());
