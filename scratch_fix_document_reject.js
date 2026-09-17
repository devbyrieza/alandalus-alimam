const fs = require('fs');
const path = require('path');
const baseDir = path.resolve('C:/Users/itpua/Dev/Work/al-andalus');
const repos = ['alandalus-alimam', 'andalus-pusat-putri', 'andalus-pusat-putra', 'alandalus-ululalbaab', 'template-demo'];

for (const repo of repos) {
  try {
    const routePath = path.join(baseDir, repo, 'src/app/api/admin/verifikasi/dokumen/route.ts');
    let code = fs.readFileSync(routePath, 'utf8');

    // Replace the REJECTED logic
    const oldLogic = `// REJECTED: Revert status if it was 'docs_verified'
        if (currentPendaftar?.status_pendaftaran === "docs_verified") {
          await prisma.pendaftar.update({
            where: { id: dokumen.pendaftar_id },
            data: { status_pendaftaran: "docs_uploaded" } });
        }`;
        
    const newLogic = `// REJECTED: Change status to docs_rejected so they can re-upload
        const revertStatuses = ["docs_verified", "docs_uploaded", "selection"];
        if (currentPendaftar && revertStatuses.includes(currentPendaftar.status_pendaftaran)) {
          await prisma.pendaftar.update({
            where: { id: dokumen.pendaftar_id },
            data: { status_pendaftaran: "docs_rejected" } });
        }`;

    if (code.includes(oldLogic)) {
      code = code.replace(oldLogic, newLogic);
      fs.writeFileSync(routePath, code);
      console.log(`Fixed rejection status in ${repo}`);
    } else {
      console.log(`Could not find old logic in ${repo}`);
    }
  } catch (e) {
    console.error(`Error on ${repo}:`, e.message);
  }
}
