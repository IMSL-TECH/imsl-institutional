import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Play, ChevronRight, Volume2, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

import bannerHome from "@/assets/banners/banner.png";
import Menu from "@/components/menu";
import EventCard from "@/components/event-card";
import Section from "@/components/section";
import SmedCard from "@/components/smed-card";

import imageEvents from "@/assets/Rectangle 45 (1).png";
import livesMobile from "@/assets/Rectangle 57.png";
import Instagram from "@/components/icons/instagram";
import YouTube from "@/components/icons/youtube";
import { Facebook } from "@/components/icons/facebook";
import Maps from "@/components/maps";
import logo from "@/assets/logo/PNG BRANCA HORIZONTAL (1).png";
import Carousel from "@/components/carousel";

const items = Array(6).fill({
  title: "intercessão",
  image: imageEvents,
  link: "#",
});

const blogPosts = [
  {
    title: "Suspire por Jesus",
    author: "Pr. Daniel Santos",
    date: "Maio 15, 2023",
    image: imageEvents,
  },
  {
    title: "Mantenha a fé firme",
    author: "Pr. Gustavo Ramos",
    date: "Maio 10, 2023",
    image: imageEvents,
  },
  {
    title: "Em meio às tempestades, pesca abundante",
    author: "Pr. Gabriel Rocha",
    date: "Abril 28, 2023",
    image: imageEvents,
  },
  {
    title: "Por que você não obedece",
    author: "Pr. Matheus Oliveira",
    date: "Abril 20, 2023",
    image: imageEvents,
  },
  {
    title: "Conecte-se com Deus",
    author: "Pr. Gustavo Ramos",
    date: "Abril 15, 2023",
    image: imageEvents,
  },
];

const events = [
  {
    title: "Ceia do Senhor",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    location: "Monte Sião",
    date: "Sexta-feira, 20",
    time: "19h30 - 21h30",
    image: imageEvents,
  },
  {
    title: "Culto de Adoração",
    description: "Venha participar de uma noite de louvor e adoração.",
    location: "Igreja Central",
    date: "Domingo, 22",
    time: "18h00 - 20h00",
    image: imageEvents,
  },
  {
    title: "Estudo Bíblico",
    description: "Aprofunde seu conhecimento na Palavra de Deus.",
    location: "Sala 3",
    date: "Quarta-feira, 25",
    time: "19h00 - 20h30",
    image: imageEvents,
  },
];

export default function Home() {
  return (
    <section className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="h-screen w-full absolute top-0 left-0">
        <Image
          src={bannerHome}
          alt="Banner monte sião linhares"
          fill
          className="object-cover brightness-50"
          priority
        />
      </section>
      <Section className="h-screen flex relative justify-center">
        <div className="absolute w-full h-screen pt-6 md:pt-7">
          <Menu />
          <div className="flex flex-col justify-center items-center lg:items-start h-full max-w-4xl">
            <h1 className="text-center lg:text-start text-5xl md:text-5xl font-bold text-white mb-4">
              Conhecendo a Deus
              <br />e fazendo-o conhecido
            </h1>
            <p className="text-white/80 text-center lg:text-start mb-8 max-w-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              and suspendisse feugiat, blandit nulla at, porttitor lectus. Morbi
              vel dui at.
            </p>
            <Button className="bg-white text-black hover:bg-white/90 w-fit px-6 uppercase">
              CONHECER EVENTOS
            </Button>
          </div>
        </div>
      </Section>

      {/* Upcoming Events Section */}
      <Section className="py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Próximos Eventos</h2>
          <Link
            href="#"
            className=" h-10 px-3 text-white rounded-md flex items-center gap-2 bg-[#179389] hover:bg-teal-700 uppercase"
          >
            <p className="hidden md:flex">Ver mais</p>{" "}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <EventCard items={events} />
      </Section>

      {/* Social Media Follow Section */}
      <Section
        backgroundColor="bg-[#179389]"
        className=" text-white py-8 text-center"
      >
        <p className="text-lg">
          Não se esqueça de <span className="font-bold">seguir</span> as nossas{" "}
          <span className="font-bold">redes sociais</span> e de ficarem atentos
          em tudo o que acontece por lá.
        </p>
      </Section>

      {/* Live Transmission Section */}
      <Section backgroundColor="bg-[#0F2E2F]" className="text-white py-24">
        <div className="grid-live-broadcast items-center">
          <div className="grid-item-live-broadcast">
            <h2 className="w-full text-xl md:text-3xl font-bold mb-4">
              <p className="hidden lg:flex">
                Assista a<br />
                transmissão
                <br />
                ao vivo
              </p>
              <p className="flex text-center justify-center lg:hidden">Assista a transmissão ao vivo</p>
              {/* colocar ele reto por inteiro e somente no mobile e o conteudo todo em baixo flex */}
            </h2>
            <div className="w-full flex lg:flex-col justify-center lg:justify-start gap-4 lg:w-auto">
              <div className="flex flex-col justify-center gap-1 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <p>Todos os domingos</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <p>A partir das 9h</p>
                </div>
              </div>
              <Button className="bg-[#179389] w-auto lg:w-36 hover:bg-teal-700 text-white flex items-center gap-2 uppercase">
                Saber mais <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid-item-live-broadcast aspect-video md:col-span-1 bg-black/20 rounded-lg flex items-center justify-center relative">
            <div className="absolute right-0 top-0 bg-white text-black font-bold px-4 py-2 rounded-tr-lg rounded-bl-lg">
              LIVE
            </div>
            <Button className="rounded-full w-16 h-16 flex items-center justify-center">
              <Play className="h-6 w-6 ml-1" />
            </Button>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white"
                >
                  <Play className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white"
                >
                  <Pause className="h-4 w-4" />
                </Button>
                <div className="h-1 bg-white/20 flex-1 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-white rounded-full"></div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white"
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full grid-item-live-broadcast flex justify-end ">
            <Image src={livesMobile} alt="Pastor" className="rounded-lg " />
          </div>
        </div>
      </Section>

      {/* Word Summary Section */}
      <Section className="py-32" backgroundColor="bg-[#0F2E2F]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Resumo de Palavra
          </h2>
          <Link
            href="#"
            className=" h-10 px-3 rounded-md flex items-center gap-2 bg-white text-black hover:bg-white/90 uppercase"
          >
            <p className="hidden md:flex">Ver mais</p>{" "}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid-word-summary">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={index}
              title={post.title}
              author={post.author}
              date={post.date}
              image={post.image}
            />
          ))}
        </div>
      </Section>

      {/* SMEDs Section */}
      <Section className="py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Nossos SMEDs</h2>
          <Link
            href="#"
            className=" h-10 px-3 text-white rounded-md flex items-center gap-2 bg-[#179389] hover:bg-teal-700 uppercase"
          >
            <p className="hidden md:flex">Ver mais</p>{" "}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative">
          <div className="hidden lg:flex">
            <SmedCard items={items} />
          </div>
          <div className="flex lg:hidden">
            <Carousel />
          </div>
        </div>
      </Section>

      {/* Footer */}
      <Section
        backgroundColor="bg-[#179389]"
        className="py-8 flex justify-center gap-6"
      >
        <Link
          href="#"
          className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center"
        >
          <Instagram className="text-white w-7 h-7" />
        </Link>
        <Link
          href="#"
          className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center"
        >
          <YouTube className="text-white w-7 h-7" />
        </Link>
        <Link
          href="#"
          className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center"
        >
          <Facebook className="text-white w-7 h-7" />
        </Link>
      </Section>
      <Section backgroundColor="bg-[#0F2E2F]" className=" text-white ">
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-full flex items-center justify-center">
                <Image src={logo} alt="Logo" className="w-52" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold">Programação fixa:</h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <p>Culto aos domingos 18h</p>
              </div>

              <h3 className="font-bold mt-6">Você precisa de ajuda?</h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <p>(47) 3333-4444</p>
              </div>

              <h3 className="font-bold mt-6">Localização:</h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <p>
                  Avenida Prefeito Samuel Batista Cruz, 9259
                  <br />
                  Rio do Barro, Linhares/ES
                </p>
              </div>
            </div>
          </div>

          <div className="h-[300px] relative rounded-lg overflow-hidden">
            <Maps placeUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.812928913682!2d-40.069291117142!3d-19.377251177287768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb625d90ec2124f%3A0x1acfd1d9b825f1a6!2sIgreja%20Monte%20Si%C3%A3o%20Linhares!5e0!3m2!1spt-BR!2sbr!4v1741886781973!5m2!1spt-BR!2sbr" />
          </div>
        </div>

        <div className="py-4 text-center lg:text-start text-sm border-t border-teal-700">
          © Copyright Igreja Apostólica Monte Sião Linhares 2024 - Design by
          Redeev™ | Desenvolvido por{" "}
          <Link href={"https://www.reijanlopes.com/"}>Reijan Lopes</Link>
        </div>
      </Section>
    </section>
  );
}

function BlogCard({
  title,
  author,
  date,
  image,
}: {
  title: string;
  author: string;
  date: string;
  image: string | StaticImageData;
}) {
  return (
    <div
      className={`rounded-lg overflow-hidden relative text-white grid-item-word-summary`}
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        priority
        className="w-full object-cover"
      />
      <div className="absolute inset-0"></div>
      <div className="absolute bottom-0 left-0 right-0 px-3 py-4">
        <h1 className="text-xl font-bold mb-2">{title}</h1>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 min-w-10 rounded-full bg-gray-300"></div>
          <div className="w-[calc(100%-52px)]">
            <p className="text-xs truncate lg:text-sm">{author}</p>
            <p className="text-[10px] lg:text-xs text-gray-300 truncate">
              {date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
