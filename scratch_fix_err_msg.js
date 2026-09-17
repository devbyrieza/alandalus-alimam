const fs = require('fs');
const path = require('path');
const baseDir = path.resolve('C:/Users/itpua/Dev/Work/al-andalus');
const repos = ['alandalus-alimam', 'andalus-pusat-putri', 'andalus-pusat-putra', 'alandalus-ululalbaab', 'template-demo'];
const pages = ['akademik', 'kepribadian', 'kesiapan'];

for (const repo of repos) {
  for (const page of pages) {
    try {
      const pagePath = path.join(baseDir, repo, `src/app/dashboard/pendaftar/ujian/${page}/page.tsx`);
      let code = fs.readFileSync(pagePath, 'utf8');

      // Replace: if (!res.ok) throw new Error("Gagal mengirim");
      // With: 
      // if (!res.ok) {
      //   const errData = await res.json().catch(() => null);
      //   throw new Error(errData?.error || "Gagal mengirim");
      // }
      const oldCheck = 'if (!res.ok) throw new Error("Gagal mengirim");';
      const newCheck = `if (!res.ok) {
          const errData = await res.json().catch(() => null);
          throw new Error(errData?.error || "Gagal mengirim");
        }`;
        
      if (code.includes(oldCheck)) {
        code = code.replace(oldCheck, newCheck);
        fs.writeFileSync(pagePath, code);
        console.log(`Updated error handling in ${repo} / ${page}`);
      }
    } catch (e) {
      console.error(`Error on ${repo} / ${page}:`, e.message);
    }
  }
}
