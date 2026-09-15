const fs = require('fs');

const repos = [
  'alandalus-alimam',
  'andalus-pusat-putri',
  'andalus-pusat-putra',
  'alandalus-ululalbaab',
  'template-demo'
];

for (const repo of repos) {
  // 1. Fix src/app/api/pendaftar/jadwal/route.ts
  const jadwalPath = `../${repo}/src/app/api/pendaftar/jadwal/route.ts`;
  if (fs.existsSync(jadwalPath)) {
    let code = fs.readFileSync(jadwalPath, 'utf8');
    if (!code.includes('    }\n\n    return NextResponse.json({ success: true, data: result.jadwal });')) {
      code = code.replace(
        '      return NextResponse.json({ success: true, data: result.jadwal });',
        '    }\n\n    return NextResponse.json({ success: true, data: result.jadwal });'
      );
      
      // Some repos might have returned `{ data }` instead of `{ success: true, data: result.jadwal }` 
      // ululalbaab returns: return NextResponse.json({ success: true, data: jadwal });
      code = code.replace(
        '      return NextResponse.json({ success: true, data: jadwal });',
        '    }\n\n    return NextResponse.json({ success: true, data: jadwal });'
      );
      fs.writeFileSync(jadwalPath, code);
      console.log(`Fixed braces in ${jadwalPath}`);
    }
  }

  // 2. Fix getSession import in bulk-edit and bulk-delete
  const editPath = `../${repo}/src/app/api/exam-sessions/bulk-edit/route.ts`;
  const deletePath = `../${repo}/src/app/api/exam-sessions/bulk-delete/route.ts`;

  for (const p of [editPath, deletePath]) {
    if (fs.existsSync(p)) {
      let code = fs.readFileSync(p, 'utf8');
      code = code.replace(
        'import { getSession } from "@/lib/session";',
        'import { getServerSession as getSession } from "@/lib/session";'
      );
      fs.writeFileSync(p, code);
      console.log(`Fixed getSession in ${p}`);
    }
  }
}
