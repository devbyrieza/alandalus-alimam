const fs = require('fs');
const path = require('path');
const baseDir = path.resolve('C:/Users/itpua/Dev/Work/al-andalus');
const repos = ['alandalus-alimam', 'andalus-pusat-putri', 'andalus-pusat-putra', 'alandalus-ululalbaab', 'template-demo'];

const newArray = `const ALLOWED_STATUSES = [
      "data_completed",
      "docs_uploaded",
      "docs_incomplete",
      "docs_rejected",
      "docs_verified",
      "selection",
      "testing",
      "scheduled",
      "tested",
      "announced",
      "accepted",
      "enrolled",
    ];`;

for (const repo of repos) {
  try {
    // Fix submit route
    const submitPath = path.join(baseDir, repo, 'src/app/api/pendaftar/ujian/submit/route.ts');
    let submitCode = fs.readFileSync(submitPath, 'utf8');
    
    // Find the current ALLOWED_STATUSES array in submit route and replace it
    const submitRegex = /const ALLOWED_STATUSES = \[\s*"docs_verified"[\s\S]*?"enrolled",\s*\];/;
    if (submitRegex.test(submitCode)) {
      submitCode = submitCode.replace(submitRegex, newArray);
      fs.writeFileSync(submitPath, submitCode);
      console.log(`Updated submit route in ${repo}`);
    }

    // Fix undangan-seleksi route
    const undanganPath = path.join(baseDir, repo, 'src/app/api/pendaftar/undangan-seleksi/route.ts');
    let undanganCode = fs.readFileSync(undanganPath, 'utf8');
    
    // Find the current ALLOWED_STATUSES array in undangan route and replace it
    const undanganRegex = /const ALLOWED_STATUSES = \[\s*"docs_verified"[\s\S]*?"enrolled",\s*\];/;
    if (undanganRegex.test(undanganCode)) {
      undanganCode = undanganCode.replace(undanganRegex, newArray);
      fs.writeFileSync(undanganPath, undanganCode);
      console.log(`Updated undangan-seleksi route in ${repo}`);
    }

  } catch (e) {
    console.error(`Error on ${repo}:`, e.message);
  }
}
