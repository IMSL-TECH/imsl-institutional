// app/components/ResetCookieLink.tsx
'use client';

import { resetCookieConsentValue } from 'react-cookie-consent';

export default function ResetCookieLink() {
  const handleClick = () => {
    localStorage.removeItem('cookie_consent');
    localStorage.removeItem('cookie_consent_date');
    resetCookieConsentValue("cookie_consent");
    window.location.reload();
  };

  return (
    <a
      onClick={handleClick}
      className="text-sm text-gray-500 hover:underline cursor-pointer"
    >
      Resetar preferências de Cookie.
    </a>
  );
}
