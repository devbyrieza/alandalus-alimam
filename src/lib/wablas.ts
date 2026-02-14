/**
 * Wablas WhatsApp API Service
 * 
 * This service handles all WhatsApp notifications via Wablas API
 * Documentation: https://wablas.com/docs
 */

// Types
export interface WablasResponse {
    status: boolean;
    message: string;
    data?: any;
}

export interface SendMessageParams {
    phone: string;
    message: string;
}

export interface SendTemplateParams {
    phone: string;
    templateId: string;
    variables?: Record<string, string>;
}

// Configuration
const WABLAS_DOMAIN = process.env.WABLAS_DOMAIN || '';
const WABLAS_TOKEN = process.env.WABLAS_TOKEN || '';
const WABLAS_SECRET_KEY = process.env.WABLAS_SECRET_KEY || '';

if (!WABLAS_DOMAIN || !WABLAS_TOKEN) {
    console.warn('⚠️ Wablas credentials not configured. WhatsApp notifications will be disabled.');
}

/**
 * Format phone number to international format
 * Input: 081234567890 or +6281234567890
 * Output: 6281234567890
 */
function formatPhoneNumber(phone: string): string {
    // Remove all non-numeric characters
    let cleaned = phone.replace(/\D/g, '');

    // If starts with 0, replace with 62
    if (cleaned.startsWith('0')) {
        cleaned = '62' + cleaned.substring(1);
    }

    // If doesn't start with 62, add it
    if (!cleaned.startsWith('62')) {
        cleaned = '62' + cleaned;
    }

    return cleaned;
}

/**
 * Send a simple text message via Wablas
 */
export async function sendMessage({ phone, message }: SendMessageParams): Promise<WablasResponse> {
    if (!WABLAS_DOMAIN || !WABLAS_TOKEN) {
        console.error('Wablas not configured');
        return { status: false, message: 'Wablas not configured' };
    }

    try {
        const formattedPhone = formatPhoneNumber(phone);

        // Ensure domain has protocol
        const domain = WABLAS_DOMAIN.startsWith('http') ? WABLAS_DOMAIN : `https://${WABLAS_DOMAIN}`;

        // Wablas API - POST with Authorization header: token.secret_key
        const url = `${domain}/api/send-message`;

        // Build Authorization header with token and secret key
        const authToken = WABLAS_SECRET_KEY
            ? `${WABLAS_TOKEN}.${WABLAS_SECRET_KEY}`
            : WABLAS_TOKEN;

        // Build form data for POST body
        const formData = new URLSearchParams();
        formData.append('phone', formattedPhone);
        formData.append('message', message);

        console.log(`📡 Sending Wablas to ${formattedPhone} via ${WABLAS_DOMAIN}`);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': authToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        });

        const rawText = await response.text();
        let data;
        try {
            data = JSON.parse(rawText);
        } catch (e) {
            console.error('❌ Wablas Non-JSON Response:', rawText);
            return { status: false, message: `Wablas Error: ${response.status} ${response.statusText}` };
        }

        if (!response.ok || !data.status) {
            console.error('❌ Wablas API Error:', data);
            return { status: false, message: data.message || `Wablas Failed: ${response.status}` };
        }

        return { status: true, message: 'Message sent successfully', data };
    } catch (error: any) {
        console.error('❌ Wablas Network Error:', error);
        return { status: false, message: `Network Error: ${error.message}` };
    }
}

/**
 * Send message using template (for consistent formatting)
 */
export async function sendTemplate({ phone, templateId, variables = {} }: SendTemplateParams): Promise<WablasResponse> {
    const template = TEMPLATES[templateId];

    if (!template) {
        console.error(`Template ${templateId} not found`);
        return { status: false, message: 'Template not found' };
    }

    // Replace variables in template
    let message = template;
    Object.entries(variables).forEach(([key, value]) => {
        message = message.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });

    return sendMessage({ phone, message });
}

/**
 * Send broadcast message to multiple recipients
 */
export async function sendBroadcast(phones: string[], message: string): Promise<WablasResponse[]> {
    const results = await Promise.all(
        phones.map(phone => sendMessage({ phone, message }))
    );

    return results;
}

// ============================================
// MESSAGE TEMPLATES
// ============================================

const TEMPLATES: Record<string, string> = {
    // Pendaftaran berhasil
    'registration_success': `🎉 *Pendaftaran Berhasil!*

Assalamu'alaikum {{nama}},

Alhamdulillah, pendaftaran Anda di Pesantren Al-Imam Al-Islami telah berhasil!

📋 *Detail Pendaftaran:*
• Nomor Pendaftaran: {{nomor_pendaftaran}}
• Jenjang: {{jenjang}}
• Nama: {{nama}}

📝 *Langkah Selanjutnya:*
1. Login ke dashboard: {{dashboard_url}}
   *(Gunakan Nomor Pendaftaran & NIK untuk Login)*
2. Lengkap biodata & upload dokumen
3. Segera lakukan pembayaran pendaftaran

💡 *Butuh Bantuan?*
Hubungi kami di {{kontak}}

Jazakumullahu khairan,
Panitia PPDB Al-Imam`,

    // Dokumen diverifikasi - Approved
    'document_verified': `✅ *Dokumen Diverifikasi*

Assalamu'alaikum {{nama}},

Alhamdulillah, dokumen Anda telah diverifikasi dan *DITERIMA*.

📄 *Dokumen yang Diverifikasi:*
{{dokumen_list}}

📝 *Langkah Selanjutnya:*
Silakan lakukan pembayaran pendaftaran melalui dashboard Anda.

Dashboard: {{dashboard_url}}

Jazakumullahu khairan,
Panitia PPDB Al-Imam`,

    // Dokumen ditolak
    'document_rejected': `❌ *Dokumen Perlu Diperbaiki*

Assalamu'alaikum {{nama}},

Mohon maaf, dokumen Anda perlu diperbaiki.

📄 *Dokumen yang Ditolak:*
{{dokumen_list}}

📝 *Catatan:*
{{catatan}}

🔄 *Langkah Selanjutnya:*
1. Login ke dashboard: {{dashboard_url}}
2. Upload ulang dokumen yang ditolak
3. Pastikan dokumen jelas dan sesuai ketentuan

💡 *Butuh Bantuan?*
Hubungi kami di {{kontak}}

Jazakumullahu khairan,
Panitia PPDB Al-Imam`,

    // Pembayaran diverifikasi - Approved
    'payment_verified': `✅ *Pembayaran Diterima*

Assalamu'alaikum {{nama}},

Alhamdulillah, pembayaran Anda telah kami terima dan verifikasi.

💰 *Detail Pembayaran:*
* Jumlah: {{jumlah}}
* Metode: {{metode}}
* Tanggal: {{tanggal}}

📝 *Langkah Selanjutnya:*
Anda akan dihubungi untuk jadwal tes masuk. Pantau terus dashboard Anda.

Dashboard: {{dashboard_url}}

Jazakumullahu khairan,
Panitia PPDB Al-Imam`,

    // Pembayaran ditolak
    'payment_rejected': `❌ *Pembayaran Perlu Diperbaiki*

Assalamu'alaikum {{nama}},

Mohon maaf, bukti pembayaran Anda perlu diperbaiki.

📝 *Catatan:*
{{catatan}}

🔄 *Langkah Selanjutnya:*
1. Login ke dashboard: {{dashboard_url}}
2. Upload ulang bukti pembayaran yang jelas
3. Pastikan nominal dan rekening tujuan sesuai

💡 *Butuh Bantuan?*
Hubungi kami di {{kontak}}

Jazakumullahu khairan,
Panitia PPDB Al-Imam`,

    // Reminder deadline
    'deadline_reminder': `⏰ *Pengingat Deadline*

Assalamu'alaikum {{nama}},

Ini adalah pengingat bahwa deadline {{jenis_deadline}} akan berakhir pada:

📅 *{{tanggal_deadline}}*

📝 *Status Anda:*
{{status}}

🔄 *Yang Perlu Dilakukan:*
{{action_needed}}

Dashboard: {{dashboard_url}}

Jazakumullahu khairan,
Panitia PPDB Al-Imam`,

    // Jadwal tes masuk
    'test_schedule': `📅 *Jadwal Tes Masuk*

Assalamu'alaikum {{nama}},

Berikut jadwal tes masuk Anda:

📅 *Tanggal:* {{tanggal}}
🕐 *Waktu:* {{waktu}}
📍 *Tempat:* {{tempat}}

📝 *Yang Perlu Dibawa:*
• Kartu peserta (download di dashboard)
• Alat tulis
• Fotocopy dokumen

⚠️ *Penting:*
• Hadir 30 menit sebelum tes
• Berpakaian sopan dan rapi
• Berdoa dan persiapkan diri

Dashboard: {{dashboard_url}}

Jazakumullahu khairan,
Panitia PPDB Al-Imam`,

    // Pengumuman kelulusan - Diterima
    'announcement_accepted': `🎉 *SELAMAT! Anda DITERIMA*

Assalamu'alaikum {{nama}},

Alhamdulillah, kami dengan senang hati mengumumkan bahwa Anda *DITERIMA* di Pesantren Al-Imam Al-Islami!

📋 *Detail:*
• Jenjang: {{jenjang}}
• Tahun Ajaran: {{tahun_ajaran}}

📝 *Langkah Selanjutnya:*
1. Daftar ulang (info di dashboard)
2. Persiapan masuk pesantren
3. Orientasi santri baru

Dashboard: {{dashboard_url}}

Selamat bergabung di keluarga besar Al-Imam! 🎓

Jazakumullahu khairan,
Panitia PPDB Al-Imam`,
};

// ============================================
// NOTIFICATION HELPERS
// ============================================

/**
 * Send registration success notification
 */
export async function notifyRegistrationSuccess(data: {
    phone: string;
    nama: string;
    nomor_pendaftaran: string;
    jenjang: string;
}) {
    return sendTemplate({
        phone: data.phone,
        templateId: 'registration_success',
        variables: {
            nama: data.nama,
            nomor_pendaftaran: data.nomor_pendaftaran,
            jenjang: data.jenjang === 'MTs' ? 'Madrasah Tsanawiyah (MTs)' : "I'dad Lughowi (Setara SMA)",
            dashboard_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
            kontak: '0851-1152-4441',
        },
    });
}

/**
 * Send document verification notification
 */
export async function notifyDocumentVerified(data: {
    phone: string;
    nama: string;
    dokumen_list: string;
    status: 'verified' | 'rejected';
    catatan?: string;
}) {
    const templateId = data.status === 'verified' ? 'document_verified' : 'document_rejected';

    return sendTemplate({
        phone: data.phone,
        templateId,
        variables: {
            nama: data.nama,
            dokumen_list: data.dokumen_list,
            catatan: data.catatan || '',
            dashboard_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
            kontak: '0851-1152-4441',
        },
    });
}

/**
 * Send payment verification notification
 */
export async function notifyPaymentVerified(data: {
    phone: string;
    nama: string;
    jumlah: string;
    metode: string;
    tanggal: string;
    status: 'verified' | 'rejected';
    catatan?: string;
}) {
    const templateId = data.status === 'verified' ? 'payment_verified' : 'payment_rejected';

    return sendTemplate({
        phone: data.phone,
        templateId,
        variables: {
            nama: data.nama,
            jumlah: data.jumlah,
            metode: data.metode,
            tanggal: data.tanggal,
            catatan: data.catatan || '',
            dashboard_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
            kontak: '0851-1152-4441',
        },
    });
}

/**
 * Send deadline reminder
 */
export async function notifyDeadlineReminder(data: {
    phone: string;
    nama: string;
    jenis_deadline: string;
    tanggal_deadline: string;
    status: string;
    action_needed: string;
}) {
    return sendTemplate({
        phone: data.phone,
        templateId: 'deadline_reminder',
        variables: data,
    });
}

/**
 * Send test schedule notification
 */
export async function notifyTestSchedule(data: {
    phone: string;
    nama: string;
    tanggal: string;
    waktu: string;
    tempat: string;
}) {
    return sendTemplate({
        phone: data.phone,
        templateId: 'test_schedule',
        variables: {
            ...data,
            dashboard_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
        },
    });
}

/**
 * Send announcement notification
 */
export async function notifyStatusChange(data: {
    phone: string;
    nama: string;
    status: 'accepted' | 'rejected';
    jenjang?: string;
    tahun_ajaran?: string;
    dashboard_url?: string;
}) {
    // Only accepted template exists for now
    if (data.status !== 'accepted') return { status: false, message: 'Template not found' };

    return sendTemplate({
        phone: data.phone,
        templateId: 'announcement_accepted',
        variables: {
            nama: data.nama,
            jenjang: data.jenjang || '-',
            tahun_ajaran: data.tahun_ajaran || '2025/2026',
            dashboard_url: data.dashboard_url || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
        },
    });
}
