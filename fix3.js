const fs = require('fs');
const file = "c:/Users/itpua/Dev/Work/al-andalus/alandalus-alimam/src/app/api/admin/pengumuman/publish/route.ts";
let content = fs.readFileSync(file, "utf8");

content = content.replace(
`            tahun_ajaran_id: user.tahun_ajaran_id } });
      }
    });`,
`            tahun_ajaran_id: user.tahun_ajaran_id } });
        }
      }
    });`
);

fs.writeFileSync(file, content);
