'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const FacebookPixelEvents = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
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
  }, [pathname, searchParams]);

  return null;
};

export default FacebookPixelEvents;
