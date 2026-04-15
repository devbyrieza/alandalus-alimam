import { createHmac } from "crypto";

const MAGIC_LINK_SECRET =
    process.env.MAGIC_LINK_SECRET || "fallback-secret-for-dev";

// Token Structure: base64(payload).signature
// payload: { id: string, role: string, full_name: string, exp: number }

export function generateMagicToken(
    profileId: string,
    role: string,
    fullName: string,
    expiresInHours = 24,
    redirect?: string
): string {
    const exp = Date.now() + expiresInHours * 60 * 60 * 1000;
    const payload = { id: profileId, role, full_name: fullName, exp, redirect };

    // Convert payload to base64
    const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64");

    // Create HMAC SHA256 signature
    const signature = createHmac("sha256", MAGIC_LINK_SECRET)
        .update(payloadStr)
        .digest("hex");

    return `${payloadStr}.${signature}`;
}

export function verifyMagicToken(token: string): {
    valid: boolean;
    data?: { id: string; role: string; full_name: string; redirect?: string };
    reason?: string;
} {
    try {
        const parts = token.split(".");
        if (parts.length !== 2) {
            return { valid: false, reason: "Format token tidak valid" };
        }

        const [payloadStr, signature] = parts;

        // Verify signature
        const expectedSignature = createHmac("sha256", MAGIC_LINK_SECRET)
            .update(payloadStr)
            .digest("hex");

        if (signature !== expectedSignature) {
            return { valid: false, reason: "Token rusak atau dimanipulasi" };
        }

        // Decode and parse payload
        const decodedPayload = Buffer.from(payloadStr, "base64").toString("utf-8");
        const payload = JSON.parse(decodedPayload);

        // Check expiration
        if (Date.now() > payload.exp) {
            return { valid: false, reason: "URL kedaluwarsa. Silakan minta yang baru." };
        }

        return {
            valid: true,
            data: {
                id: payload.id,
                role: payload.role,
                full_name: payload.full_name,
                redirect: payload.redirect,
            },
        };
    } catch (error) {
        return { valid: false, reason: "Terjadi kesalahan saat verifikasi" };
    }
}

// ============================================================================
// PERMANENT SHORT LINKS MAPPING (Slug -> Name query)
// ============================================================================

export const PERMANENT_SLUGS: Record<string, string> = {
    "abah": "Abah",
    "agus": "Agus Cahyono",
    "fuad": "Fuad Khomsatun",
    "jusman": "Jusman",
    "bachtiar": "Maulidin Bachtiar",
    "muhajir": "Muhajir",
    "syauqi": "Muhammad Syauqi Al Faruq",
    "teguh": "Teguh"
};

// ============================================================================
// MANUAL TINYURL MAPPING (Name -> Short URL)
// ============================================================================

export const MANUAL_TINYURLS: Record<string, string> = {
    "Abah": "https://tinyurl.com/alimam-abah",
    "Agus Cahyono": "https://tinyurl.com/alimam-agus",
    "Fuad Khomsatun": "https://tinyurl.com/alimam-fuad",
    "Jusman": "https://tinyurl.com/alimam-jusman",
    "Maulidin Bachtiar": "https://tinyurl.com/alimam-bachtiar",
    "Muhajir": "https://tinyurl.com/alimam-muhajir",
    "Muhammad Syauqi Al Faruq": "https://tinyurl.com/alimam-syauqi",
    "Teguh": "https://tinyurl.com/alimam-teguh"
};

/**
 * Get internal short link (permanent) for a slug
 */
export function getPermanentAuthUrl(slug: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pesantren-alimam.com";
    return `${baseUrl}/api/auth/short/${slug}`;
}

/**
 * Get manual TinyURL if exists for a user
 */
export function getManualTinyUrl(fullName: string): string | null {
    if (!fullName) return null;
    const normalizedTarget = fullName.toLowerCase();

    // 1. Try exact match (normalized)
    for (const [name, url] of Object.entries(MANUAL_TINYURLS)) {
        if (name.toLowerCase() === normalizedTarget) return url;
    }

    // 2. Try substring match (normalized)
    for (const [name, url] of Object.entries(MANUAL_TINYURLS)) {
        const normalizedName = name.toLowerCase();
        if (normalizedTarget.includes(normalizedName) || normalizedName.includes(normalizedTarget)) {
            return url;
        }
    }

    return null;
}

/**
 * Generate automatic TinyURL for any long URL
 * Uses TinyURL API for short link generation
 */
export async function generateTinyUrl(longUrl: string): Promise<string> {
    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        if (response.ok) {
            const shortUrl = await response.text();
            return shortUrl;
        }
    } catch (error) {
        console.error('Failed to generate TinyURL:', error);
    }
    // Fallback to original URL if TinyURL generation fails
    return longUrl;
}
