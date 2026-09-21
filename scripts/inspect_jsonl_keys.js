const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../pendaftar_db.jsonl');
const lines = fs.readFileSync(filePath, 'utf8').trim().split('\n').filter(Boolean);

console.log("=== FIRST RECORD KEYS AND DATA ===");
const first = JSON.parse(lines[0]);
console.log(JSON.stringify(first, null, 2));
