const fs = require('fs');
const wablas = fs.readFileSync('src/lib/wablas.ts', 'utf8');
const templateMatch = wablas.match(/test_schedule: `([\s\S]*?)`,/);
const template = templateMatch ? templateMatch[1] : '';

console.log("=== TEMPLATE ===");
console.log(template);

let message = template.replace('{{tempat}}', 'Online (Google Meet)');

const data = { meeting_link: 'https://meet.google.com/abc', tempat: 'Online (Google Meet)' };

const match = message.match(/(.+) \*Tempat:\* .*/);
console.log("=== REGEX MATCH ===");
console.log(match);

if (data.meeting_link) {
    if (data.tempat === data.meeting_link || data.tempat.includes("Online")) {
      message = message.replace(
        /(.+) \*Tempat:\* .*/,
        `$1 *Link Meeting:* ${data.meeting_link}`
      );
    } else {
      message = message.replace(
        /(.+) \*Tempat:\* .*/,
        `$1 *Tempat:* ${data.tempat}\n$1 *Link Meeting:* ${data.meeting_link}`
      );
    }
}
console.log("=== FINAL MESSAGE ===");
console.log(message);
