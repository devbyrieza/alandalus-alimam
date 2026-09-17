const fs = require('fs');
const path = require('path');
const baseDir = path.resolve('C:/Users/itpua/Dev/Work/al-andalus');
const repos = ['alandalus-alimam', 'andalus-pusat-putri', 'andalus-pusat-putra', 'alandalus-ululalbaab', 'template-demo'];

for (const repo of repos) {
  try {
    const pagePath = path.join(baseDir, repo, 'src/app/dashboard/admin/verifikasi-dokumen/[id]/page.tsx');
    let code = fs.readFileSync(pagePath, 'utf8');

    // Replace the error message to be more reassuring
    const oldText = `<p className="text-xs font-bold text-stone-700 mb-1">
                          Preview Gambar Tidak Tersedia
                        </p>
                        <p className="text-[11px] text-stone-500 mb-3 line-clamp-1 max-w-[200px]">
                          {dok.jenis_dokumen}
                        </p>`;
                        
    const newText = `<p className="text-xs font-bold text-stone-700 mb-1">
                          Preview Tidak Didukung Browser
                        </p>
                        <p className="text-[10px] text-stone-500 mb-3 line-clamp-2 max-w-[200px] leading-tight">
                          Format file (misal: HEIC iPhone/PDF) tidak bisa dirender browser. Silakan klik <b>Buka Tab</b>.
                        </p>`;

    code = code.replace(oldText, newText);
    
    // Also change the FileText icon to an ImageOff icon or similar if needed, but keeping FileText is fine.
    
    fs.writeFileSync(pagePath, code);
    console.log(`Updated preview message in ${repo}`);
  } catch (e) {
    console.error(`Error on ${repo}:`, e.message);
  }
}
