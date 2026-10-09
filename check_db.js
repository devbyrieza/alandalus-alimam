const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const p = await prisma.profile.findMany({
    where: { role: { not: 'pendaftar' }, google_meet_link: { not: null } },
    select: { full_name: true, google_meet_link: true }
  });
  console.log(p);
}
main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
