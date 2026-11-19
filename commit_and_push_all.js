const { execSync } = require('child_process');

const paths = [
  'C:/Users/itpua/Dev/Work/al-andalus/alandalus-alimam',
  'C:/Users/itpua/Dev/Work/al-andalus/alandalus-ululalbaab',
  'C:/Users/itpua/Dev/Work/al-andalus/template-demo',
  'C:/Users/itpua/Dev/Work/al-andalus/andalus-pusat-putra',
  'C:/Users/itpua/Dev/Work/al-andalus/andalus-pusat-putri'
];

for (const p of paths) {
  const repoName = p.split('/').pop();
  try {
    console.log('--- Processing ' + repoName + ' ---');
    execSync('git add .', { cwd: p, stdio: 'inherit' });
    const commitMsg = 'feat(spmb): tambahkan pengaturan nomor whatsapp penanggung jawab, pengingat jatuh tempo dp, dan standardisasi antrean santri cadangan';
    execSync(`git commit -m "${commitMsg}"`, { cwd: p, stdio: 'inherit' });
    console.log('Committed in ' + repoName);
    execSync('git push origin main', { cwd: p, stdio: 'inherit' });
    console.log('Pushed ' + repoName + ' successfully');
  } catch (e) {
    console.log('Error in ' + repoName + ':', e.message);
  }
}
