import languageService from "@/services/language/";
import * as i18nService from "@/i18n/";

describe("languageService", () => {
  describe("getCurrentLanguage fn", () => {
    test("get language configuration from i18n locale", () => {
      i18nService.i18n.locale = "fr";
      const result = languageService.getCurrentLanguage();

      expect(result).toMatchObject({ key: "fr", name: "Français" });
    });
  });

  describe("setCurrentLanguage fn", () => {
    test("call setLocale from localeService", () => {
      const language = { locale: "vi", key: "vn", name: "Tiếng Việt" };
      languageService.setCurrentLanguage(language);

      expect(localStorage.getItem("locale")).toEqual("vi");
    });

    test("set locale to i18n service", () => {
      const language = { locale: "ru", key: "ru", name: "Pусский" };
      languageService.setCurrentLanguage(language);

      expect(i18nService.i18n.locale).toEqual("ru");
    });
  });
});
