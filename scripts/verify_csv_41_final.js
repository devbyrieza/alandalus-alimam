const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../Data_Santri_AlImam_Aplikasi_Laundry_2026.csv');
const lines = fs.readFileSync(csvPath, 'utf8').trim().split('\n');

console.log("=== FINAL CSV CONTENT CHECK ===");
console.log("Total lines (incl header):", lines.length);

lines.forEach((line, i) => {
  if (i === 0) return;
  console.log(`[${i}] ${line}`);
});
