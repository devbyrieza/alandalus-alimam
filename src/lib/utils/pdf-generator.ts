import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

const BRAND_NAME = "PESANTREN AL-ANDALUS AL-IMAM";
const BRAND_SUBTITLE = "PANITIA PENERIMAAN SANTRI BARU (PPDB)";
const BRAND_ADDRESS = "Jl. Karamat No. 123, Gunungpuyuh, Kota Sukabumi, Jawa Barat 43123";
const BRAND_CONTACT = "Website: https://pesantren-alimam.com | Email: info@pesantren-alimam.com";
const BRAND_PHONES = "WhatsApp: +62 812-7141-4441 (Putra) / +62 821-1445-7476 (Putri)";

const toTitleCase = (str: string) => {
    if (!str) return "";
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

const drawHeader = async (doc: jsPDF) => {
    const pageWidth = doc.internal.pageSize.getWidth();

    // 1. Logo (Droplet)
    try {
        const logoUrl = '/images/kop-surat.png';
        const logoBase64 = await fetchImageAsBase64(logoUrl);
        if (logoBase64) {
            // Droplet logo is usually tall, 15x25 is a good proportion
            doc.addImage(logoBase64, 'PNG', 18, 10, 15, 25);
        }
    } catch (e) {
        console.warn("Logo not loaded in header:", e);
    }

    // 2. Vertical Separator Bar
    doc.setDrawColor(30, 30, 30);
    doc.setLineWidth(0.5);
    doc.line(40, 12, 40, 38);

    // 3. Institution Info (Left Aligned next to bar)
    const textX = 45;
    doc.setTextColor(30, 30, 30);
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Pesantren Al-Imam Al-Islami Managed by Andalus", textX, 15);

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("PANITIA PENERIMAAN SANTRI BARU", textX, 24);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Tahun Ajaran ${new Date().getFullYear()}-${new Date().getFullYear() + 1}`, textX, 31);

    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`${BRAND_ADDRESS} | ${BRAND_CONTACT}`, textX, 37);

    // 4. Horizontal Separator (Double line style)
    doc.setDrawColor(30, 30, 30);
    doc.setLineWidth(0.8);
    doc.line(18, 42, pageWidth - 18, 42);
    doc.setLineWidth(0.2);
    doc.line(18, 43.5, pageWidth - 18, 43.5);

    doc.setTextColor(0, 0, 0); // Reset text color
};

const drawFooter = (doc: jsPDF) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Dicetak secara sistem melalui website PPDB Al-Imam pada: ${new Date().toLocaleString("id-ID")}`, pageWidth / 2, pageHeight - 10, { align: "center" });
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

    // Instructions
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Petunjuk Selanjutnya:", 14, finalY);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const instructions = [
        "1. Simpan dokumen ini sebagai bukti pendaftaran resmi.",
        "2. Lakukan pelunasan biaya pendaftaran jika belum dilakukan.",
        "3. Lengkapi seluruh biodata dan unggah berkas wajib di dashboard.",
        "4. Pantau dashboard secara berkala untuk jadwal ujian seleksi.",
        "5. Hubungi Panitia via WhatsApp jika ada kendala.",
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

    // Admin Signature Space
    doc.setFontSize(10);
    doc.text("Panitia PPDB,", pageWidth - 60, finalY);
    doc.text("Ponpes Al-Andalus Al-Imam", pageWidth - 60, finalY + 5);
    doc.text("(............................)", pageWidth - 60, finalY + 30);

    drawFooter(doc);
    doc.save(`PPDB_KartuUjian_${data.nomor_pendaftaran}.pdf`);
};

const fetchImageAsBase64 = async (url: string): Promise<string | null> => {
    try {
        const response = await fetch(url);
        if (!response.ok) return null;
        const blob = await response.blob();
        if (blob.type !== 'image/png' && blob.type !== 'image/jpeg') return null;
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
    
    // Use the professional structured header
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
    
    // Support for Cadangan / Ditolak if needed, though this is primarily for LULUS
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

    // Signature and Stamp Area
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Mudir Pondok Pesantren,", pageWidth - 80, finalY + 50);

    const stempel = await fetchImageAsBase64('/images/stempel-pesantren.png') || await fetchImageAsBase64('/images/stempel-pesantren.jpg');
    const ttd = await fetchImageAsBase64('/images/ttd-mudir.png') || await fetchImageAsBase64('/images/ttd-mudir.jpg');

    if (stempel) {
        doc.addImage(stempel, 'PNG', pageWidth - 100, finalY + 55, 30, 30);
    }
    if (ttd) {
        doc.addImage(ttd, 'PNG', pageWidth - 70, finalY + 55, 30, 30);
    }

    doc.setFont("helvetica", "bold");
    doc.text("Mudir Al-Imam", pageWidth - 80, finalY + 90);

    drawFooter(doc);
    doc.save(`PPDB_SuratHasilSeleksi_${data.nomor_pendaftaran}.pdf`);
};
