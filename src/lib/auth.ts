import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/generated/prisma";
import { nextCookies } from "better-auth/next-js";
import { sendMail } from "./sendemail";
import { admin as adminplugin } from "better-auth/plugins"
import { user,admin,teacher,ac } from "@/lib/permissions"
import { openAPI } from "better-auth/plugins"
import { createAuthMiddleware, APIError } from "better-auth/api";
const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "mongodb",
    }),
    trustedOrigins: [
        'http://192.168.1.7/:3000',
    ],
    
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        verifyEmailOnSignUp: true,
        autoSignIn:false,
        
        
        
        
    },
    emailVerification: {
    sendVerificationEmail: async ( { user, url, token }, request) => {

        await sendMail({
        email: user.email,
        subject: "Verify your email",
        message: `<p>Copy and paste the following link into your browser to verify your email:</p><p>${url} 
        token: ${token}</p>
        <p>If you did not request this email, please ignore it.</p>
        </p>`,
       });
    },
    autoSignInAfterVerification: true,

    },
    account: {
        accountLinking:{
            enabled: true,
        }
    },
        
    socialProviders: {
        
       google: {
        prompt: "select_account", 
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
        github: { 
            prompt:"select_account",
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }
    },
    plugins: [
        openAPI(),
        adminplugin(
            {
                
                roles: {
                    user,
                    admin,
                    teacher,
                },
                 ac,
            }
        ),
        
        nextCookies()]
        

});