const XLSX = require('xlsx');
const wb = XLSX.readFile('requirements/REKAP HASIL TES.xlsx', { cellFormula: true });
const ws = wb.Sheets['R.H'];
const headers = XLSX.utils.sheet_to_json(ws, { header: 1 })[0];
let output = 'Headers and Formulas for R.H (Rekap Hasil):\n\n';
for (let c = 0; c < headers.length; ++c) {
    let colName = headers[c] || `Col_${c}`;
    let cell = ws[XLSX.utils.encode_cell({ r: 2, c: c })]; // Row 3 (index 2)
    let val = cell ? (cell.f ? '=' + cell.f : cell.v) : 'NULL';
    output += `${c} - [${colName}]: ${val}\n`;
}

// Also let's check sheet AQ (Al-Quran) row 3
output += '\n\nHeaders and Formulas for AQ (Al-Quran):\n\n';
const wsAQ = wb.Sheets['AQ'];
const headersAQ = XLSX.utils.sheet_to_json(wsAQ, { header: 1 })[0];
for (let c = 0; c < headersAQ.length; ++c) {
    let colName = headersAQ[c] || `Col_${c}`;
    let cell = wsAQ[XLSX.utils.encode_cell({ r: 2, c: c })];
    let val = cell ? (cell.f ? '=' + cell.f : cell.v) : 'NULL';
    output += `${c} - [${colName}]: ${val}\n`;
}

const fs = require('fs');
fs.writeFileSync('logic_formulas.txt', output);
console.log('Saved to logic_formulas.txt');
