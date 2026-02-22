const XLSX = require('xlsx');
const wb = XLSX.readFile('requirements/REKAP HASIL TES.xlsx', { cellFormula: true });
const ws = wb.Sheets['R.H'];
const headers = XLSX.utils.sheet_to_json(ws, { header: 1 })[0];
let output = 'Headers and Formulas for R.H (Rekap Hasil):\n\n';
for (let r = 2; r < 20; ++r) {
    output += `--- Row ${r} ---\n`;
    for (let c = 0; c < 28; ++c) {
        let colName = headers[c] || `Col_${c}`;
        let cell = ws[XLSX.utils.encode_cell({ r: r, c: c })];
        if (cell) {
            let val = cell.f ? '=' + cell.f : cell.v;
            output += `[${colName}]: ${val}\n`;
        }
    }
    output += '\n';
}

const fs = require('fs');
fs.writeFileSync('logic_formulas_full.txt', output);
console.log('Saved to logic_formulas_full.txt');
