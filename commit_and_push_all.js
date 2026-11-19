const { execSync } = require('child_process');

const repos = [
  'c:/Users/itpua/Dev/Work/al-andalus/alandalus-alimam',
  'c:/Users/itpua/Dev/Work/al-andalus/alandalus-ululalbaab',
  'c:/Users/itpua/Dev/Work/al-andalus/template-demo',
  'c:/Users/itpua/Dev/Work/al-andalus/andalus-pusat-putra',
  'c:/Users/itpua/Dev/Work/al-andalus/andalus-pusat-putri',
];

const commitMsg = 'feat(spmb): simplify notification banner copy & add optional admin berkas recipient';

for (const r of repos) {
  const name = r.split('/').pop();
  try {
    execSync('git add -A', { cwd: r, stdio: 'inherit' });
    const diff = execSync('git status --short', { cwd: r }).toString().trim();
    if (diff) {
      execSync(`git commit -m "${commitMsg}"`, { cwd: r, stdio: 'inherit' });
      execSync('git push origin main', { cwd: r, stdio: 'inherit' });
      console.log(`[SUCCESS] ${name} committed and pushed.`);
    } else {
      console.log(`[CLEAN] ${name} has no changes.`);
    }
  } catch (err) {
    console.error(`[ERROR] ${name}:`, err.message);
  }
}
