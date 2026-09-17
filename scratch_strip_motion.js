const fs = require('fs');
const path = require('path');
const baseDir = path.resolve('C:/Users/itpua/Dev/Work/al-andalus');
const repos = ['alandalus-alimam', 'andalus-pusat-putri', 'andalus-pusat-putra', 'alandalus-ululalbaab', 'template-demo'];

for (const repo of repos) {
  try {
    const pagePath = path.join(baseDir, repo, 'src/app/dashboard/penguji/jadwal/page.tsx');
    let code = fs.readFileSync(pagePath, 'utf8');

    code = code.replace(/<AnimatePresence>/g, '<>');
    code = code.replace(/<\/AnimatePresence>/g, '</>');
    code = code.replace(/<motion\.div/g, '<div');
    code = code.replace(/<\/motion\.div>/g, '</div>');
    code = code.replace(/initial=\{\{.*?\}\}/g, '');
    code = code.replace(/animate=\{\{.*?\}\}/g, '');
    code = code.replace(/exit=\{\{.*?\}\}/g, '');
    
    fs.writeFileSync(pagePath, code);
    console.log(`Removed framer-motion from ${repo}`);
  } catch (e) { console.error(`Error on ${repo}:`, e.message); }
}
