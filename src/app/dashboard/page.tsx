"use client";
import React from 'react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation';


export default function page() {
    const router = useRouter();
    
  return (
    <div>
        
        <button onClick={
            ()=>{
                authClient.signOut(
                    {
                        fetchOptions: {
                        onSuccess: () => {
                            router.push("/login");
                        }
                        }
                    }
                )

            }
        } className="bg-blue-500 text-white px-4 py-2 rounded">
        log out 
        </button>
    </div>
  )
}
