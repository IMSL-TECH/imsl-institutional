import bannerFallback from "@/assets/header-bgs/header-br-template.jpg";
import Section from "@/components/section";
import PageHeader from "@/components/page-header";
import Footer from "@/components/footer";
import Link from "next/link";
import { contactPageQuery } from "@/lib/queries";
import { sanityClient } from "@/lib/sanityClient";
import { ContactPage } from "@/type";
import { phoneFormat } from "@/lib/utils";
import { PortableText, PortableTextComponents } from "@portabletext/react";

export default async function Contact() {

   const contact_page_data: ContactPage = await sanityClient.fetch(contactPageQuery)


  return (
    <>
      <PageHeader imgSrc={contact_page_data.bannerImage? contact_page_data.bannerImage: bannerFallback.src}>{contact_page_data.title?contact_page_data.title:""}</PageHeader>
      <Section className="my-20">
        <div>
         <PortableText value={contact_page_data.description}/> {}
        </div>

        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          <div>
            <h3>Onde estamos</h3>
            
            <p>
              {contact_page_data.address.street}, {contact_page_data.address.number}
              <br />
              {contact_page_data.address.district}, {contact_page_data.address.city} - {contact_page_data.address.state}
              <br />
            </p>
          </div>

          <div>
            <h3>Nossos canais</h3>
            <p>
              <a target="blank" href={contact_page_data.DefaultSocialLink}>
                {contact_page_data.DefaultSocial}
              </a>{" "}
              <br />
              <a target="blank" href={`mailto:${contact_page_data.email}`}>
                {contact_page_data.email}
              </a>{" "}
              <br />
              Telefone: {phoneFormat(contact_page_data.phone)} | {contact_page_data.AvailableHours}
            </p>

            <Link
              target="blank"
              href={`https://wa.me/${contact_page_data.whatsApp}`}
              className=" h-10 px-3 text-white mt-5 w-36 rounded-md flex items-center justify-center gap-2 bg-[#179389] hover:bg-teal-700 uppercase"
            >
              Whats App
            </Link>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
  
}
