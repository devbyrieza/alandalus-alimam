// Status yang valid sesuai database constraint
export type StatusProses =
  | 'draft'
  | 'payment_verification'
  | 'verified'        // Pembayaran terverifikasi (Lunas)
  | 'rejected'        // Pembayaran ditolak
  | 'scheduled'       // Terjadwal ujian
  | 'accepted'        // Diterima
  // Legacy statuses (untuk backward compatibility)
  | 'awaiting_payment'
  | 'paid'
  | 'data_completed'
  | 'docs_uploaded'
  | 'docs_verified'
  | 'tested'
  | 'announced'
  | 'enrolled';

// Status order untuk progress calculation
export const STATUS_ORDER: StatusProses[] = [
  'draft',
  'awaiting_payment',
  'payment_verification',
  'verified',
  'paid',
  'data_completed',
  'docs_uploaded',
  'docs_verified',
  'scheduled',
  'tested',
  'announced',
  'accepted',
  'enrolled'
];

// Get status index for comparison
export function getStatusIndex(status: StatusProses): number {
  const index = STATUS_ORDER.indexOf(status);
  return index >= 0 ? index : 0;
}

// Check if current status meets minimum requirement
export function hasReachedStatus(currentStatus: StatusProses, minimumStatus: StatusProses): boolean {
  return getStatusIndex(currentStatus) >= getStatusIndex(minimumStatus);
}

export type TabName =
  | 'data-pribadi'              // Step 1 - always accessible
  | 'pembayaran-pendaftaran'    // Step 2 - always accessible
  | 'status-pembayaran'         // Step 3 - always accessible
  | 'kelengkapan-berkas'        // Step 4 - after payment verified
  | 'upload-berkas'             // Step 5 - after data completed
  | 'download-berkas'           // Step 6 - after docs uploaded
  | 'undangan-seleksi'          // Step 7 - after docs verified
  | 'pengumuman'                // Step 8 - after tested
  | 'daftar-ulang'              // Step 9 - after accepted
  | 'profil';                   // always accessible

// Step requirements - which status is needed to access each tab
export const STEP_REQUIREMENTS: Record<TabName, {
  minimumStatus: StatusProses | null;
  label: string;
  description: string;
}> = {
  'data-pribadi': {
    minimumStatus: null,
    label: 'Data Pribadi',
    description: 'Lihat data pendaftaran Anda'
  },
  'pembayaran-pendaftaran': {
    minimumStatus: null,
    label: 'Pembayaran',
    description: 'Lakukan pembayaran pendaftaran'
  },
  'status-pembayaran': {
    minimumStatus: null,
    label: 'Status Bayar',
    description: 'Cek status pembayaran'
  },
  'profil': {
    minimumStatus: null,
    label: 'Profil',
    description: 'Kelola profil Anda'
  },
  'kelengkapan-berkas': {
    minimumStatus: 'verified', // STRICT: Must be verified by admin
    label: 'Isi Data Lengkap',
    description: 'Menunggu pembayaran diverifikasi admin'
  },
  'upload-berkas': {
    minimumStatus: 'data_completed',
    label: 'Upload Berkas',
    description: 'Data lengkap harus diisi terlebih dahulu'
  },
  'download-berkas': {
    minimumStatus: 'docs_uploaded',
    label: 'Download Berkas',
    description: 'Berkas harus diupload terlebih dahulu'
  },
  'undangan-seleksi': {
    minimumStatus: 'docs_verified',
    label: 'Undangan Seleksi',
    description: 'Menunggu dokumen diverifikasi admin'
  },
  'pengumuman': {
    minimumStatus: 'tested',
    label: 'Pengumuman',
    description: 'Ikuti seleksi ujian terlebih dahulu'
  },
  'daftar-ulang': {
    minimumStatus: 'accepted',
    label: 'Daftar Ulang',
    description: 'Anda belum dinyatakan diterima'
  }
};

// Main function to check tab access
export function canAccessTab(tabName: TabName, statusProses: StatusProses): boolean {
  const requirement = STEP_REQUIREMENTS[tabName];

  // No requirement = always accessible
  if (!requirement || !requirement.minimumStatus) {
    return true;
  }

  // Check if current status meets minimum
  return hasReachedStatus(statusProses, requirement.minimumStatus);
}

// Get unlock message for a tab
export function getUnlockMessage(tabName: TabName): string {
  const requirement = STEP_REQUIREMENTS[tabName];
  return requirement?.description || 'Selesaikan tahap sebelumnya';
}

// Calculate progress percentage to unlock a tab
export function calculateProgressToUnlock(tabName: TabName, currentStatus: StatusProses): number {
  const requirement = STEP_REQUIREMENTS[tabName];

  if (!requirement || !requirement.minimumStatus) {
    return 100; // Always accessible
  }

  const currentIndex = getStatusIndex(currentStatus);
  const requiredIndex = getStatusIndex(requirement.minimumStatus);

  if (currentIndex >= requiredIndex) {
    return 100;
  }

  // Calculate progress (0-99%)
  return Math.min(99, Math.round((currentIndex / requiredIndex) * 100));
}

// Get next step info
export function getNextStep(currentStatus: StatusProses): {
  status: StatusProses;
  action: string;
  href: string;
} | null {
  const nextSteps: Record<string, { status: StatusProses; action: string; href: string }> = {
    'draft': { status: 'payment_verification', action: 'Lakukan pembayaran pendaftaran', href: '/dashboard/pendaftar/pembayaran-pendaftaran' },
    'awaiting_payment': { status: 'payment_verification', action: 'Upload bukti pembayaran', href: '/dashboard/pendaftar/pembayaran-pendaftaran' },
    'payment_verification': { status: 'verified', action: 'Tunggu verifikasi pembayaran', href: '/dashboard/pendaftar/pembayaran-pendaftaran' },
    'verified': { status: 'data_completed', action: 'Isi formulir data lengkap', href: '/dashboard/pendaftar/kelengkapan-berkas' },
    'paid': { status: 'data_completed', action: 'Isi formulir data lengkap', href: '/dashboard/pendaftar/kelengkapan-berkas' },
    'data_completed': { status: 'docs_uploaded', action: 'Upload dokumen persyaratan', href: '/dashboard/pendaftar/upload-berkas' },
    'docs_uploaded': { status: 'docs_verified', action: 'Tunggu verifikasi dokumen', href: '/dashboard/pendaftar/status' },
    'docs_verified': { status: 'scheduled', action: 'Tunggu jadwal seleksi', href: '/dashboard/pendaftar/pengumuman' },
    'scheduled': { status: 'tested', action: 'Ikuti ujian seleksi', href: '/dashboard/pendaftar/pengumuman' },
    'tested': { status: 'announced', action: 'Tunggu pengumuman hasil', href: '/dashboard/pendaftar/pengumuman' },
    'announced': { status: 'accepted', action: 'Lihat hasil seleksi', href: '/dashboard/pendaftar/pengumuman' },
    'accepted': { status: 'enrolled', action: 'Lakukan daftar ulang', href: '/dashboard/pendaftar/daftar-ulang' },
  };

  return nextSteps[currentStatus] || null;
}

// Format status for display
export function formatStatusDisplay(status: StatusProses): { label: string; color: string } {
  const statusMap: Record<StatusProses, { label: string; color: string }> = {
    'draft': { label: 'Belum Bayar', color: 'bg-amber-100 text-amber-700' },
    'awaiting_payment': { label: 'Menunggu Pembayaran', color: 'bg-amber-100 text-amber-700' },
    'payment_verification': { label: 'Menunggu Verifikasi', color: 'bg-orange-100 text-orange-700' },
    'verified': { label: 'Pembayaran Lunas', color: 'bg-blue-100 text-blue-700' },
    'paid': { label: 'Pembayaran Lunas', color: 'bg-blue-100 text-blue-700' },
    'rejected': { label: 'Pembayaran Ditolak', color: 'bg-red-100 text-red-700' },
    'data_completed': { label: 'Data Lengkap', color: 'bg-teal-100 text-teal-700' },
    'docs_uploaded': { label: 'Dokumen Diupload', color: 'bg-indigo-100 text-indigo-700' },
    'docs_verified': { label: 'Dokumen Terverifikasi', color: 'bg-green-100 text-green-700' },
    'scheduled': { label: 'Terjadwal Ujian', color: 'bg-purple-100 text-purple-700' },
    'tested': { label: 'Sudah Ujian', color: 'bg-violet-100 text-violet-700' },
    'announced': { label: 'Diumumkan', color: 'bg-cyan-100 text-cyan-700' },
    'accepted': { label: 'Diterima', color: 'bg-green-100 text-green-700' },
    'enrolled': { label: 'Terdaftar', color: 'bg-emerald-100 text-emerald-700' },
  };

  return statusMap[status] || { label: status, color: 'bg-stone-100 text-stone-700' };
}

// ============================================================================
// ROLE DEFINITIONS - 5 DASHBOARD TYPES
// ============================================================================

export type UserRole =
  | 'pendaftar'       // Dashboard Pendaftar - calon santri
  | 'admin_berkas'    // Dashboard Admin Berkas dan Pendaftaran Umum - verifikasi dokumen & data pendaftaran
  | 'admin_keuangan'  // Dashboard Keuangan - verifikasi pembayaran & keuangan
  | 'penguji'         // Dashboard Penguji - input nilai ujian
  | 'admin_super'     // Dashboard Admin Super - akses penuh ke semua fitur
  | 'admin';          // Legacy Admin Role

// Role display names
export const ROLE_LABELS: Record<UserRole, string> = {
  pendaftar: 'Pendaftar',
  admin_berkas: 'Admin Berkas',
  admin_keuangan: 'Admin Keuangan',
  penguji: 'Penguji',
  admin_super: 'Admin Super',
  admin: 'Administrator (Legacy)',
};

// Role descriptions
export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  pendaftar: 'Calon santri yang mendaftar ke Ponpes Al-Imam',
  admin_berkas: 'Memverifikasi berkas/dokumen dan data pendaftaran santri',
  admin_keuangan: 'Mengelola verifikasi pembayaran dan keuangan',
  penguji: 'Melakukan penilaian ujian seleksi santri',
  admin_super: 'Akses penuh ke seluruh fitur dan data sistem',
  admin: 'Administrator (Legacy - Full Access)',
};

// Role permissions
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  pendaftar: [
    'view_own_data',
    'edit_own_data',
    'upload_documents',
    'view_payment_status',
    'view_exam_schedule',
    'view_announcement',
  ],
  admin_berkas: [
    'view_pendaftar_list',
    'view_pendaftar_detail',
    'verify_documents',
    'view_document_status',
    'export_pendaftar_data',
  ],
  admin_keuangan: [
    'view_pendaftar_list',
    'view_payment_list',
    'verify_payment',
    'view_financial_reports',
    'export_payment_data',
  ],
  penguji: [
    'view_exam_schedule',
    'view_pendaftar_for_exam',
    'input_exam_scores',
    'view_exam_results',
  ],
  admin_super: [
    // Admin Super has ALL permissions
    'view_pendaftar_list',
    'view_pendaftar_detail',
    'edit_pendaftar_data',
    'delete_pendaftar',
    'verify_documents',
    'view_document_status',
    'view_payment_list',
    'verify_payment',
    'view_financial_reports',
    'view_exam_schedule',
    'manage_exam_schedule',
    'input_exam_scores',
    'view_exam_results',
    'publish_announcement',
    'manage_users',
    'manage_settings',
    'export_all_data',
    'export_all_data',
    'view_dashboard_stats',
  ],
  admin: [
    'view_pendaftar_list',
    'view_pendaftar_detail',
    'edit_pendaftar_data',
    'delete_pendaftar',
    'verify_documents',
    'view_document_status',
    'view_payment_list',
    'verify_payment',
    'view_financial_reports',
    'view_exam_schedule',
    'manage_exam_schedule',
    'input_exam_scores',
    'view_exam_results',
    'publish_announcement',
    'manage_users',
    'manage_settings',
    'export_all_data',
    'view_dashboard_stats',
  ],
};

// Dashboard routes per role
export const DASHBOARD_ROUTES: Record<UserRole, string> = {
  pendaftar: '/dashboard/pendaftar',
  admin_berkas: '/dashboard/admin',
  admin_keuangan: '/dashboard/admin',
  penguji: '/dashboard/penguji',
  admin_super: '/dashboard/admin',
  admin: '/dashboard/admin',
};

// Check if role has permission
export function hasPermission(role: UserRole, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

// Check if role is admin type (can access admin dashboard)
export function isAdminRole(role: UserRole): boolean {
  return ['admin_berkas', 'admin_keuangan', 'admin_super', 'admin'].includes(role);
}

// Check if role can verify documents
export function canVerifyDocuments(role: UserRole): boolean {
  return hasPermission(role, 'verify_documents') || role === 'admin_super';
}

// Check if role can verify payments
export function canVerifyPayments(role: UserRole): boolean {
  return hasPermission(role, 'verify_payment') || role === 'admin_super';
}

// Check if role can input exam scores
export function canInputScores(role: UserRole): boolean {
  return hasPermission(role, 'input_exam_scores') || role === 'admin_super';
}

// Get menu items based on role
export function getMenuItemsForRole(role: UserRole): { name: string; href: string; icon: string }[] {
  const baseMenuItems = {
    admin_berkas: [
      { name: 'Dashboard', href: '/dashboard/admin', icon: 'LayoutDashboard' },
      { name: 'Daftar Pendaftar', href: '/dashboard/admin/pendaftar', icon: 'Users' },
      { name: 'Verifikasi Dokumen', href: '/dashboard/admin/verifikasi-dokumen', icon: 'FileCheck' },
      { name: 'Cek Data Pendaftar', href: '/dashboard/admin/pendaftar?filter=belum_upload_dokumen', icon: 'FileText' },
    ],
    admin_keuangan: [
      { name: 'Dashboard', href: '/dashboard/admin', icon: 'LayoutDashboard' },
      { name: 'Daftar Pendaftar', href: '/dashboard/admin/pendaftar', icon: 'Users' },
      { name: 'Verifikasi Pembayaran', href: '/dashboard/admin/verifikasi-pembayaran', icon: 'CreditCard' },
    ],
    penguji: [
      { name: 'Dasbor', href: '/dashboard/penguji', icon: 'LayoutDashboard' },
      { name: 'Jadwal Ujian', href: '/dashboard/penguji/jadwal', icon: 'Calendar' },
      { name: 'Input Nilai', href: '/dashboard/penguji/input-nilai', icon: 'ClipboardEdit' },
    ],
    admin_super: [
      { name: 'Dashboard', href: '/dashboard/admin', icon: 'LayoutDashboard' },
      { name: 'Daftar Pendaftar', href: '/dashboard/admin/pendaftar', icon: 'Users' },
      { name: 'Verifikasi Pembayaran', href: '/dashboard/admin/verifikasi-pembayaran', icon: 'CreditCard' },
      { name: 'Cek Data Pendaftar', href: '/dashboard/admin/pendaftar?filter=belum_upload_dokumen', icon: 'FileText' },
      { name: 'Verifikasi Dokumen', href: '/dashboard/admin/verifikasi-dokumen', icon: 'FileCheck' },
      { name: 'Jadwal Ujian', href: '/dashboard/admin/jadwal-ujian', icon: 'Calendar' },
      { name: 'Pengumuman', href: '/dashboard/admin/pengumuman', icon: 'Trophy' },
      { name: 'Manajemen User', href: '/dashboard/admin/users', icon: 'UserCog' },
      { name: 'Pengaturan', href: '/dashboard/admin/pengaturan', icon: 'Settings' },
    ],
    admin: [
      { name: 'Dashboard', href: '/dashboard/admin', icon: 'LayoutDashboard' },
      { name: 'Daftar Pendaftar', href: '/dashboard/admin/pendaftar', icon: 'Users' },
      { name: 'Verifikasi Pembayaran', href: '/dashboard/admin/verifikasi-pembayaran', icon: 'CreditCard' },
      { name: 'Cek Data Pendaftar', href: '/dashboard/admin/pendaftar?filter=belum_upload_dokumen', icon: 'FileText' },
      { name: 'Verifikasi Dokumen', href: '/dashboard/admin/verifikasi-dokumen', icon: 'FileCheck' },
      { name: 'Jadwal Ujian', href: '/dashboard/admin/jadwal-ujian', icon: 'Calendar' },
      { name: 'Pengumuman', href: '/dashboard/admin/pengumuman', icon: 'Trophy' },
      { name: 'Manajemen User', href: '/dashboard/admin/users', icon: 'UserCog' },
      { name: 'Pengaturan', href: '/dashboard/admin/pengaturan', icon: 'Settings' },
    ],
    pendaftar: [], // Pendaftar uses tab-based navigation
  };

  return baseMenuItems[role] || [];
}

// Validate role access to a route
export function canAccessRoute(role: UserRole, route: string): boolean {
  // Admin super can access everything
  if (role === 'admin_super' || role === 'admin') return true;

  // Pendaftar can only access pendaftar routes
  if (role === 'pendaftar') {
    return route.startsWith('/dashboard/pendaftar') || route === '/dashboard';
  }

  // Admin berkas can access admin dashboard and document verification
  if (role === 'admin_berkas') {
    const allowedRoutes = [
      '/dashboard/admin',
      '/dashboard/admin/pendaftar',
      '/dashboard/admin/verifikasi-dokumen',
    ];
    return allowedRoutes.some(r => route.startsWith(r));
  }

  // Admin keuangan can access admin dashboard and payment verification
  if (role === 'admin_keuangan') {
    const allowedRoutes = [
      '/dashboard/admin',
      '/dashboard/admin/pendaftar',
      '/dashboard/admin/verifikasi-pembayaran',
      '/dashboard/admin/laporan-keuangan',
    ];
    return allowedRoutes.some(r => route.startsWith(r));
  }

  // Penguji can only access penguji routes
  if (role === 'penguji') {
    return route.startsWith('/dashboard/penguji');
  }

  return false;
}
