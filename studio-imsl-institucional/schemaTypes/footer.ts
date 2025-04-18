// schemas/footer.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'socialLinks',
      title: 'Links Sociais',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Plataforma', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'programmingTitle',
      title: 'Título da Programação',
      type: 'string',
    }),
    defineField({
      name: 'programmingText',
      title: 'Texto da Programação',
      type: 'string',
    }),
    defineField({
      name: 'helpTitle',
      title: 'Título da Ajuda',
      type: 'string',
    }),
    defineField({
      name: 'helpPhone',
      title: 'Telefone de Ajuda',
      type: 'string',
    }),
    defineField({
      name: 'locationTitle',
      title: 'Título da Localização',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Endereço',
      type: 'string',
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'URL do Mapa (iframe)',
      type: 'url',
    }),
  ],
})
