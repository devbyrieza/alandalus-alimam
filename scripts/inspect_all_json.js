const fs = require('fs');
const path = require('path');

function inspectJson(filename) {
  const filePath = path.join(__dirname, '..', filename);
  if (!fs.existsSync(filePath)) {
    console.log(`[SKIP] Not found: ${filename}`);
    return;
  }
  console.log(`\n========================================`);
  console.log(`INSPECTING: ${filename}`);
  console.log(`========================================`);

  if (filename.endsWith('.jsonl')) {
    const lines = fs.readFileSync(filePath, 'utf8').trim().split('\n').filter(Boolean);
    console.log(`Total lines in JSONL: ${lines.length}`);
    lines.forEach((line, i) => {
      try {
        const obj = JSON.parse(line);
        console.log(`[${i+1}] No: ${obj.nomor_pendaftaran} | Nama: ${obj.nama_lengkap} | Jenjang: ${obj.jenjang} | Status: ${obj.status_pendaftaran}`);
      } catch (e) {}
    });
  } else {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (Array.isArray(data)) {
        console.log(`Total items: ${data.length}`);
        data.forEach((obj, i) => {
          console.log(`[${i+1}] No: ${obj.nomor_pendaftaran || obj.no} | Nama: ${obj.nama_lengkap || obj.nama} | Status: ${obj.status_pendaftaran || obj.status}`);
        });
      } else {
        console.log("Object keys:", Object.keys(data));
      }
    } catch (e) {
      console.error(e.message);
    }
  }
}

inspectJson('pendaftar_db.jsonl');
inspectJson('santri-baru.json');
inspectJson('santri-baru-test.json');
inspectJson('missing_students.json');
