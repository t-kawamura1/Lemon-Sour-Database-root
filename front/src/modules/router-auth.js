import axios from "axios";
import crypto from "crypto-js";

export default {
  authHeader: {
    "access-token": "",
    client: "",
    uid: "",
  },
  currentUser: {
    id: "",
    name: "",
    email: "",
    user_image: "",
  },
  guardAccessToPageRequiresAuth(Vue, to, from, next) {
    if (Vue.$cookies.isKey("auth-header")) {
      const decryptedAccessToken = crypto.AES.decrypt(
        Vue.$cookies.get("auth-header")["access-token"],
        Vue.prototype.$encryptKey
      ).toString(crypto.enc.Utf8);
      const decryptedClient = crypto.AES.decrypt(
        Vue.$cookies.get("auth-header")["client"],
        Vue.prototype.$encryptKey
      ).toString(crypto.enc.Utf8);
      const decryptedUid = crypto.AES.decrypt(
        Vue.$cookies.get("auth-header")["uid"],
        Vue.prototype.$encryptKey
      ).toString(crypto.enc.Utf8);
      this.authHeader["access-token"] = decryptedAccessToken;
      this.authHeader["client"] = decryptedClient;
      this.authHeader["uid"] = decryptedUid;
      axios
        .get("/api/v1/auth/validate_token", {
          headers: this.authHeader,
        })
        .then((res) => {
          if (res.data.data.id == to.params.id && to.params.id !== "") {
            this.authHeader = { "access-token": "", client: "", uid: "" };
            this.currentUser.id = res.data.data.id;
            this.currentUser.name = res.data.data.name;
            this.currentUser.email = res.data.data.email;
            this.currentUser.user_image = res.data.data.user_image;
            next();
          } else {
            throw "認証失敗";
          }
        })
        .catch((err) => {
          console.log(err);
          next(from);
        });
    } else {
      next(from);
    }
  },
  // guardSourAuth() {
  // write later (to 404 error page?)
  // }
};
