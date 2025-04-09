import Jucimar from "@/assets/avatars/pr-jucimar.jpg";
import Berenice from "@/assets/avatars/pra-berenice.webp";
import banner from "@/assets/header-bgs/header-br-template.jpg";
import BackToTopButton from "@/components/back-to-top-button";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";

import Section from "@/components/section";
import Image from "next/image";
import Link from "next/link";

const fundamentalBeliefs = [
  {
    title: "Somos Igreja",
    content: `Porque a palavra Igreja fala de uma comunidade que se une e
              congrega ao redor do nome de Jesus. Somos Igreja porque amamos a
              Jesus e amamos uns aos outros, buscando viver juntos para servir
              a Deus através de Jesus e para servirmos uns aos outros, pois é
              isto que significa ser IGREJA.`,
  },
  {
    title: "Somos Apostólica",
    content: `Porque a palavra “Apostólica” significa que acreditamos na
              doutrina Apostólica e buscamos viver a vida prática como igreja
              na forma que os Apóstolos de Jesus ensinaram e viveram. Somos
              Apostólica porque rejeitamos a religiosidade e o tradicionalismo
              como base para vida cristã, e buscamos praticar de forma efetiva
              aquilo que Jesus, através de seus Apóstolos, nos ensinou a
              viver. Somos uma Igreja Apostólica.`,
  },
  {
    title: "Somos Monte Sião",
    content: `Porque O Monte Sião é a verdadeira origem da cristandade, é de
              Sião que vem a lei e a verdade que Deus fez se espalhar pela
              Terra. Somos Monte Sião porque quase todos os escritores
              bíblicos são judeus, assim como Jesus, nosso Messias. O Monte
              Sião é sinônimo de Israel e de Jerusalém, onde toda a revelação
              do Deus de Abraão começou e se desenvolveu até chegar ao seu
              clímax na cruz. Somos Monte Sião porque recusamos a ideia de a
              cultura e a tradição ocidental substituir a cultura judaica e a
              forma de cultuar ao Deus de Abraão, e decidimos aprender com o
              povo que nos deu as escrituras, os patriarcas, os profetas e com
              os apóstolos.`,
  },
  {
    title: "Somos Linhares",
    content: `Porque o Senhor Deus todo poderoso, que sabe de todas as coisas
              e que tem um certo propósito definido para cada uma de suas
              criaturas, nos levantou nesta cidade e nos comissionou para a
              partir daqui mudar a nossa História, influenciando nossa geração
              a partir de um relacionamento com Deus que nos faz ser pessoas
              melhores, que ajudam outros a serem pessoas melhores. Assim,
              vamos tomar posse da terra que Deus nos entregou para conquistar
              pela sua benção. Somos Linhares, porque esta cidade faz parte de
              nossa identidade uma vez que foi aqui que Deus nos plantou para
              darmos frutos, frutos que a partir daqui abençoarão a nós e a
              nossa cidade e depois de nós abençoarão as nações. Somos igreja
              Apostólica Monte Sião – Linhares, porque foi assim que Deus nos
              chamou a existência e é assim que vamos viver.`,
  },
];

const mission = [
  {
    title: "Ser dependente de deus em tudo que fizer, inclusive no ministério.",
    content: "...pois o meu poder se aperfeiçoa na fraqueza.",
    verse: "2 Coríntios 12. 9",
  },
  {
    title: "Valorizar pessoas acima das coisas, resultados e objetivos sempre",
    content:
      "É melhor não comer carne nem beber vinho, nem fazer qualquer outra coisa que leve seu irmão a cair.",
    verse: "Romanos 14. 21",
  },
  {
    title: "Olhar as ações do ponto de vista do tempo e estratégia certos",
    content:
      "… qual é o rei que, pretendendo sair à guerra contra outro rei, primeiro não se assenta e pensa se com dez mil homens é capaz de enfrentar aquele que vem contra ele com vinte mil?",
    verse: "Lucas 14. 31",
  },
  {
    title: "Ser sempre voluntário, e incentivar a voluntariedade",
    content:
      "...pastoreiem o rebanho de deus que está aos seus cuidados. Olhem por ele, não por obrigação, mas de livre vontade...",
    verse: "1 Pedro 5. 2",
  },
];

function Mission({
  title,
  content,
  verse,
  index,
}: {
  title: string;
  content: string;
  verse: string;
  index: number;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="w-10 min-w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold text-white bg-[var(--green-default)]">
          {index + 1}
        </div>
        <h3 className="!mb-0">{title}</h3>
      </div>

      <p>
        “{content}”
        <br />
        {verse}
      </p>
    </div>
  );
}

function FundamentalBeliefs({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default function About() {
  return (
    <>
      <PageHeader imgSrc={banner.src}>Quem somos</PageHeader>
      <Section className="mt-20">
        <p className="mb-24">
          Em tempos de grande confusão no mundo, não há nada mais importante
          para alguém que quer viver em serenidade do que saber quem é e o que
          está fazendo neste mundo, pois tudo fica mais fácil a partir desta
          premissa: <b>“Eu sei quem sou e sei o que vim fazer neste mundo!”</b>.
          Nós somos a Igreja Apostólica Monte Sião em Linhares.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-20">
          {fundamentalBeliefs.map((beliefs, idx) => (
            <FundamentalBeliefs
              title={beliefs.title}
              content={beliefs.content}
              key={idx}
            />
          ))}
        </div>
      </Section>
      <Section className="mb-20">
        <blockquote
          className="my-16 pl-8 lg:p-16 border-l-4 border-[var(--green-default)] relative sm:p-12 xs:p-11"
          cite="https://www.bibliaonline.com.br/acf/is/4/5,6"
        >
          <p className="text-[16px] leading-[1.857] mb-6 lg:mb-8 lg:text-[24px] sm:text-[20px] font-medium text-justify">
            “O Senhor criará sobre todo o Monte Sião e sobre aqueles que se
            reunirem ali uma nuvem de dia e um clarão de noite. A glória do
            Senhor cobrirá tudo e será um abrigo e sombra para o calor do dia,
            refúgio e esconderijo contra a tempestade e a chuva.”
          </p>
          <cite className="block font-[var(--cite-font-family)] text-[15px] not-italic leading-[1.333] text-[#646464] no-underline before:content-['\2014\0020']">
            Isaias 4:5-6.
          </cite>
        </blockquote>
      </Section>
      <Section className="mb-20">
        <h2 className="">Visão, Valores e Missão</h2>
        <p>
          Queremos ser uma igreja modelo de discipulado, relacionamento, e
          cuidado, onde muitas gerações de discípulos operam o crescimento e
          desenvolvimento contínuo da Igreja, enquanto comunidade, sendo modelo
          simples e praticável. Nossa visão é ter muitas gerações de discípulos
          levantando e sustentando muitas gerações de discípulos.
        </p>
        <br />

        <h2 className="mb-10 mt-10">
          Valores indispensáveis a nossa missão como igreja
        </h2>

        <div className="grid grid-cols-1 gap-x-10 gap-y-20 lg:grid-cols-2">
          {mission.map(({ title, content, verse }, idx) => (
            <Mission
              title={title}
              content={content}
              verse={verse}
              index={idx}
              key={idx}
            />
          ))}
        </div>
      </Section>

      <Section>
        <div className="mb-10">
          <h2 className="">Tomando posse da terra</h2>
          <p>
            Somos uma igreja que vive a prática do SMED – Sistema de
            Mentoreamento e Discipulado do Ministério Bálsamo de Gileade. Isso
            significa que acreditamos no poder no discipulado em grupos pequenos
            como o meio recomendado por Jesus para se viver como igreja de Jesus
            na terra. Isto significa também que entendemos e praticamos o
            princípio da escada do sucesso aceitando que: GANHAR, CONSOLIDAR,
            DISCIPULAR E ENVIAR é o verdadeiro estilo de vida recomendado por
            Jesus. Com isso, tomamos posse da terra que nos foi dada por Deus
            através de suas promessas.
          </p>
        </div>
      </Section>

      <Section className="mb-20">
        <h2>Nossa Liderança.</h2>
        <div className="flex gap-10 flex-col lg:flex-row">
          <div className="">
            <div className="flex items-center gap-2 mb-4">
              <div className="">
                <Image
                  width={50}
                  height={50}
                  className="w-16 min-w-16 h-16 rounded-full"
                  src={Jucimar.src}
                  alt=""
                />
              </div>
              <h3 className="!mb-0 gap-2">
                <p>Jucimar Ramos</p>
                <span className="block open-sans font-normal text-[14px]">Pastor Sênior</span>
              </h3>
            </div>

            <p>
              Pastor, palestrante e escritor com mais de 35 livros lançados.
              Ministro de cura interior desde 1991, foi treinado pelo Ministério
              REVER MAPI/CEPAL com certificação em Mestre em Cura Interior. É
              pastor Sênior da igreja Linhares desde o ano 2000. É presidente
              do Ministério Bálsamo de Gileade. É casado com a pastora Berenice
              e tem dois filhos, Mhayza e Marcos, casado com Bruna, pais da
              Karen, sua netinha. Para saber mais:{" "}
              <Link target="_blank" href="https://instagram.com/prjucimarramos">@prjucimarramos</Link>
            </p>
          </div>

          <div className="">
            <div className="flex items-center gap-2 mb-4">
              <div className="">
                <Image
                  width={40}
                  height={40}
                  className="w-16 min-w-16 h-16 rounded-full"
                  src={Berenice.src}
                  alt=""
                />
              </div>
              <h3 className="!mb-0 gap-2">
                <p>Berenice Peres Ramos</p>
                <span className="block open-sans font-normal text-[14px]">Pastora Sênior</span>
              </h3>
            </div>

            <p>
              Pastora, palestrante e ministra de cura interior, a pastora Berê,
              carinhosamente chamada por seus discípulos, cuida da igreja local
              e lidera diretamente o ministério de mulheres da igreja,
              trabalhando assuntos importantes para este tempo, como
              feminilidade, autocuidado, paternidade etc. Auxilia o pastor
              Jucimar no Ministério Bálsamo de Gileade e é formada em
              Assistência Social. Casada com o pastor Jucimar, tem dois filhos,
              Mhayza e Marcos, casado com Bruna, pais da Karen, sua netinha.
            </p>
          </div>
        </div>
      </Section>

      <Footer />
      <BackToTopButton />
    </>
  );
}
