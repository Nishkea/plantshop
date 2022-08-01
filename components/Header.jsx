import React from 'react' 
import Link from 'next/link'

export default function Header({link}) {
   return (
      <>
         <header className='w-full bg-slate-100 border-b'>
            <div className='container mx-auto py-5'>
               <h1 className="text-3xl font-bold">🌱Plant</h1>
            </div>
         </header>
         <div className='w-full bg-white/30 border-b'>
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