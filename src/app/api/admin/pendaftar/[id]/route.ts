import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/session";
import { logAdminAction } from "@/lib/audit";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check custom role
    const allowedRoles = ["admin", "admin_super", "admin_berkas", "admin_keuangan", "penguji"];
    if (!allowedRoles.includes(session.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    console.log("Fetching pendaftar with ID:", params.id);

    // Fetch pendaftar with all related data
    const pendaftar = await prisma.pendaftar.findUnique({
      where: { id: params.id },
      include: {
        tahun_ajaran: {
          select: {
            id: true,
            nama: true,
            tahun_mulai: true,
            tahun_selesai: true,
            biaya_pendaftaran: true,
          },
        },
        orang_tua: true,
        dokumen: true,
        pembayaran: true,
        jadwal_ujian: true,
        nilai_ujian: true,
        pengumuman: true,
        rapor: true,
        prestasi: true,
        kesehatan: true,
        asrama: true,
      },
    });

    if (!pendaftar) {
      return NextResponse.json(
        { error: "Pendaftar not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: pendaftar });
  } catch (error) {
    console.error("Error in admin pendaftar detail API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH: Update pendaftar status
export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check custom role
    const allowedRoles = ["admin", "admin_super", "admin_berkas", "admin_keuangan", "penguji"];
    if (!allowedRoles.includes(session.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get request body
    const body = await request.json();
    const { status_proses } = body;

    if (!status_proses) {
      return NextResponse.json(
        { error: "status_proses is required" },
        { status: 400 }
      );
    }

    // Update pendaftar status
    const data = await prisma.pendaftar.update({
      where: { id: params.id },
      data: {
        status_pendaftaran: status_proses,
        updated_at: new Date(),
      },
    });

    // Logging audit action
    logAdminAction({
      action: status_proses === 'draft' ? 'FORCE_UNLOCK_FORM' : 'VERIFY_DOCUMENT',
      adminId: session.id || 'system',
      adminName: session.full_name || session.name || 'Admin',
      targetId: params.id,
      targetName: data.nama_lengkap,
      details: { previous_status: 'unknown', new_status: status_proses }
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error in admin pendaftar update API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
