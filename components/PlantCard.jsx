import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function PlantCard({title, thumbnail, price, amount, slug})
{
   return (
      <Link href={`/plant/${slug}`}>
         <article className="group col-span-3 flex flex-col bg-white p-2 rounded hover:cursor-pointer hover:shadow-xl transition-shadow duration-300">
            <div className='w-full h-[20rem] relative rounded overflow-hidden'>
               <div className='group-hover:scale-105 absolute w-full h-full transition-all duration-300'>
                  <Image priority placeholder="blur" blurDataURL={`https://directus.shoto.studio/assets/` + thumbnail.id + `?fit=cover&width=200&height=200&q=40&format=webp`} alt={thumbnail.title} layout='fill' objectFit='cover' src={`https://directus.shoto.studio/assets/` + thumbnail.id + `?fit=cover&width=900&height=900&q=90&format=webp`} />
               </div>
            </div>
            <p className='font-bold text-xl mt-2 font-secondary'>{title}</p>
            <p className='font-bold text-lg font-primary'>€{price}</p>
            <p className={`font-medium font-primary ${amount > 0 ? ' ' : ' text-red-600'}`}>{amount > 0 ? ' 🌱 Op voorraad' : '🍂 Niet op voorraad'}</p>
         </article>
      </Link>
   )
}