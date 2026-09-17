const fs = require('fs');
const path = require('path');
const baseDir = path.resolve('C:/Users/itpua/Dev/Work/al-andalus');
const repos = ['alandalus-alimam', 'andalus-pusat-putri', 'andalus-pusat-putra', 'alandalus-ululalbaab', 'template-demo'];

for (const repo of repos) {
  try {
    const pagePath = path.join(baseDir, repo, 'src/app/dashboard/penguji/jadwal/page.tsx');
    let code = fs.readFileSync(pagePath, 'utf8');

    // Replace fetch("/api/penguji/jadwal") with fetch("/api/penguji/jadwal", { cache: 'no-store' })
    code = code.replace(
      /const response = await fetch\("\/api\/penguji\/jadwal"\);/g, 
      'const response = await fetch("/api/penguji/jadwal", { cache: "no-store" });'
    );
    
    // Also do the same for fetchSlots
    code = code.replace(
      /const response = await fetch\("\/api\/exam-sessions"\);/g, 
      'const response = await fetch("/api/exam-sessions", { cache: "no-store" });'
    );

    fs.writeFileSync(pagePath, code);
    console.log(`Updated cache config in ${repo}`);
  } catch (e) {
    console.error(`Error on ${repo}:`, e.message);
  }
}
