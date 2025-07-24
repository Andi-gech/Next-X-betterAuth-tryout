
import SignupForm from "@/components/forms/SignupForm"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
export default function page() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
       <Card className="w-full max-w-sm">
       
      <CardHeader className={""}>
        <CardTitle className={""}>Register Your account</CardTitle>
        <CardDescription className={""}>
          Enter your email below to register to your account
        </CardDescription>
        <CardAction className={""}>
          <Link href="/login">
          <Button  variant="link">Sign In</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className={""}>
        <SignupForm/>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        
       
      </CardFooter>
    </Card>
    </div>
  )
}
