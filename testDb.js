const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const all = await prisma.pendaftar.findMany({ include: { nilai_ujian: true } });
    const found = all.filter(p =>
        p.nama_lengkap.toLowerCase().includes('azzam') ||
        p.nama_lengkap.toLowerCase().includes('sukari') ||
        p.nama_lengkap.toLowerCase().includes('raylan')
    );
    console.log(JSON.stringify(found, null, 2));
}

main().finally(() => prisma.$disconnect());
