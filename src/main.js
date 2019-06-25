import "./main.styl";
import "typeface-roboto";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import services from "./services/index";
import axios from "axios";
import VueAxios from "vue-axios";
import Vuetify from "vuetify";
import theme from "./theme";
import { i18n } from "@/i18n/index";
import settings from "./settings";

const { LINSHARE_URL } = settings;

axios.defaults.baseURL = LINSHARE_URL;
Vue.use(VueAxios, axios);
Vue.router = router;
Vue.use(require("@websanova/vue-auth"), services.auth);
Vue.use(Vuetify, { theme });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
