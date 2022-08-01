import React from 'react'
import { GraphQLClient, gql } from 'graphql-request'

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
      <section className='container mx-auto'>
         <h1 className='text-2xl font-bold'>{plant.title}</h1>
         <p>{plant.description}</p>
      </section>
   )
 }