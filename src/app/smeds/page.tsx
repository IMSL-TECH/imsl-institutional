import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import Section from "@/components/section";
import Image from "next/image";
import Link from "next/link";

const pageHeaderImage = "https://picsum.photos/2000/1000?random=30";

const smeds_list = [
  {
    image: "https://picsum.photos/800/600?random=1",
    title: "Cura",
    content_button: undefined,
    link: "#",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha ",
  },
  {
    image: "https://picsum.photos/800/600?random=2",
    title: "Cura",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha ",
  },
  {
    image: "https://picsum.photos/800/600?random=3",
    title: "Cura",
    content_button: "Entre em contato",
    link: "#",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha ",
  },
  {
    image: "https://picsum.photos/800/600?random=4",
    title: "Cura",
    content_button: "Entre em contato",
    link: "#",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha ",
  },
  {
    image: "https://picsum.photos/800/600?random=5",
    title: "Cura",
    content_button: "Entre em contato",
    link: "#",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha ",
  },
  {
    image: "https://picsum.photos/800/600?random=6",
    title: "Cura",
    content_button: "Entre em contato",
    link: "#",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha ",
  },
];

function SmedsList({
  pair,
  image,
  title,
  content,
  content_button,
  link,
}: {
  pair: boolean;
  image: string;
  title: string;
  content: string;
  content_button?: string;
  link?: string;
}) {
  return (
    <Section
      className={`lg:h-[300px] flex gap-2 lg:gap-8 flex-col rounded-xl ${pair ? "lg:flex-row-reverse" : "lg:border-green-200 lg:flex-row"}`}
      backgroundColor={`py-16 ${pair ? "bg-[#0F2E2F]" : ""}`}
    >
      <div className="w-full lg:w-[53%] rounded-t-xl lg:rounded-none overflow-hidden h-[250px] lg:h-full relative">
        <Image
          src={image}
          fill
          className={`rounded-none lg:rounded-xl ${pair ? "" : "border"}`}
          alt="Banner Monte Sião Linhares"
        />
      </div>
      <div
        className={`w-full lg:w-[47%] p-4 flex flex-col gap-4 justify-center ${pair ? "text-white" : ""}`}
      >
        <h1>{title}</h1>
        <div>{content}</div>
        {content_button && link ? (
          <Link
            href={link}
            target="_black"
            className={`py-2 px-3 uppercase rounded-md flex items-center gap-2 flex justify-center ${
              pair
                ? "bg-white hover:bg-white/90 text-black"
                : "bg-[#179389] hover:bg-teal-700 text-white"
            }  uppercase`}
          >
            <p className="">{content_button}</p>{" "}
          </Link>
        ) : null}
      </div>
    </Section>
  );
}

export default function Smeds() {
  return (
    <>
      <PageHeader imgSrc={pageHeaderImage}>Smeds</PageHeader>
      <Section className="py-20">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum ha
      </Section>
      {smeds_list.map(
        ({ image, title, content, content_button, link }, idx) => {
          const pair = idx % 2 === 0;
          return (
            <SmedsList
              pair={pair}
              image={image}
              title={title}
              content={content}
              content_button={content_button}
              link={link}
              key={idx}
            />
          );
        }
      )}
      <Section className="py-20">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum ha
      </Section>
      <Footer />
    </>
  );
}
