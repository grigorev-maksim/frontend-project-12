import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

const i18nextInstance = i18next.createInstance();
await i18nextInstance
  .use(initReactI18next)
  .init({
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18nextInstance;
