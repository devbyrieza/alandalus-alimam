/**
 * ─── ACCESS CONTROL SYSTEM ───
 * File ini adalah jantung dari logika alur pendaftaran (State Machine) 
 * dan sistem keamanan hak akses (Role-Based Access Control / RBAC).
 * 
 * Digunakan oleh: Sidebar, Middleware, dan Halaman Dashboard untuk menentukan
 * apa yang bisa dilihat dan dilakukan oleh user.
 */

// ─── 1. STATUS PENDAFTARAN (STATE MACHINE) ───

/**
 * StatusProses
 * Mendefinisikan semua tahapan yang harus dilalui oleh seorang pendaftar.
 * Dari membuat akun (draft) sampai menjadi santri resmi (enrolled).
 */
export type StatusProses =
  | "draft"                // Tahap awal: Akun dibuat tapi belum bayar
  | "registered"           // Akun terdaftar secara sistem
  | "payment_verification" // User sudah upload bukti bayar, menunggu admin keuangan
  | "verified"             // LUNAS: Pembayaran sudah dikonfirmasi admin
  | "payment_rejected"     // Masalah pembayaran: Admin butuh bukti bayar baru
  | "rejected"             // Akhir: Pendaftar tidak lulus seleksi
  | "scheduled"            // Sudah memilih jadwal ujian seleksi
  | "accepted"             // LULUS: Dinyatakan diterima di pesantren
  // Status tambahan untuk kompatibilitas data lama (Legacy)
  | "awaiting_payment"
  | "paid"
  | "data_completed"
  | "docs_uploaded"
  | "docs_verified"
  | "tested"
  | "announced"
  | "enrolled";

/**
 * STATUS_ORDER
 * Menentukan urutan hierarki status.
 * Penting untuk logika "halaman selanjutnya hanya terbuka jika halaman sebelumnya selesai".
 */
export const STATUS_ORDER: StatusProses[] = [
  "draft",
  "registered",
  "awaiting_payment",
  "payment_verification",
  "verified",
  "paid",
  "data_completed",
  "docs_uploaded",
  "docs_verified",
  "scheduled",
  "tested",
  "announced",
  "accepted",
  "enrolled",
];

/**
 * getStatusIndex
 * Mencari posisi numerik sebuah status dalam urutan progres.
 */
export function getStatusIndex(status: StatusProses | string): number {
  if (!status) return 0;
  const s = status.toLowerCase() as StatusProses;
  const index = STATUS_ORDER.indexOf(s);
  return index >= 0 ? index : 0;
}

/**
 * hasReachedStatus
 * Mengecek apakah user sudah mencapai atau melewati tahap tertentu.
 * Contoh: User bisa upload dokumen jika sudah mencapai status 'verified'.
 */
export function hasReachedStatus(
  currentStatus: StatusProses,
  minimumStatus: StatusProses,
): boolean {
  return getStatusIndex(currentStatus) >= getStatusIndex(minimumStatus);
}

// ─── 2. SISTEM TABS (NAVIGATION CONTROL) ───

export type TabName =
  | "data-pribadi"
  | "pembayaran-pendaftaran"
  | "status-pembayaran"
  | "kelengkapan-berkas"
  | "upload-berkas"
  | "download-berkas"
  | "undangan-seleksi"
  | "pengumuman"
  | "daftar-ulang"
  | "profil";

/**
 * STEP_REQUIREMENTS
 * Aturan akses untuk setiap tab di Dashboard Pendaftar.
 */
export const STEP_REQUIREMENTS: Record<
  TabName,
  {
    minimumStatus: StatusProses | null;
    label: string;
    description: string;
  }
> = {
  "data-pribadi": {
    minimumStatus: null,
    label: "Data Pribadi",
    description: "Lihat data pendaftaran Anda",
  },
  "pembayaran-pendaftaran": {
    minimumStatus: null,
    label: "Pembayaran",
    description: "Lakukan pembayaran pendaftaran",
  },
  "status-pembayaran": {
    minimumStatus: null,
    label: "Status Bayar",
    description: "Cek status pembayaran",
  },
  profil: {
    minimumStatus: null,
    label: "Profil",
    description: "Kelola profil Anda",
  },
  "kelengkapan-berkas": {
    minimumStatus: "verified", // Wajib Lunas dulu baru bisa isi data santri
    label: "Isi Data Lengkap",
    description: "Menunggu pembayaran diverifikasi admin",
  },
  "upload-berkas": {
    minimumStatus: "data_completed",
    label: "Upload Berkas",
    description: "Data lengkap harus diisi terlebih dahulu",
  },
  "download-berkas": {
    minimumStatus: "docs_uploaded",
    label: "Download Berkas",
    description: "Berkas harus diupload terlebih dahulu",
  },
  "undangan-seleksi": {
    minimumStatus: "docs_verified",
    label: "Jadwal Seleksi",
    description: "Menunggu dokumen diverifikasi admin",
  },
  pengumuman: {
    minimumStatus: "tested",
    label: "Pengumuman",
    description: "Ikuti seleksi ujian terlebih dahulu",
  },
  "daftar-ulang": {
    minimumStatus: "accepted",
    label: "Daftar Ulang",
    description: "Anda belum dinyatakan diterima",
  },
};

/**
 * canAccessTab
 * Memvalidasi apakah user boleh mengklik sebuah menu tab.
 */
export function canAccessTab(
  tabName: TabName,
  statusProses: StatusProses,
): boolean {
  const requirement = STEP_REQUIREMENTS[tabName];
  if (!requirement || !requirement.minimumStatus) return true;
  return hasReachedStatus(statusProses, requirement.minimumStatus);
}

// ─── 3. GUIDED ACTION LOGIC ───

/**
 * getNextStep
 * Fungsi pintar untuk menentukan tombol apa yang harus muncul di Dashboard Hero Section.
 */
export function getNextStep(currentStatus: StatusProses): {
  status: StatusProses;
  action: string;
  href: string;
} | null {
  const nextSteps: Record<string, { status: StatusProses; action: string; href: string }> = {
    draft: { status: "payment_verification", action: "Klik di Sini untuk Bayar", href: "/dashboard/pendaftar/pembayaran-pendaftaran" },
    registered: { status: "payment_verification", action: "Klik di Sini untuk Bayar", href: "/dashboard/pendaftar/pembayaran-pendaftaran" },
    awaiting_payment: { status: "payment_verification", action: "Upload Bukti Bayar", href: "/dashboard/pendaftar/pembayaran-pendaftaran" },
    payment_verification: { status: "verified", action: "Tunggu Verifikasi Keuangan", href: "/dashboard/pendaftar/pembayaran-pendaftaran" },
    verified: { status: "data_completed", action: "Lanjut Isi Data Lengkap", href: "/dashboard/pendaftar/isi-data-lengkap" },
    paid: { status: "data_completed", action: "Lanjut Isi Data Lengkap", href: "/dashboard/pendaftar/isi-data-lengkap" },
    data_completed: { status: "docs_uploaded", action: "Lanjut Upload Berkas", href: "/dashboard/pendaftar/upload-berkas" },
    docs_uploaded: { status: "docs_verified", action: "Tunggu Verifikasi Berkas", href: "/dashboard/pendaftar/upload-berkas" },
    docs_verified: { status: "scheduled", action: "Pilih Jadwal Seleksi", href: "/dashboard/pendaftar/undangan-seleksi" },
    scheduled: { status: "tested", action: "Siap Mengikuti Ujian", href: "/dashboard/pendaftar/ujian" },
    tested: { status: "announced", action: "Tunggu Pengumuman", href: "/dashboard/pendaftar/pengumuman" },
    announced: { status: "accepted", action: "Lihat Hasil Kelulusan", href: "/dashboard/pendaftar/pengumuman" },
    accepted: { status: "enrolled", action: "Lakukan Daftar Ulang", href: "/dashboard/pendaftar/daftar-ulang" },
  };

  return nextSteps[currentStatus] || null;
}

// ─── 4. DISPLAY FORMATTERS ───

/**
 * formatStatusDisplay
 * Mengubah kode status teknis (misal: 'draft') menjadi label cantik (misal: 'Tahap 1: Pembayaran') 
 * beserta warnanya untuk UI.
 */
export function formatStatusDisplay(status: StatusProses): { label: string; color: string } {
  const statusMap: Record<string, { label: string; color: string }> = {
    draft: { label: "Tahap 1: Pembayaran", color: "bg-amber-100 text-amber-700" },
    registered: { label: "Tahap 1: Pembayaran", color: "bg-amber-100 text-amber-700" },
    awaiting_payment: { label: "Menunggu Bukti Bayar", color: "bg-amber-100 text-amber-700" },
    payment_verification: { label: "Verifikasi Keuangan", color: "bg-orange-100 text-orange-700" },
    verified: { label: "Lunas & Terverifikasi", color: "bg-blue-100 text-blue-700" },
    paid: { label: "Lunas & Terverifikasi", color: "bg-blue-100 text-blue-700" },
    payment_rejected: { label: "Bayar Perlu Dicek", color: "bg-red-100 text-red-700" },
    rejected: { label: "Berkas Belum Sesuai", color: "bg-red-100 text-red-700" },
    data_completed: { label: "Tahap 2: Isi Berkas", color: "bg-teal-100 text-teal-700" },
    docs_uploaded: { label: "Menunggu Cek Panitia", color: "bg-indigo-100 text-indigo-700" },
    docs_verified: { label: "Berkas Selesai", color: "bg-green-100 text-green-700" },
    scheduled: { label: "Jadwal Tes Tersedia", color: "bg-purple-100 text-purple-700" },
    tested: { label: "Tes Selesai Diikuti", color: "bg-violet-100 text-violet-700" },
    announced: { label: "Hasil Sudah Keluar", color: "bg-cyan-100 text-cyan-700" },
    accepted: { label: "Alhamdulillah LULUS", color: "bg-green-100 text-green-700" },
    enrolled: { label: "Santri Terdaftar", color: "bg-emerald-100 text-emerald-700" },
  };

  return statusMap[status] || { label: status, color: "bg-stone-100 text-stone-700" };
}

// ─── 5. ROLE-BASED ACCESS CONTROL (RBAC) ───

export type UserRole =
  | "pendaftar"
  | "admin_berkas"
  | "admin_keuangan"
  | "penguji"
  | "pewawancara_calsan"
  | "pewawancara_cawalsan"
  | "admin_super"
  | "admin";

export const ROLE_LABELS: Record<UserRole, string> = {
  pendaftar: "Pendaftar",
  admin_berkas: "Admin Berkas",
  admin_keuangan: "Admin Keuangan",
  penguji: "Penguji Al-Qur'an",
  pewawancara_calsan: "Pewawancara Calsan",
  pewawancara_cawalsan: "Pewawancara Cawalsan",
  admin_super: "Admin Super",
  admin: "Administrator",
};

/**
 * ROLE_PERMISSIONS
 * Daftar hak akses mentah untuk setiap role.
 * Digunakan untuk proteksi tombol atau fitur spesifik.
 */
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  pendaftar: ["view_own_data", "edit_own_data", "upload_documents", "view_payment_status", "view_announcement"],
  admin_berkas: ["view_pendaftar_list", "view_pendaftar_detail", "verify_documents", "export_pendaftar_data"],
  admin_keuangan: ["view_pendaftar_list", "view_payment_list", "verify_payment", "view_financial_reports"],
  penguji: ["view_exam_schedule", "input_exam_scores"],
  pewawancara_calsan: ["view_exam_schedule", "input_exam_scores"],
  pewawancara_cawalsan: ["view_exam_schedule", "input_exam_scores"],
  admin_super: ["view_pendaftar_list", "view_dashboard_stats", "export_all_data", "input_selection_result", "manage_users", "manage_settings", "send_wa_blast"],
  admin: ["view_pendaftar_list", "view_pendaftar_detail", "verify_documents", "verify_payment", "input_exam_scores", "manage_settings"],
};

/**
 * DASHBOARD_ROUTES
 * Menentukan halaman tujuan setelah login sukses berdasarkan role.
 */
export const DASHBOARD_ROUTES: Record<UserRole, string> = {
  pendaftar: "/dashboard/pendaftar",
  admin_berkas: "/dashboard/admin",
  admin_keuangan: "/dashboard/admin",
  penguji: "/dashboard/penguji",
  pewawancara_calsan: "/dashboard/penguji",
  pewawancara_cawalsan: "/dashboard/penguji",
  admin_super: "/dashboard/admin",
  admin: "/dashboard/admin",
};

export function hasPermission(role: UserRole, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function isAdminRole(role: UserRole): boolean {
  return ["admin_berkas", "admin_keuangan", "admin_super", "admin"].includes(role);
}

// ─── 6. DYNAMIC MENU LOGIC ───

/**
 * getMenuItemsForRole
 * Menghasilkan daftar menu navigasi (sidebar) yang dipersonalisasi per role.
 */
export function getMenuItemsForRole(role: UserRole) {
  const menus: Record<string, any[]> = {
    admin_berkas: [
      { name: "Dashboard", href: "/dashboard/admin", icon: "LayoutDashboard" },
      { name: "Data Pendaftar", href: "/dashboard/admin/pendaftar", icon: "Users" },
      { name: "Verifikasi Dokumen", href: "/dashboard/admin/verifikasi-dokumen", icon: "FileCheck" },
    ],
    admin_keuangan: [
      { name: "Dashboard", href: "/dashboard/admin", icon: "LayoutDashboard" },
      { name: "Data Pendaftar", href: "/dashboard/admin/pendaftar", icon: "Users" },
      { name: "Verifikasi Pembayaran", href: "/dashboard/admin/verifikasi-pembayaran", icon: "CreditCard" },
      { name: "Rekap Keuangan", href: "/dashboard/admin/keuangan", icon: "BarChart" },
    ],
    penguji: [
      { name: "Dasbor", href: "/dashboard/penguji", icon: "LayoutDashboard" },
      { name: "Jadwal Seleksi", href: "/dashboard/penguji/jadwal", icon: "Calendar" },
      { name: "Input Nilai", href: "/dashboard/penguji/input-nilai", icon: "ClipboardEdit" },
    ],
    admin_super: [
      { name: "Dashboard", href: "/dashboard/admin", icon: "LayoutDashboard" },
      { name: "Data Pendaftar", href: "/dashboard/admin/pendaftar", icon: "Users", group: "OPERASIONAL" },
      { name: "Rekap Keuangan", href: "/dashboard/admin/keuangan", icon: "Landmark", group: "OPERASIONAL" },
      { name: "Monitoring Jadwal", href: "/dashboard/admin/jadwal/monitoring", icon: "Calendar", group: "OPERASIONAL" },
      { name: "Keputusan Kelulusan", href: "/dashboard/admin/audit-seleksi", icon: "Activity", group: "HASIL SELEKSI" },
      { name: "Pengumuman", href: "/dashboard/admin/pengumuman", icon: "Bell", group: "HASIL SELEKSI" },
      { name: "Broadcast WA", href: "/dashboard/admin/broadcast", icon: "Zap", group: "KOMUNIKASI" },
      { name: "Manajemen User", href: "/dashboard/admin/users", icon: "UserCog", group: "SISTEM" },
      { name: "Pengaturan", href: "/dashboard/admin/pengaturan", icon: "Settings", group: "SISTEM" },
    ],
  };

  return menus[role] || [];
}

// ─── 7. PROGRESS & MESSAGING UTILS ───

/**
 * calculateProgressToUnlock
 * Menghitung persentase progres menuju terbukanya sebuah tab.
 */
export function calculateProgressToUnlock(
  tabName: TabName,
  currentStatus: StatusProses,
): number {
  const requirement = STEP_REQUIREMENTS[tabName];
  if (!requirement || !requirement.minimumStatus) return 100;

  if (hasReachedStatus(currentStatus, requirement.minimumStatus)) return 100;

  const currentIndex = getStatusIndex(currentStatus);
  const targetIndex = getStatusIndex(requirement.minimumStatus);

  if (targetIndex === 0) return 100;

  // Hitung persentase sederhana berdasarkan urutan status
  const progress = Math.round((currentIndex / targetIndex) * 100);
  return Math.min(Math.max(progress, 0), 99);
}

/**
 * getUnlockMessage
 * Mengambil pesan instruksi untuk membuka tab yang terkunci.
 */
export function getUnlockMessage(tabName: TabName): string {
  return (
    STEP_REQUIREMENTS[tabName]?.description ||
    "Selesaikan tahap sebelumnya untuk membuka akses."
  );
}
