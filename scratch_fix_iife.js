const fs = require('fs');
const path = require('path');
const baseDir = path.resolve('C:/Users/itpua/Dev/Work/al-andalus');
const repos = ['alandalus-alimam', 'andalus-pusat-putri', 'andalus-pusat-putra', 'alandalus-ululalbaab', 'template-demo'];

for (const repo of repos) {
  try {
    const pagePath = path.join(baseDir, repo, 'src/app/dashboard/penguji/jadwal/page.tsx');
    let code = fs.readFileSync(pagePath, 'utf8');

    const badInjection = '{isPendingReschedule ? (';
    
    const iifeWrapper = `
                                {(() => {
                                  const parsedCatatan = (() => {
                                    if (!item.catatan) return null;
                                    try {
                                      const p = JSON.parse(item.catatan);
                                      if (p.type === "RESCHEDULE_REQUEST") return p;
                                    } catch(e) {}
                                    return null;
                                  })();
                                  const isPendingReschedule = parsedCatatan?.status === "pending";
                                  return (
                                    <>
                                      {isPendingReschedule ? (`.trimStart();

    if (code.includes(badInjection) && !code.includes('const parsedCatatan = ')) {
      code = code.replace(badInjection, iifeWrapper);
      
      const buttonEnd = `<Calendar className="w-4 h-4" /> Ubah Jadwal
                                  </button>
                                )}`;
      const buttonEndFallback = `<Calendar className="w-4 h-4" /> Ubah Jadwal\r\n                                  </button>\r\n                                )}`;
      
      const buttonEndReplacement = `<Calendar className="w-4 h-4" /> Ubah Jadwal
                                  </button>
                                )}
                                    </>
                                  );
                                })()}`;
      
      if (code.includes(buttonEnd)) {
        code = code.replace(buttonEnd, buttonEndReplacement);
      } else if (code.includes(buttonEndFallback)) {
        code = code.replace(buttonEndFallback, buttonEndReplacement);
      }
      
      fs.writeFileSync(pagePath, code);
      console.log('Fixed', repo);
    }
  } catch (e) {
    console.error('Error on', repo, e.message);
  }
}
