<template>
  <div class="page-user-password-reset">
    <!-- DISPLAY PC -->
    <pc-user-password-reset v-if="$mq === 'pc'">
      <!-- SIDE-BLANK -->
      <template v-slot:side-blank-left>
        <blank-side></blank-side>
      </template>
      <!-- NOTICE -->
      <template v-slot:notice>
        <the-notice
          :notice-text="noticeMessage"
          v-if="noticeMessage.length !== 0"
        ></the-notice>
      </template>
      <!-- USER-PASSWORD-RESET-CONTAINER -->
      <template v-slot:user-password-reset-container>
        <user-password-reset-container>
          <template v-slot:user-password-reset-heading>
            <the-heading :heading-text="heading"></the-heading>
          </template>
          <template v-slot:password-reset>
            <password-reset
              :password-reset-contents="userPasswordResetContents"
              :error-messages="passwordResetErrors"
              @submitUser="resetPassword"
            ></password-reset>
          </template>
        </user-password-reset-container>
      </template>
      <!-- SIDE-BLANK -->
      <template v-slot:side-blank-right>
        <blank-side></blank-side>
      </template>
    </pc-user-password-reset>
    <!-- DISPLAY SP -->
    <sp-user-password-reset v-if="$mq === 'sp'">
      <!-- NOTICE -->
      <template v-slot:notice>
        <the-notice
          :notice-text="noticeMessage"
          v-if="noticeMessage.length !== 0"
        ></the-notice>
      </template>
      <!-- USER-PASSWORD-RESET-CONTAINER -->
      <template v-slot:user-password-reset-container>
        <user-password-reset-container>
          <template v-slot:user-password-reset-heading>
            <the-heading :heading-text="heading"></the-heading>
          </template>
          <template v-slot:password-reset>
            <password-reset
              :password-reset-contents="userPasswordResetContents"
              :error-messages="passwordResetErrors"
              @submitUser="resetPassword"
            ></password-reset>
          </template>
        </user-password-reset-container>
      </template>
    </sp-user-password-reset>
  </div>
</template>

<script>
import axios from "axios";
import { parse } from "querystring";
import CommonData from "@/mixins/common-data";
import CommonMethods from "@/mixins/common-methods";
import PcUserPasswordReset from "@/components/templates/pc/UserPasswordReset";
import SpUserPasswordReset from "@/components/templates/sp/UserPasswordReset";
import UserPasswordResetContainer from "@/components/organisms/UserPasswordResetContainer";
import PasswordReset from "@/components/molecules/PasswordReset.vue";
import TheNotice from "@/components/atoms/TheNotice";
import TheHeading from "@/components/atoms/TheHeading";
import BlankSide from "@/components/atoms/BlankSide";

export default {
  mixins: [CommonData, CommonMethods],
  components: {
    PcUserPasswordReset,
    SpUserPasswordReset,
    UserPasswordResetContainer,
    PasswordReset,
    TheNotice,
    TheHeading,
    BlankSide,
  },
  data() {
    return {
      heading: "パスワードリセット",
      passwordResetErrors: [],
      userPasswordResetContents: [
        [
          ["password", "新しく設定するパスワード(8文字以上)", "password"],
          ["password", "もう一度入力してください", "password_confirmation"],
        ],
        "登録",
      ],
    };
  },
  methods: {
    resetPassword(inputData) {
      const queryParams = parse(window.location.search.slice(1));
      this.authHeader["access-token"] = queryParams["access-token"];
      this.authHeader["client"] = queryParams["client"];
      this.authHeader["uid"] = queryParams["uid"];
      axios
        .put("/api/v1/auth/password", inputData, { headers: this.authHeader })
        .then((res) => {
          this.encryptHeaders(res);
          this.passwordResetErrors = [];
          this.noticeMessage =
            "パスワードがリセットされました。5秒後にホームへ移動します。";
          setTimeout(() => {
            this.noticeMessage = "";
            this.$router.push("/");
          }, 5000);
        })
        .catch((err) => {
          console.log(err.response);
          const errorMessages = err.response.data.errors.full_messages;
          if (errorMessages.includes("現在のパスワードを入力してください")) {
            const filteredMessages = errorMessages.filter((errMsg) => {
              return errMsg !== "現在のパスワードを入力してください";
            });
            filteredMessages.splice(0, 0, "新しいパスワードを入力してください");
            this.passwordResetErrors = filteredMessages;
          } else {
            this.passwordResetErrors = errorMessages;
          }
        });
    },
  },
};
</script>
