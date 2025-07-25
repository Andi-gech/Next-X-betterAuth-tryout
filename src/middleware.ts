import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get("cookie") || "", // Forward cookies
    },
  });

  if (!session || !session.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = session.user.role;
  const path = request.nextUrl.pathname;

  const isAdminPath = path.startsWith("/admin");
  const isTeacherPath = path.startsWith("/teacher");
  const isDashboardPath = path.startsWith("/dashboard");

  if (isAdminPath && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (isTeacherPath && !["teacher", "admin"].includes(role as string)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
  if (isDashboardPath && !["user"].includes(role as string)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }



  return NextResponse.next();
}


export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/teacher/:path*",
    "/"
  ],
};
