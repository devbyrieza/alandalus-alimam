import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// The local Al-Imam DB is the default Prisma client
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get("key") !== "bismillah2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Connect to Ulul Albaab DB directly
  const ululUrl = "postgresql://coolify:FfJ8to6XLZ1LooULnKW7ULXDbIfQn3KxMUPAUXz15Q0=@coolify-db:5432/ppdb_ulul";
  const ululDb = new PrismaClient({ datasources: { db: { url: ululUrl } } });

  let results = {
    putra_alimam_to_ulul: { success: 0, failed: 0, errors: [] as string[] },
    putri_ulul_to_alimam: { success: 0, failed: 0, errors: [] as string[] }
  };

  try {
    // 1. Get active TAs
    const activeTaAlimam = await prisma.tahunAjaran.findFirst({ where: { is_active: true } });
    const activeTaUlul = await ululDb.tahunAjaran.findFirst({ where: { is_active: true } });

    if (!activeTaAlimam || !activeTaUlul) {
      return NextResponse.json({ error: "Tahun Ajaran aktif tidak ditemukan di salah satu database." });
    }

    // FIX SCHEMA: Ensure 'nis' column exists in both DBs before proceeding
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "pendaftar" ADD COLUMN IF NOT EXISTS "nis" VARCHAR(50) UNIQUE;`);
      await ululDb.$executeRawUnsafe(`ALTER TABLE "pendaftar" ADD COLUMN IF NOT EXISTS "nis" VARCHAR(50) UNIQUE;`);
      await prisma.$executeRawUnsafe(`ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "username" VARCHAR(255) UNIQUE;`);
      await ululDb.$executeRawUnsafe(`ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "username" VARCHAR(255) UNIQUE;`);
    } catch (e: any) {
      return NextResponse.json({ error: "Failed to alter schema: " + e.message, details: e });
    }

    // ==============================================================
    // MIGRASI 1: PUTRA (L) dari Al-Imam ke Ulul Albaab
    // ==============================================================
    const putraAlimam = await prisma.pendaftar.findMany({
      where: { jenis_kelamin: "L" },
      include: {
        orang_tua: true, hasil_seleksi: true, rapor: true, prestasi: true,
        kesehatan: true, asrama: true, pengumuman: true, pembayaran: true, user: true
      }
    });

    for (const p of putraAlimam) {
      try {
        const existing = await ululDb.pendaftar.findUnique({ where: { nik: p.nik } });
        if (existing) continue;

        if (p.user) {
          const uExists = await ululDb.profile.findUnique({ where: { id: p.user.id } });
          if (!uExists) {
            await ululDb.profile.create({ data: p.user });
          }
        }

        const { orang_tua, hasil_seleksi, rapor, prestasi, kesehatan, asrama, pengumuman, pembayaran, user, ...pData } = p;
        pData.tahun_ajaran_id = activeTaUlul.id;
        
        await ululDb.pendaftar.create({ data: pData });
        
        if (orang_tua) await ululDb.orangTua.create({ data: orang_tua });
        if (hasil_seleksi) await ululDb.hasilSeleksi.create({ data: hasil_seleksi });
        for (const r of rapor) await ululDb.dataRapor.create({ data: r });
        for (const pr of prestasi) await ululDb.dataPrestasi.create({ data: pr });
        if (kesehatan) await ululDb.dataKesehatan.create({ data: kesehatan });
        if (asrama) await ululDb.dataAsrama.create({ data: asrama });
        if (pengumuman) await ululDb.pengumuman.create({ data: pengumuman });
        for (const b of pembayaran) await ululDb.pembayaran.create({ data: b });

        // Jika sukses, hapus dari Al-Imam
        await prisma.pendaftar.delete({ where: { id: p.id } });
        results.putra_alimam_to_ulul.success++;
      } catch (e: any) {
        results.putra_alimam_to_ulul.failed++;
        results.putra_alimam_to_ulul.errors.push(`${p.nama_lengkap}: ${e.message}`);
      }
    }

    // ==============================================================
    // MIGRASI 2: PUTRI (P) dari Ulul Albaab ke Al-Imam
    // ==============================================================
    const putriUlul = await ululDb.pendaftar.findMany({
      where: { jenis_kelamin: "P" },
      include: {
        orang_tua: true, hasil_seleksi: true, rapor: true, prestasi: true,
        kesehatan: true, asrama: true, pengumuman: true, pembayaran: true, user: true
      }
    });

    for (const p of putriUlul) {
      try {
        const existing = await prisma.pendaftar.findUnique({ where: { nik: p.nik } });
        if (existing) continue;

        if (p.user) {
          const uExists = await prisma.profile.findUnique({ where: { id: p.user.id } });
          if (!uExists) {
            await prisma.profile.create({ data: p.user });
          }
        }

        const { orang_tua, hasil_seleksi, rapor, prestasi, kesehatan, asrama, pengumuman, pembayaran, user, ...pData } = p;
        pData.tahun_ajaran_id = activeTaAlimam.id;
        
        await prisma.pendaftar.create({ data: pData });
        
        if (orang_tua) await prisma.orangTua.create({ data: orang_tua });
        if (hasil_seleksi) await prisma.hasilSeleksi.create({ data: hasil_seleksi });
        for (const r of rapor) await prisma.dataRapor.create({ data: r });
        for (const pr of prestasi) await prisma.dataPrestasi.create({ data: pr });
        if (kesehatan) await prisma.dataKesehatan.create({ data: kesehatan });
        if (asrama) await prisma.dataAsrama.create({ data: asrama });
        if (pengumuman) await prisma.pengumuman.create({ data: pengumuman });
        for (const b of pembayaran) await prisma.pembayaran.create({ data: b });

        // Jika sukses, hapus dari Ulul Albaab
        await ululDb.pendaftar.delete({ where: { id: p.id } });
        results.putri_ulul_to_alimam.success++;
      } catch (e: any) {
        results.putri_ulul_to_alimam.failed++;
        results.putri_ulul_to_alimam.errors.push(`${p.nama_lengkap}: ${e.message}`);
      }
    }

    await ululDb.$disconnect();
    return NextResponse.json({ message: "Migrasi Selesai", results });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
