import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import { GraphQLClient, gql } from 'graphql-request'
import PlantCard from '../components/PlantCard'

const client = new GraphQLClient('https://directus.shoto.studio/graphql');

export async function getStaticProps() {
  const QUERY = gql`
  query {
    plants {
      slug
      title
      price
      amount
      thumbnail {
          id
          title
      }
    }
  }
`;
  const plants = await client.request(QUERY);

  const HomeQUERY = gql`
  query {
    plant_home {
      title
      subtitle
      about_title
      about_subtitle
      featured_title
      featured_subtitle
      about_image {
        id
        title
      }
      featured_image {
        id
        title
      }
      header {
        id
        title
      }
    }
  }
  `;
  const home = await client.request(HomeQUERY);

  return {
    props: {
      plants: plants.plants,
      home: home.plant_home
    },
    revalidate: 60,
  }
}



export default function Home({plants, home}) {
  console.log(home);
  return (
    <div>
      <Head>
        <title>Seedling - planten voor iedereen</title>
        <meta name="description" content="Een voorbeeld NextJS app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className='container mx-auto py-10 px-2 md:px-0'>

        <section className='flex p-10 justify-center items-center text-white font-primary w-full h-[20rem] bg-black rounded mb-24 relative overflow-hidden'>
          <div className='z-10 flex flex-col -space-y-1 items-center justify-center'>
            <h1 className='z-10 font-secondary text-[2rem] font-bold'>{home.title}</h1>
            <p className='z-10 font-primary text-[1.5rem] font-regular'>{home.subtitle}</p>
          </div>
          <div className='absolute top-0 left-0 w-full h-full'>
            <Image priority placeholder="blur" blurDataURL={`https://directus.shoto.studio/assets/` + home.header.id + `?fit=cover&width=200&height=200&q=40&format=webp`} alt={home.header.title} layout='fill' objectFit='cover' src={`https://directus.shoto.studio/assets/` + home.header.id + `?fit=cover&width=900&height=900&q=90&format=webp`} />
          </div>
        </section>


        <h3 className='font-secondary text-[1.5rem] font-bold'>Onze nieuwste planten.</h3>
        <p className='font-primary font-medium text-[1.2rem] mb-10'>Veel groen voor in huis</p>

        <section className='grid grid-cols-12 gap-4'>
          {plants.map((plant, index) => (
            <PlantCard key={index} slug={plant.slug} thumbnail={plant.thumbnail} title={plant.title} price={plant.price} amount={plant.amount} />
          ))}
        </section>

        <section className='container mx-auto grid grid-cols-12 mt-24 gap-4'>
          <div className='col-span-12 md:col-span-6 relative flex items-center justify-center p-32 rounded overflow-hidden'>
            <div className='z-10 flex flex-col justify-center items-center text-white font-primary'>
              <h3 className='font-secondary text-[1.5rem] font-bold'>{home.about_title}</h3>
              <p className='font-primary font-medium text-[1.2rem] text-center'>{home.about_subtitle}</p>
            </div>
            <div className='absolute top-0 left-0 w-full h-full'>
              <Image priority placeholder="blur" blurDataURL={`https://directus.shoto.studio/assets/` + home.about_image.id + `?fit=cover&width=200&height=200&q=40&format=webp`} alt={home.about_image.title} layout='fill' objectFit='cover' src={`https://directus.shoto.studio/assets/` + home.about_image.id + `?fit=cover&width=900&height=900&q=90&format=webp`} />
            </div>
          </div>

          <div className='col-span-12 md:col-span-6 relative flex items-center justify-center p-32 rounded overflow-hidden'>
            <div className='z-10 flex flex-col justify-center items-center text-white font-primary'>
              <h3 className='font-secondary text-[1.5rem] font-bold'>{home.featured_title}</h3>
              <p className='font-primary font-medium text-[1.2rem]'>{home.featured_subtitle}</p>
            </div>
            <div className='absolute top-0 left-0 w-full h-full'>
              <Image priority placeholder="blur" blurDataURL={`https://directus.shoto.studio/assets/` + home.featured_image.id + `?fit=cover&width=200&height=200&q=40&format=webp`} alt={home.featured_image.title} layout='fill' objectFit='cover' src={`https://directus.shoto.studio/assets/` + home.featured_image.id + `?fit=cover&width=900&height=900&q=90&format=webp`} />
            </div>
          </div>

        </section>

      </main>

    </div>
  )
}
