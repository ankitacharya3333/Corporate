
import { jwtVerify } from "jose";

const secretKey =
    process.env.AUTH_SECRET ||
    "fallback-secret-minimum-32-chars-long-security-key";

const encodedKey = new TextEncoder().encode(secretKey);

export const SESSION_COOKIE_NAME = "vm_session_token";

export interface SessionPayload {
    userId: string;
    email: string;
    name: string;
    role: "CUSTOMER" | "ADMIN";
    expiresAt: number;
}

export async function verifySessionToken(
    token: string
): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, encodedKey, {
            algorithms: ["HS256"],
        });

        return payload as unknown as SessionPayload;
    } catch {
        return null;
    }
}
