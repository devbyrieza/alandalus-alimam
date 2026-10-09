const fs = require('fs');
const file = "c:/Users/itpua/Dev/Work/al-andalus/alandalus-alimam/src/app/api/admin/pengumuman/publish/route.ts";
let content = fs.readFileSync(file, "utf8");

content = content.replace('if (new_status === "tested") {`n          await tx.pengumuman.deleteMany({ where: { pendaftar_id: user.id } });`n        } else {`n          await tx.pengumuman.upsert({', 
`if (new_status === "tested") {
          await tx.pengumuman.deleteMany({ where: { pendaftar_id: user.id } });
        } else {
          await tx.pengumuman.upsert({`);

content = content.replace('tahun_ajaran_id: user.tahun_ajaran_id } });`n        }',
`tahun_ajaran_id: user.tahun_ajaran_id } });
        }`);
fs.writeFileSync(file, content);
