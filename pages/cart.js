import React, { useState, useEffect } from 'react'
import Header from '../components/Header'

export default function Cart()
{
   const [cart, setCart] = useState([]);
  
   const removeFromCart = (id) => {
      const cart = JSON.parse(localStorage.getItem('cart'));
      const newCart = cart.filter(item => item.slug !== id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      setCart(newCart);
   }

   useEffect(() => {
      if (localStorage.getItem('cart')) {
         setCart(JSON.parse(localStorage.getItem('cart')));
      }
   }, []);

   return (
      <div className='w-full'>
         <Header link="Cart" />
         <main className='container mx-auto'>
            <div className='flex flex-col justify-center items-center'>
               {cart.map((item, index) => (
                  <div key={index} className='flex flex-col space-y-2'>
                  <p>{item.title}</p>
                  <p>{item.price}</p>
                  <button onClick={() => removeFromCart(item.slug)}>Remove</button>
                  </div>
               ))}
            </div>
         </main>
      </div>
   )
 
}