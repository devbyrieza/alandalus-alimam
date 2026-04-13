import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/session";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session || !["admin", "admin_super", "admin_berkas"].includes(session.role)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Aggregate Santri by Region
        const santriRaw = await prisma.pendaftar.groupBy({
            by: ["provinsi", "kabupaten"],
            _count: {
                id: true,
            },
            where: {
                provinsi: { not: null },
            },
        });

        // Aggregate Wali/OrangTua by Region
        // We fetch all parents and join with pendaftar to get fallback address
        const allFamilyData = await prisma.orangTua.findMany({
            include: {
                pendaftar: {
                    select: {
                        provinsi: true,
                        kabupaten: true
                    }
                }
            }
        });

        const waliGroups: any = {};
        allFamilyData.forEach((ot) => {
            // Priority: Wali Address > Pendaftar Address (Fallback)
            const prov = ot.provinsi_wali || ot.pendaftar?.provinsi || "Lainnya";
            const kab = ot.kabupaten_wali || ot.pendaftar?.kabupaten || "Lainnya";
            
            if (prov === "Lainnya" && kab === "Lainnya") return;

            if (!waliGroups[prov]) {
                waliGroups[prov] = {
                    total: 0,
                    cities: {} as Record<string, number>,
                };
            }

            waliGroups[prov].total += 1;
            waliGroups[prov].cities[kab] = (waliGroups[prov].cities[kab] || 0) + 1;
        });

        // Format waliGroups to match the expected format
        const formattedWaliData: any = {};
        Object.keys(waliGroups).forEach(prov => {
            formattedWaliData[prov] = {
                total: waliGroups[prov].total,
                cities: Object.entries(waliGroups[prov].cities).map(([name, count]) => ({
                    name,
                    count
                }))
            };
        });

        const formatSantriData = (raw: any[], provField: string, kabField: string) => {
            const grouped: any = {};
            raw.forEach((item) => {
                const prov = item[provField] || "Lainnya";
                const kab = item[kabField] || "Lainnya";
                const count = item._count.id;

                if (!grouped[prov]) {
                    grouped[prov] = {
                        total: 0,
                        cities: [],
                    };
                }

                grouped[prov].total += count;
                grouped[prov].cities.push({
                    name: kab,
                    count: count,
                });
            });
            return grouped;
        };

        const santriData = formatSantriData(santriRaw, "provinsi", "kabupaten");

        return NextResponse.json({
            success: true,
            santri: santriData,
            wali: formattedWaliData,
        });

        return NextResponse.json({
            success: true,
            santri: santriData,
            wali: waliData,
        });
    } catch (error: any) {
        console.error("Statistik error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
