import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins"
export const authClient = createAuthClient({
    
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"
});
export const sendemailverification = async (email: string) => {
    await authClient.sendVerificationEmail({
        email,
        callbackURL: "/dashboard",
    });
}
export const signInWithGoogle = async () => {
    await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        
    })
}

export const signInWithGithub = async () => {
    await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
    })
}