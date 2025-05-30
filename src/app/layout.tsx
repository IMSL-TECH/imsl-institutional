import { Poppins, Montserrat, Open_Sans, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { MetaPixel } from '@/components/MetaPixel'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat'
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans'
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-source-code'
});

export const metadata: Metadata = {
  title: 'Igreja Monte Sião Linhares',
  description: 'Tomando posse da terra',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${montserrat.variable} ${openSans.variable} ${sourceCodePro.variable} antialiased`}
      >
        <MetaPixel/>
        {children}
      </body>
    </html>
  );
}
