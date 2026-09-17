const fs = require('fs');
const path = require('path');

const repos = ['andalus-pusat-putri', 'andalus-pusat-putra', 'alandalus-ululalbaab', 'template-demo'];
const sourceRepo = path.resolve('C:/Users/itpua/Dev/Work/al-andalus/alandalus-alimam');
const baseDir = path.resolve('C:/Users/itpua/Dev/Work/al-andalus');

const filesToCopy = [
  'src/app/api/penguji/jadwal/reschedule/route.ts',
  'src/app/api/admin/jadwal/reschedule/route.ts',
  'src/app/dashboard/admin/jadwal/reschedule/page.tsx',
];

for (const repo of repos) {
  const targetRepoPath = path.join(baseDir, repo);
  
  // 1. Copy files
  for (const file of filesToCopy) {
    const src = path.join(sourceRepo, file);
    const dest = path.join(targetRepoPath, file);
    
    // Ensure dir exists
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} to ${repo}`);
  }
}
