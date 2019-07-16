import localeService from "@/services/language/locale.js";

describe("localeService", () => {
  afterEach(() => {
    localStorage.clear();
  });

  test("setLocale fn", () => {
    localeService.setLocale("fr");

    expect(localStorage.getItem("locale")).toEqual("fr");
  });

  describe("getLocale fn", () => {
    test("set locale with en-US format", () => {
      Object.defineProperty(navigator, "language", {
        configurable: true,
        get: function() {
          return "en-US";
        }
      });
      const result = localeService.getLocale();

      expect(result).toEqual("en");
    });

    test("set locale with en-US format", () => {
      Object.defineProperty(navigator, "language", {
        configurable: true,
        get: function() {
          return "fr";
        }
      });
      const result = localeService.getLocale();

      expect(result).toEqual("fr");
    });

    test("set default locale when don't get any language", () => {
      Object.defineProperty(navigator, "language", {
        configurable: true,
        get: function() {
          return undefined;
        }
      });
      const result = localeService.getLocale();

      expect(result).toEqual("en");
    });

    test("set locale in localStorage if have locale item", () => {
      localeService.setLocale("vi");
      Object.defineProperty(navigator, "language", {
        configurable: true,
        get: function() {
          return undefined;
        }
      });
      const result = localeService.getLocale();

      expect(result).toEqual("vi");
    });
  });
});
