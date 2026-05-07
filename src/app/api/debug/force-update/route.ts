import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { recalculateNilaiUjian } from "@/lib/scoring";

export async function GET() {
  try {
    console.log("🚀 Force Update: Starting for Hanif and Miizan...");
    
    const updates = [
      {
        name: "MUHAMMAD HANIF ASH SHIDDIQ",
        scores: {
          score_akademik: 75,
          score_quran: 88.5,
          score_kepribadian: 94,
          score_kesiapan: 68,
          nilai_wawancara_santri: 100,
          nilai_wawancara_ortu: 95,
          detail_quran: { rekomendasi: "Sangat Layak" },
          detail_cawalsan: { q1: "A", q2: "A", q3: "A", q4: "A", q5: "A", q6: "A", q7: "A", q8: "A", q9: "A", q10: "A", q11: "A", q12: "B" }
        },
        status: "accepted"
      },
      {
        name: "MIIZAN ALGHIFARY DIZLILAR",
        scores: {
          score_akademik: 70,
          score_quran: 61,
          score_kepribadian: 50,
          score_kesiapan: 62,
          nilai_wawancara_santri: 100,
          nilai_wawancara_ortu: 85,
          detail_quran: { rekomendasi: "Layak" },
          detail_cawalsan: { q1: "A", q2: "A", q3: "A", q4: "A", q5: "A", q6: "A", q7: "A", q8: "A", q9: "A", q10: "B", q11: "C", q12: "A" }
        },
        status: "accepted"
      }
    ];

    const results = [];
    for (const update of updates) {
      const pendaftar = await prisma.pendaftar.findFirst({
        where: { nama_lengkap: { contains: update.name, mode: "insensitive" } }
      });

      if (!pendaftar) {
        results.push({ name: update.name, status: "not_found" });
        continue;
      }

      // 1. Create/Update NilaiUjian
      await prisma.nilaiUjian.upsert({
        where: { pendaftar_id: pendaftar.id },
        update: { ...update.scores, updated_at: new Date() },
        create: { ...update.scores, pendaftar_id: pendaftar.id, created_at: new Date(), updated_at: new Date() }
      });

      // 2. Force Status Update
      await prisma.pendaftar.update({
        where: { id: pendaftar.id },
        data: { status_pendaftaran: update.status, updated_at: new Date() }
      });

      // 3. Sync Pengumuman
      await prisma.pengumuman.upsert({
        where: { pendaftar_id: pendaftar.id },
        update: { status_kelulusan: "Lulus", is_published: true, published_at: new Date() },
        create: { 
          pendaftar_id: pendaftar.id, 
          status_kelulusan: "Lulus", 
          is_published: true, 
          published_at: new Date(),
          tahun_ajaran_id: pendaftar.tahun_ajaran_id
        }
      });

      // 4. Run recalculate to finalize (this will also trigger the self-healing logic later)
      await recalculateNilaiUjian(pendaftar.id);

      results.push({ name: pendaftar.nama_lengkap, status: "success" });
    }

    return NextResponse.json({ 
      message: "Force update completed",
      results 
    });
  } catch (error: any) {
    console.error("Force update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
