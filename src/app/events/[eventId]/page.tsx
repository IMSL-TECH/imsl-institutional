import BackToTopButton from "@/components/back-to-top-button";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import { portableTextComponents } from "@/components/portableTextComponents";
import Schedule from "@/components/schedule";
import Section from "@/components/section";
import { sanityClient } from "@/lib/sanityClient";
import { formatDateBr, phoneFormat } from "@/utils";
import { PortableText } from "@portabletext/react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { findOneEventByIdQuery } from "sanity-shared/queries";
import { FindOneEventByIdQueryResult } from "sanity-shared/types";

function getFirstAndLastScheduleDate(event: FindOneEventByIdQueryResult) {
  if (!event?.schedule) return { first: null, last: null };

  const validSchedule = event.schedule.filter((day) => day.date !== null) as {
    date: string;
    startTime: string | null;
    endTime: string | null;
    sessions: Array<{
      title: string | null;
      description: string | null;
      starTime: string | null;
      endTime: string | null;
    }> | null;
  }[];

  if (validSchedule.length === 0) return { first: null, last: null };

  const sorted = [...validSchedule].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return {
    first: sorted[0],
    last: sorted[sorted.length - 1],
  };
}

function getFirstSessionOfDay(day: {
  sessions: Array<{
    title: string | null;
    description: string | null;
    starTime: string | null;
    endTime: string | null;
  }> | null;
}) {
  if (!day.sessions || day.sessions.length === 0) return null;

  const validSessions = day.sessions.filter((s) => s.starTime !== null) as {
    title: string | null;
    description: string | null;
    starTime: string;
    endTime: string | null;
  }[];

  if (validSessions.length === 0) return null;

  const sortedByTime = [...validSessions].sort((a, b) =>
    a.starTime.localeCompare(b.starTime)
  );

  return sortedByTime[0];
}

interface EventProps {
  params: Promise<{ eventId: string }>;
}

export default async function Event({ params }: EventProps) {
  const res_params = await params;
  const id = res_params.eventId;

  const event_data: FindOneEventByIdQueryResult = await sanityClient.fetch(
    findOneEventByIdQuery,
    { id }
  );

  const title = event_data?.title
  const shortDescription = event_data?.shortDescription;
  const teaser = event_data?.teaser;
  const about = event_data?.about;
  const schedule = event_data?.schedule;
  const registrtionLink = event_data?.registrtionLink;
  const organizer = event_data?.organizer?.description;
  const organizerEmail = event_data?.organizer?.email?.address;
  const organizerPhone = event_data?.organizer?.phone?.number;
  const organizerName = event_data?.organizer?.phone?.name;
  const address = event_data?.address;

  const EmailLink = `mailto:${organizerEmail}?subject=Evento: ${encodeURIComponent(event_data?.title || "")}`;

  const query = encodeURIComponent(
    `${address?.title ?? ""}, ${address?.street ?? ""}, ${address?.city ?? ""}, ${address?.state ?? ""}, ${address?.zip ?? ""}`
  );

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  const { first, last } = getFirstAndLastScheduleDate(event_data);

  const formatFirstDate = formatDateBr(first?.date || "");
  const formatEndDate = formatDateBr(last?.date || "");

  const firstSession = getFirstSessionOfDay({
    sessions: first?.sessions || [],
  });

  return (
    <>
      <PageHeader imgSrc={event_data?.banner} />
      <Section className="flex flex-col items-center">
        <h2 className="text-center">{title}</h2>
        {shortDescription && (
          <div className="text-gray-600 !text-sm text-justify !font-medium mt-1">
            <PortableText
              value={shortDescription}
              components={{
                block: {
                  normal: ({ children }) => <p>{children}</p>,
                },
              }}
            />
          </div>
        )}

        <div className="mt-10 w-full !text-sm lg:max-w-md flex justify-between gap-2">
          <div>
            {first === last ? (
              //mostra uma data só
              <>
                <div className="font-semibold flex gap-1 flex-wrap text-gray-800">
                  Data:{" "}
                  <p className="capitalize">
                    {formatFirstDate.dd}/{formatFirstDate.shortMonth}
                  </p>
                </div>
                <div className="!text-base/6">
                  <p className="text-gray-700 text-start">
                    {firstSession?.starTime} às {firstSession?.endTime}{" "}
                  </p>
                </div>
              </>
            ) : (
              // mostras duas datas
              <>
                <div className="font-semibold !text-sm flex gap-1 flex-wrap text-gray-800">
                  De{" "}
                  <p className="capitalize">
                    {formatFirstDate.dd}/{formatFirstDate.shortMonth}
                  </p>{" "}
                  a{" "}
                  <p className="capitalize">
                    {formatEndDate.dd}/{formatEndDate.shortMonth}
                  </p>
                </div>
                <div className="!text-sm">
                  <p className="text-gray-700 text-start">
                    No primeiro dia, das:
                  </p>
                  <p className="text-gray-700 !text-sm">
                    {firstSession?.starTime} às {firstSession?.endTime}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Location Card */}

          <Link
            target="_blank"
            href={googleMapsUrl}
            className="bg-gray-800 flex max-w-[135px] md:max-w-[160px] flex-col text-white px-4 py-2 rounded-lg"
          >
            <div className="text-center">
              <p className="font-semibold truncate">
                {event_data?.address?.city}, {event_data?.address?.state}
              </p>
              <div className="flex gap-1">
                <MapPin className="w-5 h-5 min-w-5" />
                <p className="text-sm truncate">{event_data?.address?.title}</p>
              </div>
            </div>
          </Link>
        </div>
      </Section>
      {/* adicionar o link para a inscrição e remover se não tiver */}
      {registrtionLink && (
        <div className="mb-10 w-full flex justify-center">
          <Link
            href={registrtionLink}
            target="_blank"
            className="bg-[#179389] whitespace-nowrap w-auto h-15 text-xl px-4 rounded-lg hover:bg-teal-700 text-white flex items-center gap-2 uppercase"
          >
            Faça sua inscrição
          </Link>
        </div>
      )}
      {teaser && (
        <Section className="flex flex-col items-center">
          {teaser && (
            <div className="w-full flex flex-col">
              <h2 className="mb-5 text-center">Teaser do evento</h2>
              <div className="w-full aspect-video bg-black/20 rounded-2xl relative">
                <iframe
                  className="w-full h-full absolute top-0 left-0 rounded-2xl"
                  src={teaser}
                  title="Teaser do Evento"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </Section>
      )}
      <Section className="flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          <h2 className="mb-5">Sobre o Evento</h2>
          {about && (
            <div className="w-full text-justify">
              <PortableText value={about} components={portableTextComponents} />
            </div>
          )}
        </div>
      </Section>
      {event_data?.speakers && (
        <Section className="flex flex-col items-center">
          {event_data?.speakers && (
            <div className="w-full flex flex-col items-center justify-center">
              <h2 className="mb-10">Palestrante</h2>
              <div className="w-full flex flex-wrap gap-10 justify-center">
                {event_data?.speakers?.map(
                  ({ image, titleAbbreviation, name, title }, idx) => {
                    return (
                      <div
                        key={idx}
                        className="flex max-w-[230px] flex-col items-center"
                      >
                        <Image
                          src={image || ""}
                          alt="Palestrante do evento"
                          className="h-40 w-40 rounded-full mb-5"
                          height={200}
                          width={200}
                        />
                        <h2 className="text-center">
                          {titleAbbreviation}
                          {name}
                        </h2>
                        <p className="text-center">{title}</p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </Section>
      )}
      <Section className="flex flex-col items-center">
        {schedule && schedule?.[0].sessions && (
          <div className="w-full flex flex-col items-center">
            <div className="w-full">
              <Schedule scheduleData={schedule} />
            </div>
          </div>
        )}
        <div className="w-full flex gap-2 flex-col items-center mt-5">
        <div className="p-4 w-full  rounded-2xl flex flex-col lg:flex-row gap-6">
          <div className="w-full flex flex-col justify-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <h2>{organizer}</h2>
              <h3 className="mb-3">Coordenação</h3>
              <div className="flex gap-2 justify-center items-center w-full"><Phone className="h-4 w-4" /><p>{phoneFormat(organizerPhone)}</p></div>
              
            </div>
            <div className="w-full flex items-center justify-center">
            <div className="flex gap-2 max-w-[330px] w-full items-center">
              <Link
                href={`https://wa.me/${organizerPhone}?text=Olá, gostaria de saber mais sobre o evento: ${title}`}
                target="_blank"
                className={`${organizerEmail ? "w-2/3" : "w-full"} h-9 font-bold bg-[#179389] text-white rounded-lg flex items-center justify-center gap-2`}
              >
                Tirar dúvidas
              </Link>
              {organizerEmail && (
                <Link
                  href={EmailLink}
                  target="_blank"
                  className="h-9 w-1/3 border flex gap-2 rounded-lg items-center justify-center"
                >
                  <Mail className="w-5 h-5" />
                  Email
                </Link>
              )}
            </div>
            </div>
            
          </div>
        </div>
        </div>
      </Section>
      <Footer />
      <BackToTopButton />
    </>
  );
}

// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Phone, Mail, MessageCircle } from "lucide-react"

// interface ContactInfo {
//   description: string
//   email: string | null
//   phone: {
//     name: string
//     number: string
//   }
// }

// interface ContactInfoProps {
//   contactInfo: ContactInfo
// }

// export default function Component({
//   contactInfo = {
//     description: "Monte Sião Linhares",
//     email: "reijan.lj@gmail.com",
//     phone: { name: "Tayna Dutra.", number: "5527999374701" },
//   },
// }: ContactInfoProps) {
//   const handleWhatsAppClick = () => {
//     const whatsappUrl = `https://wa.me/${contactInfo.phone.number}`
//     window.open(whatsappUrl, "_blank")
//   }

//   const handleEmailClick = () => {
//     if (contactInfo.email) {
//       window.location.href = `mailto:${contactInfo.email}`
//     }
//   }

//   const handlePhoneClick = () => {
//     window.location.href = `tel:+${contactInfo.phone.number}`
//   }

//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader>
//         <CardTitle className="text-xl font-semibold text-center">{contactInfo.description}</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {/* Phone Contact */}
//         <div className="space-y-3">
//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             <Phone className="h-4 w-4" />
//             <span>Telefone para ligações</span>
//           </div>

//           <div className="space-y-2">
//             <p className="font-medium">{contactInfo.phone.name}</p>
//             <p className="text-sm text-muted-foreground">{formatPhoneNumber(contactInfo.phone.number)}</p>
//           </div>

//           <div className="flex gap-2">
//             <Button onClick={handleWhatsAppClick} className="flex-1 bg-green-600 hover:bg-green-700" size="sm">
//               <MessageCircle className="h-4 w-4 mr-2" />
//               WhatsApp
//             </Button>

//             <Button onClick={handlePhoneClick} variant="outline" size="sm">
//               <Phone className="h-4 w-4 mr-2" />
//               Ligar
//             </Button>
//           </div>
//         </div>

//         {/* Email Contact */}
//         {contactInfo.email && (
//           <div className="space-y-3 pt-4 border-t">
//             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//               <Mail className="h-4 w-4" />
//               <span>Enviar mensagem por email</span>
//             </div>

//             <Button onClick={handleEmailClick} variant="outline" className="w-full" size="sm">
//               <Mail className="h-4 w-4 mr-2" />
//               Enviar Email
//             </Button>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   )
// }
