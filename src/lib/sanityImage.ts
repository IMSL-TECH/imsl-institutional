import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './sanityClient' // ajuste para o caminho do seu cliente

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}