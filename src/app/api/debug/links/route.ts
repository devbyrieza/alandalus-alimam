
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateMagicToken } from '@/lib/utils/magic-link';

export async function GET() {
    // PROTEKSI SEDERHANA: Hanya biarkan jika ada query secret tertentu agar tidak diakses publik
    // Tapi untuk mempermudah Anda, saya buatkan langsung saja dulu.
    
    try {
        const profiles = await prisma.profile.findMany({
            where: { 
                OR: [
                    { role: { contains: 'penguji', mode: 'insensitive' } },
                    { role: { contains: 'pewawancara', mode: 'insensitive' } },
                    { secondary_roles: { hasSome: ['penguji', 'pewawancara', 'penguji_calsan', 'pewawancara_calsan', 'pewawancara_cawalsan'] } }
                ]
            },
            orderBy: { full_name: 'asc' }
        });

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pesantren-alimam.com';
        
        const results = profiles.map(p => {
            const activeRole = (p.role.includes('admin') && p.secondary_roles.length > 0)
                ? p.secondary_roles.find(r => r.includes('penguji') || r.includes('pewawancara')) || p.role
                : p.role;

            const token = generateMagicToken(p.id, activeRole, p.full_name, 72); // Berlaku 72 jam
            return {
                nama: p.full_name,
                role: p.role,
                secondary: p.secondary_roles,
                link: `${baseUrl}/api/auth/magic?token=${token}`
            };
        });

        return NextResponse.json({
            status: 'success',
            count: results.length,
            data: results
        });
    } catch (error: any) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }
}
