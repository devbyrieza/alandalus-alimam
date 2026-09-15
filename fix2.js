const fs = require('fs');
let code = fs.readFileSync('src/app/api/exam-sessions/route.ts', 'utf8');

code = code.replace('export async function PATCH(request: Request)', 'export async function PUT(request: Request)');

code = code.replace(
  '  const { searchParams } = new URL(request.url);\n  const id = searchParams.get("id");',
  '  let body: any = {};\n  try { body = await request.json(); } catch(e) {}\n  const id = body.id || (new URL(request.url).searchParams.get("id"));'
);

code = code.replace(
  '    const body = await request.json();\n    const { title, start_time, end_time, location, notes } = body;',
  '    const { title, start_time, end_time, location, notes } = body;'
);

code = code.replace(
  '    console.error("PATCH exam-sessions error:", error);',
  '    console.error("PUT exam-sessions error:", error);'
);

fs.writeFileSync('src/app/api/exam-sessions/route.ts', code);
