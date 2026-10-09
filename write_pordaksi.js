const fs = require('fs');

const html = <!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pengajuan Anggaran PORDAKSI 5</title>
    <style>
        body {
            font-family: 'Times New Roman', Times, serif;
            background-color: #f0f0f0;
            color: #000;
            margin: 0;
            padding: 20px;
        }
        .a4-container {
            background-color: #fff;
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            padding: 25mm 20mm;
            box-sizing: border-box;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .kop-surat {
            text-align: center;
            border-bottom: 3px solid #000;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .kop-surat h1 {
            margin: 0;
            font-size: 22px;
            text-transform: uppercase;
        }
        .kop-surat h2 {
            margin: 5px 0 0;
            font-size: 18px;
            font-weight: normal;
        }
        .kop-surat p {
            margin: 5px 0 0;
            font-size: 12px;
        }
        .title {
            text-align: center;
            font-weight: bold;
            font-size: 16px;
            text-decoration: underline;
            margin-bottom: 20px;
        }
        .content {
            font-size: 14px;
            line-height: 1.5;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            margin-bottom: 15px;
        }
        th, td {
            border: 1px solid #000;
            padding: 5px 10px;
        }
        th {
            background-color: #e0e0e0;
            text-align: center;
        }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .bold { font-weight: bold; }
        
        .ttd-container {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            text-align: center;
            page-break-inside: avoid;
        }
        .ttd-box {
            width: 30%;
        }
        .ttd-box p {
            margin: 0;
        }
        .ttd-space {
            height: 60px;
        }
        .ttd-name {
            font-weight: bold;
            text-decoration: underline;
        }

        @media print {
            body {
                background-color: #fff;
                padding: 0;
            }
            .a4-container {
                box-shadow: none;
                width: 100%;
                margin: 0;
                padding: 0;
                min-height: auto;
            }
        }
    </style>
</head>
<body>

<div class="a4-container">
    <div class="kop-surat">
        <h1>PESANTREN AL-IMAM AL-ISLAMI</h1>
        <h2>TINGKAT MADRASAH ALIYAH (MA) & I'DAD LUGHOWY (IL)</h2>
        <p>Cikembar, Kabupaten Sukabumi, Jawa Barat</p>
    </div>

    <div class="title">
        LAPORAN PENGAJUAN DAN REIMBURSEMENT DANA PORDAKSI 5
    </div>

    <div class="content">
        <p>Bismillah. Bersama surat ini, kami lampirkan rincian biaya operasional dan kegiatan persiapan PORDAKSI 5 Tingkat MA & IL. Dana ini terbagi menjadi dua bagian, yaitu penggantian dana talangan persiapan lomba (Reimburse) dan estimasi pengajuan dana yang paling efisien untuk kebutuhan Hari H pertandingan.</p>

        <!-- TABEL A -->
        <p class="bold">A. DANA TALANGAN PERSIAPAN (MOHON DI-REIMBURSE)</p>
        <table>
            <thead>
                <tr>
                    <th width="5%">No</th>
                    <th width="65%">Uraian Kebutuhan</th>
                    <th width="30%">Nominal (Rp)</th>
                </tr>
            </thead>
            <tbody>
                <tr><td class="text-center">1</td><td>Pembelian Bola Voli</td><td class="text-right">105.000</td></tr>
                <tr><td class="text-center">2</td><td>Pembelian Bet Pingpong Tenis Meja (Inventaris)</td><td class="text-right">130.000</td></tr>
                <tr><td class="text-center">3</td><td>Pembelian Tiang Net Pingpong (Inventaris)</td><td class="text-right">98.000</td></tr>
                <tr><td class="text-center">4</td><td>Pembelian Bola Pingpong</td><td class="text-right">36.000</td></tr>
                <tr><td class="text-center">5</td><td>Sewa GOR Bulutangkis</td><td class="text-right">45.000</td></tr>
                <tr><td class="text-center">6</td><td>Sewa GOR Futsal</td><td class="text-right">100.000</td></tr>
                <tr>
                    <td colspan="2" class="text-center bold">SUBTOTAL A (REIMBURSE)</td>
                    <td class="text-right bold">514.000</td>
                </tr>
            </tbody>
        </table>

        <!-- JUSTIFIKASI INVENTARIS -->
        <div style="background-color: #f9f9f9; padding: 10px; border: 1px dashed #666; margin-bottom: 20px;">
            <strong>*Catatan Justifikasi (Untuk Perhatian Bendahara/Mudir):</strong><br>
            Pembelian perlengkapan Tenis Meja (Bet & Tiang Net) adalah investasi aset/inventaris Madrasah yang bisa digunakan jangka panjang oleh para santri. Perlengkapan ini sangat menunjang kegiatan ekstrakurikuler serta sejalan dengan peruntukan dana BOS (Pengadaan Sarana Penunjang Olahraga Santri), sehingga ke depannya kita tidak perlu lagi membeli/menyewa alat saat ada event serupa.
        </div>

        <!-- TABEL B -->
        <p class="bold">B. ESTIMASI PENGAJUAN DANA HARI H LOMBA (EFISIENSI MAKSIMAL)</p>
        <p style="font-size: 13px; margin-top: -10px;">Total Kontingen: 35 Orang (Futsal, Bulutangkis, Voli, Tenis Meja, Dakwah, MTQ, MHQ beserta Pelatih & Official)</p>
        <table>
            <thead>
                <tr>
                    <th width="5%">No</th>
                    <th width="65%">Uraian Kebutuhan</th>
                    <th width="30%">Nominal (Rp)</th>
                </tr>
            </thead>
            <tbody>
                <tr><td class="text-center">1</td><td>Pendaftaran Seluruh Cabang Lomba (Bisa disesuaikan/dihapus jika gratis)</td><td class="text-right">350.000</td></tr>
                <tr><td class="text-center">2</td><td>Transportasi Antar-Jemput Santri Hari H (Sewa Angkot/Mobil)</td><td class="text-right">150.000</td></tr>
                <tr><td class="text-center">3</td><td>Konsumsi Santri & Pelatih (35 Orang) - Hanya Beli Lauk Pauk Tambahan / Makanan Ringan Ekstra (Nasi & Lauk Utama disiapkan Dapur Pesantren)</td><td class="text-right">350.000</td></tr>
                <tr><td class="text-center">4</td><td>Insentif/Bisyaroh Pelatih & Official (9 Orang) @ Rp 30.000 (Rate Ekonomis)</td><td class="text-right">270.000</td></tr>
                <tr><td class="text-center">5</td><td>Biaya Tak Terduga (P3K, Air Minum Galon/Kardus, Parkir, dll)</td><td class="text-right">100.000</td></tr>
                <tr>
                    <td colspan="2" class="text-center bold">SUBTOTAL B (ESTIMASI PENGAJUAN BARU)</td>
                    <td class="text-right bold">1.220.000</td>
                </tr>
            </tbody>
        </table>

        <!-- TOTAL -->
        <table>
            <tbody>
                <tr>
                    <td width="70%" class="text-center bold" style="background-color: #e0e0e0; font-size: 16px;">TOTAL KESELURUHAN DANA (A + B)</td>
                    <td width="30%" class="text-right bold" style="background-color: #e0e0e0; font-size: 16px;">Rp 1.734.000</td>
                </tr>
            </tbody>
        </table>

        <p style="font-size: 12px; font-style: italic;">*Catatan: Estimasi bagian B dibuat sangat minim dan efisien. Jika ada sisa dana di hari H, seluruhnya akan dikembalikan ke Bendahara.</p>

        <!-- TANDA TANGAN -->
        <div class="ttd-container">
            <div class="ttd-box">
                <p>Diajukan oleh,</p>
                <p>Ketua Kontingen PORDAKSI</p>
                <div class="ttd-space"></div>
                <p class="ttd-name">..............................</p>
            </div>
            
            <div class="ttd-box">
                <p>Mengetahui,</p>
                <p>Kepala Madrasah Aliyah</p>
                <div class="ttd-space"></div>
                <p class="ttd-name">..............................</p>
            </div>
            
            <div class="ttd-box">
                <p>Memeriksa & Menyetujui,</p>
                <p>Bendahara Pesantren</p>
                <div class="ttd-space"></div>
                <p class="ttd-name">Ust. Maulidin Bachtiar, Amd.Kom</p>
            </div>
        </div>

    </div>
</div>

</body>
</html>;

fs.writeFileSync('C:/Users/itpua/Dev/Work/al-andalus/alandalus-alimam/Pengajuan_Dana_PORDAKSI_5.html', html);
console.log('HTML saved.');
