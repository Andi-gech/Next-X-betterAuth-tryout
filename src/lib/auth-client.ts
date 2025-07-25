import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins"
import { user,admin,teacher,ac } from "@/lib/permissions"
export const authClient = createAuthClient({
     plugins: [
        adminClient(
            {
                 ac,
            roles: {
                admin,
                user,
                teacher
            }
            }
        )
    ],
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"
});
export const sendemailverification = async (email: string) => {
    await authClient.sendVerificationEmail({
        email,
        callbackURL: "/dashboard",
    });
}

export const signInWithGithub = async () => {
    await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
    })
}

export const listUsers = async () => {
    return await authClient.admin.listUsers({
        query: {
            limit: 10,
            offset: 0,
        },
    });
}

export const signOut = async () => {
    await authClient.signOut();
}