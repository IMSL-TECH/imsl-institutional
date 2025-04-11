# Website da Igreja Monte Sião Linhares

Este repositório contém o código-fonte do site institucional da Igreja Monte Sião Linhares. Nosso objetivo é fornecer informações relevantes, promover eventos e facilitar a comunicação com nossos membros e visitantes.

## Sobre a Igreja

Queremos ser uma igreja modelo de discipulado, relacionamento e cuidado, onde muitas gerações de discípulos operam o crescimento e desenvolvimento contínuo da Igreja enquanto comunidade. Nossa visão é ter muitas gerações de discípulos levantando e sustentando muitas gerações de discípulos.

## Funcionalidades

- **Página Inicial**: Apresenta um resumo da igreja.
- **Sobre**: Detalhes sobre nossa visão, missão e história.
- **Agenda**: Calendário com os eventos e atividades da igreja.
- **Contato**: Informações de contato e um formulário para envio de mensagens.

## Tecnologias Utilizadas

- [React](https://reactjs.org/): Biblioteca JavaScript para construção de interfaces de usuário.
- [Next.js](https://nextjs.org/): Framework React para renderização do lado do servidor e geração de sites estáticos.
- [Node.js](https://nodejs.org/): Ambiente de execução JavaScript no lado do servidor.
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss): A utility-first CSS framework.
- [Sanity](https://www.sanity.io/): Gerenciador de conteúdos.

## Como Executar o Projeto

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
    ```bash
    git clone https://github.com/IMSL-TECH/imsl-institucional.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd imsl-institucional
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
5. Abra o navegador e acesse `http://localhost:3000` para ver o site em execução.

## Estrutura de Branches

Este projeto segue uma estrutura de desenvolvimento baseada em três branches principais:

- `prod`: versão de produção (estável, publicada).
- `prev`: versão de preview/testes (deploy para revisão antes de ir ao ar).
- `feature/nome-da-feature`: branches temporárias para desenvolvimento de novas funcionalidades ou correções.

## Fluxo de Contribuição com Pull Requests

1. Crie uma branch a partir da `prev`:
    ```bash
    git checkout prev
    git pull
    git checkout -b feature/minha-nova-feature
    ```

2. Faça as alterações e commit:
    ```bash
    git add .
    git commit -m "Descreve o que foi feito"
    git push -u origin feature/minha-nova-feature
    ```

3. Acesse o GitHub e crie um **Pull Request** da sua branch para `prev`.

4. Aguarde revisão (por outro colaborador, se aplicável), e após aprovação, o merge será feito na `prev`.

5. O ambiente de preview (gerenciado pela Vercel) será automaticamente atualizado com as mudanças da `prev`.

6. Quando todas as mudanças estiverem testadas e aprovadas, um novo Pull Request deve ser criado da `prev` para a `prod`, que será o deploy final para produção.


## Contato

Se você tiver alguma dúvida ou sugestão sobre o site, entre em contato conosco através de [comunicacao.montesiao@gmail.com].

---

**Que Deus abençoe!**
