import { createContext, useContext, useState } from "react";

import en from "../Locales/en.json";
import sv from "../Locales/sv.json";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    sv: {
      translation: sv,
    },
  },
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

let LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  let {t} = useTranslation();
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  }
  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
