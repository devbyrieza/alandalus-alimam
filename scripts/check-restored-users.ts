import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Check the 3 restored users
    const restoredUsers = await prisma.pendaftar.findMany({
        where: {
            nama_lengkap: {
                in: [
                    'Ahmad Sukari Tes',
                    'muhammad Azzam Al hafiz',
                    'Raylan Akbar'
                ]
            }
        },
        select: {
            id: true,
            nama_lengkap: true,
            nik: true,
            nomor_pendaftaran: true,
            user_id: true,
            created_at: true,
            updated_at: true
        }
    });

    console.log('=== RESTORED USERS CHECK ===\n');
    
    if (restoredUsers.length === 0) {
        console.log('⚠️  TIDAK ADA data pendaftar yang ditemukan dengan nama tersebut!');
        console.log('\nMungkin data belum di-commit-push-redeploy ke production.');
    } else {
        restoredUsers.forEach((user, idx) => {
            console.log(`${idx + 1}. ${user.nama_lengkap}`);
            console.log(`   - ID: ${user.id}`);
            console.log(`   - NIK: ${user.nik}`);
            console.log(`   - Nomor Pendaftaran: ${user.nomor_pendaftaran}`);
            console.log(`   - User ID (Profile): ${user.user_id || '⚠️  TIDAK ADA (tidak bisa login!)'}`);
            console.log(`   - Created: ${user.created_at}`);
            console.log(`   - Updated: ${user.updated_at}`);
            console.log('');
        });
    }

    // Also check if there are any profiles linked
    const profiles = await prisma.profile.findMany({
        where: {
            full_name: {
                in: [
                    'Ahmad Sukari Tes',
                    'muhammad Azzam Al hafiz',
                    'Raylan Akbar'
                ]
            }
        },
        select: {
            id: true,
            full_name: true,
            email: true,
            phone: true,
            role: true
        }
    });

    console.log('\n=== LINKED PROFILES ===\n');
    if (profiles.length === 0) {
        console.log('⚠️  TIDAK ADA profile yang ditemukan!');
        console.log('Ini berarti user tidak bisa login karena tidak ada akun Profile.');
    } else {
        profiles.forEach((profile, idx) => {
            console.log(`${idx + 1}. ${profile.full_name}`);
            console.log(`   - Profile ID: ${profile.id}`);
            console.log(`   - Email: ${profile.email || '-'}`);
            console.log(`   - Phone: ${profile.phone}`);
            console.log(`   - Role: ${profile.role}`);
            console.log('');
        });
    }

    // Check all pendaftars to see the full picture
    const allPendaftars = await prisma.pendaftar.findMany({
        select: {
            id: true,
            nama_lengkap: true,
            nik: true,
            nomor_pendaftaran: true,
            user_id: true
        },
        orderBy: {
            created_at: 'desc'
        }
    });

    console.log('\n=== ALL PENDAFTARS IN DB ===\n');
    console.log(`Total: ${allPendaftars.length} pendaftar(s)`);
    allPendaftars.forEach((p, idx) => {
        const hasProfile = p.user_id ? '✓' : '✗';
        console.log(`${idx + 1}. [${p.nomor_pendaftaran}] ${p.nama_lengkap} | NIK: ${p.nik} | Profile: ${hasProfile}`);
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
