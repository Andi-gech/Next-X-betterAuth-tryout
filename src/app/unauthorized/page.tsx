"use client"
import { redirect, useRouter } from 'next/navigation'
import React from 'react'

export default function page() {
    const router = useRouter();
    const backtoprevious = () => {
        router.back();
    }
  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
        <p className="mb-6">You do not have permission to view this page.</p>
        <button
          onClick={backtoprevious}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    </div>
    

  )
}
