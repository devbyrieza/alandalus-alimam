const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
    try {
        const res = await prisma.jadwalNotifReminder.findFirst({
            where: {
                jadwal_ujian_id_pendaftar_id_reminder_type: {
                    jadwal_ujian_id: "123e4567-e89b-12d3-a456-426614174000",
                    pendaftar_id: "123e4567-e89b-12d3-a456-426614174000",
                    reminder_type: "h0"
                }
            }
        });
        console.log("SUCCESS");
    } catch (err) {
        if (err.message.includes('Invalid `prisma.jadwalNotifReminder.findFirst()`')) {
            console.error("PRISMA ERROR", err.message);
        } else {
            console.error(err.message);
        }
    } finally {
        await prisma.$disconnect();
    }
}
run();
