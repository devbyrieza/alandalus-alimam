import { NextResponse } from "next/server";
import { notifyStatusChange } from "@/lib/wablas";
import { getServerSession } from "@/lib/session";

export async function POST(request: Request) {
    try {
        const session = await getServerSession();
        if (!session || !["admin", "admin_super", "head_of_it"].includes(session.role)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { phone, nama, status, jenjang } = body;

        if (!phone || !nama || !status) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const result = await notifyStatusChange({
            phone,
            nama,
            status,
            jenjang
        });

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("Single Status Notification Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
