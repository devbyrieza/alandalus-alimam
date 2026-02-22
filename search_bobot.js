const XLSX = require('xlsx');
const wb = XLSX.readFile('requirements/REKAP HASIL TES.xlsx');
let found = false;
for (const name of wb.SheetNames) {
    const ws = wb.Sheets[name];
    const json = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
    json.forEach((row, rIdx) => {
        row.forEach((cell, cIdx) => {
            if (cell) {
                const str = String(cell).toLowerCase();
                if (str.includes('bobot') || str.includes('persen') || str.includes('kriteria') || str.includes('range')) {
                    console.log(`[${name}] Row ${rIdx + 1} Col ${cIdx}: ${cell}`);
                    found = true;
                }
            }
        });
    });
}
if (!found) console.log('No such terms found in any cell.');
