"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { signupSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { signup } from "@/server/users";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


type SignupSchema = z.infer<typeof signupSchema>;

export default function SignupForm() {
 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    const { success, message } = await signup(data);
    if (success) {
      toast.success("Signup successful! verification email sent to your email", {
        duration: 5000,
        position: "top-center",
      });
    
    } else {
      toast.error(message || "Signup failed", {
        duration: 5000,
        position: "top-center",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="abebe kebede"
            {...register("name")}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            {...register("password")}
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Sign Up"}
      </Button>
    </form>
  );
}
