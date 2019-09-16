import Vue from "vue";
import Vuetify from "vuetify";
import VueI18n from "vue-i18n";
import Login from "@/views/Login.vue";

import en from "@/i18n/lang/en.json";
import fr from "@/i18n/lang/fr.json";
import vi from "@/i18n/lang/vi.json";

let i18n, Constructor, vm;

beforeEach(() => {
  Vue.use(Vuetify);
  Vue.use(VueI18n);
  i18n = new VueI18n({
    messages: { fr, en, vi }
  });
  Constructor = Vue.extend(Login);
});

describe("Login.vue", () => {
  test("should translate helper message when email input is empty", async () => {
    i18n.locale = "vi";
    vm = new Constructor({ i18n }).$mount();

    const emailInputElement = vm.$el.querySelector("input[type='email']");

    await emailInputElement.focus();
    await emailInputElement.blur();

    const message = vm.$el.querySelector(".v-messages__message").textContent;
    expect(message).toEqual("Thư điện tử là bắt buộc");
  });

  test("should translate helper message when password input is empty", async () => {
    i18n.locale = "fr";
    vm = new Constructor({ i18n }).$mount();

    const passwordInputElement = vm.$el.querySelector("input[type='password']");

    await passwordInputElement.focus();
    await passwordInputElement.blur();

    const message = vm.$el.querySelector(".v-messages__message").textContent;
    expect(message).toEqual("Le mot de passe est obligatoire");
  });
});
