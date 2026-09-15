const fs = require('fs');

const repos = [
  'alandalus-alimam',
  'andalus-pusat-putri',
  'andalus-pusat-putra',
  'alandalus-ululalbaab',
  'template-demo'
];

for (const repo of repos) {
  const filePath = `../${repo}/src/app/api/pendaftar/jadwal/route.ts`;
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${repo}`);
    continue;
  }

  let code = fs.readFileSync(filePath, 'utf8');

  const startMarker = "// 3. SCHEDULE 4-HOUR REMINDERS (Sent 4 hours before exam)";
  
  // Find where it ends by looking for the next "return NextResponse.json({ success: true, data:"
  const startIndex = code.indexOf(startMarker);
  
  if (startIndex !== -1) {
    const nextReturnIndex = code.indexOf("return NextResponse.json({ success: true, data:", startIndex);
    
    if (nextReturnIndex !== -1) {
      const part1 = code.substring(0, startIndex);
      const part2 = code.substring(nextReturnIndex);
      
      const newCode = part1 + part2;
      fs.writeFileSync(filePath, newCode);
      console.log(`Successfully removed 4-hour reminder block in ${repo}`);
    } else {
      console.log(`End marker not found in ${repo}`);
    }
  } else {
    console.log(`Start marker not found in ${repo}`);
  }
}
