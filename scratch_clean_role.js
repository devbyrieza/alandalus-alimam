const fs = require('fs');
const path = require('path');
const baseDir = path.resolve('C:/Users/itpua/Dev/Work/al-andalus');
const repos = ['alandalus-alimam', 'andalus-pusat-putri', 'andalus-pusat-putra', 'alandalus-ululalbaab', 'template-demo'];

for (const repo of repos) {
  try {
    const routePath = path.join(baseDir, repo, 'src/app/api/penguji/jadwal/reschedule/route.ts');
    let code = fs.readFileSync(routePath, 'utf8');

    code = code.replace(
      '["penguji", "pewawancara_calsan", "pewawancara_cawalsan", "penguji_hafalan", "penguji_bahasa_arab"]',
      '["penguji", "pewawancara_calsan", "pewawancara_cawalsan", "penguji_bahasa_arab"]'
    );
    
    fs.writeFileSync(routePath, code);
    console.log(`Updated route for ${repo}`);
  } catch (e) { console.error(`Error on ${repo}:`, e.message); }
}
