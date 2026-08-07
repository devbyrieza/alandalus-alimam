const XLSX = require('xlsx');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const fileV8 = path.join(__dirname, '../Data_Monitoring_PPDB_AlImam_Final_V8.xlsx');
const wbV8 = XLSX.readFile(fileV8);

const sheetMTs = wbV8.Sheets['Data MTs'];
const sheetIL = wbV8.Sheets['Data IL'];

const rowsMTs = XLSX.utils.sheet_to_json(sheetMTs, { header: 1 });
const rowsIL = XLSX.utils.sheet_to_json(sheetIL, { header: 1 });

// Read V5 for extra details
const fileV5 = path.join(__dirname, '../Data_Santri_Kepengasuhan/Data_Santri_AlImam_Kepengasuhan_2026-2027_V5.xlsx');
const wbV5 = XLSX.readFile(fileV5);
const dataUtamaV5 = XLSX.utils.sheet_to_json(wbV5.Sheets['Data Utama']);
const dataOrtuV5 = XLSX.utils.sheet_to_json(wbV5.Sheets['Data Orang Tua']);

const v5Lookup = new Map();
dataUtamaV5.forEach(s => {
  const o = dataOrtuV5.find(item => item['No Pendaftaran'] === s['No Pendaftaran']) || {};
  v5Lookup.set(s['Nama Lengkap'].toLowerCase().trim(), { s, o });
});

function formatPhone(phone) {
  if (!phone) return '';
  let str = String(phone).trim();
  if (str === '0' || str === '-') return '';
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

const listMTs = [];
const listIL = [];

function processV8Row(r, defaultJenjang, targetList) {
  let namaSantri = r[3] && r[3] !== 'Nama Lengkap' ? String(r[3]).trim() : '';
  if (!namaSantri || namaSantri === 'Nama Lengkap') return;

  // Replace RAYLAN AKBAR with IMAN PRAYOGO
  if (namaSantri.toUpperCase().includes('RAYLAN AKBAR')) {
    namaSantri = 'IMAN PRAYOGO';
  }

  const v5Match = v5Lookup.get(namaSantri.toLowerCase());

  let namaAyah = (r[8] && r[8] !== 'Nama Ayah' ? String(r[8]).trim() : '') || v5Match?.o?.['Nama Ayah'] || '';
  let namaIbu = (r[9] && r[9] !== 'Nama Ibu' ? String(r[9]).trim() : '') || v5Match?.o?.['Nama Ibu'] || '';
  let hpV8 = formatPhone(r[10]);

  if (namaSantri === 'IMAN PRAYOGO') {
    namaAyah = '';
    namaIbu = '';
    hpV8 = '';
  }

  let hpAyahV5 = formatPhone(v5Match?.o?.['No HP Ayah']);
  let hpIbuV5 = formatPhone(v5Match?.o?.['No HP Ibu']);

  let hpAyah = hpAyahV5 || hpV8;
  let hpIbu = hpIbuV5 || (hpAyahV5 ? '' : hpV8);

  const kelasDisplay = defaultJenjang === 'MTs' ? '7 MTs' : '10 IL';

  targetList.push({
    namaSantri: namaSantri.toUpperCase(),
    kelas: kelasDisplay,
    namaAyah: (namaAyah === '-' ? '' : namaAyah),
    waAyah: hpAyah,
    namaIbu: (namaIbu === '-' ? '' : namaIbu),
    waIbu: hpIbu
  });
}

// Process MTs
rowsMTs.forEach((r, idx) => {
  if (idx < 2) return;
  processV8Row(r, 'MTs', listMTs);
});

// Process IL
rowsIL.forEach((r, idx) => {
  if (idx < 2) return;
  processV8Row(r, 'IL', listIL);
});

// Sort by Nama
listMTs.sort((a, b) => a.namaSantri.localeCompare(b.namaSantri));
listIL.sort((a, b) => a.namaSantri.localeCompare(b.namaSantri));

// Re-index
listMTs.forEach((item, index) => item.no = index + 1);
listIL.forEach((item, index) => item.no = index + 1);

console.log(`✅ MTs Processed: ${listMTs.length}`);
console.log(`✅ IL Processed: ${listIL.length}`);

async function exportFiles() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Pesantren Al-Andalus Al-Imam';
  workbook.created = new Date();

  // Helper for creating and styling sheets using Al-Imam Color Palette (#550000 Merah Maroon & #DDC192 Krem Emas)
  const addSheetWithData = (sheetName, dataList) => {
    const sheet = workbook.addWorksheet(sheetName);
    sheet.columns = [
      { header: 'No', key: 'no', width: 6 },
      { header: 'Nama Santri', key: 'namaSantri', width: 32 },
      { header: 'Kelas', key: 'kelas', width: 14 },
      { header: 'Nama Ayah', key: 'namaAyah', width: 25 },
      { header: 'No WA Ayah', key: 'waAyah', width: 16 },
      { header: 'Nama Ibu', key: 'namaIbu', width: 25 },
      { header: 'No WA Ibu', key: 'waIbu', width: 16 }
    ];

    const headerRow = sheet.getRow(1);
    // Palette Al-Imam: #550000 (Merah Maroon) Header Fill, #FFFFFF (White) Bold Font
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF550000' } };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.height = 26;

    dataList.forEach(item => sheet.addRow(item));

    sheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.height = 21;
        row.alignment = { vertical: 'middle' };
        row.getCell('no').alignment = { vertical: 'middle', horizontal: 'center' };
        row.getCell('kelas').alignment = { vertical: 'middle', horizontal: 'center' };
        row.getCell('waAyah').alignment = { vertical: 'middle', horizontal: 'center' };
        row.getCell('waIbu').alignment = { vertical: 'middle', horizontal: 'center' };

        // Subtle zebra striping or clean border
        row.eachCell(cell => {
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFDDC192' } },
            left: { style: 'thin', color: { argb: 'FFDDC192' } },
            bottom: { style: 'thin', color: { argb: 'FFDDC192' } },
            right: { style: 'thin', color: { argb: 'FFDDC192' } }
          };
        });
      } else {
        row.eachCell(cell => {
          cell.border = {
            top: { style: 'medium', color: { argb: 'FF550000' } },
            left: { style: 'thin', color: { argb: 'FFDDC192' } },
            bottom: { style: 'medium', color: { argb: 'FF550000' } },
            right: { style: 'thin', color: { argb: 'FFDDC192' } }
          };
        });
      }
    });
  };

  // Sheet 1: MTs, Sheet 2: IL
  addSheetWithData('Data MTs', listMTs);
  addSheetWithData('Data IL', listIL);

  const targetXlsxPath = path.join(__dirname, '../Data_Santri_AlImam_Aplikasi_Laundry_2026.xlsx');
  await workbook.xlsx.writeFile(targetXlsxPath);
  console.log(`✅ Excel with Al-Imam maroon header saved to: ${targetXlsxPath}`);

  // Generate CSV Files
  const generateCsv = (dataList, filename) => {
    let csv = '\uFEFFNo,Nama Santri,Kelas,Nama Ayah,No WA Ayah,Nama Ibu,No WA Ibu\n';
    dataList.forEach(item => {
      const esc = v => `"${String(v || '').replace(/"/g, '""')}"`;
      csv += [item.no, esc(item.namaSantri), esc(item.kelas), esc(item.namaAyah), esc(item.waAyah), esc(item.namaIbu), esc(item.waIbu)].join(',') + '\n';
    });
    const p = path.join(__dirname, '..', filename);
    fs.writeFileSync(p, csv, 'utf8');
  };

  generateCsv(listMTs, 'Data_Santri_AlImam_Laundry_MTs.csv');
  generateCsv(listIL, 'Data_Santri_AlImam_Laundry_IL.csv');

  const combined = [...listMTs, ...listIL].map((item, idx) => ({ ...item, no: idx + 1 }));
  generateCsv(combined, 'Data_Santri_AlImam_Aplikasi_Laundry_2026.csv');
}

exportFiles().catch(console.error);
