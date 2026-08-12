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

const bgPath     = path.join(__dirname, 'public/images/kop-surat-full.jpg');
const ttdPath    = path.join(__dirname, 'public/images/ttd-mudir-original.png');
const stempelPath = path.join(__dirname, 'public/documents/Stempel 5.png');

const bgBase64      = getBase64(bgPath);
const ttdBase64     = getBase64(ttdPath);
const stempelBase64 = getBase64(stempelPath);

const tanggal = 'Jonggol, 11 Agustus 2026';
const nomorSurat = '___/RKM/AIIS/VIII/2026';

const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Surat Rekomendasi Paspor - Ikhwan Ramandhanu</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Times+New+Roman&display=swap');

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

        /* Garis bawah kop */
        .kop-divider {
            position: absolute;
            top: 210px;
            left: 50px;
            right: 50px;
            border-top: 3px solid #1a3c6e;
            border-bottom: 1.5px solid #1a3c6e;
            height: 5px;
        }

        .content {
            padding: 225px 72px 40px 72px;
            position: relative;
            z-index: 2;
        }

        /* Nomor surat */
        .nomor {
            text-align: center;
            margin-bottom: 14px;
            font-size: 11pt;
        }

        /* Judul surat */
        .judul {
            text-align: center;
            margin-bottom: 18px;
        }
        .judul h2 {
            font-size: 14pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-decoration: underline;
            margin-bottom: 4px;
        }

        /* Body paragraf */
        p.isi {
            text-align: justify;
            margin-bottom: 10px;
            text-indent: 2.5em;
            font-size: 12pt;
        }
        p.isi.no-indent {
            text-indent: 0;
        }

        /* Tabel data identitas */
        table.identitas {
            margin: 10px 0 10px 2.5em;
            border-collapse: collapse;
            font-size: 12pt;
            width: calc(100% - 2.5em);
        }
        table.identitas td {
            padding: 2px 4px;
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
            margin-top: 22px;
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
        .nip-mudir {
            font-size: 10pt;
            position: relative;
            z-index: 11;
        }

        /* Garis penutup */
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
            <!-- Nomor Surat -->
            <div class="nomor">Nomor: ${nomorSurat}</div>

            <!-- Judul -->
            <div class="judul">
                <h2>Surat Rekomendasi</h2>
            </div>

            <!-- Isi Surat -->
            <p class="isi">
                Yang bertanda tangan di bawah ini, Mudir Pondok Pesantren Al-Imam Al-Islami Jonggol, menerangkan dengan sebenarnya bahwa:
            </p>

            <!-- Data Santri -->
            <table class="identitas">
                <tr>
                    <td>Nama Lengkap</td>
                    <td>:</td>
                    <td><strong>Ikhwan Ramandhanu</strong></td>
                </tr>
                <tr>
                    <td>Tempat, Tanggal Lahir</td>
                    <td>:</td>
                    <td>Larantuka, 22 September 2006</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>:</td>
                    <td>Santri Pengabdian</td>
                </tr>
                <tr>
                    <td>Asal Lembaga</td>
                    <td>:</td>
                    <td>Pondok Pesantren Al-Imam Al-Islami Jonggol</td>
                </tr>
            </table>

            <p class="isi">
                Adalah benar merupakan santri yang telah menyelesaikan pendidikan dan saat ini sedang menjalani masa pengabdian di Pondok Pesantren Al-Imam Al-Islami. Yang bersangkutan dikenal sebagai pribadi yang bertanggung jawab, memiliki akhlak yang baik, dan berkomitmen tinggi dalam mengemban amanah.
            </p>

            <p class="isi">
                Surat rekomendasi ini kami terbitkan untuk keperluan pengurusan <strong>Pembuatan Paspor</strong> dalam rangka rencana perjalanan wisata ke luar negeri, sekaligus sebagai bagian dari persiapan yang bersangkutan untuk melanjutkan studi ke <strong>Mesir</strong>.
            </p>

            <p class="isi">
                Kami selaku pimpinan lembaga memberikan rekomendasi penuh kepada yang bersangkutan dan menjamin bahwa beliau akan mematuhi seluruh peraturan yang berlaku selama berada di luar negeri. Surat ini dibuat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya.
            </p>

            <p class="isi">
                Demikian surat rekomendasi ini kami buat. Atas perhatian dan kerja sama pihak yang berwenang, kami ucapkan terima kasih.
            </p>

            <!-- Tanda Tangan -->
            <div class="ttd-wrapper">
                <div class="ttd-box">
                    <p class="ttd-kota">${tanggal}</p>
                    <p class="ttd-jabatan">Mudir Pondok Pesantren,<br>
                    <strong>Al-Imam Al-Islami</strong></p>

                    <div class="ttd-gambar-area">
                        <img src="${stempelBase64}" class="stempel-img" alt="Stempel">
                        <img src="${ttdBase64}"     class="ttd-img"     alt="Tanda Tangan">
                    </div>

                    <div class="nama-mudir">Wahab Rajasam, M.Pd</div>
                    <div class="nip-mudir">Mudir Pondok Pesantren</div>
                </div>
            </div>

        </div><!-- .content -->

        <!-- Footer dekoratif -->
        <div class="footer-line"></div>
        <div class="footer-text">
            Pondok Pesantren Al-Imam Al-Islami &bull; Jonggol, Bogor, Jawa Barat
        </div>

    </div><!-- .page -->
</body>
</html>`;

// Simpan HTML dulu
const htmlOut = path.join(__dirname, 'Surat_Rekomendasi_Paspor_Ikhwan.html');
fs.writeFileSync(htmlOut, htmlContent, 'utf8');
console.log('HTML berhasil dibuat:', htmlOut);
console.log('Sekarang konversi ke PDF menggunakan Puppeteer...');

// Konversi ke PDF via Puppeteer
async function generatePDF() {
    let puppeteer;
    try {
        puppeteer = require('puppeteer');
    } catch(e) {
        console.log('Puppeteer tidak tersedia, coba install...');
        console.log('Jalankan: npm install puppeteer --no-save');
        return;
    }

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    const htmlPath = 'file:///' + htmlOut.replace(/\\/g, '/');
    await page.goto(htmlPath, { waitUntil: 'networkidle0' });
    await page.waitForTimeout(1000);

    const pdfOut = path.join(__dirname, 'Surat_Rekomendasi_Paspor_Ikhwan.pdf');
    await page.pdf({
        path: pdfOut,
        format: 'A4',
        printBackground: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });

    await browser.close();
    console.log('PDF berhasil dibuat:', pdfOut);
}

generatePDF().catch(err => {
    console.error('Error generating PDF:', err.message);
    console.log('HTML sudah tersedia di:', htmlOut);
    console.log('Buka file HTML di browser, lalu Print → Save as PDF');
});
