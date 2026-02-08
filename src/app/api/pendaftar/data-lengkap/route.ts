import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/pendaftar/data-lengkap
 * Mengambil data lengkap pendaftar yang sedang login
 */
export async function GET() {
  try {
    // 1. Validasi session
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("app_session");

    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: "Sesi tidak ditemukan" },
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

    const pendaftarId = session.id;

    // 2. Ambil data pendaftar
    const pendaftar = await prisma.pendaftar.findUnique({
      where: { id: pendaftarId },
    });

    if (!pendaftar) {
      return NextResponse.json(
        { success: false, error: "Data pendaftar tidak ditemukan" },
        { status: 404 }
      );
    }

    // 3. Parse data_lengkap jika ada (JSON column)
    let dataLengkap: any = null;
    if (pendaftar.data_lengkap) {
      // Prisma returns JSON object directly for Json fields, no need to parse if string
      // But if it was stored as stringified JSON manually, we might need to check type
      dataLengkap = pendaftar.data_lengkap;
    }

    // 4. Merge data dari kolom utama dan data_lengkap
    const response = {
      santri: {
        nik: pendaftar.nik || "",
        nama_lengkap: pendaftar.nama_lengkap || "",
        tempat_lahir: dataLengkap?.santri?.tempat_lahir || "",
        tanggal_lahir: pendaftar.tanggal_lahir ? new Date(pendaftar.tanggal_lahir).toISOString().split('T')[0] : "",
        jenis_kelamin: pendaftar.jenis_kelamin === "L" ? "Laki-laki" : pendaftar.jenis_kelamin === "P" ? "Perempuan" : "",
        agama: dataLengkap?.santri?.agama || "Islam",
        kewarganegaraan: dataLengkap?.santri?.kewarganegaraan || "Indonesia",
        anak_ke: dataLengkap?.santri?.anak_ke || 1,
        jumlah_saudara: dataLengkap?.santri?.jumlah_saudara || 1,
        golongan_darah: dataLengkap?.santri?.golongan_darah || "",
        tinggi_badan: dataLengkap?.santri?.tinggi_badan || 0,
        berat_badan: dataLengkap?.santri?.berat_badan || 0,
        riwayat_penyakit: dataLengkap?.santri?.riwayat_penyakit || "",
        alamat_lengkap: dataLengkap?.santri?.alamat_lengkap || "",
        rt: dataLengkap?.santri?.rt || "",
        rw: dataLengkap?.santri?.rw || "",
        kelurahan: dataLengkap?.santri?.kelurahan || "",
        kecamatan: dataLengkap?.santri?.kecamatan || "",
        kabupaten: dataLengkap?.santri?.kabupaten || "",
        provinsi: dataLengkap?.santri?.provinsi || "",
        kode_pos: dataLengkap?.santri?.kode_pos || "",
        no_hp: pendaftar.no_hp || "",
        email: dataLengkap?.santri?.email || "",
        asal_sekolah: dataLengkap?.santri?.asal_sekolah || "",
        nisn: dataLengkap?.santri?.nisn || "",
        alamat_sekolah: dataLengkap?.santri?.alamat_sekolah || "",
        tahun_lulus: dataLengkap?.santri?.tahun_lulus || "",
      },
      ayah: dataLengkap?.ayah || {
        nama_lengkap: "",
        nik: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        agama: "Islam",
        pendidikan_terakhir: "",
        pekerjaan: "",
        penghasilan: "",
        no_hp: "",
        email: "",
        alamat: "",
        status_hidup: "Masih Hidup",
      },
      ibu: dataLengkap?.ibu || {
        nama_lengkap: "",
        nik: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        agama: "Islam",
        pendidikan_terakhir: "",
        pekerjaan: "",
        penghasilan: "",
        no_hp: "",
        email: "",
        alamat: "",
        status_hidup: "Masih Hidup",
      },
      wali: dataLengkap?.wali || {
        hubungan: "",
        nama_lengkap: "",
        nik: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        agama: "Islam",
        pendidikan_terakhir: "",
        pekerjaan: "",
        penghasilan: "",
        no_hp: "",
        email: "",
        alamat: "",
      },
      wali_sama_dengan_ortu: dataLengkap?.wali_sama_dengan_ortu ?? true,
    };

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("Error in GET /api/pendaftar/data-lengkap:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/pendaftar/data-lengkap
 * Menyimpan data lengkap pendaftar
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Validasi session
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("app_session");

    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: "Sesi tidak ditemukan" },
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

    const pendaftarId = session.id;

    // 2. Parse body
    const body = await request.json();
    const { santri, ayah, ibu, wali, wali_sama_dengan_ortu } = body;

    // 3. Validasi data wajib
    if (!santri?.nama_lengkap || !santri?.tempat_lahir) {
      return NextResponse.json(
        { success: false, error: "Nama lengkap dan tempat lahir wajib diisi" },
        { status: 400 }
      );
    }

    if (!ayah?.nama_lengkap || !ibu?.nama_lengkap) {
      return NextResponse.json(
        { success: false, error: "Nama ayah dan ibu wajib diisi" },
        { status: 400 }
      );
    }

    // 4. Konversi jenis kelamin
    let jenisKelaminDb = santri.jenis_kelamin;
    if (santri.jenis_kelamin === "Laki-laki") jenisKelaminDb = "L";
    if (santri.jenis_kelamin === "Perempuan") jenisKelaminDb = "P";

    // 5. Simpan data utama ke kolom pendaftar
    // data_lengkap is Json type in Prisma, so pass object directly
    const dataLengkapObj = {
      santri: {
        tempat_lahir: santri.tempat_lahir,
        agama: santri.agama,
        kewarganegaraan: santri.kewarganegaraan,
        anak_ke: santri.anak_ke,
        jumlah_saudara: santri.jumlah_saudara,
        golongan_darah: santri.golongan_darah,
        tinggi_badan: santri.tinggi_badan,
        berat_badan: santri.berat_badan,
        riwayat_penyakit: santri.riwayat_penyakit,
        alamat_lengkap: santri.alamat_lengkap,
        rt: santri.rt,
        rw: santri.rw,
        kelurahan: santri.kelurahan,
        kecamatan: santri.kecamatan,
        kabupaten: santri.kabupaten,
        provinsi: santri.provinsi,
        kode_pos: santri.kode_pos,
        email: santri.email,
        asal_sekolah: santri.asal_sekolah,
        nisn: santri.nisn,
        alamat_sekolah: santri.alamat_sekolah,
        tahun_lulus: santri.tahun_lulus,
      },
      ayah,
      ibu,
      wali,
      wali_sama_dengan_ortu,
    };

    const updated = await prisma.pendaftar.update({
      where: { id: pendaftarId },
      data: {
        nama_lengkap: santri.nama_lengkap,
        nik: santri.nik,
        tanggal_lahir: santri.tanggal_lahir ? new Date(santri.tanggal_lahir) : null,
        jenis_kelamin: jenisKelaminDb,
        no_hp: santri.no_hp,
        data_lengkap: dataLengkapObj,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data berhasil disimpan",
    });
  } catch (error: any) {
    console.error("Error in POST /api/pendaftar/data-lengkap:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan saat menyimpan data" },
      { status: 500 }
    );
  }
}
