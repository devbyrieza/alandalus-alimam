const XLSX = require('xlsx');
const path = require('path');

const fileV8 = path.join(__dirname, '../Data_Monitoring_PPDB_AlImam_Final_V8.xlsx');
const wbV8 = XLSX.readFile(fileV8);

const sheetMTs = wbV8.Sheets['Data MTs'];
const sheetIL = wbV8.Sheets['Data IL'];

const rowsMTs = XLSX.utils.sheet_to_json(sheetMTs, { header: 1 });
const rowsIL = XLSX.utils.sheet_to_json(sheetIL, { header: 1 });

console.log("=== SHEET DATA MTs ===");
console.log("Total rows:", rowsMTs.length);
rowsMTs.forEach((r, idx) => {
  if (idx === 0) return; // Header
  console.log(`[MTs-${idx}] NIS: ${r[1]} | NIK: ${r[2]} | Nama: ${r[3]} | Status: ${r[7]} | Ayah: ${r[8]} | Ibu: ${r[9]} | HP: ${r[10]}`);
});

console.log("\n=== SHEET DATA IL ===");
console.log("Total rows:", rowsIL.length);
rowsIL.forEach((r, idx) => {
  if (idx === 0) return; // Header
  console.log(`[IL-${idx}] NIS: ${r[1]} | NIK: ${r[2]} | Nama: ${r[3]} | Status: ${r[7]} | Ayah: ${r[8]} | Ibu: ${r[9]} | HP: ${r[10]}`);
});
