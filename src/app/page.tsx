import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Play, ChevronRight, Volume2, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

import Menu from "@/components/menu";
import EventCard from "@/components/event-card";
import Section from "@/components/section";
import SmedCard from "@/components/smed-card";
import { PortableText, PortableTextComponents } from "@portabletext/react";

import Carousel from "@/components/carousel";
import Footer from "@/components/footer";
import BackToTopButton from "@/components/back-to-top-button";
import {
  HeaderQueryResult,
  HomePageEventsQueryResult,
  HomePageQueryResult,
  HomePageSermonsQueryResult,
  HomePageSmedsQueryResult,
} from "sanity-shared/types";
import {
  headerQuery,
  homePageEventsQuery,
  homePageQuery,
  homePageSermonsQuery,
  homePageSmedsQuery,
} from "sanity-shared/queries";
import { sanityClient } from "@/lib/sanityClient";

import bannerFallback from "@/assets/banners/banner.png";
import { urlFor } from "@/lib/sanityImage";
import imagePlaceholder from "@/assets/thumbs/placeholder-image-square.png";
import BlogCard from "@/components/blog-card";

import Qrcode from "@/assets/qrcode/QRCODE.png"
import { CopyButton } from "@/components/copy-button";
import Fallback from "@/components/ui/FallbackPage";
 import   home_data_Fallback from "@/lib/fallbackdata/homePageQuery.json"
 import   home_events_data_Fallback from "@/lib/fallbackdata/homePageEventsQuery.json"
 import   home_sermon_data_Fallback from "@/lib/fallbackdata/homePageSermonsQuery.json"
 import   home_smeds_data_Fallback from "@/lib/fallbackdata/homePageSmedsQuery.json"
 import   header_links_data_Fallback from "@/lib/fallbackdata/headerQuery.json"



export default async function Home() {

let home_data: HomePageQueryResult | null
let home_events_data: HomePageEventsQueryResult | null
let home_sermon_data: HomePageSermonsQueryResult | null
let home_smeds_data: HomePageSmedsQueryResult | null
let header_links_data: HeaderQueryResult | null

let banner: string | StaticImageData
let live_banner: string | StaticImageData

try {
  [
    home_data,
    home_events_data,
    home_sermon_data,
    home_smeds_data,
    header_links_data,
  ] = await Promise.all([
    sanityClient.fetch(homePageQuery,{},{next:{tags:["homePage"]}}),
    sanityClient.fetch(homePageEventsQuery,{},{next:{tags:["event"]}}),
    sanityClient.fetch(homePageSermonsQuery,{},{next:{tags:["sermonSummary"]}}),
    sanityClient.fetch(homePageSmedsQuery,{},{next:{tags:["smed"]}}),
    sanityClient.fetch(headerQuery,{},{next:{tags:["header"]}}),
  ])

 banner = home_data?.heroImage
    ? urlFor(home_data.heroImage).width(2560).height(1680).url()
    : bannerFallback;
  live_banner = home_data?.liveBannerImage
    ? urlFor(home_data?.liveBannerImage).width(444).height(856).url()
    : imagePlaceholder;


} catch (err) {
  console.error('❌ Sanity fetch failed (home)', err)
  

  //inserir dados de fallback
  home_data = home_data_Fallback as unknown as HomePageQueryResult;
  home_events_data = home_events_data_Fallback as unknown as HomePageEventsQueryResult;
  home_sermon_data = home_sermon_data_Fallback as HomePageSermonsQueryResult;
  home_smeds_data = home_smeds_data_Fallback as HomePageSmedsQueryResult;
  header_links_data = header_links_data_Fallback as HeaderQueryResult;
  // banner = bannerFallback;
  // live_banner = imagePlaceholder;


   banner = home_data?.heroImage
    ? urlFor(home_data.heroImage).width(2560).height(1680).url()
    : bannerFallback;
  live_banner = home_data?.liveBannerImage
    ? urlFor(home_data?.liveBannerImage).width(444).height(856).url()
    : imagePlaceholder;

} 


  return (
    <>  
    {(home_data && home_events_data && home_sermon_data && home_smeds_data && header_links_data) ? 
    <section className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="h-screen w-full absolute top-0 left-0">
        <Image
          src={banner}
          alt="Banner Monte Sião Linhares"
          fill
          className={`object-cover ${
            home_data?.heroHeadline &&
            home_data.heroDescription &&
            home_data.heroButtonTitle
              ? "brightness-50"
              : ""
          }`}
          priority
        />
      </section>

      <Menu headerData={header_links_data} />

      <Section
        backgroundColor="!py-0"
        className="h-[calc(100vh-128px)] flex relative justify-center"
      >
        <div className="absolute w-full h-[calc(100vh-128px)]">
          <div className="flex flex-col justify-center items-center lg:items-start h-full max-w-4xl">
            {home_data?.heroHeadline && (
              <h1 className="text-center lg:text-start text-5xl md:text-5xl font-bold text-white mb-4">
                <PortableText value={home_data.heroHeadline} />
              </h1>
            )}
            {home_data?.heroDescription && (
              <div className="text-white/80 text-center lg:text-start mb-8 max-w-xl leading-5">
                <PortableText value={home_data.heroDescription} />
              </div>
            )}

            {home_data?.heroButtonTitle && home_data.heroButtonLink && (
              <Link
                href={home_data.heroButtonLink || "#"}
                className="bg-white rounded-md py-2 text-black hover:bg-white/90 w-fit px-6 uppercase"
              >
                {home_data.heroButtonTitle}
              </Link>
            )}
          </div>
        </div>
      </Section>

      {/* Upcoming Events Section */}
      <Section>
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

        <EventCard items={home_events_data} />
      </Section>

      {/* Social Media Follow Section */}
      <Section
        backgroundColor="bg-[#179389] !py-12"
        className="text-white text-center"
      >
        <div className="text-lg">
          {home_data?.dividerText && (
            <PortableText value={home_data?.dividerText} />
          )}
        </div>
      </Section>

      {/* Live Transmission Section */}
      <Section backgroundColor="bg-[#0F2E2F]" className="text-white">
        <div className="grid-live-broadcast items-center">
          <div className="grid-item-live-broadcast">
            <h2 className="  w-full text-xl md:text-3xl font-bold mb-4">
              <p className="hidden px-3 lg:flex text-center">
                {home_data?.titleLive}
              </p>
              <p className="flex text-center justify-center lg:hidden">
                {home_data?.titleLive}
              </p>
            </h2>
            <div className="w-full flex lg:flex-col items-center mb-6 justify-center lg:justify-start gap-7 lg:w-auto">
              <div className=" flex flex-col justify-center gap-2">
                {home_data?.descriptionLive && (
                  <PortableText
                    components={portableTextStyle}
                    value={home_data?.descriptionLive}
                  />
                )}
              </div>

              {home_data?.buttonLiveText && (
                <Link
                  href={home_data.butonLiveLink || "#"}
                  target="_blak"
                  className="bg-[#179389] hidden whitespace-nowrap w-auto h-10 lg:w-36 px-4 rounded-lg hover:bg-teal-700 text-white lg:flex items-center gap-2 uppercase"
                >
                  {home_data.buttonLiveText}{" "}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          {/* live player */}
          {home_data?.youtubeUrl
            ? LiveStreamPlayer(home_data.youtubeUrl)
            : FakeLiveStreamPlayer()}
          <div className="w-full grid-item-live-broadcast flex justify-end ">
            {home_data?.liveBannerImage && (
              <Image
                src={live_banner}
                width={444}
                height={856}
                alt="Pastor"
                className="rounded-lg w-56 h-[428px]"
              />
            )}
          </div>

          <div>
            {home_data?.butonLiveLink && (
              <Link
                href={home_data?.butonLiveLink}
                target="_blank"
                className="bg-[#179389] lg:hidden whitespace-nowrap w-auto h-10 lg:w-36 px-4 rounded-lg hover:bg-teal-700 text-white flex items-center gap-2 uppercase"
              >
                {home_data.buttonLiveText} <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </Section>

      {/* Word Summary Section */}
      <Section backgroundColor="bg-[#0F2E2F]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Resumo da Palavra
          </h2>
          <Link
            href="/sermon-summary"
            className=" h-10 px-3 rounded-md flex items-center gap-2 bg-white text-black hover:bg-white/90 uppercase"
          >
            <p className="hidden md:flex">Ver mais</p>{" "}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid-word-summary">
          {home_sermon_data.map((post, idx) => {
            return (
              <BlogCard
                key={idx}
                cardLink={`/sermon-summary/${post.slug}`}
                title={post.title}
                author={`${post.speaker?.titleAbbreviation ? post.speaker?.titleAbbreviation : ""}${post.speaker?.name}`}
                date={post.date}
                background={post.background}
                panelist={post.speaker?.photo}
                className="grid-item-word-summary"
              />
            );
          })}
        </div>
      </Section>

      {/* SMEDs Section */}
      <Section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Nossos SMEDs</h2>
          <Link
            href="/smeds"
            className=" h-10 px-3 text-white rounded-md flex items-center gap-2 bg-[#179389] hover:bg-teal-700 uppercase"
          >
            <p className="hidden md:flex">Ver mais</p>{" "}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative">
          <div className="hidden lg:flex">
            <SmedCard items={home_smeds_data} />
          </div>
          <div className="flex lg:hidden">
            <Carousel items={home_smeds_data} />
          </div>
        </div>
      </Section>
      <Section className="flex flex-col lg:flex-row items-center gap-4 lg:gap-10">
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-8">
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-6xl lg:text-8xl font-bold text-[#179389]">DIZIMOS</p>
            <p className="text-6xl lg:text-8xl mb-4">OFERTAS</p>
            <p className="max-w-[303px] text-center lg:text-start lg:max-w-[700px]">
              Cada um dê conforme determinou em seu coração, não com pesar ou
              por obrigação, pois Deus ama quem dá com alegria. <strong>2 Coríntios 9:7</strong>
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p>Chave PIX:</p>
            <h3 className="text-[#179389]">08.405.105/0001-32</h3>
            <p>Igreja Apostólica Monte Sião Linhares</p>
            <p className="font-semibold text-[#179389]">SICOOB</p>
            <CopyButton textToCopy="00020126360014br.gov.bcb.pix0114084051050001325204000053039865802BR5925IGREJA APOSTOLICA MONTE S6008Linhares610929907-38062290525LUML32430233167035360241763047B4A" className=" h-10 w-72 px-3 mt-2 flex items-center justify-center bg-[#179389] hover:bg-teal-700 rounded-md gap-2 text-white uppercase">Copiar chave PIX</CopyButton>

          </div>
        </div>
        <div className="hidden lg:flex flex-col lg:w-1/2 items-center justify-center">
          <div className="w-96 rounded-t-lg p-8 shadow-2xl">
            <div className="w-full aspect-square relative p-4">
              <Image src={Qrcode} alt="Qrcode oferta monte sião" fill/>
            </div>
            <div className="w-full flex flex-col items-center mt-2">
              <p className="text-center">Igreja Apostólica Monte Sião Linhares</p>{" "}
              <p className="font-bold">SICOOB</p>
            </div>
          </div>
          <div className="h-6 w-96 bg-[#179389] rounded-b-lg"></div>
        </div>
       
      </Section>

      <Footer />
      <BackToTopButton />
    </section>
     : <Fallback /> }
    </>
  );

}

const portableTextStyle: PortableTextComponents = {
  list: {
    bullet: ({ children }) => (
      <ul className="flex gap-3 flex-wrap justify-center  lg:block">
        {children}
      </ul>
    ),
  },
  listItem: ({ children }) => (
    <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-teal-400">
      <p className="!text-left">{children}</p>
    </li>
  ),
};

function LiveStreamPlayer(liveEmbedLink: string) {
  return (
    <div className="grid-item-live-broadcast aspect-video md:col-span-1 bg-black/20 rounded-xl flex items-center justify-center relative">
      {/* Selo LIVE no canto superior direito */}
      <div className="absolute right-0 top-0 bg-red-500 text-white font-bold px-4 py-2 rounded-tr-xl rounded-bl-xl">
        LIVE
      </div>

      {/* Iframe do YouTube centralizado */}
      <iframe
        className="w-full h-full rounded-xl"
        // https://www.youtube.com/embed/8LbzB7tlxLE?si=VNgrfBZPvXURjo2J
        src={`${liveEmbedLink}?autoplay=0&mute=1&controls=1`}
        title="Culto Online"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

function FakeLiveStreamPlayer() {
  return (
    <div className="grid-item-live-broadcast aspect-video md:col-span-1 bg-black/20 rounded-xl flex items-center justify-center relative">
      <div className="absolute right-0 top-0 bg-white text-black font-bold px-4 py-2 rounded-tr-xl rounded-bl-xl">
        OFF-LINE
      </div>
      <Button className="rounded-full w-16 h-16 flex items-center justify-center">
        <Play className="h-6 w-6 ml-1" />
      </Button>

      <div className=" absolute bottom-4 left-4 right-4">
        <div className="flex items-center gap-2 mb-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
            <Play className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
            <Pause className="h-4 w-4" />
          </Button>
          <div className="h-1 bg-white/20 flex-1 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-white rounded-full"></div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
            <Volume2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
