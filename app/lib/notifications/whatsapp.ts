// File: /src/lib/notifications/whatsapp.ts
/**
 * WhatsApp OTP Service using Wablas API
 */

import { sendMessage } from "@/lib/wablas";

export async function sendWhatsAppOTP(
  phone: string,
  otp: string,
  nama: string,
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // OTP Message Template
    const message = `🔐 *Kode Verifikasi PPDB Al-Imam*

Assalamu'alaikum ${nama},

Kode OTP Anda adalah:

*${otp}*

Kode ini berlaku selama *5 menit*.

⚠️ *PENTING:*
• Jangan berikan kode ini kepada siapapun
• Tim Al-Imam tidak akan pernah meminta kode OTP Anda

Jazakumullahu khairan,
Panitia PPDB Al-Imam`;

    const result = await sendMessage({ phone, message });

    if (result.status) {
      return {
        success: true,
        messageId: result.data?.id || `wa_${Date.now()}`,
      };
    }

    // Fallback: development simulation or explicit skip
    if (process.env.NODE_ENV === "development" || process.env.SKIP_WHATSAPP_OTP === "true") {
      console.log("📱 [DEV/SKIP] WhatsApp OTP (Simulated):", otp, "untuk", phone);
      return {
        success: true,
        messageId: `wa_sim_${Date.now()}`,
      };
    }

    return {
      success: false,
      error: result.message || "Gagal mengirim WhatsApp OTP",
    };
  } catch (error: any) {
    console.error("❌ WhatsApp error:", error.message);

    // Fallback simulation for development or explicit skip
    if (process.env.NODE_ENV === "development" || process.env.SKIP_WHATSAPP_OTP === "true") {
      console.log("📱 [FALLBACK/SKIP] WhatsApp gagal, mode simulasi");
      console.log(`OTP untuk ${nama} (${phone}): ${otp}`);
      return {
        success: true,
        messageId: `wa_fallback_${Date.now()}`,
        error: error.message,
      };
    }

    return {
      success: false,
      error: error.message,
    };
  }
}
