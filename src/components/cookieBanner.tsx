'use client';

import CookieConsent from 'react-cookie-consent';

const CookieBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Aceitar"
      declineButtonText="Recusar"
      enableDeclineButton
      cookieName="cookie_consent"
      style={{ background: "#2B373B", fontSize: "14px" }}
      buttonStyle={{ background: "#4e9c81", color: "#fff", fontSize: "13px", borderRadius: "4px" }}
      declineButtonStyle={{ background: "#777", color: "#fff", fontSize: "13px", borderRadius: "4px" }}
      expires={365}
      onAccept={() => {
        window.dispatchEvent(new Event('cookieConsentGranted'));
      }}
      onDecline={() => {
        localStorage.setItem('cookie_consent', 'denied');
      }}
    >
      Utilizamos cookies para melhorar sua experiência e analisar dados de navegação. Consulte nossa{" "}
      <a href="/politica-de-privacidade" style={{ color: "#a6e1fa", textDecoration: "underline" }}>
        Política de Privacidade
      </a>.
    </CookieConsent>
  );
};

export default CookieBanner;
