const fs = require('fs');
const path = require('path');

function getBase64(filePath) {
    if (fs.existsSync(filePath)) {
        const ext = path.extname(filePath).toLowerCase().substring(1);
        const data = fs.readFileSync(filePath).toString('base64');
        const mime = ext === 'jpg' ? 'jpeg' : ext;
        return `data:image/${mime};base64,${data}`;
    }
    return '';
}

const bgPath      = path.join(__dirname, 'public/images/kop-surat-full.jpg');
const ttdPath     = path.join(__dirname, 'public/images/ttd-mudir-original.png');
const stempelPath = path.join(__dirname, 'public/documents/Stempel 5.png');

const bgBase64      = getBase64(bgPath);
const ttdBase64     = getBase64(ttdPath);
const stempelBase64 = getBase64(stempelPath);

const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Surat Permohonan Penyuluhan Kesehatan</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 12pt;
            line-height: 1.5;
            background: #c8c8c8;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }

        .page {
            width: 794px;
            min-height: 1123px;
            margin: 20px auto;
            background: #fff;
            background-image: url('${bgBase64}');
            background-size: 100% 100%;
            background-position: top center;
            background-repeat: no-repeat;
            position: relative;
            box-shadow: 0 4px 24px rgba(0,0,0,0.35);
            overflow: hidden;
        }

        .content {
            padding: 225px 72px 40px 72px;
            position: relative;
            z-index: 2;
        }

        /* Blok nomor/lampiran/perihal */
        table.header-surat {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 18px;
            font-size: 12pt;
        }
        table.header-surat td {
            padding: 1px 0;
            vertical-align: top;
        }
        table.header-surat td:first-child {
            width: 28%;
        }
        table.header-surat td:nth-child(2) {
            width: 4%;
            text-align: left;
        }

        /* Tujuan surat */
        .tujuan {
            margin-bottom: 16px;
            font-size: 12pt;
        }

        /* Salam pembuka */
        .salam {
            margin-bottom: 12px;
            font-size: 12pt;
        }

        /* Paragraf isi */
        p.isi {
            text-align: justify;
            margin-bottom: 10px;
            text-indent: 2.5em;
            font-size: 12pt;
        }

        /* Tabel rencana kegiatan */
        table.kegiatan {
            margin: 4px 0 12px 2.5em;
            border-collapse: collapse;
            font-size: 12pt;
            width: calc(100% - 2.5em);
        }
        table.kegiatan td {
            padding: 2px 4px;
            vertical-align: top;
        }
        table.kegiatan td:first-child {
            width: 38%;
            padding-left: 0;
        }
        table.kegiatan td:nth-child(2) {
            width: 4%;
            text-align: center;
        }

        /* TTD */
        .ttd-wrapper {
            margin-top: 20px;
            display: flex;
            justify-content: flex-end;
        }
        .ttd-box {
            width: 52%;
            text-align: left;
            position: relative;
        }
        .ttd-kota {
            font-size: 12pt;
            margin-bottom: 4px;
        }
        .ttd-jabatan {
            font-size: 12pt;
            margin-bottom: 0;
        }
        .ttd-gambar-area {
            position: relative;
            height: 90px;
            margin-top: 6px;
        }
        .stempel-img {
            position: absolute;
            top: -18px;
            left: -10px;
            width: 115px;
            opacity: 0.88;
            mix-blend-mode: multiply;
            z-index: 9;
        }
        .ttd-img {
            position: absolute;
            top: -10px;
            left: 30px;
            width: 145px;
            z-index: 10;
            mix-blend-mode: multiply;
        }
        .nama-mudir {
            font-size: 12pt;
            font-weight: bold;
            text-decoration: underline;
            position: relative;
            z-index: 11;
            margin-top: 2px;
        }
        .jabatan-mudir {
            font-size: 12pt;
            position: relative;
            z-index: 11;
        }

        /* Footer */
        .footer-line {
            position: absolute;
            bottom: 35px;
            left: 50px;
            right: 50px;
            border-top: 1.5px solid #1a3c6e;
        }
        .footer-text {
            position: absolute;
            bottom: 14px;
            width: 100%;
            text-align: center;
            font-size: 8pt;
            color: #555;
            letter-spacing: 0.5px;
        }

        @media print {
            body { background: #fff; margin: 0; padding: 0; }
            .page { margin: 0; box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="page">
        <div class="content">

            <!-- NOMOR / LAMPIRAN / PERIHAL -->
            <table class="header-surat">
                <tr>
                    <td>Nomor</td>
                    <td>:</td>
                    <td><strong>[NOMOR SURAT]</strong>/PP/AIIS/VIII/2026</td>
                </tr>
                <tr>
                    <td>Lampiran</td>
                    <td>:</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>Perihal</td>
                    <td>:</td>
                    <td><strong>Permohonan Penyuluhan Kesehatan</strong></td>
                </tr>
            </table>

            <!-- TUJUAN -->
            <div class="tujuan">
                <p>Yth.</p>
                <p>Kepala Puskesmas <strong>[NAMA PUSKESMAS]</strong></p>
                <p>di Tempat</p>
            </div>

            <!-- SALAM PEMBUKA -->
            <div class="salam">
                <p><em>Assalamu'alaikum Warahmatullahi Wabarakatuh</em></p>
            </div>

            <!-- PARAGRAF PEMBUKA -->
            <p class="isi">
                Salam hormat kami sampaikan. Semoga Bapak/Ibu Kepala Puskesmas beserta seluruh jajaran senantiasa dalam keadaan sehat dan baik.
            </p>

            <!-- PARAGRAF PERMOHONAN -->
            <p class="isi">
                Dalam rangka meningkatkan pengetahuan, kesadaran, dan kepedulian para santri terhadap kesehatan, Pondok Pesantren Al-Imam Al-Islami bermaksud menyelenggarakan kegiatan <strong>Penyuluhan Kesehatan</strong> di lingkungan pesantren dengan rencana pelaksanaan sebagai berikut:
            </p>

            <!-- DATA KEGIATAN -->
            <table class="kegiatan">
                <tr>
                    <td>Nama Kegiatan</td>
                    <td>:</td>
                    <td>Penyuluhan Kesehatan</td>
                </tr>
                <tr>
                    <td>Hari/Tanggal</td>
                    <td>:</td>
                    <td>Rabu, 19 Agustus 2026</td>
                </tr>
                <tr>
                    <td>Tempat</td>
                    <td>:</td>
                    <td>Pondok Pesantren Al-Imam Al-Islami, Jonggol</td>
                </tr>
            </table>

            <!-- PARAGRAF PERMOHONAN PETUGAS -->
            <p class="isi">
                Sehubungan dengan hal tersebut, kami mohon dengan hormat kiranya pihak Puskesmas berkenan untuk mengirimkan petugas atau narasumber kesehatan guna melaksanakan kegiatan penyuluhan dimaksud.
            </p>

            <!-- PARAGRAF FLEKSIBILITAS -->
            <p class="isi">
                Kami sepenuhnya menyerahkan penentuan jadwal, teknis pelaksanaan, materi penyuluhan, serta jumlah petugas kepada kebijaksanaan pihak Puskesmas. Pihak pesantren siap menyesuaikan diri dengan arahan dan ketersediaan dari Bapak/Ibu.
            </p>

            <!-- PENUTUP -->
            <p class="isi">
                Demikian surat permohonan ini kami sampaikan. Atas perhatian dan kerja sama yang baik dari Bapak/Ibu, kami ucapkan terima kasih.
            </p>

            <!-- SALAM PENUTUP -->
            <p style="margin-top: 8px; font-size: 12pt;">
                <em>Wassalamu'alaikum Warahmatullahi Wabarakatuh</em>
            </p>

            <!-- TANDA TANGAN -->
            <div class="ttd-wrapper">
                <div class="ttd-box">
                    <p class="ttd-kota">Jonggol, 11 Agustus 2026</p>
                    <p class="ttd-jabatan">Mudir Pondok Pesantren,<br>
                    <strong>Al-Imam Al-Islami</strong></p>

                    <div class="ttd-gambar-area">
                        <img src="${stempelBase64}" class="stempel-img" alt="Stempel">
                        <img src="${ttdBase64}"     class="ttd-img"     alt="Tanda Tangan">
                    </div>

                    <div class="nama-mudir">Wahab Rajasam, M.Pd</div>
                    <div class="jabatan-mudir">Mudir Pondok Pesantren</div>
                </div>
            </div>

        </div><!-- .content -->

        <div class="footer-line"></div>
        <div class="footer-text">
            Pondok Pesantren Al-Imam Al-Islami &bull; Jonggol, Bogor, Jawa Barat
        </div>

    </div><!-- .page -->
</body>
</html>`;

const htmlOut = path.join(__dirname, 'Surat_Permohonan_Penyuluhan_Kesehatan.html');
fs.writeFileSync(htmlOut, htmlContent, 'utf8');
console.log('HTML berhasil dibuat:', htmlOut);

// Generate PDF via Chrome headless
const { execSync } = require('child_process');
const pdfOut = path.join(__dirname, 'Surat_Permohonan_Penyuluhan_Kesehatan.pdf');
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlUri = 'file:///' + htmlOut.replace(/\\/g, '/');

try {
    execSync(`"${chrome}" --headless=new --disable-gpu --no-sandbox --print-to-pdf="${pdfOut}" --print-to-pdf-no-header "${htmlUri}"`, { timeout: 30000 });
    console.log('PDF berhasil dibuat:', pdfOut);
    const size = fs.statSync(pdfOut).size;
    console.log('Ukuran file:', size, 'bytes');
} catch(e) {
    console.error('Gagal generate PDF:', e.message);
    console.log('Buka HTML di Chrome → Print → Save as PDF');
}
