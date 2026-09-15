const fs = require('fs');
const path = require('path');
const repos = [
  'andalus-pusat-putri',
  'andalus-pusat-putra',
  'alandalus-ululalbaab',
  'template-demo'
];

for (const repo of repos) {
  const destDir = `../${repo}/src/app/api/exam-sessions`;
  
  if (!fs.existsSync(destDir)) {
    console.log(`Skipping ${repo} - directory not found`);
    continue;
  }
  
  // Create subdirectories
  if (!fs.existsSync(`${destDir}/bulk-edit`)) fs.mkdirSync(`${destDir}/bulk-edit`, { recursive: true });
  if (!fs.existsSync(`${destDir}/bulk-delete`)) fs.mkdirSync(`${destDir}/bulk-delete`, { recursive: true });
  
  // Copy files
  fs.copyFileSync('src/app/api/exam-sessions/route.ts', `${destDir}/route.ts`);
  fs.copyFileSync('src/app/api/exam-sessions/bulk-edit/route.ts', `${destDir}/bulk-edit/route.ts`);
  fs.copyFileSync('src/app/api/exam-sessions/bulk-delete/route.ts', `${destDir}/bulk-delete/route.ts`);
  
  console.log(`Copied files to ${repo}`);
}
