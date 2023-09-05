// CookieConsentBanner.js
import React from 'react';
import { notification } from "antd";
import CookieConsent from 'react-cookie-consent';

const CookieConsentBanner = () => {
  return (
    <CookieConsent
        enableDeclineButton
        onDecline={() => {
            notification.warning({
                message: "Cookie",
                description: "Please allow cookie for smooth experience",
              });
        }}
      location="bottom"
      buttonText="Accept"
      cookieName="myCookieConsent"
      style={{ background: '#333' }}
      visible='byCookieValue'
      buttonStyle={{ color: '#fff', background: '#0073e6' }}
      expires={10}
    >
      This website uses cookies to enhance the user experience. Please ready our privacy policy page for more detail. click here
    </CookieConsent>
  );
};

export default CookieConsentBanner;
