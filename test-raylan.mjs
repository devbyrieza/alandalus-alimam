import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const pendaftar = await prisma.pendaftar.findUnique({
        where: { id: '439d5b81-2c53-42ac-872c-f6983088b999' },
        include: { berkas: true }
    });
    console.log(JSON.stringify(pendaftar, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
