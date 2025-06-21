import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const sessionCookie = await getSessionCookie(request);
    
   
    console.log(sessionCookie,"daya")
    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard","/teacher"],
};