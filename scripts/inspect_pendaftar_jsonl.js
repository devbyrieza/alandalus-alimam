const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../pendaftar_db.jsonl');
const lines = fs.readFileSync(filePath, 'utf8').trim().split('\n').filter(Boolean);

console.log("=== ALL PENDAFTAR FROM pendaftar_db.jsonl ===");
lines.forEach((line, idx) => {
  try {
    const p = JSON.parse(line);
    console.log(`[${idx + 1}] No: ${p.nomor_pendaftaran} | Nama: ${p.nama_lengkap} | Jenjang: ${p.jenjang} | Status: ${p.status_pendaftaran} | HP: ${p.no_hp}`);
  } catch (e) {
    console.error(`Line ${idx+1} parse error`);
  }
});
