import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

async function checkAdmin() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("app_session");
  if (!sessionCookie) return null;
  try {
    const session = JSON.parse(sessionCookie.value);
    if (["admin_super", "admin", "admin_berkas", "admin_keuangan", "penguji"].includes(session.role)) {
      return session;
    }
  } catch {}
  return null;
}

export async function GET() {
  try {
    const session = await checkAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch pendaftar data with status, jenjang, and location
    const pendaftarData = await prisma.pendaftar.findMany({
      select: {
        id: true,
        status_pendaftaran: true,
        jenjang: true,
        provinsi: true,
        jenis_kelamin: true,
      },
    });

    // Fetch pembayaran data
    const pembayaranData = await prisma.pembayaran.findMany({
      select: {
        pendaftar_id: true,
        status_pembayaran: true,
      },
    });

    // Calculate pendaftar status counts
    const total_pendaftar = pendaftarData.length;
    const statusCounts: Record<string, number> = {};
    const jenjangCounts: Record<string, { total: number; diterima: number }> = {};
    const provinsiCounts: Record<string, number> = {};
    const genderCounts: Record<string, number> = { "Laki-laki": 0, "Perempuan": 0 };

    pendaftarData.forEach((item) => {
      const status = item.status_pendaftaran;
      const jenjang = item.jenjang || "Unknown";
      const provinsi = item.provinsi || "Tidak Diketahui";
      const gender = item.jenis_kelamin || "Unknown";

      // Status counts
      statusCounts[status] = (statusCounts[status] || 0) + 1;

      // Jenjang counts
      if (!jenjangCounts[jenjang]) {
        jenjangCounts[jenjang] = { total: 0, diterima: 0 };
      }
      jenjangCounts[jenjang].total += 1;
      if (status === "accepted") {
        jenjangCounts[jenjang].diterima += 1;
      }

      // Provinsi counts
      provinsiCounts[provinsi] = (provinsiCounts[provinsi] || 0) + 1;

      // Gender counts
      if (gender === "Laki-laki" || gender === "Perempuan") {
        genderCounts[gender] += 1;
      }
    });

    // Calculate pembayaran status counts
    const pembayaranCounts: Record<string, number> = {};
    const pendaftarWithPayment = new Set<string>();
    pembayaranData.forEach((item) => {
      const status = item.status_pembayaran;
      pembayaranCounts[status] = (pembayaranCounts[status] || 0) + 1;
      pendaftarWithPayment.add(item.pendaftar_id);
    });

    // Calculate pendaftar without any payment record
    const pendaftarWithoutPayment = pendaftarData.filter(
      (p) => !pendaftarWithPayment.has(p.id)
    ).length;

    // Comprehensive stats mapping
    const stats = {
      // Total
      total_pendaftar,

      // === PEMBAYARAN ===
      belum_bayar: statusCounts.draft || 0,
      menunggu_verifikasi_pembayaran: statusCounts.payment_verification || 0,
      sudah_bayar:
        (statusCounts.verified || 0) +
        (statusCounts.scheduled || 0) +
        (statusCounts.accepted || 0),
      pembayaran_ditolak: statusCounts.rejected || 0,

      // === DATA LENGKAP ===
      belum_isi_data: statusCounts.verified || 0,
      sudah_isi_data:
        (statusCounts.scheduled || 0) +
        (statusCounts.accepted || 0),

      // === DOKUMEN ===
      belum_upload_dokumen: 0,
      menunggu_verifikasi_dokumen: 0,
      dokumen_terverifikasi:
        (statusCounts.scheduled || 0) +
        (statusCounts.accepted || 0),
      dokumen_ditolak: 0,

      // === UJIAN & WAWANCARA ===
      terjadwal_ujian: statusCounts.scheduled || 0,
      belum_ujian: statusCounts.scheduled || 0,
      sudah_ujian: statusCounts.accepted || 0,
      hasil_ujian: statusCounts.accepted || 0,

      // === PENERIMAAN ===
      diterima: statusCounts.accepted || 0,
      belum_daftar_ulang: statusCounts.accepted || 0,
      sudah_daftar_ulang: 0,

      // === LEGACY (for backward compatibility) ===
      pending_verification: 0,
      verified: statusCounts.verified || 0,
      rejected: statusCounts.rejected || 0,
      pending_payment:
        (statusCounts.draft || 0) + (statusCounts.payment_verification || 0),
      paid: statusCounts.verified || 0,
      scheduled_exams: statusCounts.scheduled || 0,
      announced: 0,
      accepted: statusCounts.accepted || 0,
      enrolled: 0,

      // === STATISTIK PER JENJANG ===
      stats_per_jenjang: Object.entries(jenjangCounts).map(([jenjang, data]) => ({
        jenjang,
        pendaftar: data.total,
        diterima: data.diterima,
      })),

      // === STATISTIK PER PROVINSI (Top 10) ===
      stats_per_provinsi: Object.entries(provinsiCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([provinsi, jumlah]) => ({
          provinsi,
          jumlah,
        })),

      // === STATISTIK GENDER ===
      stats_gender: genderCounts,

      // === PIE CHART DATA ===
      pie_chart_status: {
        diterima: statusCounts.accepted || 0,
        menunggu: (statusCounts.scheduled || 0) + (statusCounts.verified || 0),
        proses: (statusCounts.draft || 0) + (statusCounts.payment_verification || 0),
        ditolak: statusCounts.rejected || 0,
      },

      // Raw counts for debugging
      _raw_status_counts: statusCounts,
      _raw_pembayaran_counts: pembayaranCounts,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error in admin stats API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
