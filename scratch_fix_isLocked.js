const fs = require('fs');
const path = require('path');
const baseDir = path.resolve('C:/Users/itpua/Dev/Work/al-andalus');
const repos = ['alandalus-alimam', 'andalus-pusat-putri', 'andalus-pusat-putra', 'alandalus-ululalbaab', 'template-demo'];

for (const repo of repos) {
  try {
    const filePath = path.join(baseDir, repo, 'src/app/dashboard/pendaftar/components/tabs/UploadBerkas.tsx');
    let code = fs.readFileSync(filePath, 'utf8');

    // Replace isLocked and isAllRequiredUploaded logic
    const oldLogic = `  const isAllRequiredUploaded = Boolean(
    summary && summary.progress.required.total > 0 && summary.progress.required.uploaded === summary.progress.required.total
  );

  const isLocked = [
    "docs_uploaded",
    "docs_verified",
    "scheduled",
    "tested",
    "announced",
    "accepted",
    "enrolled",
  ].includes(pendaftarStatus) && (!["accepted", "enrolled"].includes(pendaftarStatus) || isAllRequiredUploaded);`;

    const newLogic = `  const isAllRequiredUploaded = Boolean(
    summary && summary.progress.required.total > 0 && summary.progress.required.uploaded === summary.progress.required.total
  );
  
  const hasRejectedOrPendingRequired = dokumenList.some(d => d.required && (d.status === 'pending' || d.status === 'rejected'));

  const isLocked = [
    "docs_uploaded",
    "docs_verified",
    "scheduled",
    "tested",
    "announced",
    "accepted",
    "enrolled",
  ].includes(pendaftarStatus) && !hasRejectedOrPendingRequired;`;

    // Try a fuzzy replace if whitespace differs
    const regex = /const isAllRequiredUploaded = Boolean\([\s\S]*?includes\(pendaftarStatus\)([\s\S]*?isAllRequiredUploaded\);|;)/;
    
    if (regex.test(code)) {
      code = code.replace(regex, newLogic);
      fs.writeFileSync(filePath, code);
      console.log(`Updated isLocked logic in ${repo}`);
    } else {
      console.log(`Could not find isLocked logic in ${repo}`);
    }
  } catch (e) {
    console.error(`Error on ${repo}:`, e.message);
  }
}
