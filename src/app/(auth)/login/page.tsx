
import Login from "@/components/Form";
import Pattern from "@/components/Pattern";

export default function page() {
 

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Pattern/>
      <div className="z-10 w-sm">
         <Login  />
      </div>
         

      
      </div>
  )
}
