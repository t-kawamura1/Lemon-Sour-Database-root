<template>
  <div class="page-age-confirmation">
    <!-- DISPLAY PC -->
    <pc-age-confirmation v-if="$mq === 'pc'">
      <!-- SIDE-BLANK -->
      <template v-slot:side-blank-left>
        <blank-side></blank-side>
      </template>
      <!-- AGE-CONFIRMATION-CONTAINER -->
      <template v-slot:age-confirmation-container>
        <age-confirmation-container>
          <template v-slot:age-confirmation-heading>
            <the-heading :heading-text="heading"></the-heading>
          </template>
          <template v-slot:age-confirmation>
            <age-confirmation
              :warning-icon-text="warningIcon"
              :age-confirmation-texts="ageConfirmations"
              :button-texts="answerButtons"
              @check="rememberAge"
            ></age-confirmation>
          </template>
        </age-confirmation-container>
      </template>
      <!-- SIDE-BLANK -->
      <template v-slot:side-blank-right>
        <blank-side></blank-side>
      </template>
    </pc-age-confirmation>
    <!-- DISPLAY SP -->
    <sp-age-confirmation v-if="$mq === 'sp'">
      <!-- AGE-CONFIRMATION-CONTAINER -->
      <template v-slot:age-confirmation-container>
        <age-confirmation-container>
          <template v-slot:age-confirmation-heading>
            <the-heading :heading-text="heading"></the-heading>
          </template>
          <template v-slot:age-confirmation>
            <age-confirmation
              :warning-icon-text="warningIcon"
              :age-confirmation-texts="ageConfirmations"
              :button-texts="answerButtons"
              @check="rememberAge"
            ></age-confirmation>
          </template>
        </age-confirmation-container>
      </template>
    </sp-age-confirmation>
  </div>
</template>

<script>
import crypto from "crypto-js";
import CommonData from "@/mixins/common-data";
import CommonMethods from "@/mixins/common-methods";
import PcAgeConfirmation from "@/components/templates/pc/AgeConfirmation";
import SpAgeConfirmation from "@/components/templates/sp/AgeConfirmation";
import AgeConfirmationContainer from "@/components/organisms/AgeConfirmationContainer";
import AgeConfirmation from "@/components/molecules/AgeConfirmation.vue";
import TheHeading from "@/components/atoms/TheHeading";
import BlankSide from "@/components/atoms/BlankSide";

export default {
  mixins: [CommonData, CommonMethods],
  components: {
    PcAgeConfirmation,
    SpAgeConfirmation,
    AgeConfirmationContainer,
    AgeConfirmation,
    TheHeading,
    BlankSide,
  },
  data() {
    return {
      heading: "年齢確認",
      warningIcon: "exclamation-triangle",
      ageConfirmations: [
        "当サイトはお酒に関する情報を扱っています。",
        "20歳未満の酒類の購入や飲酒は法律で禁止されています。",
        "あなたは20歳以上ですか？",
      ],
      answerButtons: ["はい", "いいえ"],
    };
  },
  methods: {
    rememberAge(answer) {
      if (answer == this.answerButtons[0]) {
        const encryptedAnswer = crypto.AES.encrypt(
          this.answerButtons[0],
          this.$encryptKey
        ).toString();
        this.$cookies.set("age-confirmation", encryptedAnswer);
        this.$router.push("/");
      } else {
        history.back();
      }
    },
  },
};
</script>
