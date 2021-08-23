<template>
  <div class="page-home">
    <!-- DISPLAY PC -->
    <pc-home v-if="$mq === 'pc'">
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
      <!-- SIDEBAR -->
      <template v-slot:sidebar>
        <home-sidebar>
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
        </home-sidebar>
      </template>
      <!-- NOTICE -->
      <template v-slot:notice>
        <the-notice
          :notice-text="noticeMessage"
          v-if="noticeMessage.length !== 0"
        ></the-notice>
      </template>
      <!-- HOME-CONTAINER -->
      <template v-slot:pc-home-container>
        <pc-home-container>
          <template v-slot:pc-home-title>
            <pc-home-title
              :pc-home-title-icon="homeTitleIconText"
              :home-title-openings="homeTitleOpeningTexts"
            ></pc-home-title>
          </template>
          <template v-slot:pc-home-function-items>
            <pc-home-function-items
              :function-items-heading="functionItemsHeadingText"
              :function-items="functionItemsSet"
              @link="toPageView"
              @modal="openModal"
            ></pc-home-function-items>
          </template>
        </pc-home-container>
      </template>
    </pc-home>
    <!-- DISPLAY SP -->
    <sp-home v-if="$mq === 'sp'">
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
      <!-- HOME-CONTAINER -->
      <template v-slot:sp-home-container>
        <sp-home-container>
          <template v-slot:sp-home-title>
            <sp-home-title
              :home-title-openings="homeTitleOpeningTexts"
            ></sp-home-title>
          </template>
          <template v-slot:sp-home-function-items>
            <sp-home-function-items
              :function-items-heading="functionItemsHeadingText"
              :function-items="functionItemsSet"
              @link="toPageView"
              @modal="openModal"
            ></sp-home-function-items>
          </template>
        </sp-home-container>
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
    </sp-home>
  </div>
</template>

<script>
import CommonData from "@/mixins/common-data";
import CommonMethods from "@/mixins/common-methods";
import PcHome from "@/components/templates/pc/Home";
import SpHome from "@/components/templates/sp/Home";
import TheModal from "@/components/organisms/TheModal";
import HomeSidebar from "@/components/organisms/pc/HomeSidebar";
import TheHeader from "@/components/organisms/TheHeader";
import PcHomeContainer from "@/components/organisms/pc/HomeContainer";
import SpHomeContainer from "@/components/organisms/sp/HomeContainer";
import TheFooter from "@/components/organisms/TheFooter";
import ModalUser from "@/components/molecules/ModalUser";
import AppTitle from "@/components/molecules/AppTitle";
import SidebarMenusAuthenticated from "@/components/molecules/SidebarMenusAuthenticated";
import SidebarMenusUnauthenticated from "@/components/molecules/SidebarMenusUnauthenticated";
import HeaderIconsAuthenticated from "@/components/molecules/HeaderIconsAuthenticated";
import HeaderIconsUnauthenticated from "@/components/molecules/HeaderIconsUnauthenticated";
import PcHomeTitle from "@/components/molecules/pc/HomeTitle";
import SpHomeTitle from "@/components/molecules/sp/HomeTitle";
import PcHomeFunctionItems from "@/components/molecules/pc/HomeFunctionItems";
import SpHomeFunctionItems from "@/components/molecules/sp/HomeFunctionItems";
import FooterIcons from "@/components/molecules/FooterIcons";
import TheNotice from "@/components/atoms/TheNotice";

export default {
  mixins: [CommonData, CommonMethods],
  components: {
    PcHome,
    SpHome,
    TheModal,
    HomeSidebar,
    TheHeader,
    PcHomeContainer,
    SpHomeContainer,
    TheFooter,
    ModalUser,
    SidebarMenusAuthenticated,
    SidebarMenusUnauthenticated,
    HeaderIconsAuthenticated,
    HeaderIconsUnauthenticated,
    PcHomeTitle,
    SpHomeTitle,
    PcHomeFunctionItems,
    SpHomeFunctionItems,
    FooterIcons,
    AppTitle,
    TheNotice,
  },
  data() {
    return {
      homeTitleIconText: "lemon",
      homeTitleOpeningTexts: [
        "お気に入りのレモンサワーをみつけて",
        "健康に楽しく飲もう！",
      ],
      functionItemsHeadingText: "楽しく飲める、3つの機能",
      functionItemsSet: [
        {
          name: "市販レモンサワーデータベース",
          icon: "database",
          text: "市販のRTDレモンサワーをデーターベース化。メーカーや成分から、お気に入りのレモンサワーをみつけよう。",
          button: "レモンサワーをみつける",
        },
        {
          name: "アルコール摂取量計算",
          icon: "calculator",
          text: "アルコール摂取量は健康のバロメーター。今日飲んだ量をチェックして、健康的な飲酒量をみつけよう。",
          button: "アルコール量を計算する",
        },
        {
          name: "摂取量記録カレンダー",
          icon: "calendar-alt",
          text: "計算した記録はカレンダーに反映。毎日の飲酒量がひと目でわかる（この機能の使用にはユーザー登録が必要です）。",
          button: "ユーザー登録",
        },
      ],
    };
  },
  methods: {
    toPageView(destination) {
      switch (destination) {
        case "toHome":
        case this.headerIcons[0]:
          break;
        case "toLemonSours":
        case this.unauthenticatedSidebarMenus[0].name:
        case this.authenticatedSidebarMenus[0].name:
        case this.footerIcons[0][0]:
          this.$router.push("/lemon_sours");
          break;
        case "toCalculation":
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
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.$cookies.isKey("auth-header") && from.name == "user") {
        vm.isAuthenticated = false;
        vm.noticeMessage =
          "アカウントの削除に成功しました。またのご利用をお待ちしております。";
        setTimeout(() => {
          vm.noticeMessage = "";
        }, 5000);
      } else if (
        vm.$cookies.isKey("auth-header") &&
        from.name == "userPasswordReset"
      ) {
        vm.isAuthenticated = false;
        vm.noticeMessage = "ログインしておきました。このままお楽しみください！";
        setTimeout(() => {
          vm.noticeMessage = "";
        }, 5000);
      }
    });
  },
  created() {
    this.checkAuthenticated();
    this.markCurrentPage();
  },
};
</script>
