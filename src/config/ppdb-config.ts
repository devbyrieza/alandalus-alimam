// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   SPMB CONFIGURATION - PESANTREN AL IMAM AL ISLAMI (KHUSUS PUTRI)
//   Tahun Ajaran 2027/2028 (SPMB)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const PPDB_CONFIG = {
  // 🏫 INFO PESANTREN
  pesantren: {
    nama: "Pesantren Al Imam Al Islami",
    singkatan: "Al Imam Al Islami",
    legal: "Pesantren Al-Imam Al-Islami Managed by Al Andalus IIBS",
    alamat:
      "Jl. Pelabuhan II KM 18, Kampung Pupunjul, RT.01/RW.02, Cikembar, Kec. Cikembar, Kabupaten Sukabumi, Jawa Barat 43157",
    telepon: "+62 851-1152-4441",
    email: "alandalusalimam@gmail.com",
    emailPpdb: "alandalusalimam@gmail.com",
    website: "https://spmb.pesantren-alimam.com",
  },

  // 🎨 BRAND COLORS (Pink Rose Khas Al-Imam Khusus Putri)
  colors: {
    primary: {
      50: "#fff1f2",
      100: "#ffe4e6",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d74", // Warna utama tombol & aksi
      700: "#be123c",
      800: "#9f1239",
      900: "#881337",
    },
    secondary: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
    },
    accent: {
      gold: "#fbbf24",
      teal: "#14b8a6",
      red: "#ef4444",
    },
  },

  // 📱 PROGRAM PENDIDIKAN (KHUSUS PUTRI)
  programs: [
    {
      id: "mts",
      name: "MTs",
      fullName: "Madrasah Tsanawiyah (MTs)",
      description:
        "Program pendidikan formal setara SMP memadukan kurikulum kepesantrenan turots khas Andalus, Tahfidz Al-Qur'an, dan kurikulum nasional.",
      image: "/images/kelas-bagian-dalam-saat-para-santri-belajar.png",
      theme: "pink",
      kuotaPutri: 48,
    },
    {
      id: "il",
      name: "I'dad Lughowi",
      fullName: "Program I'dad Lughowi (Persiapan Bahasa Arab)",
      description:
        "Program persiapan bahasa Arab 1 tahun bagi yang belum mampu berbahasa Arab aktif sebelum masuk MA.",
      image: "/images/foto-talent-santri-satu-orang-almamater-background-perlu-diedit.png",
      theme: "gold",
      kuotaPutri: 24,
    },
  ],

  // 💰 BIAYA PENDIDIKAN & PENDAFTARAN
  pricing: [
    {
      label: "Uang Pendaftaran",
      amount: "Rp 250.000",
      note: "Biaya pendaftaran dan tes seleksi (non-refundable)",
    },
    {
      label: "Uang Pangkal",
      amount: "Rp 9.900.000",
      note: "Dapat dicicil 3x: cicilan 1 sebesar 50% sepekan setelah pengumuman kelulusan, sisanya 2x s/d Mei 2027",
    },
    {
      label: "SPP Bulanan (All-In)",
      amount: "Rp 1.100.000",
      note: "Per bulan (Total 1 tahun Rp 13.200.000 All-In mencakup makan, asrama, & kegiatan)",
    },
  ],

  // 🏦 REKENING BANK RESMI
  bank: {
    namaBank: "Bank Syariah Indonesia (BSI)",
    nomorRekening: "4222224441",
    atasNama: "Al Andalus Al Imam",
    kodeBank: "451",
  },

  // 📅 JADWAL SPMB 2027/2028
  schedule: {
    tahunAjaran: "2027/2028",
    pembukaan: "16 Oktober 2026",
    penutupan: "20 Desember 2026",
    jadwalTes: "16 Oktober – 20 Desember 2026",
  },

  // 👥 DEWAN PEMBINA, PENGURUS & PENGASUH
  dewanPembina: [
    "Ust. Dr. Muhammad Arifin Badri, Lc., M.A.",
    "Ust. Dr. Nurdin Apud Sarbini, Lc., M.Pd.",
    "H. Tarmen Tascha, S.E.",
    "Ust. Aminullah Yasin, Lc., M.Pd.",
    "Ust. Wahab Rajasam, M.Pd.",
    "Ust. Thoriq Ziyad, Lc.",
  ],

  // 🎯 VISI & MISI
  visi: "Kaderisasi Ummat Hanif, Kontributif, dan Adaptif",
  misi: [
    "Melaksanakan pendidikan aqidah yang shohihah dan ibadah yang sesuai sunnah.",
    "Menumbuhkembangkan soft skill berupa fitrah potensi dan growth mindset.",
    "Mengembangkan hard skill berupa jiwa kewirausahaan dan life skills.",
    "Membentuk generasi yang berjiwa dakwah dan mau'idzoh hasanah.",
  ],

  // 6 KEUNGGULAN PENGASUHAN (BROSUR RESMI)
  keunggulanPengasuhan: [
    "Berupaya maksimal menghidupkan fitrah santriwati diiringi adab Islami dalam interaksi.",
    "Pengawasan di setiap aktifitas santriwati.",
    "Musyrifah (guru asrama) tinggal di kamar santri.",
    "Bimbingan dengan pendekatan penyadaran dan pendewasaan pada setiap kesalahan santriwati, bukan sekedar hukuman.",
    "Pengasuhan dilakukan sepenuhnya oleh ustadzah.",
    "Tidak memberikan kewenangan pada santriwati senior untuk menghukum santriwati lain.",
  ],

  // 📋 FASILITAS PESANTREN (14 ITEM BROSUR)
  fasilitas: [
    "Masjid Kapasitas 600 Jamaah",
    "Gedung Sekolah Terpadu",
    "Asrama Representatif",
    "Fasilitas Olahraga",
    "Laboratorium IPA",
    "UKS (Unit Kesehatan Santri)",
    "Mini Market",
    "Mesin Air Bio & RO",
    "Lab Komputer",
    "Ruang Makan",
    "Perpustakaan",
    "Kolam Ikan",
    "Kantin",
    "Aula",
  ],

  // 🧶 EKSTRAKURIKULER (11 ITEM BROSUR)
  ekstrakurikuler: [
    "Merajut",
    "Menjahit",
    "Tata Boga",
    "Karate",
    "Komputer",
    "Photography",
    "Panahan",
    "Pramuka",
    "Keputrian",
    "English Club",
    "Desain Grafis",
  ],

  // 📋 PERSYARATAN BERKAS
  requirements: [
    "Fotocopy Akta Kelahiran (1 lembar)",
    "Fotocopy Kartu Keluarga (1 lembar)",
    "Fotocopy Rapor SD/MI sederajat (bagi MTs) atau Ijazah SMP/MTs (bagi IL)",
    "Pas Foto 3x4 (4 lembar) memakai jilbab hitam latar belakang biru",
    "Surat Keterangan Sehat dari Dokter/Puskesmas",
    "Surat kesediaan mematuhi tata tertib pesantren dan bebas dari perilaku menyimpang",
  ],

  // 🔗 KONTAK & SOSMED
  contact: {
    whatsapp: "+6285111524441",
    phone: "0851-1152-4441",
    instagram: "@alandalusalimam",
    facebook: "Al-Andalus Al-Imam",
    youtube: "Al Andalus Al Imam",
  },

  tahunAjaran: "2027/2028",
  angkatan: "Angkatan ke-5 (2027/2028)",

  // ⚙️ SETTING TEKNIS
  technical: {
    appName: "SPMB Al Imam Al Islami",
    appDescription: "Sistem Penerimaan Murid Baru (SPMB) 2027/2028",
    version: "2.0.0",
    author: "Rieza Eka Tomara",
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   HELPER FUNCTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const getPesantrenInfo = () => PPDB_CONFIG.pesantren;
export const getPrograms = () => PPDB_CONFIG.programs;
export const getPricing = () => PPDB_CONFIG.pricing;
export const getRequirements = () => PPDB_CONFIG.requirements;
export const getContact = () => PPDB_CONFIG.contact;
export const getColors = () => PPDB_CONFIG.colors;
export const getBank = () => PPDB_CONFIG.bank;
export const getSchedule = () => PPDB_CONFIG.schedule;
export const getDewanPembina = () => PPDB_CONFIG.dewanPembina;

export const generateCSSVariables = () => {
  const { colors } = PPDB_CONFIG;
  return {
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
  };
};
