
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const missingStudents = [
  { Nama: 'Andi Ibra Faeyza Hasan Alnasr', Kelas: 'MTs', NIK: '3135317771' },
  { Nama: 'Khalish', Kelas: 'MTs', NIK: '3126750872' },
  { Nama: 'Abdullah Rasyid', Kelas: 'IL', NIK: '3115058664' },
  { Nama: 'Fiqri Ramdan Handoko', Kelas: 'IL', NIK: '0111915038' },
  { Nama: 'Nurcahya Eka Putra', Kelas: 'IL', NIK: '0074350417' },
  { Nama: 'Panji Ahmad', Kelas: 'IL', NIK: '0096483042' },
  { Nama: 'Wahyu Hidayat', Kelas: 'IL', NIK: '0115034480' },
  { Nama: 'Zakaria Reynaldo', Kelas: 'IL', NIK: '3097025745' },
  { Nama: 'Muhammad Khoirul Azzam', Kelas: 'IL', NIK: '999901' },
  { Nama: 'Muhammad Hafidz Abdurrahman', Kelas: 'IL', NIK: '999902' },
  { Nama: 'Syeh Al Bani Irsyad Amrulloh', Kelas: 'IL', NIK: '999903' },
  { Nama: 'M. Naufal Alfaniri', Kelas: 'MTs', NIK: '999904' }
];

async function main() {
  console.log('Mulai menyuntikkan 12 santri...');
  const ta = await prisma.tahunAjaran.findFirst({ where: { is_active: true } }) || await prisma.tahunAjaran.findFirst();
  if (!ta) throw new Error('Tidak ada Tahun Ajaran');

  let mtsConfig = await prisma.pendaftar.count({ where: { jenjang: 'MTs' } });
  let ilConfig = await prisma.pendaftar.count({ where: { jenjang: 'IL' } });

  const pwd = await bcrypt.hash('santribaru123', 10);

  for (const s of missingStudents) {
    // Generate phone and email dummy
    const hp = '08' + Math.floor(Math.random() * 1000000000);
    const email = s.Nama.split(' ')[0].toLowerCase() + Math.floor(Math.random() * 100) + '@gmail.com';
    
    // Create Profile
    const profile = await prisma.profile.create({
      data: {
        role: 'pendaftar',
        full_name: s.Nama,
        email: email,
        phone: hp,
        password_hash: pwd
      }
    });

    let noUrut = s.Kelas === 'MTs' ? ++mtsConfig : ++ilConfig;
    let prefix = s.Kelas === 'MTs' ? 'MTA26' : 'ILA26';
    let nopend = prefix + noUrut.toString().padStart(4, '0');

    await prisma.pendaftar.create({
      data: {
        user_id: profile.id,
        tahun_ajaran_id: ta.id,
        nomor_pendaftaran: nopend,
        nik: s.NIK,
        nama_lengkap: s.Nama,
        jenis_kelamin: 'L',
        jenjang: s.Kelas,
      }
    });
    console.log(Berhasil menyuntik:  ());
  }
  console.log('Selesai!');
}

main().catch(console.error).finally(() => prisma.$disconnect());

