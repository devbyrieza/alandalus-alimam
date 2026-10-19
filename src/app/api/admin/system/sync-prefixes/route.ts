import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * Endpoint Sinkronisasi Awalan Nomor Pendaftaran Al-Imam (Khusus Putri)
 * Standar Prefix:
 * - MTs Putri -> MTI
 * - IL Putri  -> ILI
 * - MA Putri  -> MAI
 */
export async function GET(request: NextRequest) {
  try {
    const list = await prisma.pendaftar.findMany({
      where: {
        OR: [
          { nomor_pendaftaran: { startsWith: "MTA" } },
          { nomor_pendaftaran: { startsWith: "ILA" } },
          { nomor_pendaftaran: { startsWith: "MAA" } },
          { nomor_pendaftaran: { startsWith: "SMA" } },
          { jenis_kelamin: "L" },
        ],
      },
      select: {
        id: true,
        nomor_pendaftaran: true,
        nama_lengkap: true,
        jenjang: true,
        jenis_kelamin: true,
      },
    });

    const updates: Array<{ id: string; name: string; from: string; to: string }> = [];

    for (const item of list) {
      let targetPrefix = "MTI";
      const normJ = (item.jenjang || "").toUpperCase();
      if (normJ.includes("IL")) targetPrefix = "ILI";
      else if (normJ.includes("MA") || normJ.includes("SMA")) targetPrefix = "MAI";
      else targetPrefix = "MTI";

      let newNomor = item.nomor_pendaftaran;
      if (item.nomor_pendaftaran && /^(MTA|ILA|MAA|SMA)/.test(item.nomor_pendaftaran)) {
        newNomor = `${targetPrefix}${item.nomor_pendaftaran.slice(3)}`;
      }

      const updatePayload: any = {};
      if (newNomor !== item.nomor_pendaftaran) {
        const conflict = await prisma.pendaftar.findUnique({ where: { nomor_pendaftaran: newNomor } });
        if (!conflict) {
          updatePayload.nomor_pendaftaran = newNomor;
        }
      }
      if (item.jenis_kelamin !== "P") {
        updatePayload.jenis_kelamin = "P";
      }

      if (Object.keys(updatePayload).length > 0) {
        await prisma.pendaftar.update({
          where: { id: item.id },
          data: updatePayload,
        });
        updates.push({
          id: item.id,
          name: item.nama_lengkap,
          from: item.nomor_pendaftaran,
          to: newNomor,
        });
      }
    }

    return NextResponse.json({
      success: true,
      institution: "Al-Imam (Khusus Putri)",
      message: `Berhasil menyinkronkan ${updates.length} data pendaftar ke format Putri (MTI, ILI, MAI)`,
      updated_count: updates.length,
      updates,
    });
  } catch (error: any) {
    console.error("SYNC_PREFIXES_ALIMAM_ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
