const fs = require('fs');
const path = require('path');
const baseDir = path.resolve('C:/Users/itpua/Dev/Work/al-andalus');
const repos = ['alandalus-alimam', 'andalus-pusat-putri', 'andalus-pusat-putra', 'alandalus-ululalbaab', 'template-demo'];

for (const repo of repos) {
  try {
    const pagePath = path.join(baseDir, repo, 'src/app/dashboard/admin/verifikasi-dokumen/[id]/page.tsx');
    let code = fs.readFileSync(pagePath, 'utf8');

    // Replace the error message using regex to handle whitespace differences
    const regex = /<p className="text-xs font-bold text-stone-700 mb-1">[\s\n\r]*Preview Gambar Tidak Tersedia[\s\n\r]*<\/p>[\s\n\r]*<p className="text-\[11px\] text-stone-500 mb-3 line-clamp-1 max-w-\[200px\]">[\s\n\r]*\{dok\.jenis_dokumen\}[\s\n\r]*<\/p>/;
                        
    const newText = `<p className="text-xs font-bold text-stone-700 mb-1">
                          Preview Tidak Didukung
                        </p>
                        <p className="text-[10px] text-stone-500 mb-3 line-clamp-2 max-w-[200px] leading-tight">
                          Format (HEIC/PDF) tidak bisa dirender browser. Silakan klik <b>Buka Tab</b>.
                        </p>`;

    if (regex.test(code)) {
      code = code.replace(regex, newText);
      fs.writeFileSync(pagePath, code);
      console.log(`Updated preview message in ${repo}`);
    } else {
      console.log(`Not found in ${repo}`);
    }
  } catch (e) {
    console.error(`Error on ${repo}:`, e.message);
  }
}
