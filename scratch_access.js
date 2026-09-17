const fs = require('fs');
let code = fs.readFileSync('src/lib/access-control.ts', 'utf8');

const anchorAdmin = '{ name: "Manajemen Jadwal", href: "/dashboard/admin/jadwal/monitoring", icon: "Calendar", group: "OPERASIONAL" },';
const replacement = anchorAdmin + '\n        { name: "Request Ubah Jadwal", href: "/dashboard/admin/jadwal/reschedule", icon: "Calendar", group: "OPERASIONAL" },';

if (!code.includes('Request Ubah Jadwal')) {
  code = code.split(anchorAdmin).join(replacement);
}
fs.writeFileSync('src/lib/access-control.ts', code);
