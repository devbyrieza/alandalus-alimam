const fs = require('fs');
const path = require('path');
const baseDir = path.resolve('C:/Users/itpua/Dev/Work/al-andalus');
const repos = ['andalus-pusat-putri', 'andalus-pusat-putra', 'alandalus-ululalbaab', 'template-demo'];

for (const repo of repos) {
  try {
    const routePath = path.join(baseDir, repo, 'src/app/api/penguji/jadwal/route.ts');
    let code = fs.readFileSync(routePath, 'utf8');

    code = code.replace(
      'return {\n        id: item.id,\n        pendaftar: item.pendaftar,',
      'return {\n        id: item.id,\n        catatan: item.catatan,\n        pendaftar: item.pendaftar,'
    );
    
    fs.writeFileSync(routePath, code);
    console.log(`Updated route for ${repo}`);
  } catch (e) { console.error(`Error on ${repo}:`, e.message); }
}
