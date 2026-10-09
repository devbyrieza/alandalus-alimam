const TEMPLATE = `Y". *Jadwal seleksi masuk*

Assalamu'alaikum {{nama}},

Berikut jadwal seleksi masuk Anda:

Y". *Tanggal:* {{tanggal}}
Y ? *Waktu:* {{waktu}}
Y"? *Tempat:* {{tempat}}

Y"? *Persiapan:*`;

let message = TEMPLATE.replace('{{tempat}}', 'Online (Google Meet)');

const data = { meeting_link: 'https://meet.google.com/abc-defg-hij', tempat: 'Online (Google Meet)' };

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

if (!message.includes(data.meeting_link)) {
  message += `\n\nFallback Link: ${data.meeting_link}`;
}

console.log(message);
