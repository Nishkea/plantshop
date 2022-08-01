import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
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
   console.log(plant);
   return (
      <>
      <Head>
         <title>{plant.title}</title>
      </Head>
      <section className='container mx-auto'>
         <h1 className='text-2xl font-bold'>{plant.title}</h1>
         <p>{plant.description}</p>

         {plant.gallery.length > 0 && (
            <>
               <p>Get inspired:</p>
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
                           <div className='col-span-4 h-[30rem] relative'>
                              <Image priority placeholder="blur" blurDataURL={`https://directus.shoto.studio/assets/` + image.directus_files_id.id + `?fit=cover&width=200&height=200&q=40&format=webp`} alt={image.directus_files_id.title} layout='fill' objectFit='cover' src={`https://directus.shoto.studio/assets/` + image.directus_files_id.id + `?fit=cover&width=900&height=900&q=90&format=webp`} />
                           </div>
                        </SwiperSlide>
                     ))}
                  </Swiper>
               </div>
            </>
         )}

      </section>
      </>
   )
 }

 