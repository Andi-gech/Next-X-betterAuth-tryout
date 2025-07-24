// lib/withAuth.ts
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type AuthCallback = (session: any) => Promise<NextResponse>;

export async function withAuth(
  req: NextRequest,
  callback: AuthCallback
): Promise<NextResponse> {
  const session = await auth.api.getSession(req);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return callback(session);
}

