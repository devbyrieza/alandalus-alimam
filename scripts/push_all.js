const { execSync } = require('child_process');

const repos = [
  'c:/Users/itpua/Dev/Work/al-andalus/alandalus-alimam',
  'c:/Users/itpua/Dev/Work/al-andalus/alandalus-ululalbaab',
  'c:/Users/itpua/Dev/Work/al-andalus/template-demo',
  'c:/Users/itpua/Dev/Work/al-andalus/andalus-pusat-putra',
  'c:/Users/itpua/Dev/Work/al-andalus/andalus-pusat-putri'
];

const commitMsg = 'feat(pengumuman): rincian nilai belum input, wa penguji, wa pendaftar, dan floating jadwal';

for (const r of repos) {
  console.log(`\n========================================`);
  console.log(`Repository: ${r}`);
  console.log(`========================================`);
  try {
    execSync('git add -A', { cwd: r, stdio: 'inherit' });
    try {
      execSync(`git commit -m "${commitMsg}"`, { cwd: r, stdio: 'inherit' });
      console.log('✓ Commit created');
    } catch (e) {
      console.log('• Nothing new to commit');
    }
    execSync('git push origin main', { cwd: r, stdio: 'inherit' });
    console.log('✓ Successfully pushed to origin main');
  } catch (err) {
    console.error(`✗ Error on ${r}:`, err.message);
  }
}
