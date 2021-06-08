import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
