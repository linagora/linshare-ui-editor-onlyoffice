import { SUPPORTED_LANGUAGES } from "@/i18n/constants";
import { i18n } from "@/i18n/";
import localeService from "@/services/language/locale";

export default {
  getCurrentLanguage,
  setCurrentLanguage
};

function getCurrentLanguage() {
  return SUPPORTED_LANGUAGES.find(language => language.locale === i18n.locale);
}

function setCurrentLanguage(language) {
  const locale = language.locale;

  localeService.setLocale(locale);
  i18n.locale = locale;
}
