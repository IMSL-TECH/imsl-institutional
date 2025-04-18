
import {defineType, defineField} from "sanity"

export default defineType({
    name:"homePage",
    title:"Página Home",
    type:"document",
    fields:[
        defineField({
            name:"heroHeadline",
            title:"HeadLine sessão Hero",
            type:"array",
            of:[
                {
                    type:"block",
                    styles:[],
                    lists:[],
                    marks:{
                        decorators:[{title: 'Negrito', value: 'strong'}],
                        annotations:[]
                    }
                
                }

            ]
        }),
        defineField({
            name:"heroDescription",
            title:"Texto da sessão Hero",
            type:"string",
        }),
        defineField({
            name:"heroButtonTitle",
            title:"Texto CTA sessão Hero",
            type:"string"
        }),
        defineField({
            name:"heroButtonLink",
            title:"Link CTA sessão Hero",
            type:"string"
        }),
        defineField({
            name:"heroImage",
            title:"Imagem da sessão Hero",
            type:"image"
        }),
        defineField({
            name:"dividerText",
            title:"Texto Divisor de sessão",
            type:"array",
            of:[
                {
                    type:"block",
                    styles:[],
                    lists:[],
                    marks:{
                        decorators:[{title: 'Negrito', value: 'strong'}],
                        annotations:[]
                    }
                
                }

            ]
        }),
        defineField({
            name: 'titleLive',
            title: 'Título Sessão Live',
            type: 'string',
          }),
          defineField({
            name: 'descriptionLive',
            title: 'Descrição Sessão Live',
            type: 'array',
            of:[
                {
                    type:"block",
                }

            ]
          }),
          defineField({
            name: 'youtubeUrl',
            title: 'URL da Transmissão (YouTube)',
            type: 'url',
            validation: (Rule) => Rule.uri({scheme: ['https']}),
          }),
          defineField({
            name: 'buttonLiveText',
            title: 'Botão Sessão Live',
            type: 'string',
          }),
          defineField({
            name: 'butonLiveLink',
            title: 'Link Botão Sessão Live',
            type: 'url',
            validation: (Rule) => Rule.uri({scheme: ['https']}),
          }),
          defineField({
            name: 'liveBannerImage',
            title: 'Banner Sessão Live',
            type: 'image',
        }),
    ]
})