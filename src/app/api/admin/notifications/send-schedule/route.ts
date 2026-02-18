import { NextResponse } from "next/server";
import { notifyTestSchedule } from "@/lib/wablas";
import { getServerSession } from "@/lib/session";

export async function POST(request: Request) {
    try {
        const session = await getServerSession();
        if (!session || !["admin", "admin_super", "penguji"].includes(session.role)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { phone, nama, tanggal, waktu, tempat } = body;

        if (!phone || !nama) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const result = await notifyTestSchedule({
            phone,
            nama,
            tanggal,
            waktu,
            tempat
        });

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("Single Notification Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
