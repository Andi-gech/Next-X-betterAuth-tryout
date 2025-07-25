'use client'
import React from 'react'

import { signIn } from "@/server/users";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
 CardContent
 } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from '@/lib/auth-client';
import { toast } from "sonner"
import { loginSchema } from '@/schema/authSchema';
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


type loginSchema = z.infer<typeof loginSchema>;

export default function Login() {
const {register, handleSubmit, formState: { errors,isSubmitting }} = useForm<loginSchema>({
        resolver: zodResolver(loginSchema),
    });
const router = useRouter();
async function Handleemaillogin(data:loginSchema) {
      const { success, message } = await signIn(data);
      if (success) {
        console.log(success)
        router.push("/dashboard");
    } else {
      toast.error(message || "An error occurred during login.", {
        duration: 5000,
        position: "top-center",
      });
      return;
    }
}
async function handleGoogleSignIn() {
            try {
              await authClient.signIn.social({
                      provider: "google",
                      callbackURL: "/dashboard",
                      
                  })
              } catch (error) {
              toast.error("Failed to sign in with Google. Please try again.");
            }
        }
async function handleGithubSignin() {
        try {
          await authClient.signIn.social({
            provider: "github",
            callbackURL: "/dashboard",
          });
          router.push("/dashboard");
           
        } catch (error) {
        toast.error("Failed to sign in with Github. Please try again.");
        }
        }
    return (
   <CardContent className={""}>
        <form onSubmit={handleSubmit(Handleemaillogin)} className="space-y-6">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="m@example.com"
                required
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required 
              {...register("password")}
                placeholder="********"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div  className="flex items-center justify-between mt-4">
           <Button type='submit' className="w-full  " disabled={isSubmitting} >
            {isSubmitting ? "Loading..." : "Login"}
        </Button>
          </div>
     
        </form>
            <div className="flex-col   grid gap-2  mt-2">
       
        <Button 
        onClick={handleGoogleSignIn}
        variant="outline" className="w-full">
          Login with Google
          
        </Button>
        <Button 
        onClick={handleGithubSignin}
        variant="outline" className="w-full">
          Login with Github
         
        </Button>
      </div>
     </CardContent>
    );
}
