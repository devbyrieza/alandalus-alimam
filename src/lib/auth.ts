/**
 * ─── AUTHENTICATION & VALIDATION SYSTEM ───
 * File ini menangani validasi input user (NIK, HP, Password) 
 * dan manajemen sesi login menggunakan Cookie-based Auth.
 * 
 * Versi: 4.0 (Custom Security Layer)
 */

// ─── 1. VALIDATION HELPERS ───

/**
 * validateNIK
 * Memastikan NIK berjumlah 16 digit dan hanya berisi angka.
 */
export const validateNIK = (nik: string): { valid: boolean; message: string } => {
  const cleanNIK = nik.replace(/\s/g, "");
  if (cleanNIK.length !== 16) return { valid: false, message: "NIK harus tepat 16 digit" };
  if (!/^\d+$/.test(cleanNIK)) return { valid: false, message: "NIK hanya boleh berisi angka" };
  return { valid: true, message: "" };
};

/**
 * validateNoHP
 * Menstandarisasi nomor HP agar diawali dengan 08, 628, atau +628.
 */
export const validateNoHP = (no_hp: string): { valid: boolean; message: string } => {
  const cleanHP = no_hp.replace(/[\s\-\(\)]/g, "");
  if (!/^(08|628|\+628)/.test(cleanHP)) return { valid: false, message: "Gunakan format 08..., 628..., atau +628..." };
  const digitOnly = cleanHP.replace(/\+/g, "");
  if (digitOnly.length < 10 || digitOnly.length > 15) return { valid: false, message: "Nomor HP harus 10-15 digit" };
  return { valid: true, message: "" };
};

/**
 * normalizeNoHP
 * Mengubah input HP beragam menjadi format standar (diawali 628...) untuk WhatsApp API.
 */
export const normalizeNoHP = (no_hp: string): string => {
  const cleanHP = no_hp.replace(/[\s\-\(\)]/g, "");
  if (cleanHP.startsWith("08")) return "62" + cleanHP.substring(1);
  if (cleanHP.startsWith("+628")) return cleanHP.substring(1);
  return cleanHP;
};

// ─── 2. SESSION MANAGEMENT (CLIENT-SIDE) ───

export interface SessionData {
  id: string;
  role: string;
  nama?: string;
  expires_at?: string;
}

/**
 * getCurrentSession
 * Mengambil data user yang sedang login dari server.
 * Keamanan: Menggunakan httpOnly cookie 'app_session'.
 */
export const getCurrentSession = async (): Promise<SessionData | null> => {
  try {
    const response = await fetch("/api/auth/session", { method: "GET", credentials: "include" });
    if (!response.ok) return null;
    const data = await response.json();
    return data.session || null;
  } catch (error) {
    return null;
  }
};

/**
 * logoutUser
 * Menghapus sesi user dengan memanggil API logout.
 */
export const logoutUser = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    if (!response.ok) return { success: false, error: "Gagal mengakhiri sesi" };
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ─── 3. DISPLAY FORMATTERS (UI LUXURY) ───

/**
 * formatNIKDisplay
 * Contoh: "3201123456789012" -> "3201 1234 5678 9012"
 */
export const formatNIKDisplay = (nik: string): string => {
  const clean = nik.replace(/\s/g, "");
  return clean.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4");
};

/**
 * formatNoHPDisplay
 * Contoh: "628123456789" -> "0812-3456-789"
 */
export const formatNoHPDisplay = (no_hp: string): string => {
  const clean = no_hp.replace(/[\s\-\(\)]/g, "");
  let displayHP = clean.startsWith("628") ? "0" + clean.substring(2) : clean;
  return displayHP.replace(/(\d{4})(\d{4})(\d{4,})/, "$1-$2-$3");
};

/**
 * formatRupiah
 * Standar mata uang Indonesia dengan digit nol di belakang.
 */
export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
};
