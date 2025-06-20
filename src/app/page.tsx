import Button from '@/components/Button';
import Toggle from '../components/Toggle';
import Pattern from '@/components/Pattern';
import Image from 'next/image';
import logo from '../Assets/image.png';


export default function Home() {
  return (
    <div  className="w-screen   font-roboto   transition-all duration-300  h-screen " >
 
      <div className="w-full  absolute top-0 left-0 z-30 flex items-center justify-between p-4">
        <div className="text-2xl font-extrabold ">DU LMS</div>
        <div className="flex space-x-4 items-center justify-center">
         <Toggle/>
          <a
            href="/login"
            className="text-gray-600 dark:text-white font-bold hover:text-blue-600 transition duration-300"
          >
            Login
          </a>
         <a
            href="/signup"
            className="text-blue-600 dark:text-blue-400 font-bold hover:text-blue-600 transition duration-300"
          >
            Register 
          </a>
        </div>
      </div>
<Pattern />
    
     <div className=" z-20 w-full h-full  flex items-center justify-center overflow-hidden">
  
 
  <div className="text-center z-10 px-4 flex items-center justify-center flex-col">
    <Image src={logo} alt="Logo" width={190} height={190} className="mb-4 rounded-full" />
    <h1 className="text-5xl  font-extrabold text-gray-800 dark:text-white mb-4">
 Wellcome to DU LMS
    </h1>
    <p className="text-gray-600 text-lg dark:text-gray-300">
      Learn, Grow, and Achieve with Our University LMS
    </p>
   <Button/>
  </div>
</div>

    </div>
  );
}
