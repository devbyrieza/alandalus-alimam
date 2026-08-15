const path = require('path');

(async () => {
    const projects = ['alandalus-alimam', 'alandalus-ululalbaab', 'template-demo'];
    for (const project of projects) {
        try {
            const prismaClientPath = path.join('c:\\Users\\itpua\\Dev\\Work\\al-andalus', project, 'node_modules', '@prisma', 'client');
            const { PrismaClient } = require(prismaClientPath);
            const prisma = new PrismaClient();
            
            // 1. Activate 2027-2028
            let ta = await prisma.tahunAjaran.findFirst({
                where: { tahun_mulai: 2026, tahun_selesai: 2027 }
            });
            if (!ta) {
                await prisma.tahunAjaran.updateMany({ data: { is_active: false } });
                ta = await prisma.tahunAjaran.create({
                    data: {
                        tahun_mulai: 2026,
                        tahun_selesai: 2027,
                        nama: '2027-2028',
                        is_active: true,
                        tanggal_buka_pendaftaran: new Date('2026-09-05'),
                        tanggal_tutup_pendaftaran: new Date('2026-12-28'),
                        biaya_pendaftaran: 250000
                    }
                });
            } else {
                await prisma.tahunAjaran.updateMany({ data: { is_active: false } });
                await prisma.tahunAjaran.update({
                    where: { id: ta.id },
                    data: {
                        is_active: true,
                        tanggal_buka_pendaftaran: new Date('2026-09-05'),
                        tanggal_tutup_pendaftaran: new Date('2026-12-28'),
                        biaya_pendaftaran: 250000
                    }
                });
            }
            console.log('Successfully updated DB for ' + project);
            await prisma.$disconnect();
        } catch(e) {
            console.log('Failed for ' + project + ' : ' + e.message);
        }
    }
})();
