const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../pendaftar_db.jsonl');
const lines = fs.readFileSync(filePath, 'utf8').trim().split('\n').filter(Boolean);

console.log("=== ALL UNIQUE NON-TEST PENDAFTAR IN JSONL ===");
const uniqueNames = new Set();
lines.forEach((line) => {
  try {
    const p = JSON.parse(line);
    const name = (p.nama_lengkap || '').trim();
    if (name && !name.toLowerCase().includes('tes') && !name.toLowerCase().includes('bypass') && name !== 'FARID') {
      uniqueNames.add(name);
    }
  } catch (e) {}
});

console.log("Total unique non-test pendaftar:", uniqueNames.size);
Array.from(uniqueNames).sort().forEach((name, i) => {
  console.log(`${i+1}. ${name}`);
});
