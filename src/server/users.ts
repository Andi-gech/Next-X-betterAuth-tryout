"use server";
import { auth } from "@/lib/auth"


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
