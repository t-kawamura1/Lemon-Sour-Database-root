import axios from "axios";
import crypto from "crypto-js";

export default {
  methods: {
    openModal(type) {
      if (type == "ユーザー登録") {
        this.showUserRegistrationModal = true;
      } else if (type == "ログイン") {
        this.showUserLoginModal = true;
      } else if (type == "ユーザーアカウント削除") {
        this.showUserDeleteModal = true;
      }
    },
    closeModal(type) {
      if (type == "ユーザー登録") {
        this.showUserRegistrationModal = false;
        this.userModalErrors = [];
      } else if (type == "ログイン") {
        this.showUserLoginModal = false;
        this.userModalErrors = [];
      } else if (type == "ユーザーアカウント削除") {
        this.showUserDeleteModal = false;
        this.userModalErrors = [];
      }
    },
    replaceModal() {
      this.closeModal("ログイン");
      this.openModal("ユーザー登録");
    },
    encryptHeaders(res) {
      const encryptedAccessToken = crypto.AES.encrypt(
        res.headers["access-token"],
        this.$encryptKey
      ).toString();
      const encryptedClient = crypto.AES.encrypt(
        res.headers["client"],
        this.$encryptKey
      ).toString();
      const encryptedUid = crypto.AES.encrypt(
        res.headers["uid"],
        this.$encryptKey
      ).toString();
      this.authHeader["access-token"] = encryptedAccessToken;
      this.authHeader["client"] = encryptedClient;
      this.authHeader["uid"] = encryptedUid;
      this.$cookies.set("auth-header", this.authHeader);
    },
    decryptHeaders() {
      const decryptedAccessToken = crypto.AES.decrypt(
        this.$cookies.get("auth-header")["access-token"],
        this.$encryptKey
      ).toString(crypto.enc.Utf8);
      const decryptedClient = crypto.AES.decrypt(
        this.$cookies.get("auth-header")["client"],
        this.$encryptKey
      ).toString(crypto.enc.Utf8);
      const decryptedUid = crypto.AES.decrypt(
        this.$cookies.get("auth-header")["uid"],
        this.$encryptKey
      ).toString(crypto.enc.Utf8);
      this.authHeader["access-token"] = decryptedAccessToken;
      this.authHeader["client"] = decryptedClient;
      this.authHeader["uid"] = decryptedUid;
    },
    registrateUser(inputData) {
      console.log(inputData);
      axios
        .post("/api/v1/auth", inputData)
        .then((res) => {
          this.encryptHeaders(res);
          this.isAuthenticated = true;
          this.userId = res.data.data.id;
          this.showUserRegistrationModal = false;
          this.noticeMessage = "ユーザー登録が成功しました！";
          this.userModalErrors = [];
          setTimeout(() => {
            this.noticeMessage = "";
          }, 5000);
        })
        .catch((err) => {
          console.log(err.response);
          const errorMessages =
            err.response.data.errors.full_messages.reverse();
          const unsecureMessage = "メールアドレスが既に登録されています";
          if (errorMessages.includes(unsecureMessage)) {
            const filteredMessages = errorMessages.filter((errMsg) => {
              return errMsg !== unsecureMessage;
            });
            filteredMessages.splice(1, 0, "メールアドレスは有効ではありません");
            this.userModalErrors = filteredMessages;
          } else {
            this.userModalErrors = errorMessages;
          }
        });
    },
    login(inputData) {
      delete inputData.name;
      axios
        .post("/api/v1/auth/sign_in", inputData)
        .then((res) => {
          this.encryptHeaders(res);
          this.showUserLoginModal = false;
          this.isAuthenticated = true;
          this.userId = res.data.data.id;
          this.noticeMessage = "ログインに成功しました！";
          this.userModalErrors = [];
          setTimeout(() => {
            this.noticeMessage = "";
          }, 5000);
        })
        .catch((err) => {
          console.log(err.response);
          this.userModalErrors = err.response.data.errors;
        });
    },
    logout() {
      this.decryptHeaders();
      axios
        .delete("/api/v1/auth/sign_out", {
          headers: this.authHeader,
        })
        .then(() => {
          this.$cookies.remove("auth-header");
          this.userId = "";
          this.routingAfterLogout(this.$route.name);
        })
        .catch((err) => {
          console.log(err.response);
          // this.$router.push("/エラーページ");
        });
    },
    routingAfterLogout(routeName) {
      if (this.authRequiredRoutes.includes(routeName)) {
        this.$router.push("/lemon_sours");
      } else {
        this.isAuthenticated = false;
        this.noticeMessage = "ログアウトしました。";
        setTimeout(() => {
          this.noticeMessage = "";
        }, 5000);
      }
    },
    guideToAuth(message) {
      this.noticeMessage = message;
      setTimeout(() => {
        this.noticeMessage = "";
        this.openModal("ログイン");
      }, 3000);
    },
    sendResetPasswordEmail(inputData) {
      axios
        .post("/api/v1/auth/password", {
          email: inputData,
          redirect_url: process.env.VUE_APP_RESET_REDIRECT_URL || "https://lsdb-front-v1.herokuapp.com/user/password_reset",
        })
        .then(() => {
          this.showUserLoginModal = false;
          this.noticeMessage =
            "入力されたアドレスにパスワードリセットの案内を送信しました。ご確認ください。";
          this.userModalErrors = [];
          setTimeout(() => {
            this.noticeMessage = "";
          }, 5000);
        })
        .catch((err) => {
          console.log(err.response);
          // メールアドレスの登録有無をエラーメッセージに吐き出すのは適切でないので、サーバーからのエラーメッセージは使わない。
          this.userModalResetErrors = ["不正なメールアドレスです。"];
        });
    },
    checkAuthenticated() {
      if (this.$cookies.isKey("auth-header")) {
        this.decryptHeaders();
        axios
          .get("/api/v1/auth/validate_token", {
            headers: this.authHeader,
          })
          .then((res) => {
            if (res.data.success == true) {
              this.isAuthenticated = true;
              this.userId = res.data.data.id;
              this.authHeader = { "access-token": "", client: "", uid: "" };
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
      } else {
        this.isAuthenticated = false;
      }
    },
    markCurrentPage() {
      if (this.$route.name.includes("lemon")) {
        this.currentPageName = "データベース";
      } else if (this.$route.name.includes("calculation")) {
        this.currentPageName = "計算";
      } else if (this.$route.name.includes("records")) {
        this.currentPageName = "記録";
      } else if (this.$route.name.includes("user")) {
        this.currentPageName = "ユーザー";
      }
    },
  },
};
