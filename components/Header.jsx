import React from 'react' 
import Link from 'next/link'

export default function Header({link}) {
   return (
      <>
         <header className='w-full bg-slate-100 border-b px-2 md:px-0'>
            <div className='container mx-auto py-5 flex justify-between items-center'>
               <Link href='/'>
                  <h1 className="cursor-pointer text-3xl font-bold flex items-center">🌱 Seedling <span className='text-sm ml-2 font-medium text-black/50'>| voor alle voorbeeld planten</span></h1>
               </Link>
               <Link href='/cart'><div className='flex cursor-pointer hover:bg-black/10 items-center text-xl p-3 border-2 border-black/10 rounded'>🛒</div></Link>
            </div>
         </header>
         <div className='w-full bg-white/30 border-b px-2 md:px-0'>
            <div className='container mx-auto py-1 text-md font-medium'>
               <Link href='/'>
                  <a>Home</a>
               </Link>
               {link && <span className='ml-2'>/ {link}</span>}
            </div>
         </div>
      </>
   )
}