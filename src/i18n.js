import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
      supportedLngs: ['en', 'sc'],
      // sc = simplified chinese (cn)
      // tc = traditional chinese (hk) == sc-cn, etc do not work
      // lng: document.querySelector('html').lang,
      // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
      // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
      // if you're using a language detector, do not define the lng option
      fallbackLng: 'en',
      detection: {
        order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
        caches: ['cookie']
      },
      backend: {
        loadPath: '/assets/locales/{{lng}}/translation.json'
      },
      interpolation: {
        escapeValue: false // react already safes from xss
      }
    });

export default i18n;