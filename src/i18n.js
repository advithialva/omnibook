import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './lang/en/translation.json';
import esTranslation from './lang/es/translation.json';
import jaTranslation from './lang/ja/translation.json';
import hiTranslation from './lang/hi/translation.json';
import koTranslation from './lang/ko/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  },
  ja: {
    translation: jaTranslation
  },
  hi: {
    translation: hiTranslation
  },
  ko: {
    translation: koTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false, 
    
    interpolation: {
      escapeValue: false 
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;
