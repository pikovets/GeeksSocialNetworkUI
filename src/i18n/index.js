import { createI18n } from 'vue-i18n';

import en from './en';

const messages = {
  en,
};

const i18n = new createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
