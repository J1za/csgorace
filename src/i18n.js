import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";

i18n
    .use(backend)
    .use(detector)
    .use(initReactI18next) 
    .init({
        lng: localStorage.getItem('i18nextLng') || "ru",
        fallbackLng: localStorage.getItem('i18nextLng') || 'ru',
        saveMissing: true,
        debug: false,
        // keySeparator: false, // we do not use keys in form messages.welcome
        whitelist: ['en', 'ru'],
        interpolation: {
            escapeValue: false // react already safes from xss
        },
        react: {
            useSuspense: false
        }
    })

export default i18n;