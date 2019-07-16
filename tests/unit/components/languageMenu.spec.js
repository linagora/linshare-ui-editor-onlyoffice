import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import LanguageMenu from "@/components/LanguageMenu.vue";
import * as i18nService from "@/i18n/index";

let wrapper;

const supported_languages = [
  { locale: "en", key: "us", name: "English (US)" },
  { locale: "fr", key: "fr", name: "Français" },
  { locale: "vi", key: "vn", name: "Tiếng Việt" }
];

beforeEach(() => {
  Vue.use(Vuetify);

  i18nService.i18n.locale = "en";

  wrapper = mount(LanguageMenu, {
    data() {
      return {
        languages: supported_languages
      };
    }
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("LanguageMenu.vue", () => {
  test("get current country flag from i18n locale", () => {
    const element = wrapper.find(".v-btn span");
    expect(element.html()).toContain("flag-icon-us");
  });

  test("Render all supported languages", () => {
    const flagElements = wrapper.findAll(".v-list span.flag-icon");
    const langElements = wrapper.findAll(".v-list span.language-name");

    expect(flagElements.length).toEqual(3);
    expect(flagElements.at(0).html()).toContain("flag-icon-us");
    expect(flagElements.at(1).html()).toContain("flag-icon-fr");
    expect(flagElements.at(2).html()).toContain("flag-icon-vn");
    expect(langElements.length).toEqual(3);
    expect(langElements.at(0).text()).toContain("English (US)");
    expect(langElements.at(1).text()).toContain("Français");
    expect(langElements.at(2).text()).toContain("Tiếng Việt");
  });

  test("Change the current language when choose other language", () => {
    const element = wrapper.findAll("div[role='listitem'] a");

    element.at(1).trigger("click");

    const currentLanguageElement = wrapper.find(".v-btn span");
    expect(currentLanguageElement.html()).toContain("flag-icon-fr");
  });
});
