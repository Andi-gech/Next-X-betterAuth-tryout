"use client";
import React from 'react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation';
import { getusersList } from '@/server/users';
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
export default function page() {
    const router = useRouter();
    const [user, setUser] = React.useState<any>(null);
   const finduser =async ()=>{
    console.log("Finding user...");
    const { data,message } = await getusersList();
    console.log(data);
    if (data) {
      setUser(data);
      console.log("User found:", data);
    } else {
      console.log("No user found");
    }
   

   }
  return (
    <div className='bg-yellow-900 min-h-screen p-8'>
      {
        user?.users?.map((user: any) => (
          <div key={user.id} className="p-4 border-b">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Created At: {new Date(user.createdAt).toLocaleDateString()}</p>
         
          </div>
        ))
      }
      
        <Button  variant={"destructive"}  onClick={
        finduser
        }>Click me</Button>
        

        <button  onClick={() => {authClient.signOut(
          {
            fetchOptions:{
              onSuccess(context) {
                router.push('/login');
              },
            }
          }
        )}} className="bg-red-500 text-white px-4 py-2 rounded ml-4">
        Logout
        </button>
    </div>
  )
}

