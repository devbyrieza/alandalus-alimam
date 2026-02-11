import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { saveFileLocal } from "@/lib/storage/local";

// Konfigurasi upload bukti pembayaran
const UPLOAD_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ["image/jpeg", "image/png", "application/pdf"],
};

// Helper function untuk format ukuran file
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export async function POST(request: NextRequest) {
  try {
    // 1. Validasi session
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("app_session");

    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: "Sesi tidak ditemukan. Silakan login kembali." },
        { status: 401 }
      );
    }

    let session;
    try {
      session = JSON.parse(sessionCookie.value);
    } catch {
      return NextResponse.json(
        { success: false, error: "Sesi tidak valid" },
        { status: 401 }
      );
    }

    if (session.role !== "pendaftar") {
      return NextResponse.json(
        { success: false, error: "Akses tidak diizinkan" },
        { status: 403 }
      );
    }

    // 2. Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File bukti transfer wajib diupload" },
        { status: 400 }
      );
    }

    // 3. Validasi ukuran file
    if (file.size > UPLOAD_CONFIG.maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: `Ukuran file terlalu besar! Maksimal ${formatFileSize(UPLOAD_CONFIG.maxSize)}`,
        },
        { status: 400 }
      );
    }

    // 4. Validasi tipe file
    if (!UPLOAD_CONFIG.allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Format file tidak didukung! Gunakan JPG, PNG, atau PDF",
        },
        { status: 400 }
      );
    }

    // 5. Ambil data pendaftar & tahun ajaran
    const pendaftar = await prisma.pendaftar.findUnique({
      where: { id: session.id },
      include: {
        tahun_ajaran: true,
      },
    });

    if (!pendaftar) {
      return NextResponse.json(
        { success: false, error: "Data pendaftar tidak ditemukan" },
        { status: 404 }
      );
    }

    // 6. Cek pembayaran verified
    const existingVerified = await prisma.pembayaran.findFirst({
      where: {
        pendaftar_id: session.id,
        status_pembayaran: "verified",
      },
    });

    if (existingVerified) {
      return NextResponse.json(
        { success: false, error: "Pembayaran Anda sudah terverifikasi sebelumnya" },
        { status: 400 }
      );
    }

    // 7. Cek pembayaran pending/rejected
    const existingPending = await prisma.pembayaran.findFirst({
      where: {
        pendaftar_id: session.id,
        status_pembayaran: { in: ["pending", "rejected"] },
        metode_pembayaran: "manual",
      },
    });

    // 9. Generate nama file & Save Local
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "bin";
    const fileName = `bukti-transfer-${timestamp}.${fileExtension}`;

    // Save to storage_data/bukti-pembayaran/{pendaftar_id}/...
    const filePath = await saveFileLocal(file, 'bukti-pembayaran', session.id, fileName);

    // 12. Simpan atau update record pembayaran
    const biaya = Number(pendaftar.tahun_ajaran.biaya_pendaftaran);

    let pembayaranResult;
    if (existingPending) {
      pembayaranResult = await prisma.pembayaran.update({
        where: { id: existingPending.id },
        data: {
          jumlah: biaya,
          bukti_transfer_path: filePath,
          bukti_transfer_filename: file.name,
          status_pembayaran: "pending",
          catatan_verifikasi: null,
          updated_at: new Date(),
        }
      });
    } else {
      pembayaranResult = await prisma.pembayaran.create({
        data: {
          pendaftar_id: session.id,
          tahun_ajaran_id: pendaftar.tahun_ajaran_id,
          metode_pembayaran: "manual",
          jumlah: biaya,
          bukti_transfer_path: filePath,
          bukti_transfer_filename: file.name,
          status_pembayaran: "pending",
        }
      });
    }

    // 13. Update status pendaftar
    const allowedStatusForUpload = ["draft", "waiting_payment", "rejected"];
    if (allowedStatusForUpload.includes(pendaftar.status_pendaftaran)) {
      await prisma.pendaftar.update({
        where: { id: session.id },
        data: {
          status_pendaftaran: "payment_verification",
          updated_at: new Date(),
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: "Bukti pembayaran berhasil diupload! Tim kami akan memverifikasi dalam 1x24 jam.",
      data: {
        pembayaran_id: pembayaranResult.id,
        file_path: filePath,
        file_name: file.name,
        file_size: file.size,
        status: "pending",
      },
    });

  } catch (error: any) {
    console.error("Error in POST /api/pembayaran/manual/upload:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan saat mengupload bukti pembayaran" },
      { status: 500 }
    );
  }
}
