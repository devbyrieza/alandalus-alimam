const fs = require('fs');
const path = require('path');
const baseDir = path.resolve('C:/Users/itpua/Dev/Work/al-andalus');
const repos = ['andalus-pusat-putri', 'andalus-pusat-putra', 'alandalus-ululalbaab', 'template-demo'];

for (const repo of repos) {
  try {
    const accessPath = path.join(baseDir, repo, 'src/lib/access-control.ts');
    let code = fs.readFileSync(accessPath, 'utf8');

    const anchorAdmin = '{ name: "Manajemen Jadwal", href: "/dashboard/admin/jadwal/monitoring", icon: "Calendar", group: "OPERASIONAL" },';
    const replacement = anchorAdmin + '\n        { name: "Request Ubah Jadwal", href: "/dashboard/admin/jadwal/reschedule", icon: "Calendar", group: "OPERASIONAL" },';

    if (!code.includes('Request Ubah Jadwal')) {
      code = code.split(anchorAdmin).join(replacement);
      fs.writeFileSync(accessPath, code);
      console.log(`Updated access-control for ${repo}`);
    }
  } catch (e) { console.error(`Error on ${repo}:`, e.message); }
}
