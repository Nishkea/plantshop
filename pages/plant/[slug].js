import React, { useState, useEffect} from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Header from '../../components/Header'
import Link from 'next/link'
import { GraphQLClient, gql } from 'graphql-request'
import { Scrollbar, Autoplay  } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const client = new GraphQLClient('https://directus.shoto.studio/graphql');

export async function getStaticPaths() {
   const QUERY = gql`
      query {
         plants {
            slug
         }
      }
   `;
	const plants = await client.request(QUERY);
	const paths = plants.plants.map(plant => ({ params: { slug: plant.slug.toString() } }))
   return {
     paths,
     fallback: false
   };
 }

export async function getStaticProps(context) {
	const slug = context.params.slug;
   const QUERY_ITEM = gql`
      query {
         plants_by_id(id: "${slug}") {
            slug
            title
            description
            thumbnail {
                  id
                  title
            }
            amount
            price
            gallery {
                  directus_files_id {
                     id
                     title
                  }
            }
         }
      }
   `;
   const plantRequest = await client.request(QUERY_ITEM);
   const plant = await plantRequest.plants_by_id;
	return {
	  props: {
		plant
	  }, 
	}
 }

 export default function Plant({plant}) {
   const [message, setMessage] = useState(null);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   // const cartItem = {
   //    slug: plant.slug,
   //    title: plant.title,
   //    price: plant.price,
   // }
   
   const addToCart = async () => {
      const cartId = localStorage.getItem('cartId');
      // If cart ID is not set, create a new cart
      if (!cartId) {
         const QUERY = gql`
            mutation {
               create_cart_item {
                  id
               }
            }
         `;
         const cart = await client.request(QUERY);
         localStorage.setItem('cartId', cart.create_cart.id);
      }
      // Get cart ID from localstorage
      // Add item to cart
      const QUERY = gql`

         mutation {
            add_item_to_cart(id: "${cartId}", items: {
               slug: "${plant.slug}",
               title: "${plant.title}",
               price: "${plant.price}",
            }) {
               id
               items
            }
         }
      `;
      const cart = await client.request(QUERY);
      console.log(cart);
      setMessage('Plant toegevoegd aan winkelwagen.');
   }


      return (
      <>
         <Head>
            <title>{plant.title} - Seedling</title>
            <meta name="description" content={plant.description} />
            <meta property="og:title" content={plant.title} />
            <meta property="og:description" content={plant.description} />
         </Head>

         <Header link={plant.title} />
         <div className='container py-10 mx-auto flex flex-col space-y-24 px-2 md:px-0'>
            <section role='info' className='grid grid-cols-12 gap-10 font-primary '>

               <div className='col-span-12 md:col-span-6 relative rounded h-[20rem] md:h-[30rem] overflow-hidden -rotate-2'>
                  <Image priority placeholder="blur" blurDataURL={`https://directus.shoto.studio/assets/` + plant.thumbnail.id + `?fit=cover&width=200&height=200&q=40&format=webp`} alt={plant.thumbnail.title} layout='fill' objectFit='contain' src={`https://directus.shoto.studio/assets/` + plant.thumbnail.id + `?fit=cover&width=900&height=900&q=90&format=webp`} />
               </div>

               <div className='col-span-12 md:col-span-6 flex flex-col justify-start items-start'>
                  <h1 className='text-[2rem] font-bold font-secondary'>{plant.title}</h1>
                  <p className={`text-sm font-medium py-1 px-2 rounded font-primary ${plant.amount > 0 ? ' bg-green-600 text-white' : ' bg-red-800 text-red-300'}`}>{plant.amount > 0 ? 'Op voorraad' : 'Niet op voorraad'}</p>
                  <p className='text-3xl mt-8'>€{plant.price}</p>

                  {plant.amount > 0 ? 
                     <div className='cursor-pointer p-2 mt-2 bg-black text-white rounded' onClick={() => addToCart()} >
                        Toevoegen aan winkelwagen
                     </div>
                  : null}

                  {message ? <p className='font-bold text-md mt-2'>{message} <Link href='/cart'><span className='text-black underline cursor-pointer '>Bekijk winkelwagen</span></Link></p> : null}

                  <div className='flex flex-col mt-8'>
                     <p className='font-bold text-lg'>Meer over {plant.title}</p>
                     <p className='leading-6'>{plant.description}</p>
                  </div>
               </div>

            </section>

            {plant.gallery.length > 0 && (
               <section role='gallery' className='mt-5'>
                  <h3 className='font-secondary text-[1.5rem] font-bold'>Get inspired.</h3>
                  <p className='font-primary font-medium text-[1.2rem] mb-10'>De {plant.title} in actie</p>
                  <div className='hover:cursor-grab'>
                     <Swiper
                        modules={[Scrollbar, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1.2}
                        speed={1000}
                        autoplay={{
                           delay: 3000,
                           disableOnInteraction: false,
                        }}
                        scrollbar={{ draggable: true }}
                     >
                        {plant.gallery.map((image, index) => (
                           <SwiperSlide  key={index}>
                              <div className='col-span-4 h-[20rem] md:h-[40rem] relative'>
                                 <Image priority placeholder="blur" blurDataURL={`https://directus.shoto.studio/assets/` + image.directus_files_id.id + `?fit=cover&width=200&height=200&q=40&format=webp`} alt={image.directus_files_id.title} layout='fill' objectFit='cover' src={`https://directus.shoto.studio/assets/` + image.directus_files_id.id + `?fit=cover&width=900&height=900&q=90&format=webp`} />
                              </div>
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </div>
               </section>
            )}

         </div>
      </>
   )
 }

 