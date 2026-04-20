require('dotenv').config({ path: '.env' });
const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 
async function main() { 
  const p = await prisma.pembayaran.findMany({ 
    include: { pendaftar: true }, 
    where: { pendaftar: { nama_lengkap: { contains: 'Ahmad Sukari' } } } 
  }); 
  console.log(JSON.stringify(p, null, 2)); 
} 
main().catch(console.error).finally(() => prisma.$disconnect());
