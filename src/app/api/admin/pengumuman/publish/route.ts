import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { notifyStatusChange } from "@/lib/wablas"; // We'll need to check if this exists or create it

export async function POST(request: NextRequest) {
    try {
        // 1. Validate Session
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("app_session");
        if (!sessionCookie) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        let session;
        try {
            session = JSON.parse(sessionCookie.value);
        } catch {
            return NextResponse.json({ error: "Invalid session" }, { status: 401 });
        }

        // 2. Check Role: Only Super Admin (and maybe Head of IT/Admin) can publish
        const allowedRoles = ["admin_super", "head_of_it", "admin"];
        if (!allowedRoles.includes(session.role)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // 3. Get Params
        const body = await request.json();
        const { pendaftar_ids, new_status, announcement_message } = body;

        if (!pendaftar_ids || !Array.isArray(pendaftar_ids) || pendaftar_ids.length === 0) {
            return NextResponse.json({ error: "No pendaftar selected" }, { status: 400 });
        }

        if (!new_status || !["accepted", "rejected"].includes(new_status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        // 4. Bulk Update
        const result = await prisma.pendaftar.updateMany({
            where: {
                id: { in: pendaftar_ids },
            },
            data: {
                status_pendaftaran: new_status,
                updated_at: new Date(),
            },
        });

        // 5. Send Notifications (Async)
        // We fetch phone numbers of updated users
        const updatedUsers = await prisma.pendaftar.findMany({
            where: { id: { in: pendaftar_ids } },
            select: { id: true, nama_lengkap: true, no_hp: true }
        });

        // Mock notification sending for now, or use wablas if available
        updatedUsers.forEach(async (user) => {
            if (user.no_hp) {
                try {
                    // TODO: Implement actual WA sending here
                    console.log(`Sending announcement to ${user.nama_lengkap} (${user.no_hp}): ${new_status}`);
                } catch (e) {
                    console.error(`Failed to send to ${user.no_hp}`, e);
                }
            }
        });

        return NextResponse.json({ success: true, updated: result.count });

    } catch (error: any) {
        console.error("Error publishing announcement:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
