// lib/verification/whatsapp.ts
import { normalizePhone } from "./multi-channel";
import { sendWhatsAppOTP } from "@/lib/whatsapp/wablas";

export async function sendWhatsAppMessage(
  to: string,
  otp: string,
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const phone = normalizePhone(to);

    // Kirim via Wablas API
    const result = await sendWhatsAppOTP(phone, otp, "Pendaftar");

    if (result.success) {
      return { success: true, messageId: result.messageId };
    }

    // Fallback untuk development
    if (process.env.NODE_ENV === "development") {
      console.log(`📱 [DEV] WhatsApp OTP ${otp} untuk ${phone}`);
      return { success: true, messageId: "dev-" + Date.now() };
    }

    return { success: false, error: result.error || "WhatsApp service error" };
  } catch (error: any) {
    console.error("WhatsApp send error:", error);
    return { success: false, error: error.message };
  }
}
