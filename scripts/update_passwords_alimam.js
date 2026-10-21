const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("=== UPDATING PASSWORDS IN ALANDALUS-ALIMAM ===");
  const hashPaas = await bcrypt.hash("Paas2026!", 10);
  const hashWahab = await bcrypt.hash("2026#@", 10);

  const allProfiles = await prisma.profile.findMany();
  console.log(`Total profiles found: ${allProfiles.length}`);

  for (const p of allProfiles) {
    // Skip pendaftar (parents/applicants login via NIK + RegNo)
    if (p.role === "pendaftar") continue;

    const isWahab =
      p.username === "wahabrajasam" ||
      (p.full_name && p.full_name.toLowerCase().includes("wahab rajasam")) ||
      p.email === "mudir@pesantren-alandalus.com";

    if (isWahab) {
      await prisma.profile.update({
        where: { id: p.id },
        data: {
          username: "wahabrajasam",
          password_hash: hashWahab,
          plain_password: "2026#@",
          must_change_password: true,
        }
      });
      console.log(`[WAHAB] ${p.full_name} (@wahabrajasam) -> 2026#@`);
    } else {
      await prisma.profile.update({
        where: { id: p.id },
        data: {
          password_hash: hashPaas,
          plain_password: "Paas2026!",
          must_change_password: true,
        }
      });
      console.log(`[STAFF] ${p.full_name} (@${p.username || '-'}) -> Paas2026!`);
    }
  }

  // Verification
  const verifyAll = await prisma.profile.findMany({
    where: { role: { not: "pendaftar" } },
    select: { id: true, full_name: true, username: true, role: true, plain_password: true }
  });
  console.log("\n--- VERIFICATION AL-IMAM ---");
  verifyAll.forEach(p => console.log(`[${p.role}] ${p.full_name} (@${p.username || '-'}) => ${p.plain_password}`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
