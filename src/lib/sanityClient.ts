import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: '129trp1f',
  dataset: 'production',
  apiVersion: '2023-10-01',
  useCdn: false, // false para dados sempre frescos (ideal para CMS)
})