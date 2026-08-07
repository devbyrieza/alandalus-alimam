const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../Data_Santri_AlImam_Aplikasi_Laundry_2026.csv');
const content = fs.readFileSync(csvPath, 'utf8');
console.log("=== CSV CONTENT PREVIEW ===");
console.log(content);
