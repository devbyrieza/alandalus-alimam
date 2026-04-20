import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { PDF_BRANDING } from "@/config/pdf-branding";

export interface PendaftarPdfData {
    nomor_pendaftaran: string;
    nama_lengkap: string;
    nik: string;
    jenjang: string;
    tempat_lahir?: string;
    tanggal_lahir?: string;
    alamat?: string;
    no_hp?: string;
    tahun_ajaran: string;
    tanggal_cetak?: string;
    status_kelulusan?: string;
    jadwal_ujian?: string;
    lokasi_ujian?: string;
}

const toTitleCase = (str: string) => {
    if (!str) return "";
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

/**
 * Standard Header for all Institutional Documents
 */
const drawHeader = async (doc: jsPDF) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const { coords, assets, institution } = PDF_BRANDING;

    // 1. Logo
    try {
        const logoBase64 = await fetchImageAsBase64(assets.logo);
        if (logoBase64) {
            doc.addImage(
                logoBase64, 
                'PNG', 
                coords.header.logo.x, 
                coords.header.logo.y, 
                coords.header.logo.w, 
                coords.header.logo.h
            );
        }
    } catch (e) {
        console.warn("Logo not loaded in header:", e);
    }

    // 2. Vertical Separator Bar
    doc.setDrawColor(40, 40, 40);
    doc.setLineWidth(coords.header.vertical_bar.width);
    doc.line(
        coords.header.vertical_bar.x1, 
        coords.header.vertical_bar.y1, 
        coords.header.vertical_bar.x2, 
        coords.header.vertical_bar.y2
    );

    // 3. Institution Info
    const textX = coords.header.text_x;
    doc.setTextColor(40, 40, 40);
    
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.text(institution.subtitle, textX, 16);

    doc.setFontSize(17);
    doc.setFont("helvetica", "bold");
    doc.text(institution.committee, textX, 24);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Tahun Ajaran ${institution.academic_year}`, textX, 31);

    doc.setFontSize(7);
    doc.setTextColor(80, 80, 80);
    doc.text(institution.address, textX, 36);
    doc.text(`${institution.contact} | WhatsApp: 0812-7000-xxxx`, textX, 40);

    // 4. Horizontal Separator
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(coords.header.horizontal_sep.thickness_thick);
    doc.line(18, coords.header.horizontal_sep.y_thick, pageWidth - 18, coords.header.horizontal_sep.y_thick);
    doc.setLineWidth(coords.header.horizontal_sep.thickness_thin);
    doc.line(18, coords.header.horizontal_sep.y_thin, pageWidth - 18, coords.header.horizontal_sep.y_thin);

    doc.setTextColor(0, 0, 0);
};

/**
 * Standard Footer for all Institutional Documents
 */
const drawFooter = (doc: jsPDF) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Dicetak secara sistem melalui website PPDB Al-Imam pada: ${new Date().toLocaleString("id-ID")}`, pageWidth / 2, pageHeight - 10, { align: "center" });
};

/**
 * Standard Formal Signature Section (TTD + Stempel)
 */
const drawFormalSignature = async (doc: jsPDF, y: number) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const { authority, assets, coords } = PDF_BRANDING;
    const xBase = pageWidth - coords.signature.margin_right;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`${authority.city}, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, xBase, y);
    doc.text(authority.role + ",", xBase, y + 6);

    // Load and add images
    const stempel = await fetchImageAsBase64(assets.stamp);
    const ttd = await fetchImageAsBase64(assets.signature);

    if (stempel) {
        doc.addImage(stempel, 'PNG', xBase - 20, y + 10, coords.signature.stamp.w, coords.signature.stamp.h);
    }
    if (ttd) {
        doc.addImage(ttd, 'PNG', xBase + 10, y + 10, coords.signature.ttd.w, coords.signature.ttd.h);
    }

    doc.setFont("helvetica", "bold");
    doc.text(authority.name, xBase, y + 45);
};

/**
 * Generate Bukti Pendaftaran PDF
 */
export const generateBuktiPendaftaran = async (data: PendaftarPdfData) => {
    const doc = new jsPDF();
    await drawHeader(doc);

    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("BUKTI PENDAFTARAN", pageWidth / 2, 55, { align: "center" });

    const tableData = [
        ["Nomor Pendaftaran", `: ${data.nomor_pendaftaran}`],
        ["Nama Lengkap", `: ${toTitleCase(data.nama_lengkap)}`],
        ["NIK", `: ${data.nik}`],
        ["Jenjang Pendidikan", `: ${data.jenjang}`],
        ["Tempat, Tgl Lahir", `: ${data.tempat_lahir || "-"}, ${data.tanggal_lahir || "-"}`],
        ["Tahun Ajaran", `: ${data.tahun_ajaran}`],
        ["Status Akun", ": AKTIF / TERDAFTAR"],
    ];

    autoTable(doc, {
        startY: 65,
        body: tableData,
        theme: "plain",
        styles: { fontSize: 11, cellPadding: 3 },
        columnStyles: { 0: { fontStyle: "bold", cellWidth: 50 } },
    });

    const finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Petunjuk Selanjutnya:", 14, finalY);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const instructions = [
        "1. Simpan dokumen ini sebagai bukti pendaftaran resmi.",
        "2. Lakukan pelunasan biaya pendaftaran jika belum dilakukan.",
        "3. Lengkapi seluruh biodata dan unggah berkas wajib di dashboard.",
        "4. Pantau dashboard secara berkala untuk ujian seleksi.",
    ];

    doc.text(instructions, 14, finalY + 8);

    drawFooter(doc);
    doc.save(`PPDB_BuktiPendaftaran_${data.nomor_pendaftaran}.pdf`);
};

/**
 * Generate Kartu Ujian PDF
 */
export const generateKartuUjian = async (data: PendaftarPdfData) => {
    const doc = new jsPDF();
    await drawHeader(doc);

    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("KARTU PESERTA UJIAN", pageWidth / 2, 55, { align: "center" });

    // Photo Box
    doc.setDrawColor(200, 200, 200);
    doc.rect(pageWidth - 54, 65, 40, 50);
    doc.setFontSize(8);
    doc.text("FOTO 3x4", pageWidth - 34, 90, { align: "center" });

    const tableData = [
        ["No. Peserta", `: ${data.nomor_pendaftaran}`],
        ["Nama Lengkap", `: ${toTitleCase(data.nama_lengkap)}`],
        ["NIK", `: ${data.nik}`],
        ["Jenjang", `: ${data.jenjang}`],
        ["Jadwal Ujian", `: ${data.jadwal_ujian || "Menunggu Konfirmasi"}`],
        ["Lokasi", `: ${data.lokasi_ujian || "Kampus Al-Imam"}`],
    ];

    autoTable(doc, {
        startY: 65,
        body: tableData,
        theme: "plain",
        margin: { right: 65 },
        styles: { fontSize: 11, cellPadding: 3 },
        columnStyles: { 0: { fontStyle: "bold", cellWidth: 40 } },
    });

    const finalY = (doc as any).lastAutoTable.finalY + 20;
    
    // Use official signature area
    await drawFormalSignature(doc, finalY);

    drawFooter(doc);
    doc.save(`PPDB_KartuUjian_${data.nomor_pendaftaran}.pdf`);
};

const fetchImageAsBase64 = async (url: string): Promise<string | null> => {
    try {
        const response = await fetch(url);
        if (!response.ok) return null;
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
        });
    } catch {
        return null;
    }
};

/**
 * Generate Surat Kelulusan 
 */
export const generateSuratKelulusan = async (data: PendaftarPdfData) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    await drawHeader(doc);

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("SURAT KETERANGAN HASIL SELEKSI", pageWidth / 2, 60, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Nomor: ${data.nomor_pendaftaran}/SKL-PPDB/${new Date().getFullYear()}`, pageWidth / 2, 66, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const content = `Berdasarkan hasil seleksi Penerimaan Santri Baru (PPDB) Tahun Ajaran ${data.tahun_ajaran}, dengan ini Panitia menyatakan bahwa:`;
    doc.text(doc.splitTextToSize(content, pageWidth - 40), 20, 80);

    const tableData = [
        ["Nomor Pendaftaran", `: ${data.nomor_pendaftaran}`],
        ["Nama Lengkap", `: ${toTitleCase(data.nama_lengkap)}`],
        ["NIK", `: ${data.nik}`],
        ["Jenjang Pendidikan", `: ${data.jenjang}`],
    ];

    autoTable(doc, {
        startY: 90,
        body: tableData,
        theme: "plain",
        margin: { left: 25 },
        styles: { fontSize: 11, cellPadding: 3 },
        columnStyles: { 0: { fontStyle: "bold", cellWidth: 50 } },
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    
    let statusText = "LULUS / DITERIMA";
    if (data.status_kelulusan === "cadangan") statusText = "CADANGAN";
    if (data.status_kelulusan === "ditolak" || data.status_kelulusan === "rejected") statusText = "BELUM DITERIMA";
    
    doc.text(`DINYATAKAN: ${statusText}`, pageWidth / 2, finalY + 10, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    
    let closing = "Selamat bergabung menjadi keluarga besar Pesantren Al-Andalus Al-Imam. Silakan segera melakukan proses daftar ulang sesuai jadwal yang ditentukan.";
    if (statusText === "CADANGAN") closing = "Anda masuk dalam daftar cadangan. Panitia akan menghubungi Anda jika terdapat kuota yang kosong.";
    if (statusText === "BELUM DITERIMA") closing = "Tetap semangat dan jangan berkecil hati. Anda dapat kembali mendaftar pada gelombang atau periode berikutnya.";
    
    doc.text(doc.splitTextToSize(closing, pageWidth - 40), 20, finalY + 25);

    // Signature Area
    await drawFormalSignature(doc, finalY + 50);

    drawFooter(doc);
    doc.save(`PPDB_SuratHasilSeleksi_${data.nomor_pendaftaran}.pdf`);
};
