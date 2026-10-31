import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifySessionToken(token);
    if (!payload || payload.role !== "ADMIN") {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("unauthorized", "1");
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect /client routes or account areas
  if (pathname.startsWith("/client") || pathname.startsWith("/account")) {
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    const payload = await verifySessionToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/client/:path*", "/account/:path*"],
};
