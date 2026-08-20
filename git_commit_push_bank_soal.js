const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PROJECTS = [
  'alandalus-alimam',
  'alandalus-ululalbaab',
  'template-demo',
  'andalus-pusat-putra',
  'andalus-pusat-putri'
];

const ROOT_DIR = 'C:\\Users\\itpua\\Dev\\Work\\al-andalus';
const COMMIT_MSG = 'feat(ppdb): tambah portal bank soal panitia, form penilaian, penegasan syarat MA/SMA & responsive image fix';

console.log('=== MULAI PROSES GIT COMMIT & PUSH LINTAS PROYEK ===\n');

for (const proj of PROJECTS) {
  const projPath = path.join(ROOT_DIR, proj);
  if (!fs.existsSync(projPath)) {
    console.log(`[SKIP] Direktori tidak ditemukan: ${proj}`);
    continue;
  }

  console.log(`📌 Proyek: ${proj}`);
  try {
    const status = execSync('git status --porcelain', { cwd: projPath }).toString().trim();
    if (!status) {
      console.log(`  ✓ Tidak ada perubahan lokal baru yang perlu dicommit.\n`);
      continue;
    }

    console.log(`  ➕ Adding changes...`);
    execSync('git add .', { cwd: projPath, stdio: 'inherit' });

    console.log(`  💾 Committing: "${COMMIT_MSG}"...`);
    execSync(`git commit -m "${COMMIT_MSG}"`, { cwd: projPath, stdio: 'inherit' });

    console.log(`  🚀 Pushing to remote repository...`);
    execSync('git push', { cwd: projPath, stdio: 'inherit' });

    console.log(`  ✅ BERHASIL COMMIT & PUSH untuk ${proj}\n`);
  } catch (err) {
    console.error(`  ❌ GAGAL commit/push pada ${proj}:`, err.message || err);
    console.log('');
  }
}

console.log('=== SELESAI PROSES GIT COMMIT & PUSH LINTAS PROYEK ===');
