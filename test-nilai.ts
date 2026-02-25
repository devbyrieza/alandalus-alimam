import { prisma } from './src/lib/prisma';

async function main() {
    const pendaftar = await prisma.pendaftar.findMany({
        where: { nama_lengkap: { contains: 'Ahmad' } }
    });
    console.log('Pendaftar Found:', pendaftar.map(p => p.nama_lengkap));

    if (pendaftar.length > 0) {
        const nilai = await prisma.nilaiUjian.findMany({
            where: { pendaftar_id: { in: pendaftar.map(p => p.id) } }
        });
        console.log(JSON.stringify(nilai, null, 2));
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
