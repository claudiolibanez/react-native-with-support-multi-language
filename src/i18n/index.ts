import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';

import enUS from './translations/enUS';
import ptBR from './translations/ptBR';

const LANGUAGES = {
  'en-US': enUS,
  'pt-BR': ptBR,
};

const LANG_CODES = Object.keys(LANGUAGES);

// console.log(RNLocalize.getLocales());

const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: (callback: any) => {
    AsyncStorage.getItem('user-language', (err, language) => {
      // if error fetching stored data or no language was stored
      // display errors when in DEV mode as console statements
      if (err || !language) {
        if (err) {
          console.log('Error fetching Languages from asyncstorage ', err);
        } else {
          console.log('No language is set, choosing English as fallback');
        }
        const findBestAvailableLanguage =
          RNLocalize.findBestAvailableLanguage(LANG_CODES);

        if (findBestAvailableLanguage) {
          callback(findBestAvailableLanguage.languageTag || 'en-US');
        } else {
          console.log('possivel objeto nulo');
        }
        return;
      }
      callback(language);
    });
  },
  init: () => {
    //
  },
  cacheUserLanguage: (language: string) => {
    AsyncStorage.setItem('user-language', language);
  },
} as any;

i18n
  // detect language
  .use(LANGUAGE_DETECTOR)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // set options
  .init({
    compatibilityJSON: 'v3',
    resources: LANGUAGES,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
  });

export default i18n;
