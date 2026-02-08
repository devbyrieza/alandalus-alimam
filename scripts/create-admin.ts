/**
 * Script: Create Admin User
 *
 * Usage: npx tsx scripts/create-admin.ts <email> <password> <full_name> <role>
 * Example: npx tsx scripts/create-admin.ts admin@alimam.sch.id Admin123! "Super Admin" admin_super
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  const [, , email, password, full_name, role] = process.argv;

  if (!email || !password || !full_name || !role) {
    console.log("Usage: npx tsx scripts/create-admin.ts <email> <password> <full_name> <role>");
    console.log("Roles: admin_super, admin, admin_berkas, admin_keuangan, penguji");
    console.log('Example: npx tsx scripts/create-admin.ts admin@alimam.sch.id Admin123! "Super Admin" admin_super');
    process.exit(1);
  }

  const validRoles = ["admin_super", "admin", "admin_berkas", "admin_keuangan", "penguji"];
  if (!validRoles.includes(role)) {
    console.error(`Role tidak valid: ${role}. Pilih: ${validRoles.join(", ")}`);
    process.exit(1);
  }

  // Check if email exists
  const existing = await prisma.profile.findFirst({ where: { email } });
  if (existing) {
    console.error(`Email ${email} sudah terdaftar.`);
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);

  const profile = await prisma.profile.create({
    data: {
      id: crypto.randomUUID(),
      email,
      full_name,
      role,
      phone: "-",
      password_hash: hash,
    },
  });

  console.log("\nAdmin berhasil dibuat:");
  console.log(`  ID: ${profile.id}`);
  console.log(`  Email: ${email}`);
  console.log(`  Nama: ${full_name}`);
  console.log(`  Role: ${role}`);
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
