// lib/withRole.ts
import { withAuth } from "./withAuth";
import { NextRequest, NextResponse } from "next/server";

export function withRole(
  req: NextRequest,
  allowedRoles: string[],
  callback: (session: any) => Promise<NextResponse>
): Promise<NextResponse> {
  return withAuth(req, async (session) => {
    console.log("Session in withRole:", session);
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden: Insufficient permissions" }, { status: 403 });
    }

    return callback(session);
  });
}
