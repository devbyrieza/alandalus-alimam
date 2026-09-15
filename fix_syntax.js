const fs = require('fs');

const repos = [
  'alandalus-alimam',
  'andalus-pusat-putri',
  'andalus-pusat-putra',
  'alandalus-ululalbaab',
  'template-demo'
];

for (const repo of repos) {
  const editPath = `../${repo}/src/app/api/exam-sessions/bulk-edit/route.ts`;
  const deletePath = `../${repo}/src/app/api/exam-sessions/bulk-delete/route.ts`;

  for (const filePath of [editPath, deletePath]) {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Fix backticks and template literals
      content = content.replace(/\\`/g, '`');
      content = content.replace(/\\\${/g, '${');
      
      fs.writeFileSync(filePath, content);
      console.log(`Fixed syntax in ${filePath}`);
    }
  }
}
