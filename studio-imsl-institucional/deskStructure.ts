// structure.ts
import { StructureResolver } from 'sanity/structure'


export const structure: StructureResolver = (S) =>
  S.list().showIcons()
    .title('Conteúdo')
    .items([
      S.listItem()
      .title('Página Home')
      .child(
        S.editor()
          .id('homePage')
          .schemaType('homePage')
          .documentId('homePage')
      ),
      S.listItem()
      .title('Página Resumo da Palavra')
      .child(
        S.editor()
          .id('contactPage')
          .schemaType('contactPage')
          .documentId('contactPage')
      ),
      S.listItem()
      .title('Página Sobre')
      .child(
        S.editor()
          .id('contactPage')
          .schemaType('contactPage')
          .documentId('contactPage')
      ),
      S.listItem()
      .title('Página de Eventos')
      .child(
        S.editor()
          .id('contactPage')
          .schemaType('contactPage')
          .documentId('contactPage')
      ),
      S.listItem()
      .title('Página de Contato')
      .child(
        S.editor()
          .id('contactPage')
          .schemaType('contactPage')
          .documentId('contactPage')
      ),
      S.divider(),
      S.listItem()
      .title('Componente Footer')
      .child(
        S.editor()
          .id('footer')
          .schemaType('footer')
          .documentId('footer')
      ),
      S.listItem()
      .title('Componente Header')
      .child(
        S.editor()
          .id('footer')
          .schemaType('footer')
          .documentId('footer')
      ),
      S.divider(),
        // Outros itens soltos...
        ...S.documentTypeListItems().filter(
            (item) =>
              !['footer',"contactPage","homePage","sermonPage","aboutPage","eventsPage",].includes(item.getId() ?? '')
          ),
       
    ])

