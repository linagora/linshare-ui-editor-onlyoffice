import Vue from "vue";
import VueI18n from "vue-i18n";
import { FALLBACK_LANGUAGE } from "./constants";
import localeService from "@/services/language/locale";
import en from "@/i18n/lang/en.json";
import fr from "@/i18n/lang/fr.json";
import vi from "@/i18n/lang/vi.json";
import ru from "@/i18n/lang/ru.json";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: localeService.getLocale(),
  fallbackLocale: FALLBACK_LANGUAGE,
  messages: { fr, en, vi, ru }
});
