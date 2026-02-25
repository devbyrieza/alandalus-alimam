import { PrismaClient } from '@prisma/client'

// Connect to the production Supabase database
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres.hcknodoayqarjbrzcgrp:SKBalimam26%21@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
        },
    },
})

async function main() {
    const users = await prisma.profile.findMany({
        where: {
            email: {
                contains: 'rieza',
                mode: 'insensitive'
            }
        }
    })
    console.log("PROFILES ON PRODUCTION:", users.map(u => ({ email: u.email, role: u.role, full_name: u.full_name })))
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })
