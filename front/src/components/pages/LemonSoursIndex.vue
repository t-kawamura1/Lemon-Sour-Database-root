<template>
  <div class="page-lemon-sours-index">
    <!-- DISPLAY PC-->
    <pc-lemon-sours-index v-if="$mq === 'pc'">
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
      <!-- SOURS-INDEX-CONTAINER -->
      <template v-slot:pc-sours-index-container>
        <pc-sours-index-container>
          <template v-slot:pc-heading>
            <the-heading :heading-text="heading"></the-heading>
          </template>
          <template v-slot:pc-selects-set>
            <pc-selects-set
              :selects-types="sortTypes"
              :selects-manufacturers="manufacturers"
              :selects-ingredients="ingredients"
              :selects-orders="sortOrders"
              :error-messages="sortErrors"
              @sortBy="searchBy"
            ></pc-selects-set>
          </template>
          <template v-slot:pc-sours-index-items>
            <pc-sours-index-items
              :lemon-sours="lemonSours"
              :loading="soursLoading"
              :error-message="noContentsError"
              @link="toPageView"
            ></pc-sours-index-items>
          </template>
        </pc-sours-index-container>
      </template>
    </pc-lemon-sours-index>
    <!-- DISPLAY SP -->
    <sp-lemon-sours-index v-if="$mq === 'sp'">
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
      <!-- SOURS-INDEX-CONTAINER -->
      <template v-slot:sp-sours-index-container>
        <sp-sours-index-container>
          <template v-slot:sp-heading>
            <the-heading :heading-text="heading"></the-heading>
          </template>
          <template v-slot:sp-selects-set>
            <sp-selects-set
              :selects-types="sortTypes"
              :selects-manufacturers="manufacturers"
              :selects-ingredients="ingredients"
              :selects-orders="sortOrders"
              :error-messages="sortErrors"
              @sortBy="searchBy"
            ></sp-selects-set>
          </template>
          <template v-slot:sp-sours-index-items>
            <sp-sours-index-items
              :lemon-sours="lemonSours"
              :loading="soursLoading"
              :error-message="noContentsError"
              @link="toPageView"
            ></sp-sours-index-items>
          </template>
        </sp-sours-index-container>
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
    </sp-lemon-sours-index>
  </div>
</template>

<script>
import axios from "axios";
import CommonData from "@/mixins/common-data";
import CommonMethods from "@/mixins/common-methods";
import PcLemonSoursIndex from "@/components/templates/pc/LemonSoursIndex";
import SpLemonSoursIndex from "@/components/templates/sp/LemonSoursIndex";
import TheModal from "@/components/organisms/TheModal";
import TheSidebar from "@/components/organisms/TheSidebar";
import TheHeader from "@/components/organisms/TheHeader";
import PcSoursIndexContainer from "@/components/organisms/pc/SoursIndexContainer";
import SpSoursIndexContainer from "@/components/organisms/sp/SoursIndexContainer";
import TheFooter from "@/components/organisms/TheFooter";
import ModalUser from "@/components/molecules/ModalUser";
import AppTitle from "@/components/molecules/AppTitle";
import SidebarMenusAuthenticated from "@/components/molecules/SidebarMenusAuthenticated";
import SidebarMenusUnauthenticated from "@/components/molecules/SidebarMenusUnauthenticated";
import HeaderIconsAuthenticated from "@/components/molecules/HeaderIconsAuthenticated";
import HeaderIconsUnauthenticated from "@/components/molecules/HeaderIconsUnauthenticated";
import PcSelectsSet from "@/components/molecules/pc/SelectsSet";
import SpSelectsSet from "@/components/molecules/sp/SelectsSet";
import PcSoursIndexItems from "@/components/molecules/pc/SoursIndexItems";
import SpSoursIndexItems from "@/components/molecules/sp/SoursIndexItems";
import FooterIcons from "@/components/molecules/FooterIcons";
import TheNotice from "@/components/atoms/TheNotice";
import TheHeading from "@/components/atoms/TheHeading";

export default {
  mixins: [CommonData, CommonMethods],
  components: {
    PcLemonSoursIndex,
    SpLemonSoursIndex,
    TheModal,
    TheSidebar,
    TheHeader,
    PcSoursIndexContainer,
    SpSoursIndexContainer,
    TheFooter,
    ModalUser,
    SidebarMenusAuthenticated,
    SidebarMenusUnauthenticated,
    HeaderIconsAuthenticated,
    HeaderIconsUnauthenticated,
    PcSelectsSet,
    SpSelectsSet,
    PcSoursIndexItems,
    SpSoursIndexItems,
    FooterIcons,
    AppTitle,
    TheNotice,
    TheHeading,
  },
  data() {
    return {
      heading: "市販レモンサワーデータベース",
      sortTypes: ["メーカー", "成分", "並び順"],
      manufacturers: [
        "すべて",
        "アサヒ",
        "キリン",
        "コカ・コーラ",
        "サッポロ",
        "サントリー",
        "宝酒造",
      ],
      ingredients: ["すべて", "糖類ゼロ", "甘味料ゼロ"],
      sortOrders: [
        "新着順",
        "度数の高い順",
        "度数の低い順",
        "カロリーの高い順",
        "カロリーの低い順",
        "果汁の多い順",
        "果汁の少ない順",
      ],
      sortErrors: null,
      soursLoading: false,
      noContentsError: null,
      lemonSours: null,
    };
  },
  methods: {
    toPageView(destination) {
      if (typeof destination === "object" && destination[0] == "toLemonSour") {
        this.$router.push(`/lemon_sours/${destination[1]}`);
      }
      switch (destination) {
        case "toHome":
        case this.headerIcons[0]:
          this.$router.push("/");
          break;
        case this.unauthenticatedSidebarMenus[0].name:
        case this.authenticatedSidebarMenus[0].name:
        case this.footerIcons[0][0]:
          break;
        case this.unauthenticatedSidebarMenus[1].name:
        case this.authenticatedSidebarMenus[1].name:
        case this.footerIcons[1][0]:
          this.$router.push("/calculation");
          break;
        case this.unauthenticatedSidebarMenus[2].name:
          this.guideToAuth(
            "記録の閲覧には、ユーザー登録・ログインが必要です。"
          );
          break;
        case this.authenticatedSidebarMenus[2].name:
          if (this.userId == "") {
            this.guideToAuth(
              "記録の閲覧には、ユーザー登録・ログインが必要です。"
            );
          } else {
            this.$router.push(`/drinking_records/${this.userId}`);
          }
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
        case this.authenticatedUserFunctions[0]:
          this.$router.push(`/users/${this.userId}`);
          break;
      }
    },
    fetchLemonSours() {
      this.noContentsError = null;
      this.lemonSours = null;
      this.soursLoading = true;
      axios
        .get("/api/v1/lemon_sours")
        .then((res) => {
          this.soursLoading = false;
          this.lemonSours = res.data;
        })
        .catch((err) => {
          console.log(err.response);
          this.soursLoading = false;
        });
    },
    searchBy(values) {
      // __ob__: Observerが配列の末尾にあるため下の書き方。
      if (((values[0] == values[1]) == values[2]) == "") {
        this.sortErrors = ["少なくとも１つ選択して検索してください"];
      } else {
        this.sortErrors = null;
        this.lemonSours = null;
        this.noContentsError = null;
        this.soursLoading = true;
        axios
          .get("/api/v1/lemon_sours/search_by", {
            params: {
              manufacturer: values[0],
              ingredient: values[1],
              order: values[2],
            },
          })
          .then((res) => {
            this.soursLoading = false;
            this.lemonSours = res.data;
          })
          .catch((err) => {
            console.log(err.response);
            this.lemonSours = null;
            this.soursLoading = false;
            this.noContentsError = err.response.data.error_message;
          });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (
        !vm.$cookies.isKey("auth-header") &&
        vm.authRequiredRoutes.includes(from.name)
      ) {
        vm.isAuthenticated = false;
        vm.noticeMessage =
          "ログアウトしました。ログインなしでも楽しめるコンテンツがあります！";
        setTimeout(() => {
          vm.noticeMessage = "";
        }, 5000);
      }
    });
  },
  created() {
    this.fetchLemonSours();
    this.checkAuthenticated();
    this.markCurrentPage();
  },
  watch: {
    $route: "fetchLemonSours",
  },
};
</script>
