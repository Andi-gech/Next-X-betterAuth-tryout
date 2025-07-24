
import Login from "@/components/forms/LoginForm";
import Pattern from "@/components/ui/Pattern";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,

  CardDescription,
  
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";


import Link from "next/link";


export default async  function page() {
  const session=await auth.api.getSession(
    {
      headers: await headers()
    }
  )
  if (session) {
    console.log("Session found:", session);
    redirect("/dashboard");
  } else {
    console.log("No session found, rendering login page.");
  }
 
  return (
    <div className="w-screen h-screen flex items-center justify-center">

      <div className="z-10 w-sm">
         <Card className="w-full max-w-sm">
       <CardHeader className={""}>
        <CardTitle className={""}>Login to your account</CardTitle>
        <CardDescription className={""}>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction className={""}>
          <Link href="/signup">
          <Button variant="link">Sign Up</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <Login  />
      </Card>
      </div>
        </div>
  )
}
