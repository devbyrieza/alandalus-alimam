import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  generateSuratKesehatan,
  generateSuratPernyataan,
  generatePaktaIntegritas,
  PendaftarPdfData,
} from "@/lib/utils/pdf-generator";
import { jsPDF } from "jspdf";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("app_session");

    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const session = JSON.parse(sessionCookie.value);
    
    // Admin has access to download without fetching full pendaftar by default
    let pendaftarId = session.id;
    if (session.role === "admin") {
      // Allow admin to specify pendaftar_id query param
      const searchParams = request.nextUrl.searchParams;
      const qId = searchParams.get("pendaftar_id");
      if (qId) {
        pendaftarId = qId;
      } else {
        return NextResponse.json({ success: false, error: "Pendaftar ID required for admin" }, { status: 400 });
      }
    }

    const pendaftar = await prisma.pendaftar.findUnique({
      where: { id: pendaftarId },
      include: {
        tahun_ajaran: true,
      },
    });

    if (!pendaftar) {
      return NextResponse.json(
        { success: false, error: "Pendaftar tidak ditemukan" },
        { status: 404 }
      );
    }

    const pdfData: PendaftarPdfData = {
      nomor_pendaftaran: pendaftar.nomor_pendaftaran,
      nama_lengkap: pendaftar.nama_lengkap,
      nik: pendaftar.nik || "-",
      jenjang: pendaftar.jenjang,
      tempat_lahir: pendaftar.tempat_lahir || "",
      tanggal_lahir: pendaftar.tanggal_lahir
        ? new Date(pendaftar.tanggal_lahir).toLocaleDateString("id-ID")
        : "",
      alamat: pendaftar.alamat || "",
      no_hp: pendaftar.no_hp || "",
      tahun_ajaran: pendaftar.tahun_ajaran?.nama || "2026/2027",
    };

    // Note: The generate functions from pdf-generator.ts save directly to the browser
    // when run client-side. We need a way to serve it server-side.
    // Instead of completely rewriting pdf-generator.ts, we'll patch the save method
    // on the jsPDF prototype temporarily.

    let pdfOutput: ArrayBuffer | null = null;
    let filename = `Template_${type}_${pendaftar.nomor_pendaftaran}.pdf`;

    // Hack: Intercept the doc.save call inside the utility function
    const originalSave = jsPDF.prototype.save;
    // @ts-ignore
    jsPDF.prototype.save = function(name: string) {
        filename = name || filename;
        pdfOutput = this.output('arraybuffer');
        return this;
    };

    try {
        if (type === "surat-kesehatan") {
            await generateSuratKesehatan(pdfData);
        } else if (type === "surat-pernyataan") {
            await generateSuratPernyataan(pdfData);
        } else if (type === "pakta-integritas") {
            await generatePaktaIntegritas(pdfData);
        } else {
            return NextResponse.json(
                { success: false, error: "Tipe dokumen tidak valid" },
                { status: 400 }
            );
        }
    } finally {
        // Restore original function
        jsPDF.prototype.save = originalSave;
    }
    
    if (!pdfOutput) {
         return NextResponse.json(
            { success: false, error: "Gagal men-generate PDF" },
            { status: 500 }
        );
    }

    // Return the PDF buffer directly
    return new NextResponse(pdfOutput, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });

  } catch (error: any) {
    console.error("Error generating PDF template:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan sistem saat generate PDF" },
      { status: 500 }
    );
  }
}
