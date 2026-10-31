import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";

const secretKey = process.env.AUTH_SECRET || "fallback-secret-minimum-32-chars-long-security-key";
const encodedKey = new TextEncoder().encode(secretKey);

export const SESSION_COOKIE_NAME = "vm_session_token";

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: Role;
  expiresAt: number;
}

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Token creation (12 hours validity)
export async function signSessionToken(payload: Omit<SessionPayload, "expiresAt">): Promise<string> {
  const expiresAt = Date.now() + 12 * 60 * 60 * 1000;
  return new SignJWT({ ...payload, expiresAt })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(encodedKey);
}

// Token verification
export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

// Get session from server headers / cookies
export async function getCurrentSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

// Require authenticated administrator guard
export async function requireAdminSession(): Promise<SessionPayload> {
  const session = await getCurrentSession();
  if (!session || session.role !== "ADMIN") {
    throw new Error("UNAUTHORIZED_ADMIN_ACCESS");
  }
  return session;
}

// Set session cookie
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 12 * 60 * 60, // 12 hours
  });
}

// Clear session cookie
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

