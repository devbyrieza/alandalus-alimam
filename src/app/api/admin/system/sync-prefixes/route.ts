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
        data_lengkap: true,
      },
      orderBy: { nomor_pendaftaran: "asc" },
    });

    const updates: Array<{ id: string; name: string; from: string; to: string }> = [];
    const reservedNomor = new Set<string>();

    for (const item of list) {
      let targetPrefix = "MTI";
      const normJ = (item.jenjang || "").toUpperCase();
      if (normJ.includes("IL")) targetPrefix = "ILI";
      else if (normJ.includes("MA") || normJ.includes("SMA")) targetPrefix = "MAI";
      else targetPrefix = "MTI";

      let newNomor = item.nomor_pendaftaran;
      if (item.nomor_pendaftaran && /^(MTA|ILA|MAA|SMA|SPA)/.test(item.nomor_pendaftaran)) {
        const tahun = item.nomor_pendaftaran.slice(3, 5);
        const candidate = `${targetPrefix}${item.nomor_pendaftaran.slice(3)}`;

        const conflict = await prisma.pendaftar.findUnique({ where: { nomor_pendaftaran: candidate } });
        if ((!conflict || conflict.id === item.id) && !reservedNomor.has(candidate)) {
          newNomor = candidate;
        } else {
          const existingList = await prisma.pendaftar.findMany({
            where: { nomor_pendaftaran: { startsWith: `${targetPrefix}${tahun}` } },
            select: { nomor_pendaftaran: true },
          });
          const usedSeqs = new Set(
            existingList
              .map((p) => parseInt(p.nomor_pendaftaran.slice(5), 10))
              .filter((n) => !isNaN(n))
          );
          let nextSeq = 1;
          while (
            usedSeqs.has(nextSeq) ||
            reservedNomor.has(`${targetPrefix}${tahun}${String(nextSeq).padStart(5, "0")}`)
          ) {
            nextSeq++;
          }
          newNomor = `${targetPrefix}${tahun}${String(nextSeq).padStart(5, "0")}`;
        }
        reservedNomor.add(newNomor);
      }

      const updatePayload: any = {};
      if (newNomor !== item.nomor_pendaftaran) {
        updatePayload.nomor_pendaftaran = newNomor;
        const dl = (item.data_lengkap as any) || {};
        dl.legacy_nomor_pendaftaran = item.nomor_pendaftaran;
        updatePayload.data_lengkap = dl;
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
