import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { qr_code } = await req.json();

    if (!qr_code) {
      return NextResponse.json({ success: false, message: "QR Code tidak boleh kosong" }, { status: 400 });
    }

    // Cari pendaftar berdasarkan nomor pendaftaran (yang tersimpan di QR Code)
    const pendaftar = await prisma.pendaftar.findUnique({
      where: { nomor_pendaftaran: qr_code },
      include: {
        DompetSantri: true,
      }
    });

    if (!pendaftar) {
      return NextResponse.json({ success: false, message: "Santri tidak ditemukan" }, { status: 404 });
    }

    if (!pendaftar.DompetSantri) {
      // Jika dompet belum dibuat, buatkan secara otomatis
      const dompet = await prisma.dompetSantri.create({
        data: {
          pendaftar_id: pendaftar.id,
          qr_code_string: pendaftar.nomor_pendaftaran,
          saldo: 0,
        }
      });
      pendaftar.DompetSantri = dompet;
    }

    if (pendaftar.DompetSantri.status !== 'AKTIF') {
       return NextResponse.json({ success: false, message: `Kartu diblokir atau tidak aktif (Status: ${pendaftar.DompetSantri.status})` }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: pendaftar.id,
        nomor_pendaftaran: pendaftar.nomor_pendaftaran,
        nama_lengkap: pendaftar.nama_lengkap,
        jenjang: pendaftar.jenjang,
        dompet: {
          id: pendaftar.DompetSantri.id,
          saldo: pendaftar.DompetSantri.saldo,
          batas_jajan_harian: pendaftar.DompetSantri.batas_jajan_harian,
        }
      }
    });

  } catch (error: any) {
    console.error("Error scanning QR:", error);
    return NextResponse.json({ success: false, message: "Terjadi kesalahan internal server" }, { status: 500 });
  }
}
