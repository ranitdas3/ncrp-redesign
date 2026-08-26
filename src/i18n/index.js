import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';
import bn from './locales/bn.json';
import gu from './locales/gu.json';
import mr from './locales/mr.json';
import kn from './locales/kn.json';
import ml from './locales/ml.json';
import ta from './locales/ta.json';
import te from './locales/te.json';
import or from './locales/or.json';

const SUPPORTED_LANGS = ['en', 'hi', 'bn', 'gu', 'mr', 'kn', 'ml', 'ta', 'te', 'or'];

function getInitialLang() {
  const saved = localStorage.getItem('ncrp-lang');
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  const browserLang = navigator.language?.split('-')[0];
  if (browserLang && SUPPORTED_LANGS.includes(browserLang)) return browserLang;
  return 'en';
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    bn: { translation: bn },
    gu: { translation: gu },
    mr: { translation: mr },
    kn: { translation: kn },
    ml: { translation: ml },
    ta: { translation: ta },
    te: { translation: te },
    or: { translation: or },
  },
  lng: getInitialLang(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('ncrp-lang', lng);
  document.documentElement.setAttribute('lang', lng);
});

document.documentElement.setAttribute('lang', i18n.language);

export default i18n;
