'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const FacebookPixelEvents = dynamic(() => import('./FacebookPixelEvents'), { ssr: false });
const CookieBanner = dynamic(() => import('./cookieBanner'), { ssr: false });

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <CookieBanner />
      <FacebookPixelEvents />
    </>
  );
}