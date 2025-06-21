"use server";
import { auth } from "@/lib/auth"

import { headers } from "next/headers";
interface SigninInterface {
    email: string;
    password: string;
   
    callbackURL?: string;
}
export const signIn = async (data: SigninInterface) => {
    try {
    await auth.api.signInEmail({
        body: {
            email: data.email,
            password: data.password,
            callbackURL: data.callbackURL || "/dashboard"
        }
    })
    return {
        success: true,
        message: "Signed in successfully."
    }
} catch (error) {
    const e = error as Error
    return {
        success: false,
        message: e.message || "An unknown error occurred."
    }
}
}

interface SignupInterface {
    email: string;
    password: string;
    name: string;
    callbackURL?: string;
}
export const signup = async (
    SignupInterface: SignupInterface
) => {
      try {
        await auth.api.signUpEmail({
            body: {
                email: SignupInterface.email,
                password: SignupInterface.password,
                name: SignupInterface.name,
                callbackURL: SignupInterface.callbackURL || "/dashboard"
                
            }
            
        })

        return {
            success: true,
            message: "Signed up successfully."
        }
    } catch (error) {
        const e = error as Error

        return {
            success: false,
            message: e.message || "An unknown error occurred."
        }
    }
}
export const getusersList = async () => {
    try {
        const users = await auth.api.listUsers({
            query: {
                limit: 10,
                offset: 0
            },
            headers:await headers(),
        },
    )
        return {
            success: true,
            data: users
        }
    } catch (error) {
        const e = error as Error
console.error("Error fetching users:", e);
        return {
            success: false,
            message: e.message || "An unknown error occurred."
        }
    }
}

export const signupTeacher = async (
    SignupInterface: SignupInterface
) => {
    try {
        await auth.api.createUser({
            body: {
                email: SignupInterface.email,
                password: SignupInterface.password,
                name: SignupInterface.name,
                role: "admin"

                
            }

            
        })


        return {
            success: true,
            message: "Signed up successfully."
        }
    } catch (error) {
        const e = error as Error

        console.error("Error signing up teacher:", e);

        return {
            success: false,
            message: e.message || "An unknown error occurred."
        }
    }
}
