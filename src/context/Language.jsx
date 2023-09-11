import { createContext, useContext, useEffect, useState } from "react";
import axios from "../axios/axios"

import en from "../Locales/en.json";
import sv from "../Locales/sv.json";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { notification } from "antd";

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
  let [languages, setLanguages] = useState([]);
  useEffect(() => {
    axios
      .get("kneg/languages")
      .then((res) =>
        setLanguages(
          res.data.data.map((l) => ({
            label: l.language_full,
            value: l.lang_abb,
          }))
        )
      )
      .catch((err) =>
        notification.error({
          title: "Languages fetch error",
          body: "Unable to fetch languages",
        })
      );
  }, []);

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("lang");
    const initialValue = JSON.parse(saved);
    return initialValue || "en";
  });
  useEffect(()=> {
    localStorage.setItem("lang", JSON.stringify(language));
    i18n.changeLanguage(language);
  }, [language]);

  let {t} = useTranslation();
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  }
  return (
    <LanguageContext.Provider value={{ languages, language, setLanguage: handleLanguageChange, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
