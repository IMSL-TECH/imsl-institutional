'use client';

import {CookieConsent, resetCookieConsentValue} from 'react-cookie-consent';
import { useEffect} from 'react';


const COOKIE_CONSENT_KEY = 'cookie_consent';
const COOKIE_DATE_KEY = 'cookie_consent_date';

const CookieBanner = () => {


    const oneDay = 1000*60*60*24;
    useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const lastDate = localStorage.getItem(COOKIE_DATE_KEY);
    const now = new Date();

    if (consent === 'granted') return;

    if (consent === 'denied' && lastDate) {
      const diff = now.getTime() - new Date(lastDate).getTime();
      
      
      if (diff >= oneDay) {
        resetCookieConsentValue("cookie_consent")
      } 
    } 
  }, []);

    const saveConsent = (consent: 'granted' | 'denied') => {
        localStorage.setItem(COOKIE_CONSENT_KEY, consent);
        localStorage.setItem(COOKIE_DATE_KEY, new Date().toISOString());
        if (consent === 'granted') {
            window.dispatchEvent(new Event('cookieConsentGranted'));
        }
    };

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
            onAccept={() => saveConsent('granted')}
            onDecline={() => saveConsent('denied')}
        >
            Utilizamos cookies para melhorar sua experiência e analisar dados de navegação. Consulte nossa{" "}
            <a href="/politica-de-privacidade" style={{ color: "#a6e1fa", textDecoration: "underline" }}>
                Política de Privacidade
            </a>.
        </CookieConsent>

    );
};

export default CookieBanner;
