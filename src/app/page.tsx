import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Play, ChevronRight, Volume2, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

import Menu from "@/components/menu";
import EventCard from "@/components/event-card";
import Section from "@/components/section";
import SmedCard from "@/components/smed-card";
import { PortableText, PortableTextComponents } from '@portabletext/react'

import Carousel from "@/components/carousel";
import Footer from "@/components/footer";
import BackToTopButton from "@/components/back-to-top-button";
import { HomePage } from "@/type";
import { sanityClient } from "@/lib/sanityClient";
import { homePageQuery } from "@/lib/queries";

import bannerFallback from "@/assets/banners/banner.png"

const smeds = [
  {
    title: "Intercessão",
    image: "https://picsum.photos/800/600?random=1",
    link: "#",
  },
  {
    title: "Cura Interior",
    image: "https://picsum.photos/800/600?random=2",
    link: "#",
  },
  {
    title: "Homens e Mulheres",
    image: "https://picsum.photos/800/600?random=3",
    link: "#",
  },
  {
    title: "Jovens",
    image: "https://picsum.photos/800/600?random=4",
    link: "#",
  },
  {
    title: "Infaltil",
    image: "https://picsum.photos/800/600?random=5",
    link: "#",
  },
  {
    title: "Casais",
    image: "https://picsum.photos/800/600?random=6",
    link: "#",
  },
]

const blogPosts = [
  {
    title: "Suspire por Jesus",
    author: "Pr. Daniel Santos",
    date: "Maio 15, 2023",
    image: "https://picsum.photos/800/600?random=7",
  },
  {
    title: "Mantenha a fé firme",
    author: "Pr. Gustavo Ramos",
    date: "Maio 10, 2023",
    image: "https://picsum.photos/800/600?random=8",
  },
  {
    title: "Em meio às tempestades, pesca abundante",
    author: "Pr. Gabriel Rocha",
    date: "Abril 28, 2023",
    image: "https://picsum.photos/800/600?random=9",
  },
  {
    title: "Por que você não obedece",
    author: "Pr. Matheus Oliveira",
    date: "Abril 20, 2023",
    image: "https://picsum.photos/800/600?random=10",
  },
  {
    title: "Conecte-se com Deus",
    author: "Pr. Gustavo Ramos",
    date: "Abril 15, 2023",
    image: "https://picsum.photos/800/600?random=11",
  },
];

const events = [
  {
    title: "Ceia do Senhor",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    location: "Monte Sião Linhares",
    date: "Sexta-feira, 20",
    time: "19h30 - 21h30",
    image: "https://picsum.photos/800/600?random=12",
  },
  {
    title: "Culto de Adoração",
    description: "Venha participar de uma noite de louvor e adoração.",
    location: "Igreja Central",
    date: "Domingo, 22",
    time: "18h00 - 20h00",
    image: "https://picsum.photos/800/600?random=13",
  },
  {
    title: "Estudo Bíblico",
    description: "Aprofunde seu conhecimento na Palavra de Deus.",
    location: "Sala 3",
    date: "Quarta-feira, 25",
    time: "19h00 - 20h30",
    image: "https://picsum.photos/800/600?random=14",
  },
];

export default async function Home() {

  const home_data: HomePage = await sanityClient.fetch(homePageQuery)


  return (
    <section className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="h-screen w-full absolute top-0 left-0">
        <Image
          src={home_data.heroImage? home_data.heroImage: bannerFallback}
          alt="Banner Monte Sião Linhares"
          fill
          className="object-cover brightness-50"
          priority
        />
      </section>
      <Section className="h-screen flex relative justify-center">
        <div className="absolute w-full h-screen pt-6 md:pt-7">
          <Menu />
          <div className="flex flex-col justify-center items-center lg:items-start h-full max-w-4xl">
           {home_data.heroHeadline && <h1 className="text-center lg:text-start text-5xl md:text-5xl font-bold text-white mb-4">
              
              <PortableText value={home_data.heroHeadline} />
              
            </h1>}
           {home_data.heroDescription && <p className="text-white/80 text-center lg:text-start mb-8 max-w-xl leading-5">
              {home_data.heroDescription}
            </p>}

            {home_data.heroButtonTitle && 
            <Link
              href={home_data.heroButtonLink && "#"}
              className="bg-white rounded-md py-2 text-black hover:bg-white/90 w-fit px-6 uppercase"
            >
              {home_data.heroButtonTitle}
            </Link>
            }

          </div>
        </div>
      </Section>

      {/* Upcoming Events Section */}
      <Section className="py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Próximos Eventos</h2>
          <Link
            href="/events"
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
        <div className="text-lg">

        <PortableText value={home_data.dividerText}/>
            
        </div>
      </Section>

      {/* Live Transmission Section */}
      <Section backgroundColor="bg-[#0F2E2F]" className="text-white py-24">
        <div className="grid-live-broadcast items-center">
          <div className="grid-item-live-broadcast">
            <h2 className="  w-full text-xl md:text-3xl font-bold mb-4">
              <p className="hidden px-3 lg:flex text-center">
               {home_data.titleLive}
              </p>
              <p className="flex text-center justify-center lg:hidden">
              {home_data.titleLive}
              </p>
            </h2>
            <div className="w-full flex lg:flex-col items-center mb-6 justify-center lg:justify-start gap-7 lg:w-auto">
              <div className=" flex flex-col justify-center gap-2">
              
                <PortableText components={portableTextStyle} value={home_data.descriptionLive} />
              </div>

              {home_data.buttonLiveText && 
              <Link
                href={home_data.butonLiveLink}
                target="_blak"
                className="bg-[#179389] hidden whitespace-nowrap w-auto h-10 lg:w-36 px-4 rounded-lg hover:bg-teal-700 text-white lg:flex items-center gap-2 uppercase"
              >
                {home_data.buttonLiveText} <ChevronRight className="h-4 w-4" />
              </Link>
              }
            </div>
          </div>

          {/* live player */}
          {home_data.youtubeUrl ? LiveStreamPlayer(home_data.youtubeUrl): FakeLiveStreamPlayer()}
          <div className="w-full grid-item-live-broadcast flex justify-end ">

           { home_data.liveBannerImage && <img src={home_data.liveBannerImage} alt="Pastor" className="rounded-lg " />}

          </div>

          <div>
          <Link
                href={home_data.butonLiveLink}
                target="_blak"
                className="bg-[#179389] lg:hidden whitespace-nowrap w-auto h-10 lg:w-36 px-4 rounded-lg hover:bg-teal-700 text-white flex items-center gap-2 uppercase"
              >
                {home_data.buttonLiveText} <ChevronRight className="h-4 w-4" />
              </Link>
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
            <SmedCard items={smeds} />
          </div>
          <div className="flex lg:hidden">
            <Carousel items={smeds} />
          </div>
        </div>
      </Section>

      <Footer />
      <BackToTopButton />
    </section>
  );
}


const portableTextStyle: PortableTextComponents = {

  list: {
    bullet: ({ children }) => (
      <ul className="flex gap-3 flex-wrap justify-center  lg:block">{children}</ul>
    ),
  },
  listItem: ({ children }) => (
    <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-teal-400"><p className="!text-left">{children}</p></li>
  ),
}


function LiveStreamPlayer(liveEmbedLink:string){
  return(

  <div className="grid-item-live-broadcast aspect-video md:col-span-1 bg-black/20 rounded-lg flex items-center justify-center relative">
  {/* Selo LIVE no canto superior direito */}
  <div className="absolute right-0 top-0 bg-red-500 text-white font-bold px-4 py-2 rounded-tr-lg rounded-bl-lg">
    LIVE
  </div>

  {/* Iframe do YouTube centralizado */}
  <iframe
    className="w-full h-full rounded-lg"
    src={`${liveEmbedLink}?autoplay=0&mute=1&controls=1`}
    title="Culto Online"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>
  )
} 

function FakeLiveStreamPlayer(){
  return(
  <div className="grid-item-live-broadcast aspect-video md:col-span-1 bg-black/20 rounded-lg flex items-center justify-center relative">
            
            <div className="absolute right-0 top-0 bg-white text-black font-bold px-4 py-2 rounded-tr-lg rounded-bl-lg">
              OFFILNE
            </div>
            <Button className="rounded-full w-16 h-16 flex items-center justify-center">
              <Play className="h-6 w-6 ml-1" />
            </Button>

            <div className=" absolute bottom-4 left-4 right-4">
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
  )
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
      <div className="absolute bg-linear-to-b from-transparent from-0% to-black to-100% pt-10 bottom-0 left-0 right-0 px-3 py-4">
        <h3 className="text-xl font-bold mb-2 !text-start">{title}</h3>
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
