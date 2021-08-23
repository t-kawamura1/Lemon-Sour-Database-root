<template>
  <div class="page-calculation">
    <!-- DISPLAY PC -->
    <pc-calculation v-if="$mq === 'pc'">
      <!-- MODAL -->
      <template v-slot:modal>
        <the-modal>
          <template v-slot:modal-user-registration>
            <!-- v-showにすべきだが、focusの効くタイミングがv-if + beforeMountしかなかった。 -->
            <modal-user
              :modal-user-contents="userRegistrationContents"
              :error-messages="userModalErrors"
              v-if="showUserRegistrationModal"
              @modal="closeModal"
              @submitUser="registrateUser"
            ></modal-user>
          </template>
          <template v-slot:modal-user-login>
            <modal-user
              :modal-user-contents="userLoginContents"
              :error-messages="userModalErrors"
              :error-messages-reset="userModalResetErrors"
              v-if="showUserLoginModal"
              @modal="closeModal"
              @submitUser="login"
              @replace="replaceModal"
              @resetPassword="sendResetPasswordEmail"
            ></modal-user>
          </template>
        </the-modal>
      </template>
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
              v-if="isAuthenticated"
              :menu-names="authenticatedSidebarMenus"
              :dropdown-functions="authenticatedUserFunctions"
              :current-page="currentPageName"
              @link="toPageView"
              @submitUser="logout"
            ></sidebar-menus-authenticated>
            <sidebar-menus-unauthenticated
              v-else
              :menu-names="unauthenticatedSidebarMenus"
              :dropdown-functions="unauthenticatedUserFunctions"
              :current-page="currentPageName"
              @link="toPageView"
              @modal="openModal"
            ></sidebar-menus-unauthenticated>
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
      <!-- CALCULATION-CONTAINER -->
      <template v-slot:calculation-container>
        <calculation-container>
          <template v-slot:calculation-heading>
            <the-heading :heading-text="heading"></the-heading>
          </template>
          <template v-slot:calculation-text-calculation-main>
            <text-main :main-text="mainExplanation"></text-main>
          </template>
          <template v-slot:calculation-calculate-alcohol>
            <calculate-alcohol
              :calculation-supplement-texts="calculationSupplement"
              :error-messages="calculationRecordErrors"
              :sours-select="soursSelectSet"
              :lemon-sours="lemonSoursData"
              :alcohol-inputs="alcoholInputContents"
              :icon-texts="calculationIcons"
              :calc-button="calcButtonText"
              :todaySour="lemonSour"
              @submitRecord="recordDrinking"
            ></calculate-alcohol>
          </template>
        </calculation-container>
      </template>
      <!-- SIDE-BLANK -->
      <template v-slot:side-blank>
        <blank-side></blank-side>
      </template>
    </pc-calculation>
    <!-- DISPLAY SP -->
    <sp-calculation v-if="$mq === 'sp'">
      <!-- MODAL -->
      <template v-slot:modal>
        <the-modal>
          <template v-slot:modal-user-registration>
            <modal-user
              :modal-user-contents="userRegistrationContents"
              :error-messages="userModalErrors"
              v-if="showUserRegistrationModal"
              @modal="closeModal"
              @submitUser="registrateUser"
            ></modal-user>
          </template>
          <template v-slot:modal-user-login>
            <modal-user
              :modal-user-contents="userLoginContents"
              :error-messages="userModalErrors"
              :error-messages-reset="userModalResetErrors"
              v-if="showUserLoginModal"
              @modal="closeModal"
              @submitUser="login"
              @replace="replaceModal"
              @resetPassword="sendResetPasswordEmail"
            ></modal-user>
          </template>
          <template v-slot:modal-user-delete>
            <modal-delete-user
              :modal-delete-user-contents="userDeleteContents"
              v-if="showUserDeleteModal"
              @modal="closeModal"
              @submitUser="deleteUser"
            ></modal-delete-user>
          </template>
        </the-modal>
      </template>
      <!-- HEADER -->
      <template v-slot:header>
        <the-header>
          <template v-slot:header-icons>
            <header-icons-authenticated
              v-if="isAuthenticated"
              :header-icons="headerIcons"
              :dropdown-functions="authenticatedUserFunctions"
              @link="toPageView"
              @submitUser="logout"
            ></header-icons-authenticated>
            <header-icons-unauthenticated
              v-else
              :header-icons="headerIcons"
              :dropdown-functions="unauthenticatedUserFunctions"
              @link="toPageView"
              @modal="openModal"
            ></header-icons-unauthenticated>
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
      <!-- CALCULATION-CONTAINER -->
      <template v-slot:calculation-container>
        <calculation-container>
          <template v-slot:calculation-heading>
            <the-heading :heading-text="heading"></the-heading>
          </template>
          <template v-slot:calculation-text-calculation-main>
            <text-main :main-text="mainExplanation"></text-main>
          </template>
          <template v-slot:calculation-calculate-alcohol>
            <calculate-alcohol
              :calculation-supplement-texts="calculationSupplement"
              :error-messages="calculationRecordErrors"
              :sours-select="soursSelectSet"
              :lemon-sours="lemonSoursData"
              :alcohol-inputs="alcoholInputContents"
              :icon-texts="calculationIcons"
              :calc-button="calcButtonText"
              :todaySour="lemonSour"
              @submitRecord="recordDrinking"
            ></calculate-alcohol>
          </template>
        </calculation-container>
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
    </sp-calculation>
  </div>
</template>

<script>
import axios from "axios";
import CommonData from "@/mixins/common-data";
import CommonMethods from "@/mixins/common-methods";
import PcCalculation from "@/components/templates/pc/Calculation";
import SpCalculation from "@/components/templates/sp/Calculation";
import TheModal from "@/components/organisms/TheModal";
import TheSidebar from "@/components/organisms/TheSidebar";
import TheHeader from "@/components/organisms/TheHeader";
import CalculationContainer from "@/components/organisms/CalculationContainer";
import TheFooter from "@/components/organisms/TheFooter";
import ModalUser from "@/components/molecules/ModalUser";
import AppTitle from "@/components/molecules/AppTitle";
import SidebarMenusAuthenticated from "@/components/molecules/SidebarMenusAuthenticated";
import SidebarMenusUnauthenticated from "@/components/molecules/SidebarMenusUnauthenticated";
import HeaderIconsAuthenticated from "@/components/molecules/HeaderIconsAuthenticated";
import HeaderIconsUnauthenticated from "@/components/molecules/HeaderIconsUnauthenticated";
import FooterIcons from "@/components/molecules/FooterIcons";
import CalculateAlcohol from "@/components/molecules/CalculateAlcohol";
import TheNotice from "@/components/atoms/TheNotice";
import TheHeading from "@/components/atoms/TheHeading";
import TextMain from "@/components/atoms/TextMain";
import BlankSide from "@/components/atoms/BlankSide";

export default {
  mixins: [CommonData, CommonMethods],
  components: {
    PcCalculation,
    SpCalculation,
    TheModal,
    TheSidebar,
    TheHeader,
    CalculationContainer,
    TheFooter,
    ModalUser,
    SidebarMenusAuthenticated,
    SidebarMenusUnauthenticated,
    HeaderIconsAuthenticated,
    HeaderIconsUnauthenticated,
    FooterIcons,
    CalculateAlcohol,
    AppTitle,
    TheNotice,
    TheHeading,
    TextMain,
    BlankSide,
  },
  props: ["lemonSour"],
  data() {
    return {
      heading: "アルコール摂取量計算",
      mainExplanation:
        "飲んだ銘柄と飲んだ量から、摂取アルコール量を計算できます。飲んだ日付を選択すると、結果を記録することができます。",
      calculationSupplement: [
        "※ 純アルコール量で算定。この文章をクリックすると計算式・摂取目安量を表示",
        [
          "量(ml) × 度数/100 × 0.8 = 純アルコール量(g)",
          "節度ある適切な飲酒量： 1日当たり20g程度",
          "生活習慣病のリスクを高める飲酒量：",
          "男性 40g以上、 女性 20g以上",
        ],
      ],
      calculationRecordErrors: [],
      soursSelectSet: ["ー", ["レモンサワーを選択"]],
      lemonSoursData: [],
      alcoholInputContents: {
        alcContent: ["度数", 0.5, 0.5, 99],
        amountSelect: {
          sortType: "ー",
          sortValues: ["容量", 350, 400, 500, 334, 633, 135, 250],
          initValue: "容量",
        },
        drinkingCounts: ["", 1, 0, 99],
      },
      calculationIcons: ["times", "plus-circle", "arrow-right"],
      calcButtonText: "結果を記録する（登録ユーザーのみ）",
    };
  },
  methods: {
    toPageView(destination) {
      switch (destination) {
        case "toHome":
        case this.headerIcons[0]:
          this.$router.push("/");
          break;
        case this.unauthenticatedSidebarMenus[0].name:
        case this.authenticatedSidebarMenus[0].name:
        case this.footerIcons[0][0]:
          this.$router.push("/lemon_sours");
          break;
        case this.unauthenticatedSidebarMenus[1].name:
        case this.authenticatedSidebarMenus[1].name:
        case this.footerIcons[1][0]:
          break;
        case this.unauthenticatedSidebarMenus[2].name:
          this.guideToAuth(
            "記録の閲覧には、ユーザー登録・ログインが必要です。"
          );
          break;
        case this.footerIcons[2][0]:
          if (this.userId == "") {
            this.guideToAuth(
              "記録の閲覧には、ユーザー登録・ログインが必要です。"
            );
          } else {
            this.$router.push(`/drinking_records/${this.userId}`);
          }
          break;
        case this.authenticatedSidebarMenus[2].name:
          this.$router.push(`/drinking_records/${this.userId}`);
          break;
        case this.authenticatedUserFunctions[0]:
          this.$router.push(`/users/${this.userId}`);
          break;
      }
    },
    recordDrinking(data) {
      if (this.$cookies.isKey("auth-header")) {
        data.drinking_record.user_id = this.userId;
        this.decryptHeaders();
        axios
          .post("/api/v1/drinking_records", data, {
            headers: this.authHeader,
          })
          .then(() => {
            this.noticeMessage =
              "記録が作成されました！記録カレンダーへ移動します。";
            setTimeout(() => {
              this.noticeMessage = "";
              this.$router.push(`/drinking_records/${this.userId}`);
            }, 3000);
          })
          .catch((err) => {
            console.log(err.response);
            this.calculationRecordErrors = err.response.data;
          });
      } else {
        this.guideToAuth(
          "結果を記録するには、ユーザー登録・ログインが必要です。"
        );
      }
    },
  },
  created() {
    axios
      .get("/api/v1/lemon_sours")
      .then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          this.soursSelectSet[1].push(res.data[index].name);
        }
        this.lemonSoursData = res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
    this.checkAuthenticated();
    this.markCurrentPage();
  },
};
</script>
