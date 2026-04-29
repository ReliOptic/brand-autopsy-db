// Auth middleware. Protects Layer 2-8 brand content; Layer 1 and other pages remain public.
// Requires: `npm install next-auth@beta`.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

// Routes that require authentication.
const PROTECTED_PATTERNS: readonly RegExp[] = [
  /^\/brands\/[^/]+\/layers\/[2-8]/, // Layer 2-8 detail pages
];

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const needsAuth = PROTECTED_PATTERNS.some((pattern) =>
    pattern.test(request.nextUrl.pathname),
  );
  if (!needsAuth) return NextResponse.next();

  const session = await auth();
  if (!session?.user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/brands/:path*/layers/:path*"],
};
