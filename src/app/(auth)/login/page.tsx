
import Login from "@/components/Form";
import Pattern from "@/components/Pattern";

export default function page() {
 

  return (
    <div className="w-screen h-screen flex items-center">
      <Pattern/>
      <div className="relative w-full h-full z-10 py-[100px] flex items-center justify-center">
        <div className="  rounded-lg shadow-lg  shadow-zinc-500 dark:shadow-zinc-900 p-8 max-w-[350px]  bg-zinc-300/10  backdrop-blur-lg w-full">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <Login  />
        </div>
        </div>
      </div>
  )
}
