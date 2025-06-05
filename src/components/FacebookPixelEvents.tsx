'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const FacebookPixelEvents = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem('cookie_consent');
      if (consent === 'granted') setHasConsent(true);
    };

    checkConsent();
    window.addEventListener('cookieConsentGranted', checkConsent);

    return () => {
      window.removeEventListener('cookieConsentGranted', checkConsent);
    };
  }, []);

  useEffect(() => {

    if (!hasConsent) return;

    const fetchAndInitPixel = async () => {
      try {
        const res = await fetch('/api/pixel-id');
        const data = await res.json();
        const pixelId = data.metaPixelId;

        if (!pixelId) return;

        const ReactPixel = (await import('react-facebook-pixel')).default;
        ReactPixel.init(pixelId);
        ReactPixel.pageView();
      } catch (error) {
        console.error('Erro ao inicializar o Facebook Pixel:', error);
      }
    };

    fetchAndInitPixel();
  }, [hasConsent, pathname, searchParams]);

  return null;
};

export default FacebookPixelEvents;
