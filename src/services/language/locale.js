import { DEFAULT_LANGUAGE } from "@/i18n/constants";

export default {
  setLocale,
  getLocale
};

function setLocale(locale) {
  localStorage.setItem("locale", locale);
}

function getLocale() {
  const localeFromLocalStorage = localStorage.getItem("locale");

  if (localeFromLocalStorage) {
    return localeFromLocalStorage;
  }

  if (navigator.language) {
    const browserLocale = navigator.language;

    return browserLocale.includes("-") ? browserLocale.split("-")[0] : browserLocale;
  }

  return DEFAULT_LANGUAGE;
}
