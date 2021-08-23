import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import axios from "axios";
import VueI18n from "vue-i18n";
import VueMq from "vue-mq";
import VueCookies from "vue-cookies";
import VCalendar from "v-calendar";
import "vue-loaders/dist/vue-loaders.css";
import VueLoaders from "vue-loaders";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Vue.prototype.$axios = axios; 及び
// コンポーネント中で this.$axios とすると、テストでモック化が機能しないので、ここでは記述しない。
axios.defaults.baseURL =
  process.env.VUE_APP_API_ENDPOINT || "https://lsdb-api-v1.herokuapp.com";
Vue.prototype.$encryptKey = process.env.VUE_APP_CRYPTO_KEY;
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(VueMq, {
  breakpoints: {
    sp: 768,
    pc: 769,
  },
});
Vue.use(VueCookies);
Vue.$cookies.config("14d", "", "", true);
Vue.use(VCalendar);
Vue.use(VueLoaders);

library.add(fas, fab, far);
Vue.component("font-awesome-icon", FontAwesomeIcon);

require("@/assets/style/common.scss");

const i18n = new VueI18n({
  locale: "ja",
});

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
