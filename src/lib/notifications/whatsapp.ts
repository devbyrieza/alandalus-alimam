// File: /src/lib/notifications/whatsapp.ts
/**
 * WhatsApp OTP Service using Wablas API
 */

import { sendWhatsAppOTP as sendViaWablas } from "@/lib/whatsapp/wablas";

export async function sendWhatsAppOTP(
  phone: string,
  otp: string,
  nama: string,
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const result = await sendViaWablas(phone, otp, nama);

    if (result.success) {
      return {
        success: true,
        messageId: result.messageId,
      };
    }

    // Fallback: development simulation
    if (process.env.NODE_ENV === "development") {
      console.log("📱 [DEV FALLBACK] WhatsApp OTP:", otp, "untuk", phone);
      return {
        success: true,
        messageId: `wa_dev_${Date.now()}`,
      };
    }

    return {
      success: false,
      error: result.error || "Gagal mengirim WhatsApp OTP",
    };
  } catch (error: any) {
    console.error("❌ WhatsApp error:", error.message);

    // Fallback simulation for development
    if (process.env.NODE_ENV === "development") {
      console.log("📱 [FALLBACK] WhatsApp gagal, mode simulasi");
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
