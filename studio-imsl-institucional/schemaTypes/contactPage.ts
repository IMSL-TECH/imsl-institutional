import { defineType, defineField} from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Página de Contato',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Página',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
    }),
    defineField({
      name: 'address',
      title: 'Endereço',
      type: 'object',
      fields: [
        { name: 'street', title: 'Rua', type: 'string' },
        { name: 'number', title: 'Número', type: 'string' },
        { name: 'district', title: 'Bairro', type: 'string' },
        { name: 'city', title: 'Cidade', type: 'string' },
        { name: 'state', title: 'Estado', type: 'string' },
        { name: 'zip', title: 'CEP', type: 'string' },
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Telefone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
    }),
  ],
})
