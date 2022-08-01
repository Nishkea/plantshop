import React, { useState, useEffect } from 'react'
import Header from '../components/Header'

export default function Cart()
{
   const [cart, setCart] = useState([]);
   const [total, setTotal] = useState(0);
  
   const removeFromCart = (id) => {
      const cart = JSON.parse(localStorage.getItem('cart'));
      const newCart = cart.filter(item => item.slug !== id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      setCart(newCart);
   }

   useEffect(() => {
      setCart(JSON.parse(localStorage.getItem('cart')));
   }, [setCart])

   useEffect(() => {
      if (localStorage.getItem('cart')) {
         let total = 0;
         cart.forEach(item => {
            total += item.price;
            total = Math.round(total * 100) / 100;
         });
         setTotal(total);
      }
   }, [cart]);

   return (
      <div className='w-full font-primary'>
         <Header link="Cart" />
         <main className='container mx-auto'>
            <h1 className='text-[2rem] font-bold font-secondary mb-2'>Cart</h1>
            <div className='flex flex-col justify-start items-start w-full'>
               {cart.map((item, index) => (
                  <div key={index} className='flex space-x-2 even:bg-black/5 w-full rounded py-2 px-1'>
                     <button onClick={() => removeFromCart(item.slug)}>❌</button>
                     <div className='flex justify-between items-center w-full'>
                     <p className='font-bold'>{item.title}</p>
                     <p className='font-bold'>€{item.price}</p>
                     </div>
                  </div>
               ))}
            </div>
            <div className='flex justify-between items-center w-full px-1 py-2 border-t-2 border-black/10 mt-2'>
               <p className='font-bold'>Totaal</p>
               <p className='font-bold'>€{total}</p>
            </div>
         </main>
      </div>
   )
 
}