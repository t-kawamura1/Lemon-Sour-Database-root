import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import axios from "axios";
import VueI18n from "vue-i18n";

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "ja",
});

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
