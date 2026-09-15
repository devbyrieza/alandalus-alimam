const fs = require('fs');

const repos = [
  'alandalus-alimam',
  'andalus-pusat-putri',
  'andalus-pusat-putra',
  'alandalus-ululalbaab',
  'template-demo'
];

for (const repo of repos) {
  // 1. exam-sessions/route.ts
  const examPath = `../${repo}/src/app/api/exam-sessions/route.ts`;
  if (fs.existsSync(examPath)) {
    let code = fs.readFileSync(examPath, 'utf8');
    code = code.replace(
      /toLocaleTimeString\("id-ID",\s*\{\s*hour:\s*"2-digit",\s*minute:\s*"2-digit"\s*\}\)/g,
      'toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" })'
    );
    fs.writeFileSync(examPath, code);
  }

  // 2. admin/jadwal-ujian/assign/route.ts
  const assignPath = `../${repo}/src/app/api/admin/jadwal-ujian/assign/route.ts`;
  if (fs.existsSync(assignPath)) {
    let code = fs.readFileSync(assignPath, 'utf8');
    code = code.replace(
      /toLocaleTimeString\("id-ID",\s*\{\s*hour:\s*"2-digit",\s*minute:\s*"2-digit"\s*\}\)/g,
      'toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" })'
    );
    fs.writeFileSync(assignPath, code);
  }

  // 3. admin/jadwal-ujian/bulk-assign/route.ts
  const bulkAssignPath = `../${repo}/src/app/api/admin/jadwal-ujian/bulk-assign/route.ts`;
  if (fs.existsSync(bulkAssignPath)) {
    let code = fs.readFileSync(bulkAssignPath, 'utf8');
    code = code.replace(
      /toLocaleTimeString\("id-ID",\s*\{\s*hour:\s*"2-digit",\s*minute:\s*"2-digit"\s*\}\)/g,
      'toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" })'
    );
    fs.writeFileSync(bulkAssignPath, code);
  }
  
  // 4. admin/keuangan/laporan/route.ts
  const laporanPath = `../${repo}/src/app/api/admin/keuangan/laporan/route.ts`;
  if (fs.existsSync(laporanPath)) {
    let code = fs.readFileSync(laporanPath, 'utf8');
    code = code.replace(
      /toLocaleTimeString\('id-ID',\s*\{\s*hour:\s*'2-digit',\s*minute:\s*'2-digit'\s*\}\)/g,
      'toLocaleTimeString(\'id-ID\', { hour: \'2-digit\', minute: \'2-digit\', timeZone: \'Asia/Jakarta\' })'
    );
    fs.writeFileSync(laporanPath, code);
  }

  // 5. cron/reminder-h0/route.ts
  const h0Path = `../${repo}/src/app/api/cron/reminder-h0/route.ts`;
  if (fs.existsSync(h0Path)) {
    let code = fs.readFileSync(h0Path, 'utf8');
    code = code.replace(
      /toLocaleTimeString\(\s*"id-ID",\s*\{\s*hour:\s*"2-digit",\s*minute:\s*"2-digit"\s*\}\s*,?\s*\)/g,
      'toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" })'
    );
    fs.writeFileSync(h0Path, code);
  }

  // 6. penguji/jadwal/cancel/route.ts
  const cancelPath = `../${repo}/src/app/api/penguji/jadwal/cancel/route.ts`;
  if (fs.existsSync(cancelPath)) {
    let code = fs.readFileSync(cancelPath, 'utf8');
    code = code.replace(
      /toLocaleTimeString\("id-ID",\s*\{\s*hour:\s*"2-digit",\s*minute:\s*"2-digit"\s*\}\)/g,
      'toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" })'
    );
    fs.writeFileSync(cancelPath, code);
  }
}

console.log("Replaced all missing timeZones");
