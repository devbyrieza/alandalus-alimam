const fs = require('fs');
const path = require('path');

const sourceRoot = 'c:/Users/itpua/Dev/Work/al-andalus/alandalus-alimam';

console.log('=== EKSEKUSI TIERING FITUR PPDB SESUAI KATALOG BISNIS ===\n');

// 1. FLAGSHIP TIER (Al-Imam - v17): All Interactive Features, WA Share & Full Multi-Role
console.log('1. [FLAGSHIP TIER - Al-Imam v17]: Full Interactive Portal, WA Share, Multi-Role Penguji & CBT (Selesai Aktif)');

// 2. GOLD TIER (Template Demo / Al-Andalus Pusat - v15): Standard Interactive Portal & WA Share
const goldPath = 'c:/Users/itpua/Dev/Work/al-andalus/template-demo';
if (fs.existsSync(goldPath)) {
  console.log('\n2. [GOLD TIER - Template Demo / Pusat v15]: Syncing Interactive Bank Soal & WA Share...');
  const goldFiles = [
    'src/lib/access-control.ts',
    'middleware.ts',
    'src/app/dashboard/admin/penilaian/page.tsx',
    'src/app/dashboard/admin/bank-soal/page.tsx',
    'src/app/panitia/bank-soal/page.tsx',
    'src/app/dashboard/penguji/bank-soal/page.tsx',
    'Bank_Soal_dan_Form_Penilaian_PPDB_AlImam_2027-2028.html',
    'Bank_Soal_dan_Form_Penilaian_PPDB_AlImam_2027-2028.md'
  ];

  goldFiles.forEach(relPath => {
    const srcFile = path.join(sourceRoot, relPath);
    const destFile = path.join(goldPath, relPath);
    if (fs.existsSync(srcFile)) {
      const destDir = path.dirname(destFile);
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

      let content = fs.readFileSync(srcFile, 'utf8');
      content = content.replace(/Al-Imam/g, 'Demo')
                       .replace(/alimam/g, 'demo')
                       .replace(/pesantren-alimam.com/g, 'ppdb-demo.com');
      fs.writeFileSync(destFile, content, 'utf8');
      console.log(`  ✓ Synced Gold: ${relPath}`);
    }
  });
}

// 3. SILVER TIER (Ulul Albaab - v14): Printable HTML/MD Documents Only (Admin-Centric Strategy)
const silverPath = 'c:/Users/itpua/Dev/Work/al-andalus/alandalus-ululalbaab';
if (fs.existsSync(silverPath)) {
  console.log('\n3. [SILVER TIER - Ulul Albaab v14]: Generating Printable HTML & MD Documents (Dokumen Cetak Panitia)...');
  
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

  console.log('  ℹ️ Fitur portal interaktif web diset sebagai materi Upsell (Upgrade ke Gold/Flagship) untuk Ulul Albaab.');
}

console.log('\n=== EKSEKUSI TIERING SELESAI DENGAN SUKSES ===');
