import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateNomorPendaftaran } from "@/lib/utils/nomor-pendaftaran";
import { enqueueWhatsapp, buildMessageRegistrationSuccess } from "@/lib/whatsapp-queue";
import crypto from "crypto";

/**
 * ─── REGISTER API: VERIFY OTP ───
 * Langkah terakhir pendaftaran: Memvalidasi kode OTP 
 * dan membuat akun santri secara resmi di database.
 */

const hashOTP = (otp: string) => crypto.createHash("sha256").update(otp).digest("hex");

export async function POST(request: NextRequest) {
  try {
    const { no_hp, otp_code } = await request.json();
    const hashedOTP = hashOTP(otp_code);

    // 1. Validasi Kode OTP & Masa Berlaku
    const otpRecord = await prisma.otpVerification.findFirst({
      where: {
        phone: no_hp,
        otp_hash: hashedOTP,
        expires_at: { gt: new Date() },
      },
    });

    if (!otpRecord) return NextResponse.json({ success: false, error: "Kode OTP salah atau sudah kadaluarsa" }, { status: 400 });

    const regData = (otpRecord.registration_data as any) || {};

    // 2. Ambil Tahun Ajaran Aktif (Fallback Logic)
    const activeTA = await prisma.tahunAjaran.findFirst({ where: { is_active: true } }) 
                  || await prisma.tahunAjaran.findFirst({ orderBy: { created_at: "desc" } });

    if (!activeTA) return NextResponse.json({ success: false, error: "Sistem belum siap: Tahun Ajaran tidak ditemukan" }, { status: 500 });

    // 3. Generate Nomor Pendaftaran Unik
    const nomorPendaftaran = await generateNomorPendaftaran(regData.jenjang, regData.jenis_kelamin);

    // 4. PEMBUATAN AKUN (Profile & Pendaftar)
    const profileId = crypto.randomUUID();
    
    // Gunakan Transaction agar jika salah satu gagal, semua dibatalkan (Data Integrity)
    await prisma.$transaction([
      // A. Buat Profile untuk Login
      prisma.profile.create({
        data: { id: profileId, full_name: regData.nama_lengkap, phone: no_hp, role: "pendaftar" },
      }),
      // B. Buat Data Pendaftaran Santri
      prisma.pendaftar.create({
        data: {
          nik: regData.nik,
          nama_lengkap: regData.nama_lengkap,
          tanggal_lahir: regData.tanggal_lahir ? new Date(regData.tanggal_lahir) : undefined,
          jenis_kelamin: regData.jenis_kelamin,
          jenjang: regData.jenjang,
          no_hp: no_hp,
          email: regData.email || "",
          status_pendaftaran: "draft",
          user_id: profileId,
          tahun_ajaran_id: activeTA.id,
          nomor_pendaftaran: nomorPendaftaran,
        },
      }),
      // C. Hapus OTP agar tidak bisa digunakan lagi
      prisma.otpVerification.delete({ where: { id: otpRecord.id } }),
    ]);

    // 5. Kirim Notifikasi Sukses via WhatsApp Queue
    await enqueueWhatsapp({
      pendaftarId: profileId, // Dummy link to profile
      phone: no_hp,
      jenisNotif: "registration_success",
      messageContent: buildMessageRegistrationSuccess(regData.nama_lengkap, nomorPendaftaran, regData.jenjang),
    }).catch(e => console.error("WA Queue Error:", e.message));

    return NextResponse.json({
      success: true,
      message: "Pendaftaran Berhasil!",
      data: { nomor_pendaftaran: nomorPendaftaran }
    });

  } catch (error: any) {
    console.error("❌ VERIFY_OTP_ERROR:", error.message);
    return NextResponse.json({ success: false, error: "Gagal memverifikasi pendaftaran" }, { status: 500 });
  }
}
