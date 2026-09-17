const fs = require('fs');
const path = require('path');
const baseDir = path.resolve('C:/Users/itpua/Dev/Work/al-andalus');
const repos = ['alandalus-alimam', 'andalus-pusat-putri', 'andalus-pusat-putra', 'alandalus-ululalbaab', 'template-demo'];

for (const repo of repos) {
  try {
    const routePath = path.join(baseDir, repo, 'src/app/api/pendaftar/undangan-seleksi/route.ts');
    let code = fs.readFileSync(routePath, 'utf8');

    // We replace the flawed ALLOWED_STATUSES array
    const oldArray = `const ALLOWED_STATUSES = [
      "data_completed",
      "docs_uploaded",
      "docs_incomplete",
      "docs_rejected",
      "docs_verified",
      "selection",
      "scheduled",
      "tested",
      "announced",
      "accepted",
      "enrolled",
    ];`;
    
    const newArray = `const ALLOWED_STATUSES = [
      "docs_verified",
      "selection",
      "testing",
      "scheduled",
      "tested",
      "announced",
      "accepted",
      "enrolled",
    ];`;

    if (code.includes('data_completed')) {
      code = code.replace(oldArray, newArray);
      fs.writeFileSync(routePath, code);
      console.log(`Updated undangan-seleksi guard in ${repo}`);
    }
  } catch (e) {
    console.error(`Error on ${repo}:`, e.message);
  }
}
