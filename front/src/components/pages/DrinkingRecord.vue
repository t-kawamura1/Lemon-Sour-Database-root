<template>
  <div class="page-drinking-record">
    <!-- DISPLAY PC -->
    <pc-drinking-record v-if="$mq === 'pc'">
      <!-- SIDEBAR -->
      <template v-slot:sidebar>
        <the-sidebar>
          <template v-slot:title>
            <app-title
              :sidebar-icon-text="sidebarIcon"
              @link="toPageView"
            ></app-title>
          </template>
          <template v-slot:menus>
            <sidebar-menus-authenticated
              :menu-names="authenticatedSidebarMenus"
              :dropdown-functions="authenticatedUserFunctions"
              :current-page="currentPageName"
              @link="toPageView"
              @submitUser="logout"
            ></sidebar-menus-authenticated>
          </template>
        </the-sidebar>
      </template>
      <!-- NOTICE -->
      <template v-slot:notice>
        <the-notice
          :notice-text="noticeMessage"
          v-if="noticeMessage.length !== 0"
        ></the-notice>
      </template>
      <!-- DRINKING-RECORD-CONTAINER -->
      <template v-slot:drinking-record-container>
        <drinking-record-container>
          <template v-slot:drinking-record-heading>
            <the-heading :heading-text="heading"></the-heading>
          </template>
          <template v-slot:drinking-record-records-calendar>
            <!-- ケバブケースで数字を渡せない？ので英単語に置き換えた -->
            <records-calendar
              :records-less-than-twenty="amountByDateLessThan20"
              :records-from-twenty-to-thirty-nine="amountByDateFrom20To39"
              :records-forty-or-more="amountByDate40OrMore"
              :colors-and-texts="colorsAndTextsSet"
            ></records-calendar>
          </template>
          <template v-slot:drinking-record-records-by-month>
            <records-by-month></records-by-month>
          </template>
          <template v-slot:drinking-record-records-sour-names>
            <records-sour-names
              :records-sour-names="countSourNames"
              :icon-ranking="iconText"
              :sour-names-explanation="soursNamesExplanationText"
            ></records-sour-names>
          </template>
          <template v-slot:drinking-record-button-calculation-record>
            <button-calculation-record
              :button-calc-rec-text="buttonTexts[0]"
              @record="toPageView('toCalculation')"
            ></button-calculation-record>
          </template>
          <template v-slot:drinking-record-records-delete>
            <records-delete
              :error-message="drinkingRecordErrors[0]"
              :button-delete="buttonTexts[1]"
              @submit="deleteRecord"
            ></records-delete>
          </template>
        </drinking-record-container>
      </template>
      <!-- SIDE-BLANK -->
      <template v-slot:side-blank>
        <blank-side></blank-side>
      </template>
    </pc-drinking-record>
    <!-- DISPLAY SP -->
    <sp-drinking-record v-if="$mq === 'sp'">
      <!-- HEADER -->
      <template v-slot:header>
        <the-header>
          <template v-slot:header-icons>
            <header-icons-authenticated
              :header-icons="headerIcons"
              :dropdown-functions="authenticatedUserFunctions"
              @link="toPageView"
              @submitUser="logout"
            ></header-icons-authenticated>
          </template>
        </the-header>
      </template>
      <!-- NOTICE -->
      <template v-slot:notice>
        <the-notice
          :notice-text="noticeMessage"
          v-if="noticeMessage.length !== 0"
        ></the-notice>
      </template>
      <!-- DRINKING-RECORD-CONTAINER -->
      <template v-slot:drinking-record-container>
        <drinking-record-container>
          <template v-slot:drinking-record-heading>
            <the-heading :heading-text="heading"></the-heading>
          </template>
          <template v-slot:drinking-record-records-calendar>
            <records-calendar
              :records-less-than-twenty="amountByDateLessThan20"
              :records-from-twenty-to-thirty-nine="amountByDateFrom20To39"
              :records-forty-or-more="amountByDate40OrMore"
              :colors-and-texts="colorsAndTextsSet"
            ></records-calendar>
          </template>
          <template v-slot:drinking-record-records-by-month>
            <records-by-month></records-by-month>
          </template>
          <template v-slot:drinking-record-records-sour-names>
            <records-sour-names
              :records-sour-names="countSourNames"
              :icon-ranking="iconText"
              :sour-names-explanation="soursNamesExplanationText"
            ></records-sour-names>
          </template>
          <template v-slot:drinking-record-button-calculation-record>
            <button-calculation-record
              :button-calc-rec-text="buttonTexts[0]"
              @record="toPageView('toCalculation')"
            ></button-calculation-record>
          </template>
          <template v-slot:drinking-record-records-delete>
            <records-delete
              :error-message="drinkingRecordErrors[0]"
              :button-delete="buttonTexts[1]"
              @submit="deleteRecord"
            ></records-delete>
          </template>
        </drinking-record-container>
      </template>
      <!-- FOOTER -->
      <template v-slot:footer>
        <the-footer>
          <template v-slot:footer-icons>
            <footer-icons
              :footer-icons="footerIcons"
              :current-page="currentPageName"
              @link="toPageView"
            ></footer-icons>
          </template>
        </the-footer>
      </template>
    </sp-drinking-record>
  </div>
</template>

<script>
import axios from "axios";
import CommonData from "@/mixins/common-data";
import CommonMethods from "@/mixins/common-methods";
import PcDrinkingRecord from "@/components/templates/pc/DrinkingRecord";
import SpDrinkingRecord from "@/components/templates/sp/DrinkingRecord";
import TheSidebar from "@/components/organisms/TheSidebar";
import TheHeader from "@/components/organisms/TheHeader";
import DrinkingRecordContainer from "@/components/organisms/DrinkingRecordContainer";
import TheFooter from "@/components/organisms/TheFooter";
import AppTitle from "@/components/molecules/AppTitle";
import SidebarMenusAuthenticated from "@/components/molecules/SidebarMenusAuthenticated";
import HeaderIconsAuthenticated from "@/components/molecules/HeaderIconsAuthenticated";
import RecordsCalendar from "@/components/molecules/RecordsCalendar";
import RecordsByMonth from "@/components/molecules/RecordsByMonth";
import RecordsDelete from "@/components/molecules/RecordsDelete";
import RecordsSourNames from "@/components/molecules/RecordsSourNames";
import FooterIcons from "@/components/molecules/FooterIcons";
import TheNotice from "@/components/atoms/TheNotice";
import TheHeading from "@/components/atoms/TheHeading";
import BlankSide from "@/components/atoms/BlankSide";
import ButtonCalculationRecord from "@/components/atoms/ButtonCalculationRecord";

export default {
  mixins: [CommonData, CommonMethods],
  components: {
    PcDrinkingRecord,
    SpDrinkingRecord,
    TheSidebar,
    TheHeader,
    DrinkingRecordContainer,
    TheFooter,
    SidebarMenusAuthenticated,
    HeaderIconsAuthenticated,
    RecordsCalendar,
    RecordsByMonth,
    RecordsDelete,
    RecordsSourNames,
    FooterIcons,
    AppTitle,
    TheNotice,
    TheHeading,
    BlankSide,
    ButtonCalculationRecord,
  },
  props: {
    currentUser: Object,
  },
  data() {
    return {
      heading: `${this.currentUser.name}さんの飲酒記録`,
      drinkingRecordErrors: [],
      amountByDateLessThan20: [],
      amountByDateFrom20To39: [],
      amountByDate40OrMore: [],
      countSourNames: [],
      colorsAndTextsSet: [
        ["cec-green", "純アルコール量20g未満"],
        ["cec-yellow", "純アルコール量20g以上40g未満"],
        ["cec-red", "純アルコール量40g以上"],
      ],
      soursNamesExplanationText: `${this.currentUser.name}さんがよく飲んでいるレモンサワー`,
      iconText: "crown",
      buttonTexts: ["記録を追加", "削除"],
    };
  },
  methods: {
    toPageView(destination) {
      switch (destination) {
        case "toHome":
        case this.headerIcons[0]:
          this.$router.push("/");
          break;
        case this.authenticatedSidebarMenus[0].name:
        case this.footerIcons[0][0]:
          this.$router.push("/lemon_sours");
          break;
        case "toCalculation":
        case this.authenticatedSidebarMenus[1].name:
        case this.footerIcons[1][0]:
          this.$router.push("/calculation");
          break;
        case this.authenticatedSidebarMenus[2].name:
        case this.footerIcons[2][0]:
          break;
        case this.authenticatedUserFunctions[0]:
          this.$router.push(`/users/${this.userId}`);
          break;
      }
    },
    deleteRecord(selectedDate) {
      this.decryptHeaders();
      axios
        .delete("/api/v1/drinking_records/delete", {
          params: { drinking_date: selectedDate },
          headers: this.authHeader,
        })
        .then((res) => {
          this.drinkingRecordErrors = "";
          this.amountByDateLessThan20 = res.data[0];
          this.amountByDateFrom20To39 = res.data[1];
          this.amountByDate40OrMore = res.data[2];
          this.noticeMessage = "該当する記録を削除しました。";
          setTimeout(() => {
            this.noticeMessage = "";
          }, 5000);
        })
        .catch((err) => {
          console.log(err.response);
          this.drinkingRecordErrors.push(err.response.data.error_message);
        });
    },
  },
  created() {
    this.decryptHeaders();
    axios
      .get(`/api/v1/drinking_records/${this.$route.params.id}`, {
        headers: this.authHeader,
      })
      .then((res) => {
        this.amountByDateLessThan20 = res.data[0];
        this.amountByDateFrom20To39 = res.data[1];
        this.amountByDate40OrMore = res.data[2];
        this.countSourNames = res.data[3];
      })
      .catch((err) => {
        console.log(err.response);
      });
    this.userId = this.currentUser.id;
    this.markCurrentPage();
  },
};
</script>
