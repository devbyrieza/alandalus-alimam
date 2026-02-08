/**
 * WhatsApp & SMS Integration using Wablas API
 * https://wablas.com - Indonesian WhatsApp Gateway
 *
 * Supports: WhatsApp messages, SMS
 */

const WABLAS_API_URL = "https://api.wablas.com/api/send-message";

/**
 * Normalize Indonesian phone number (remove +, ensure starts with 62)
 */
function normalizePhoneNumber(phone: string): string {
  let normalized = phone.replace(/[^\d]/g, "");

  if (normalized.startsWith("0")) {
    normalized = "62" + normalized.substring(1);
  } else if (!normalized.startsWith("62")) {
    normalized = "62" + normalized;
  }

  return normalized;
}

/**
 * Send message via Wablas API
 */
async function sendViaWablas(
  phone: string,
  message: string,
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const apiKey = process.env.WABLAS_API_KEY;

  if (!apiKey) {
    // Development fallback
    if (process.env.NODE_ENV === "development") {
      console.log(`📱 [DEV] Wablas message to ${phone}:`);
      console.log(message);
      return { success: true, messageId: `dev_${Date.now()}` };
    }
    return { success: false, error: "WABLAS_API_KEY tidak dikonfigurasi" };
  }

  const normalizedPhone = normalizePhoneNumber(phone);

  const response = await fetch(WABLAS_API_URL, {
    method: "POST",
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [
        {
          phone: normalizedPhone,
          message: message,
        },
      ],
    }),
  });

  const data = await response.json();

  if (!response.ok || data.status === false) {
    console.error("❌ Wablas API error:", data);
    return {
      success: false,
      error: data.message || `Wablas error: HTTP ${response.status}`,
    };
  }

  console.log(`✅ Wablas message sent to ${normalizedPhone}`);
  return {
    success: true,
    messageId: data.data?.[0]?.id || `wablas_${Date.now()}`,
  };
}

/**
 * Send WhatsApp OTP via Wablas
 */
export async function sendWhatsAppOTP(
  phone: string,
  otp: string,
  nama: string,
): Promise<{
  success: boolean;
  message?: string;
  error?: string;
  messageId?: string;
}> {
  try {
    const messageText = `Assalamu'alaikum ${nama},

📱 *Kode Verifikasi PPDB Al-Imam*

🔐 *${otp}*

⏰ Berlaku 5 menit

⚠️ JANGAN bagikan kode ini kepada siapapun!

Barakallahu fiikum 🤲
*Panitia PPDB Al-Imam*`;

    const result = await sendViaWablas(phone, messageText);

    return {
      success: result.success,
      message: result.success
        ? "OTP berhasil dikirim via WhatsApp"
        : undefined,
      error: result.error,
      messageId: result.messageId,
    };
  } catch (error: any) {
    console.error("❌ Wablas WhatsApp OTP error:", error);
    return {
      success: false,
      error: error.message || "Gagal mengirim WhatsApp OTP",
    };
  }
}

/**
 * Send registration success notification via WhatsApp
 */
export async function sendRegistrationSuccess(
  phone: string,
  nama: string,
  nomorPendaftaran: string,
  nik: string,
): Promise<{
  success: boolean;
  message?: string;
  error?: string;
  messageId?: string;
}> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pesantren-alimam.com";

    const messageText = `Assalamu'alaikum Bapak/Ibu,

🎉 *Alhamdulillah! Pendaftaran Berhasil*

📝 *DATA LOGIN SANTRI:*
📌 Nomor Pendaftaran: *${nomorPendaftaran}*
📌 NIK Santri: *${nik}*

🔗 *Login sekarang:*
${baseUrl}/login

📋 *LANGKAH SELANJUTNYA:*
1️⃣ Login dengan NIK + Nomor Pendaftaran
2️⃣ Bayar biaya pendaftaran
3️⃣ Upload bukti pembayaran
4️⃣ Lengkapi data & upload dokumen

⚠️ *PENTING:*
• Simpan Nomor Pendaftaran dan NIK Santri
• Login TANPA password
• Gunakan NIK + Nomor Pendaftaran

Barakallahu fiikum 🤲
*Panitia PPDB Al-Imam*`;

    const result = await sendViaWablas(phone, messageText);

    return {
      success: result.success,
      message: result.success
        ? "Notifikasi pendaftaran berhasil dikirim"
        : undefined,
      error: result.error,
      messageId: result.messageId,
    };
  } catch (error: any) {
    console.error("❌ Wablas notification error:", error);
    return {
      success: false,
      error: error.message || "Gagal mengirim notifikasi WhatsApp",
    };
  }
}

/**
 * Send general WhatsApp message via Wablas
 */
export async function sendWhatsAppMessage(
  phone: string,
  messageText: string,
): Promise<{
  success: boolean;
  message?: string;
  error?: string;
  messageId?: string;
}> {
  try {
    const result = await sendViaWablas(phone, messageText);

    return {
      success: result.success,
      message: result.success
        ? "Pesan WhatsApp berhasil dikirim"
        : undefined,
      error: result.error,
      messageId: result.messageId,
    };
  } catch (error: any) {
    console.error("❌ Wablas message error:", error);
    return {
      success: false,
      error: error.message || "Gagal mengirim pesan WhatsApp",
    };
  }
}

/**
 * Send SMS via Wablas
 */
export async function sendSMS(
  phone: string,
  messageText: string,
): Promise<{
  success: boolean;
  message?: string;
  error?: string;
  messageId?: string;
}> {
  // Wablas primarily sends via WhatsApp
  // For SMS fallback, we still send via WhatsApp since Wablas is WA-first
  return sendWhatsAppMessage(phone, messageText);
}

/**
 * Validate phone number format
 */
export function validatePhoneNumber(phone: string): boolean {
  try {
    const normalized = normalizePhoneNumber(phone);
    return /^62\d{9,12}$/.test(normalized);
  } catch {
    return false;
  }
}

export { normalizePhoneNumber };
