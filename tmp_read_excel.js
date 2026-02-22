const XLSX = require('xlsx');
const wb = XLSX.readFile('requirements/REKAP HASIL TES.xlsx');
console.log('Sheets:', wb.SheetNames);
wb.SheetNames.forEach(name => {
    const ws = wb.Sheets[name];
    console.log('\n============ SHEET:', name, '============');
    const json = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
    json.forEach((row, i) => {
        const filtered = row.map((c, j) => c !== '' ? `[${j}]${c}` : null).filter(Boolean);
        if (filtered.length) console.log(`R${i}: ${filtered.join(' | ')}`);
    });
});
