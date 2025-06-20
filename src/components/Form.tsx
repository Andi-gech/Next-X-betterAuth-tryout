'use client'
import React, { useState } from 'react'
import InputBox from "@/components/InputBox";
import { signIn,signup } from "@/server/users";
import { useRouter } from "next/navigation";
import { signInWithGoogle,signInWithGithub,sendemailverification } from '@/lib/auth-client';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState("");
 
    const router = useRouter();
    async function handleEmailVerification(email: string) {
        try {
            await sendemailverification(email);
            setFormError("Verification email sent. Please check your inbox.");
            router.push("/dashboard");
        } catch (error) {
            setFormError("Failed to send verification email.");
        }
    }

    async function Handleemaillogin(e:any) {
        e.preventDefault();
        setLoading(true);

    const { success, message } = await signIn({
      email: email,
      password: password,
      
 
    });

    if (success) {
     
      router.push("/dashboard");
    } else {
        setFormError(message || "An error occurred during signup.");
       
    
    }

    setLoading(false);
  }
    async function handleGoogleSignIn() {
            try {
                await signInWithGoogle();
                router.push("/dashboard");
            } catch (error) {
                setFormError("Failed to sign in with Google.");
            }
        }
    async function handleGithubSignin() {
        try {
            await signInWithGithub();
            router.push("/dashboard");
        } catch (error) {
            setFormError("Failed to sign in with Github.");
        }
        
    }
  
    return (
        <form >
            {loading && <p>Loading...</p>}
            {formError && <p className="text-red-600">{formError}</p>}
         
            

            <InputBox
                label="Email"
                type="email"
                placeholder="abebe@gmail.com"
                id="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />

            <InputBox
                label="Password"
                type="password"
                placeholder="*******"
                id="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />

            <p className="text-gray-500 my-1 text-sm">
                Forget Account? <span className="text-blue-600">Reset here</span>
            </p>

            <button
               onClick={Handleemaillogin}
                type='button'
                className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition"
            >
                Login
            </button>
            <button
                onClick={handleGoogleSignIn}
                type="button"
                className="bg-gray-600 text-white rounded-lg py-2 px-4 hover:bg-gray-700 transition"
            >
                Sign in with Google
            </button>
            <button
               
                type="button"
                onClick={handleGithubSignin}
                className="bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-700 transition mt-2"
            >
                Sign in with Github
            </button>

        </form>
    );
}
