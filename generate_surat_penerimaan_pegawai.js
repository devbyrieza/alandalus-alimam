const fs = require('fs');
const path = require('path');

function getBase64(filePath) {
    if (fs.existsSync(filePath)) {
        const ext = path.extname(filePath).toLowerCase().substring(1);
        const data = fs.readFileSync(filePath).toString('base64');
        const mime = ext === 'jpg' ? 'jpeg' : ext;
        return `data:image/${mime};base64,${data}`;
    }
    console.warn('File tidak ditemukan:', filePath);
    return '';
}

// Aset
const bgPath      = path.join(__dirname, 'public/images/kop-surat-full.jpg');
const stempelPath = path.join(__dirname, 'public/documents/Stempel 5.png');
const ttdPath     = path.join(__dirname, 'public/images/ttd-mudir-original.png');

const bgBase64      = getBase64(bgPath);
const stempelBase64 = getBase64(stempelPath);
const ttdBase64     = getBase64(ttdPath);

// Data surat
const nomorSurat = '007/PAAS-MDR/VIII/2026';
const tanggal    = 'Sukabumi, 23 Agustus 2026';

const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Surat Penerimaan Pegawai - Ustadz Azzam Aghnia Ilman</title>
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
            width: 794px;       /* A4 @ 96dpi */
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
            padding: 228px 70px 40px 70px;
            position: relative;
            z-index: 2;
        }

        /* Nomor surat */
        .nomor-row {
            display: flex;
            gap: 0;
            font-size: 12pt;
            margin-bottom: 18px;
        }
        .nomor-label { min-width: 120px; }
        .nomor-sep   { min-width: 20px; }

        /* Kepada */
        .kepada-section {
            margin-bottom: 18px;
        }
        .kepada-section p {
            font-size: 12pt;
            line-height: 1.6;
        }
        .kepada-nama {
            font-weight: bold;
            font-size: 12pt;
        }

        /* Isi surat */
        p.isi {
            text-align: justify;
            margin-bottom: 10px;
            font-size: 12pt;
            line-height: 1.7;
        }
        p.isi.indent {
            text-indent: 2.5em;
        }

        /* Konten penerimaan */
        .penerimaan-box {
            margin: 14px 0 14px 2.5em;
            font-size: 12pt;
        }
        table.identitas {
            border-collapse: collapse;
            font-size: 12pt;
            width: 100%;
        }
        table.identitas td {
            padding: 3px 4px;
            vertical-align: top;
        }
        table.identitas td:first-child {
            width: 42%;
            padding-left: 0;
        }
        table.identitas td:nth-child(2) {
            width: 4%;
            text-align: center;
        }

        /* TTD area */
        .ttd-wrapper {
            margin-top: 24px;
            display: flex;
            justify-content: flex-end;
        }
        .ttd-box {
            width: 54%;
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

        /* Area stempel + TTD — stempel dulu (di bawah), TTD di atas stempel */
        .ttd-gambar-area {
            position: relative;
            height: 100px;
            margin-top: 6px;
        }
        .stempel-img {
            position: absolute;
            top: -10px;
            left: -8px;
            width: 120px;
            opacity: 0.90;
            mix-blend-mode: multiply;
            z-index: 9;   /* stempel di bawah */
        }
        .ttd-img {
            position: absolute;
            top: -18px;
            left: 22px;
            width: 150px;
            z-index: 10;  /* TTD di atas stempel */
            mix-blend-mode: multiply;
        }

        .nama-mudir {
            font-size: 12pt;
            font-weight: bold;
            text-decoration: underline;
            position: relative;
            z-index: 11;
            margin-top: 4px;
        }
        .jabatan-mudir {
            font-size: 11pt;
            position: relative;
            z-index: 11;
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

            <!-- Nomor Surat -->
            <div class="nomor-row">
                <span class="nomor-label">Nomor</span>
                <span class="nomor-sep">:</span>
                <span>${nomorSurat}</span>
            </div>

            <!-- Kepada -->
            <div class="kepada-section">
                <p>Kepada Ykh.</p>
                <p class="kepada-nama">Ustadz Azzam Aghnia Ilman</p>
                <p>Di Tempat</p>
            </div>

            <!-- Salam Pembuka -->
            <p class="isi indent">
                <em>Assalamu'alaikum Warahmatullahi Wabarakatuh</em>
            </p>

            <!-- Kalimat pembuka -->
            <p class="isi indent">
                Dengan memohon taufik dan hidayah Allah <em>Subhanahu wa Ta'ala</em>, bersama surat ini kami sampaikan bahwa setelah mempertimbangkan kelayakan, kompetensi, dan kesiapan yang bersangkutan, maka dengan penuh rasa syukur kami menyampaikan:
            </p>

            <!-- Pernyataan Penerimaan -->
            <p class="isi" style="text-align:center; font-weight:bold; text-decoration:underline; letter-spacing:1px; margin: 12px 0;">
                SURAT PENERIMAAN PEGAWAI
            </p>

            <p class="isi indent">
                Bahwa dengan ini kami menerima dengan resmi:
            </p>

            <!-- Tabel Identitas -->
            <div class="penerimaan-box">
                <table class="identitas">
                    <tr>
                        <td>Nama</td>
                        <td>:</td>
                        <td><strong>Ustadz Azzam Aghnia Ilman</strong></td>
                    </tr>
                    <tr>
                        <td>Jabatan</td>
                        <td>:</td>
                        <td><strong>Musyrif</strong></td>
                    </tr>
                    <tr>
                        <td>Lembaga</td>
                        <td>:</td>
                        <td>Pesantren Al-Imam Al-Islami<br><em>Managed by Al-Andalus</em></td>
                    </tr>
                    <tr>
                        <td>Paling Lambat Tiba</td>
                        <td>:</td>
                        <td><strong>25 Agustus 2026</strong></td>
                    </tr>
                </table>
            </div>

            <!-- Isi lanjutan -->
            <p class="isi indent">
                Kami mengharapkan kesediaan Ustadz untuk segera hadir dan bergabung bersama keluarga besar Pesantren Al-Imam Al-Islami paling lambat tanggal <strong>25 Agustus 2026</strong>, sebagaimana yang telah disepakati. Kehadiran Ustadz sangat dinantikan demi kelancaran kegiatan kepesantrenan yang akan segera dimulai.
            </p>

            <p class="isi indent">
                Demikian surat penerimaan ini kami sampaikan. Semoga Allah <em>Subhanahu wa Ta'ala</em> memberikan kemudahan, keberkahan, dan menjadikan amal ini sebagai bagian dari jihad fi sabilillah. Atas perhatian dan kerja samanya kami ucapkan jazakumullahu khairan.
            </p>

            <p class="isi indent">
                <em>Wassalamu'alaikum Warahmatullahi Wabarakatuh</em>
            </p>

            <!-- Tanda Tangan -->
            <div class="ttd-wrapper">
                <div class="ttd-box">
                    <p class="ttd-kota">${tanggal}</p>
                    <p class="ttd-jabatan">Mudir Pondok Pesantren,<br>
                    <strong>Al-Imam Al-Islami</strong></p>

                    <!-- Stempel dulu (z-index lebih rendah), TTD di atasnya -->
                    <div class="ttd-gambar-area">
                        <img src="${stempelBase64}" class="stempel-img" alt="Stempel">
                        <img src="${ttdBase64}"     class="ttd-img"     alt="Tanda Tangan">
                    </div>

                    <div class="nama-mudir">Wahab Rajasam, M.Pd</div>
                    <div class="jabatan-mudir">Mudir Pondok Pesantren</div>
                </div>
            </div>

        </div><!-- .content -->
    </div><!-- .page -->
</body>
</html>`;

// Simpan HTML
const htmlOut = path.join(__dirname, 'surat menyurat', '007-Surat_Penerimaan_Pegawai_Ustadz_Azzam.html');
fs.writeFileSync(htmlOut, htmlContent, 'utf8');
console.log('✅ HTML berhasil dibuat:', htmlOut);
console.log('');
console.log('📄 Langkah selanjutnya:');
console.log('   1. Buka file HTML di browser (Chrome)');
console.log('   2. Tekan Ctrl+P → Save as PDF');
console.log('   3. Pastikan: Paper = A4, Margins = None, Background = ON');

// Coba generate PDF via Puppeteer
async function generatePDF() {
    let puppeteer;
    try {
        puppeteer = require('puppeteer');
    } catch(e) {
        console.log('');
        console.log('ℹ️  Puppeteer tidak tersedia. Silakan buka HTML di browser dan print ke PDF.');
        return;
    }

    console.log('');
    console.log('🚀 Membuat PDF via Puppeteer...');

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    const htmlPath = 'file:///' + htmlOut.replace(/\\/g, '/');
    await page.goto(htmlPath, { waitUntil: 'networkidle0' });

    // Tunggu gambar load
    await new Promise(r => setTimeout(r, 1500));

    const pdfOut = path.join(__dirname, 'surat menyurat', '007-Surat_Penerimaan_Pegawai_Ustadz_Azzam.pdf');
    await page.pdf({
        path: pdfOut,
        format: 'A4',
        printBackground: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });

    await browser.close();
    console.log('✅ PDF berhasil dibuat:', pdfOut);
}

generatePDF().catch(err => {
    console.error('Error:', err.message);
    console.log('HTML sudah tersedia, buka di browser dan print ke PDF.');
});
