import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { notifyDocumentVerified } from "@/lib/wablas";

// GET: List dokumen yang perlu diverifikasi
export async function GET(request: NextRequest) {
  try {
    // 1. Validasi session manual
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("app_session");

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let session;
    try {
      session = JSON.parse(sessionCookie.value);
    } catch {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    // Check custom role
    const allowedRoles = ["admin", "admin_super", "admin_berkas", "admin_keuangan", "penguji"];
    if (!allowedRoles.includes(session.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get query params
    const searchParams = request.nextUrl.searchParams;
    const statusParam = searchParams.get("status") || "pending";

    // Build filter
    const where: any = {};
    if (statusParam === "pending") {
      where.is_verified = false;
    } else if (statusParam === "verified") {
      where.is_verified = true;
    }

    // Fetch dokumen
    const data = await prisma.dokumen.findMany({
      where,
      select: {
        id: true,
        jenis_dokumen: true,
        is_verified: true,
        catatan: true,
        file_path: true,
        created_at: true,
        updated_at: true,
        pendaftar: {
          select: {
            id: true,
            nomor_pendaftaran: true,
            nama_lengkap: true,
            jenjang: true,
            no_hp: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error("Error in dokumen verification API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH: Verify or reject dokumen
export async function PATCH(request: NextRequest) {
  try {
    // 1. Validasi session manual
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("app_session");

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let session;
    try {
      session = JSON.parse(sessionCookie.value);
    } catch {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    // Check custom role
    const allowedRoles = ["admin", "admin_super", "admin_berkas", "admin_keuangan", "penguji"];
    if (!allowedRoles.includes(session.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get request body
    const body = await request.json();
    const { dokumen_id, status_verifikasi, catatan } = body;

    if (!dokumen_id || !status_verifikasi) {
      return NextResponse.json(
        { error: "dokumen_id and status_verifikasi are required" },
        { status: 400 }
      );
    }

    if (!["verified", "rejected"].includes(status_verifikasi)) {
      return NextResponse.json(
        { error: "status_verifikasi must be verified or rejected" },
        { status: 400 }
      );
    }

    const isVerified = status_verifikasi === "verified";

    // Update dokumen
    const dokumen = await prisma.dokumen.update({
      where: { id: dokumen_id },
      data: {
        is_verified: isVerified,
        catatan,
        // verified_by: session.id, // Only if column exists in Prisma schema
        // verified_at: new Date(), // Only if column exists
      },
      include: {
        pendaftar: {
          select: {
            nama_lengkap: true,
            no_hp: true,
          },
        },
      },
    });

    // Send WhatsApp notification
    try {
      if (dokumen.pendaftar?.no_hp) {
        await notifyDocumentVerified({
          phone: dokumen.pendaftar.no_hp,
          nama: dokumen.pendaftar.nama_lengkap,
          dokumen_list: `• ${dokumen.jenis_dokumen}`,
          status: status_verifikasi,
          catatan: catatan || undefined,
        });
      }
    } catch (error) {
      console.error("WhatsApp notification error:", error);
      // Don't fail verification if notification fails
    }

    return NextResponse.json({ success: true, data: dokumen });
  } catch (error) {
    console.error("Error in dokumen verification update API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
