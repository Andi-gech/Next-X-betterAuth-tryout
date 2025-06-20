"use client"
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";



export default function Toggle() {

    
  const { theme, setTheme } = useTheme()
    const toggleTheme = () => {
   setTheme(theme==="light"?"dark":"light")
  }

  return (

    
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 cursor-pointer transition-all duration-300 hover:scale-105"
        onClick={toggleTheme}
      >
        {theme === "light" ? <Moon /> : <Sun />}
      </div>
  
  )
}
