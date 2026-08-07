const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const targets = ['fanni', 'hakim', 'rifqi', 'arsyad', 'hamonangan'];

function searchExcel(filename) {
  const filePath = path.join(__dirname, '..', filename);
  if (!fs.existsSync(filePath)) return;
  const wb = XLSX.readFile(filePath);
  wb.SheetNames.forEach(sheetName => {
    const data = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
    data.forEach(row => {
      const str = JSON.stringify(row).toLowerCase();
      if (targets.some(t => str.includes(t))) {
        console.log(`[FOUND in ${filename} -> ${sheetName}]:`, JSON.stringify(row, null, 2));
      }
    });
  });
}

searchExcel('REKAP HASIL TES.xlsx');
searchExcel('Data_Monitoring_PPDB_AlImam_Final_V8.xlsx');
searchExcel('Data_Monitoring_PPDB_AlImam_Final_V7.xlsx');
searchExcel('Data_Monitoring_PPDB_AlImam_Final_V6.xlsx');
searchExcel('Data_Monitoring_PPDB_AlImam_Final_V5.xlsx');
searchExcel('Data_CRM_AlImam_2026.xlsx');
