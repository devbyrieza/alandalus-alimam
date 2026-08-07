const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

function inspectExcel(filename) {
  const filePath = path.join(__dirname, '..', filename);
  if (!fs.existsSync(filePath)) {
    console.log(`[SKIP] File not found: ${filename}`);
    return;
  }
  console.log(`\n========================================`);
  console.log(`INSPECTING EXCEL: ${filename}`);
  console.log(`========================================`);
  const wb = XLSX.readFile(filePath);
  console.log("Sheets:", wb.SheetNames);
  wb.SheetNames.forEach(sheetName => {
    const sheet = wb.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    console.log(`\n--- Sheet: ${sheetName} (${data.length} rows) ---`);
    if (data.length > 0) {
      console.log("Sample headers:", Object.keys(data[0]));
      console.log("Sample row 1:", JSON.stringify(data[0], null, 2));
    }
  });
}

inspectExcel('Data_Santri_Kepengasuhan/Data_Santri_AlImam_Kepengasuhan_2026-2027_V5.xlsx');
inspectExcel('Data_Monitoring_PPDB_AlImam_Final_V8.xlsx');
inspectExcel('Form_Data_Santri_Baru_Mimbar.xlsx');
inspectExcel('Data_CRM_AlImam_2026.xlsx');
