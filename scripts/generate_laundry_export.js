const XLSX = require('xlsx');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const fileV5 = path.join(__dirname, '../Data_Santri_Kepengasuhan/Data_Santri_AlImam_Kepengasuhan_2026/2027_V5.xlsx');
const wbV5 = XLSX.readFile(fileV5);

const dataUtama = XLSX.utils.sheet_to_json(wbV5.Sheets['Data Utama']);
const dataOrtu = XLSX.utils.sheet_to_json(wbV5.Sheets['Data Orang Tua']);
const dataKontak = XLSX.utils.sheet_to_json(wbV5.Sheets['Kontak Darurat']);

function formatPhone(phone) {
  if (!phone) return '';
  let str = String(phone).trim();
  if (str === '0' || str === '-') return '';
  // Remove non-digit characters except leading +
  str = str.replace(/[^\d+]/g, '');
  if (str.startsWith('+62')) {
    str = '0' + str.slice(3);
  } else if (str.startsWith('62')) {
    str = '0' + str.slice(2);
  }
  if (!str.startsWith('0') && str.length > 5) {
    str = '0' + str;
  }
  return str;
}

async function generateFiles() {
  const list = dataUtama.map((s, idx) => {
    const o = dataOrtu.find(item => item['No Pendaftaran'] === s['No Pendaftaran']) || {};
    const k = dataKontak.find(item => item['No Pendaftaran'] === s['No Pendaftaran']) || {};

    const jenjangStr = s['Jenjang'] || '';
    let kelasDisplay = '';
    if (jenjangStr === 'MTs' || jenjangStr === 'SMP') {
      kelasDisplay = '7 MTs';
    } else if (jenjangStr === 'IL' || jenjangStr === 'SMA' || jenjangStr === 'MA') {
      kelasDisplay = '10 IL';
    } else {
      kelasDisplay = jenjangStr;
    }

    const hpAyah = formatPhone(o['No HP Ayah'] || k['No HP Ayah']);
    const hpIbu = formatPhone(o['No HP Ibu'] || k['No HP Ibu']);
    const hpWali = formatPhone(o['No HP Wali'] || k['No HP Wali']);
    const hpUtama = formatPhone(s['No HP Santri/Ortu'] || k['No HP Santri']);

    // Pick best contact for laundry notification
    const waLaundry = hpAyah || hpIbu || hpWali || hpUtama;

    return {
      no: idx + 1,
      noPendaftaran: s['No Pendaftaran'] || '',
      nis: s['NIS'] || '',
      namaSantri: (s['Nama Lengkap'] || '').toUpperCase().trim(),
      jenjang: jenjangStr,
      kelas: kelasDisplay,
      namaAyah: o['Nama Ayah'] || '',
      waAyah: hpAyah,
      namaIbu: o['Nama Ibu'] || '',
      waIbu: hpIbu,
      namaWali: o['Nama Wali'] || '',
      waWali: hpWali,
      waUtamaOrtu: waLaundry
    };
  });

  // Sort by Kelas and then Nama
  list.sort((a, b) => {
    if (a.kelas !== b.kelas) return a.kelas.localeCompare(b.kelas);
    return a.namaSantri.localeCompare(b.namaSantri);
  });

  // Re-index
  list.forEach((item, index) => item.no = index + 1);

  // Generate Excel with styling using ExcelJS
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Pesantren Al-Andalus Al-Imam';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('Data Santri Laundry');

  // Define columns
  sheet.columns = [
    { header: 'No', key: 'no', width: 6 },
    { header: 'NIS', key: 'nis', width: 14 },
    { header: 'No Pendaftaran', key: 'noPendaftaran', width: 16 },
    { header: 'Nama Santri', key: 'namaSantri', width: 30 },
    { header: 'Kelas / Program', key: 'kelas', width: 16 },
    { header: 'Nama Ayah', key: 'namaAyah', width: 25 },
    { header: 'WA Ayah', key: 'waAyah', width: 16 },
    { header: 'Nama Ibu', key: 'namaIbu', width: 25 },
    { header: 'WA Ibu', key: 'waIbu', width: 16 },
    { header: 'Nama Wali', key: 'namaWali', width: 22 },
    { header: 'WA Wali', key: 'waWali', width: 16 },
    { header: 'WA Utama Laundry', key: 'waUtamaOrtu', width: 18 }
  ];

  // Header styling
  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
  headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4E79' } };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
  headerRow.height = 25;

  list.forEach(item => {
    sheet.addRow(item);
  });

  // Table styling & borders
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      row.height = 20;
      row.alignment = { vertical: 'middle' };
      // Center specific columns
      row.getCell('no').alignment = { vertical: 'middle', horizontal: 'center' };
      row.getCell('nis').alignment = { vertical: 'middle', horizontal: 'center' };
      row.getCell('noPendaftaran').alignment = { vertical: 'middle', horizontal: 'center' };
      row.getCell('kelas').alignment = { vertical: 'middle', horizontal: 'center' };
      row.getCell('waAyah').alignment = { vertical: 'middle', horizontal: 'center' };
      row.getCell('waIbu').alignment = { vertical: 'middle', horizontal: 'center' };
      row.getCell('waWali').alignment = { vertical: 'middle', horizontal: 'center' };
      row.getCell('waUtamaOrtu').alignment = { vertical: 'middle', horizontal: 'center' };
    }

    row.eachCell(cell => {
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFD9D9D9' } },
        left: { style: 'thin', color: { argb: 'FFD9D9D9' } },
        bottom: { style: 'thin', color: { argb: 'FFD9D9D9' } },
        right: { style: 'thin', color: { argb: 'FFD9D9D9' } }
      };
    });
  });

  const targetXlsxPath = path.join(__dirname, '../Data_Santri_AlImam_Aplikasi_Laundry_2026.xlsx');
  await workbook.xlsx.writeFile(targetXlsxPath);
  console.log(`✅ Excel saved to: ${targetXlsxPath}`);

  // Generate CSV File
  let csvContent = '\uFEFF'; // UTF-8 BOM
  csvContent += 'No,NIS,No Pendaftaran,Nama Santri,Kelas/Program,Nama Ayah,WA Ayah,Nama Ibu,WA Ibu,Nama Wali,WA Wali,WA Utama Laundry\n';
  list.forEach(item => {
    const esc = v => `"${String(v || '').replace(/"/g, '""')}"`;
    csvContent += [
      item.no,
      esc(item.nis),
      esc(item.noPendaftaran),
      esc(item.namaSantri),
      esc(item.kelas),
      esc(item.namaAyah),
      esc(item.waAyah),
      esc(item.namaIbu),
      esc(item.waIbu),
      esc(item.namaWali),
      esc(item.waWali),
      esc(item.waUtamaOrtu)
    ].join(',') + '\n';
  });

  const targetCsvPath = path.join(__dirname, '../Data_Santri_AlImam_Aplikasi_Laundry_2026.csv');
  fs.writeFileSync(targetCsvPath, csvContent, 'utf8');
  console.log(`✅ CSV saved to: ${targetCsvPath}`);
}

generateFiles().catch(console.error);
