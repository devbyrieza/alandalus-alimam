/**
 * WhatsApp Integration using Twilio
 * Legal, reliable, and cost-effective
 * Pricing: $0.0085 per message
 */

import twilio from "twilio";

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

/**
 * Normalize Indonesian phone number to E.164 format
 */
function normalizePhoneNumber(phone: string): string {
  // Remove all non-digit characters except +
  let normalized = phone.replace(/[^\d+]/g, "");

  // If starts with 0, replace with +62
  if (normalized.startsWith("0")) {
    normalized = "+62" + normalized.substring(1);
  }

  // If starts with 62 but doesn't have +, add it
  if (normalized.startsWith("62") && !normalized.startsWith("+62")) {
    normalized = "+" + normalized;
  }

  // If starts with 8 (without 0), add +62
  if (normalized.startsWith("8") && !normalized.startsWith("+")) {
    normalized = "+62" + normalized;
  }

  // If doesn't start with +, add it
  if (!normalized.startsWith("+")) {
    normalized = "+" + normalized;
  }

  return normalized;
}

/**
 * Send WhatsApp OTP via Twilio
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
    const normalizedPhone = normalizePhoneNumber(phone);

    const message = await client.messages.create({
      body: `Assalamu'alaikum ${nama},

📱 *Kode Verifikasi PPDB Al-Imam*
      
🔐 *${otp}*
      
⏰ Berlaku 5 menit
      
⚠️ JANGAN bagikan kode ini kepada siapapun!
      
Barakallahu fiikum 🤲
*Panitia PPDB Al-Imam*`,
      from: "whatsapp:+14155238886", // Twilio WhatsApp sandbox number
      to: `whatsapp:${normalizedPhone}`,
    });

    console.log(`✅ WhatsApp OTP sent to ${normalizedPhone}: ${message.sid}`);

    return {
      success: true,
      message: "OTP berhasil dikirim via WhatsApp",
      messageId: message.sid,
    };
  } catch (error: any) {
    console.error("❌ Twilio WhatsApp error:", error);
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
    const normalizedPhone = normalizePhoneNumber(phone);

    const message = await client.messages.create({
      body: `Assalamu'alaikum Bapak/Ibu,

🎉 *Alhamdulillah! Pendaftaran Berhasil*
      
📝 *DATA LOGIN SANTRI:*
📌 Nomor Pendaftaran: *${nomorPendaftaran}*
📌 NIK Santri: *${nik}*
      
🔗 *Login sekarang:*
https://ppdb.al-imam.com/login
      
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
*Panitia PPDB Al-Imam*`,
      from: "whatsapp:+14155238886",
      to: `whatsapp:${normalizedPhone}`,
    });

    console.log(
      `✅ WhatsApp success notification sent to ${normalizedPhone}: ${message.sid}`,
    );

    return {
      success: true,
      message: "Notifikasi pendaftaran berhasil dikirim",
      messageId: message.sid,
    };
  } catch (error: any) {
    console.error("❌ Twilio notification error:", error);
    return {
      success: false,
      error: error.message || "Gagal mengirim notifikasi WhatsApp",
    };
  }
}

/**
 * Send general WhatsApp message
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
    const normalizedPhone = normalizePhoneNumber(phone);

    const message = await client.messages.create({
      body: messageText,
      from: "whatsapp:+14155238886",
      to: `whatsapp:${normalizedPhone}`,
    });

    return {
      success: true,
      message: "Pesan WhatsApp berhasil dikirim",
      messageId: message.sid,
    };
  } catch (error: any) {
    console.error("❌ Twilio message error:", error);
    return {
      success: false,
      error: error.message || "Gagal mengirim pesan WhatsApp",
    };
  }
}

/**
 * Validate phone number format
 */
export function validatePhoneNumber(phone: string): boolean {
  try {
    const normalized = normalizePhoneNumber(phone);
    // Basic validation: starts with +62 and has 10-13 digits after
    return /^\+62\d{9,12}$/.test(normalized);
  } catch {
    return false;
  }
}
