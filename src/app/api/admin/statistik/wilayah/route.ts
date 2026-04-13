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
        const ayahGroups: any = {};
        const ibuGroups: any = {};

        allFamilyData.forEach((ot) => {
            // Priority: Wali Address > Pendaftar Address (Fallback)
            const santriProv = ot.pendaftar?.provinsi || "Lainnya";
            const santriKab = ot.pendaftar?.kabupaten || "Lainnya";

            const pWali = ot.provinsi_wali || santriProv;
            const kWali = ot.kabupaten_wali || santriKab;
            
            // For Ayah & Ibu, we currently don't have provincial fields, 
            // so we fallback to Santri's region.
            const pAyah = santriProv;
            const kAyah = santriKab;

            const pIbu = santriProv;
            const kIbu = santriKab;

            const processGroup = (group: any, prov: string, kab: string) => {
                if (prov === "Lainnya" && kab === "Lainnya") return;
                if (!group[prov]) {
                    group[prov] = { total: 0, cities: {} as Record<string, number> };
                }
                group[prov].total += 1;
                group[prov].cities[kab] = (group[prov].cities[kab] || 0) + 1;
            };

            processGroup(waliGroups, pWali, kWali);
            processGroup(ayahGroups, pAyah, kAyah);
            processGroup(ibuGroups, pIbu, kIbu);
        });

        const formatGroupData = (groups: any) => {
            const formatted: any = {};
            Object.keys(groups).forEach(prov => {
                formatted[prov] = {
                    total: groups[prov].total,
                    cities: Object.entries(groups[prov].cities).map(([name, count]) => ({
                        name,
                        count
                    }))
                };
            });
            return formatted;
        };

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

        return NextResponse.json({
            success: true,
            santri: formatSantriData(santriRaw, "provinsi", "kabupaten"),
            ayah: formatGroupData(ayahGroups),
            ibu: formatGroupData(ibuGroups),
            wali: formatGroupData(waliGroups),
        });
    } catch (error: any) {
        console.error("Statistik error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
