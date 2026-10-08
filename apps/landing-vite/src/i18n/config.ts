import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import zhHK from './locales/zh-HK.json';
import zhCN from './locales/zh-CN.json';

// Get language from URL query parameter, default to zh-HK
const getLanguageFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang');
  const validLanguages = ['en', 'zh-HK', 'zh-CN'];
  if (lang && validLanguages.includes(lang)) {
    return lang;
  }
  return 'zh-HK'; // Default language
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      'zh-HK': { translation: zhHK },
      'zh-CN': { translation: zhCN }
    },
    lng: getLanguageFromURL(),
    fallbackLng: 'zh-HK',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
