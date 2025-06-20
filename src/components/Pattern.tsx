
export default function Pattern() {
  return (
  <div className='absolute w-full h-full z-0 bg-gradient-to-br from-blue-900 dark:from-blue-600 via-zinc-300  to-zinc-50 dark:via-zinc-950 dark:to-zinc-950 overflow-hidden'>
   <div className="absolute top-10 left-4 w-[70px] h-[100px] z-30 rounded-lg rotate-12 bg-white/40 shadow-md  hover:scale-105 transition" />
  <div className="absolute top-[100px] left-[60px] w-[90px] h-[70px] -rotate-6 bg-blue-800/40 shadow blur-sm hover:scale-105 transition" />

 
  <div className="absolute bottom-[100px] right-[60px] w-[70px] h-[90px] rounded-lg -rotate-3 shadow blur-sm bg-blue-800/40  hover:scale-105 transition" />
 <div className="absolute bottom-[50px] right-[50px] w-[70px] h-[90px] rounded-lg rotate-45 bg-blue-800/40 shadow  hover:scale-105 transition" />
</div>
  )
}
