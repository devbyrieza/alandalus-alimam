const fs = require('fs');
const path = require('path');

const sourceRoot = 'c:/Users/itpua/Dev/Work/al-andalus/alandalus-alimam';

console.log('=== EKSEKUSI TIERING FITUR PPDB SESUAI KATALOG BISNIS ===\n');

// 1. FLAGSHIP TIER (Al-Imam - v17): All Interactive Features, WA Share & Full Multi-Role
console.log('1. [FLAGSHIP TIER - Al-Imam v17]: Full Interactive Portal, WA Share, Multi-Role Penguji & CBT (Selesai Aktif)');

// 2. GOLD TIER (Template Demo / Al-Andalus Pusat - v15): Standard Interactive Portal & WA Share
const goldTargets = [
  { name: 'Template Demo', path: 'c:/Users/itpua/Dev/Work/al-andalus/template-demo', domain: 'ppdb-demo.com', code: 'demo' },
  { name: 'Al-Andalus Pusat Putra', path: 'c:/Users/itpua/Dev/Work/al-andalus/andalus-pusat-putra', domain: 'pesantren-alandalus.com', code: 'pusat-putra' },
  { name: 'Al-Andalus Pusat Putri', path: 'c:/Users/itpua/Dev/Work/al-andalus/andalus-pusat-putri', domain: 'pesantren-alandalus-putri.com', code: 'pusat-putri' },
];

const goldFiles = [
  'src/lib/access-control.ts',
  'middleware.ts',
  'src/app/dashboard/admin/penilaian/page.tsx',
  'src/app/dashboard/admin/bank-soal/page.tsx',
  'src/app/panitia/bank-soal/page.tsx',
  'src/app/dashboard/penguji/bank-soal/page.tsx',
  'src/app/program/page.tsx',
  'src/app/tentang/page.tsx',
  'src/app/fasilitas/page.tsx',
  'src/app/kegiatan/page.tsx',
  'Bank_Soal_dan_Form_Penilaian_PPDB_AlImam_2027-2028.html',
  'Bank_Soal_dan_Form_Penilaian_PPDB_AlImam_2027-2028.md'
];

goldTargets.forEach(target => {
  if (fs.existsSync(target.path)) {
    console.log(`\n2. [GOLD TIER - ${target.name}]: Syncing Interactive Bank Soal, Responsive Fixes & WA Share...`);

    goldFiles.forEach(relPath => {
      const srcFile = path.join(sourceRoot, relPath);
      const destFile = path.join(target.path, relPath);
      if (fs.existsSync(srcFile)) {
        const destDir = path.dirname(destFile);
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

        let content = fs.readFileSync(srcFile, 'utf8');
        content = content.replace(/Al-Imam/g, 'Al-Andalus')
                         .replace(/alimam/g, target.code)
                         .replace(/pesantren-alimam.com/g, target.domain);
        fs.writeFileSync(destFile, content, 'utf8');
        console.log(`  ✓ Synced Gold (${target.name}): ${relPath}`);
      }
    });
  }
});

// 3. SILVER TIER (Ulul Albaab - v14): Printable HTML/MD Documents & Base System Sync
const silverPath = 'c:/Users/itpua/Dev/Work/al-andalus/alandalus-ululalbaab';
if (fs.existsSync(silverPath)) {
  console.log('\n3. [SILVER TIER - Ulul Albaab v14]: Syncing Base System & Generating Printable Documents...');
  
  const silverBaseFiles = [
    'src/lib/access-control.ts',
    'src/app/dashboard/admin/penilaian/page.tsx',
    'src/app/program/page.tsx',
    'src/app/tentang/page.tsx',
    'src/app/fasilitas/page.tsx',
    'src/app/kegiatan/page.tsx'
  ];

  silverBaseFiles.forEach(relPath => {
    const srcFile = path.join(sourceRoot, relPath);
    const destFile = path.join(silverPath, relPath);
    if (fs.existsSync(srcFile)) {
      const destDir = path.dirname(destFile);
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

      let content = fs.readFileSync(srcFile, 'utf8');
      content = content.replace(/Al-Imam/g, 'Ulul Albaab')
                       .replace(/alimam/g, 'ululalbaab')
                       .replace(/pesantren-alimam.com/g, 'pesantren-ululalbaab.com');
      fs.writeFileSync(destFile, content, 'utf8');
      console.log(`  ✓ Synced Silver Base: ${relPath}`);
    }
  });

  const docHtmlSrc = path.join(sourceRoot, 'Bank_Soal_dan_Form_Penilaian_PPDB_AlImam_2027-2028.html');
  const docMdSrc = path.join(sourceRoot, 'Bank_Soal_dan_Form_Penilaian_PPDB_AlImam_2027-2028.md');

  if (fs.existsSync(docHtmlSrc)) {
    let htmlContent = fs.readFileSync(docHtmlSrc, 'utf8')
      .replace(/Al-Imam/g, 'Ulul Albaab')
      .replace(/alimam/g, 'ululalbaab')
      .replace(/pesantren-alimam.com/g, 'pesantren-ululalbaab.com');
    
    fs.writeFileSync(path.join(silverPath, 'Bank_Soal_dan_Form_Penilaian_PPDB_UlulAlbaab_2027-2028.html'), htmlContent, 'utf8');
    console.log('  ✓ Generated Silver Document: Bank_Soal_dan_Form_Penilaian_PPDB_UlulAlbaab_2027-2028.html');
  }

  if (fs.existsSync(docMdSrc)) {
    let mdContent = fs.readFileSync(docMdSrc, 'utf8')
      .replace(/Al-Imam/g, 'Ulul Albaab')
      .replace(/alimam/g, 'ululalbaab')
      .replace(/pesantren-alimam.com/g, 'pesantren-ululalbaab.com');
    
    fs.writeFileSync(path.join(silverPath, 'Bank_Soal_dan_Form_Penilaian_PPDB_UlulAlbaab_2027-2028.md'), mdContent, 'utf8');
    console.log('  ✓ Generated Silver Document: Bank_Soal_dan_Form_Penilaian_PPDB_UlulAlbaab_2027-2028.md');
  }

  console.log('  ℹ️ Dokumen cetak siap. Fitur portal interaktif web diset sebagai materi Upsell (Upgrade ke Gold/Flagship) untuk Ulul Albaab.');
}

console.log('\n=== EKSEKUSI TIERING SELESAI DENGAN SUKSES ===');
