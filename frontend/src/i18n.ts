import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Example translations, replace with your own
const resources = {
  EN: {
    translation: {
      
    }
  },
  FR: {
    translation: {
      
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'EN',
    fallbackLng: 'EN',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
