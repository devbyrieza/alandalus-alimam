const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const DEFAULT_PASSWORD_ALIMAM = "PAAS2026!";

async function main() {
  console.log("=== STEP 1: UPSERT PROFILES FOR AL-IMAM ===");
  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD_ALIMAM, 10);

  const profilesData = [
    {
      full_name: "Rahma Khoerunisa Nurahman",
      username: "rahma.khoerunisa",
      role: "penguji",
      secondary_roles: [],
      phone: "085111524451",
      jenis_kelamin: "P",
    },
    {
      full_name: "Gina Sausan Fadhilah B.A.",
      username: "gina.sausan",
      role: "penguji",
      secondary_roles: [],
      phone: "085111524452",
      jenis_kelamin: "P",
    },
    {
      full_name: "Iffah Afifah, S.Sos.",
      username: "iffah.afifah",
      role: "penguji",
      secondary_roles: ["penguji_bahasa_arab"],
      phone: "085111524453",
      jenis_kelamin: "P",
    },
    {
      full_name: "Halimah Fauziah, S.Pd.I.",
      username: "halimah.fauziah",
      role: "pewawancara_calsan",
      secondary_roles: [],
      phone: "085111524454",
      jenis_kelamin: "P",
    },
    {
      full_name: "Rima Maryani Putri Utami, S.Pd.I.",
      username: "rima.maryani",
      role: "pewawancara_calsan",
      secondary_roles: [],
      phone: "085111524455",
      jenis_kelamin: "P",
    },
    {
      full_name: "Nabilah, S.Pd.",
      username: "nabilah",
      role: "pewawancara_calsan",
      secondary_roles: [],
      phone: "085111524456",
      jenis_kelamin: "P",
    },
    {
      full_name: "Maulidin Bachtiar",
      username: "maulidin.bachtiar",
      role: "pewawancara_cawalsan",
      secondary_roles: [],
      phone: "0895332071063",
      jenis_kelamin: "L",
    },
    {
      full_name: "Ahmad Farhan, Lc., M.A.",
      username: "ahmad.farhan",
      role: "penguji_bahasa_arab",
      secondary_roles: [],
      phone: "081285300817",
      jenis_kelamin: "L",
    },
  ];

  const profileMap = new Map();

  for (const item of profilesData) {
    let existing = await prisma.profile.findFirst({
      where: {
        OR: [
          { username: item.username },
          { full_name: item.full_name }
        ]
      }
    });

    if (existing) {
      existing = await prisma.profile.update({
        where: { id: existing.id },
        data: {
          full_name: item.full_name,
          username: item.username,
          role: item.role,
          secondary_roles: item.secondary_roles,
          jenis_kelamin: item.jenis_kelamin,
          phone: existing.phone && existing.phone !== '-' ? existing.phone : item.phone,
          password_hash: existing.password_hash || passwordHash,
          plain_password: existing.plain_password || DEFAULT_PASSWORD_ALIMAM,
        }
      });
      console.log(`Updated profile: ${item.full_name} (${existing.id})`);
    } else {
      existing = await prisma.profile.create({
        data: {
          full_name: item.full_name,
          username: item.username,
          role: item.role,
          secondary_roles: item.secondary_roles,
          phone: item.phone,
          jenis_kelamin: item.jenis_kelamin,
          password_hash: passwordHash,
          plain_password: DEFAULT_PASSWORD_ALIMAM,
        }
      });
      console.log(`Created profile: ${item.full_name} (${existing.id})`);
    }
    profileMap.set(item.full_name, existing.id);
  }

  console.log("\n=== STEP 2: GENERATE SLOTS FOR AL-IMAM (21 OKT - 31 DES 2026) ===");

  // Define schedules
  // day: 0=Ahad, 1=Senin, 2=Selasa, 3=Rabu, 4=Kamis, 5=Jumat, 6=Sabtu
  const examinerSchedules = [
    // 1. Rahma Khoerunisa Nurahman (Penguji Al-Qur'an)
    {
      name: "Rahma Khoerunisa Nurahman",
      title: "Seleksi Al Qur'an (Rahma Khoerunisa Nurahman)",
      rules: [
        {
          days: [1, 2, 3, 4], // Senin-Kamis
          slots: [
            ["08:00", "08:30"],
            ["08:30", "09:00"],
            ["09:00", "09:30"],
            ["09:30", "10:00"],
            ["10:00", "10:30"],
            ["10:30", "11:00"]
          ]
        }
      ]
    },
    // 2. Gina Sausan Fadhilah B.A. (Penguji Al-Qur'an)
    {
      name: "Gina Sausan Fadhilah B.A.",
      title: "Seleksi Al Qur'an (Gina Sausan Fadhilah B.A.)",
      rules: [
        {
          days: [4], // Kamis
          slots: [
            ["09:00", "09:30"],
            ["09:30", "10:00"],
            ["10:00", "10:30"],
            ["10:30", "11:00"],
            ["11:00", "11:30"],
            ["11:30", "12:00"]
          ]
        }
      ]
    },
    // 3. Iffah Afifah, S.Sos. - Peran 1: Penguji Al-Qur'an
    {
      name: "Iffah Afifah, S.Sos.",
      title: "Seleksi Al Qur'an (Iffah Afifah, S.Sos.)",
      rules: [
        {
          days: [1, 2, 4, 5, 6], // Senin-Sabtu kecuali Rabu
          slots: [
            ["16:00", "16:30"],
            ["16:30", "17:00"],
            ["17:00", "17:30"]
          ]
        }
      ]
    },
    // Iffah Afifah, S.Sos. - Peran 2: Penguji Tes Lisan Bahasa Arab (Khusus SMA)
    {
      name: "Iffah Afifah, S.Sos.",
      title: "Tes Lisan Bahasa Arab (Iffah Afifah, S.Sos.)",
      rules: [
        {
          days: [1, 2, 4, 5, 6], // Senin-Sabtu kecuali Rabu
          slots: [
            ["16:00", "16:30"],
            ["16:30", "17:00"],
            ["17:00", "17:30"]
          ]
        }
      ]
    },
    // 4. Halimah Fauziah, S.Pd.I. (Pewawancara Calon Santri)
    {
      name: "Halimah Fauziah, S.Pd.I.",
      title: "Seleksi Wawancara Calon Santri (Halimah Fauziah, S.Pd.I.)",
      rules: [
        {
          days: [1, 2, 3, 4, 5], // Senin-Jumat
          slots: [
            ["14:00", "14:30"],
            ["14:30", "15:00"],
            ["15:00", "15:30"],
            ["15:30", "16:00"],
            ["16:00", "16:30"]
          ]
        },
        {
          days: [1, 2, 3, 4, 5, 6], // Senin-Sabtu malam
          slots: [
            ["19:30", "20:00"],
            ["20:00", "20:30"]
          ]
        }
      ]
    },
    // 5. Rima Maryani Putri Utami, S.Pd.I. (Pewawancara Calon Santri)
    {
      name: "Rima Maryani Putri Utami, S.Pd.I.",
      title: "Seleksi Wawancara Calon Santri (Rima Maryani Putri Utami, S.Pd.I.)",
      rules: [
        {
          days: [3, 4], // Rabu dan Kamis
          slots: [
            ["14:00", "14:30"],
            ["14:30", "15:00"],
            ["15:00", "15:30"],
            ["15:30", "16:00"]
          ]
        }
      ]
    },
    // 6. Nabilah, S.Pd. (Pewawancara Calon Santri)
    {
      name: "Nabilah, S.Pd.",
      title: "Seleksi Wawancara Calon Santri (Nabilah, S.Pd.)",
      rules: [
        {
          days: [1, 2, 3, 4, 5, 0], // Senin-Jumat & Ahad (kecuali Sabtu)
          slots: [
            ["13:30", "14:00"],
            ["14:00", "14:30"],
            ["16:00", "16:30"],
            ["16:30", "17:00"],
            ["17:00", "17:30"],
            ["19:30", "20:00"],
            ["20:00", "20:30"]
          ]
        }
      ]
    },
    // 7. Maulidin Bachtiar (Pewawancara Calon Wali)
    {
      name: "Maulidin Bachtiar",
      title: "Seleksi Wawancara Calon Orangtua/Wali Santri (Maulidin Bachtiar)",
      rules: [
        { days: [1], slots: [["13:30", "14:00"], ["14:00", "14:30"]] }, // Senin 13.30, 14.00
        { days: [2], slots: [["09:30", "10:00"], ["14:00", "14:30"]] }, // Selasa 09.30, 14.00
        { days: [4], slots: [["18:30", "19:00"]] }, // Kamis 18.30
        { days: [5], slots: [["08:30", "09:00"], ["14:00", "14:30"]] }, // Jumat 08.30, 14.00
      ]
    },
    // 8. Ahmad Farhan, Lc., M.A. (Penguji Tes Lisan Bahasa Arab SMA)
    {
      name: "Ahmad Farhan, Lc., M.A.",
      title: "Tes Lisan Bahasa Arab (Ahmad Farhan, Lc., M.A.)",
      rules: [
        {
          days: [3, 6], // Rabu dan Sabtu
          slots: [
            ["13:30", "14:00"],
            ["14:00", "14:30"],
            ["14:30", "15:00"],
            ["15:00", "15:30"],
            ["15:30", "16:00"]
          ]
        }
      ]
    },
  ];

  const startDate = new Date("2026-10-21T00:00:00+07:00");
  const endDate = new Date("2026-12-31T23:59:59+07:00");

  let totalCreated = 0;
  const sessionsToCreate = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay(); // 0-6
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    for (const examiner of examinerSchedules) {
      const creatorId = profileMap.get(examiner.name);
      if (!creatorId) {
        console.warn(`Profile ID not found for ${examiner.name}`);
        continue;
      }

      for (const rule of examiner.rules) {
        if (rule.days.includes(dayOfWeek)) {
          for (const [startT, endT] of rule.slots) {
            const startWIB = new Date(`${dateStr}T${startT}:00+07:00`);
            const endWIB = new Date(`${dateStr}T${endT}:00+07:00`);

            sessionsToCreate.push({
              title: examiner.title,
              start_time: startWIB,
              end_time: endWIB,
              quota: 1,
              booked_count: 0,
              location: "Online / Google Meet",
              notes: `Jadwal Penguji: ${examiner.name}`,
              is_active: true,
              created_by: creatorId,
            });
          }
        }
      }
    }
  }

  console.log(`Total exam sessions prepared to insert: ${sessionsToCreate.length}`);

  const CHUNK_SIZE = 500;
  for (let i = 0; i < sessionsToCreate.length; i += CHUNK_SIZE) {
    const chunk = sessionsToCreate.slice(i, i + CHUNK_SIZE);
    await prisma.examSession.createMany({
      data: chunk,
    });
    totalCreated += chunk.length;
    console.log(`Inserted ${totalCreated} / ${sessionsToCreate.length} sessions...`);
  }

  console.log(`✅ AL-IMAM: Successfully generated ${totalCreated} exam sessions!`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
