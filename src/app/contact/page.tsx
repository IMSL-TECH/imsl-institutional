import banner from "@/assets/header-bgs/header-br-template.jpg";
import Section from "@/components/section";
import PageHeader from "@/components/page-header";
import Footer from "@/components/footer";
import Link from "next/link";
// import PageContent from "@/components/pageContent";

const pageHeaderImage = "https://picsum.photos/2000/1000?random=21"

export default function Home() {
  return (
    <>
      <PageHeader imgSrc={pageHeaderImage}>Contato</PageHeader>
      <Section className="my-20">
        <p>
          Estamos aqui para servir você! Se você deseja saber mais sobre a nossa
          igreja, tirar dúvidas, compartilhar um pedido de oração ou
          simplesmente conversar, não hesite em nos contatar. Acreditamos que
          cada pessoa é única e preciosa aos olhos de Deus, e queremos caminhar
          junto com você em sua jornada de fé.
        </p>

        <div className="grid w-full grid-cols-2 gap-10 mt-10">
          <div>
            <h3>Onde estamos</h3>
            <p>
              Avenida Prefeito Samuel Batista Cruz, 8259
              <br />
              Três Barras, Linhares - ES
              <br />
            </p>
          </div>

          <div>
            <h3>Nossos canais</h3>
            <p>
              <a target="blank" href="http://instagram.com/montesiaolinhares">
                @Montesiaolinhares
              </a>{" "}
              <br />
              <a target="blank" href="mailto:comunicacao.imsl@gmail.com">
                comunicacao.montesiao@gmail.com
              </a>{" "}
              <br />
              Telefone: (27) 99528-0013 | Horário para contato 13:30 às 17:30
            </p>

            <Link
              target="blank"
              href="https://wa.me/5527999280013"
              className=" h-10 px-3 text-white mt-5 w-36 rounded-md flex items-center justify-center gap-2 bg-[#179389] hover:bg-teal-700 uppercase"
            >
              Whats app
            </Link>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
