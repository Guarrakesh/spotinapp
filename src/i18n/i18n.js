import { reactI18nextModule } from "react-i18next";
import DeviceInfo from 'react-native-device-info';
import i18n from "i18next";
import en from './en.json';
import it from './it.json';


const languageDetector = {
  type: 'languageDetector',
  detect: () => DeviceInfo.getDeviceLocale(),
  init: () => {},
  cacheUserLanguage: () => {},
};
const resources = {
  en: {
    translation: en
  },
  it: {
    translation: it,
  }
};


i18n
    .use(reactI18nextModule)
    .use(languageDetector)
    .init({
      fallbackLng: 'en',
      resources,

      interpolation: {
        escapeValue: false // react already safes from xss
      }
    })
;

export default i18n