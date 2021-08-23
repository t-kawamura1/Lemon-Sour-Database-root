<template>
  <div class="page-lemon-sour">
    <!-- DISPLAY PC -->
    <pc-lemon-sour v-if="$mq === 'pc'">
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
      <!-- SOUR-CONTAINER -->
      <template v-slot:sour-container>
        <sour-container>
          <template v-slot:sour-display>
            <!-- vue warnを出さないために、v-ifでaxiosのデータ取得を待っている。 -->
            <sour-display
              v-if="lemonSour.sour_image"
              :sour-name="lemonSour.name"
              :sour-image="lemonSour.sour_image.url"
            ></sour-display>
          </template>
          <template v-slot:sour-flags>
            <sour-flags :flag-attributes="sourFlagsAttributes"></sour-flags>
          </template>
          <template v-slot:sour-attributes>
            <sour-attributes
              :table-attributes="sourTableAttributes"
            ></sour-attributes>
          </template>
          <template v-slot:button-drink-today>
            <button-drink-today
              :button-drink-today-text="buttonDrinkToday"
              @linkAndPass="linkAndPassSour"
            ></button-drink-today>
          </template>
        </sour-container>
      </template>
      <!-- SIDE-BLANK -->
      <template v-slot:side-blank>
        <blank-side></blank-side>
      </template>
    </pc-lemon-sour>
    <!-- DISPLAY SP -->
    <sp-lemon-sour v-if="$mq === 'sp'">
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
      <!-- SOUR-CONTAINER -->
      <template v-slot:sour-container>
        <sour-container>
          <template v-slot:sour-display>
            <sour-display
              v-if="lemonSour.sour_image"
              :sour-name="lemonSour.name"
              :sour-image="lemonSour.sour_image.url"
            ></sour-display>
          </template>
          <template v-slot:sour-flags>
            <sour-flags :flag-attributes="sourFlagsAttributes"></sour-flags>
          </template>
          <template v-slot:sour-attributes>
            <sour-attributes
              :table-attributes="sourTableAttributes"
            ></sour-attributes>
          </template>
          <template v-slot:button-drink-today>
            <button-drink-today
              :button-drink-today-text="buttonDrinkToday"
              @linkAndPass="linkAndPassSour"
            ></button-drink-today>
          </template>
        </sour-container>
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
    </sp-lemon-sour>
  </div>
</template>

<script>
import axios from "axios";
import CommonData from "@/mixins/common-data";
import CommonMethods from "@/mixins/common-methods";
import PcLemonSour from "@/components/templates/pc/LemonSour";
import SpLemonSour from "@/components/templates/sp/LemonSour";
import TheModal from "@/components/organisms/TheModal";
import TheSidebar from "@/components/organisms/TheSidebar";
import TheHeader from "@/components/organisms/TheHeader";
import SourContainer from "@/components/organisms/SourContainer";
import TheFooter from "@/components/organisms/TheFooter";
import ModalUser from "@/components/molecules/ModalUser";
import AppTitle from "@/components/molecules/AppTitle";
import SidebarMenusAuthenticated from "@/components/molecules/SidebarMenusAuthenticated";
import SidebarMenusUnauthenticated from "@/components/molecules/SidebarMenusUnauthenticated";
import HeaderIconsAuthenticated from "@/components/molecules/HeaderIconsAuthenticated";
import HeaderIconsUnauthenticated from "@/components/molecules/HeaderIconsUnauthenticated";
import SourDisplay from "@/components/molecules/SourDisplay";
import SourFlags from "@/components/molecules/SourFlags";
import SourAttributes from "@/components/molecules/SourAttributes";
import FooterIcons from "@/components/molecules/FooterIcons";
import TheNotice from "@/components/atoms/TheNotice";
import BlankSide from "@/components/atoms/BlankSide";
import ButtonDrinkToday from "@/components/atoms/ButtonDrinkToday";

export default {
  mixins: [CommonData, CommonMethods],
  components: {
    PcLemonSour,
    SpLemonSour,
    TheModal,
    TheSidebar,
    TheHeader,
    SourContainer,
    TheFooter,
    ModalUser,
    SidebarMenusAuthenticated,
    SidebarMenusUnauthenticated,
    HeaderIconsAuthenticated,
    HeaderIconsUnauthenticated,
    SourDisplay,
    SourFlags,
    SourAttributes,
    FooterIcons,
    AppTitle,
    TheNotice,
    BlankSide,
    ButtonDrinkToday,
  },
  data() {
    return {
      lemonSour: {},
      sourFlagsAttributes: [["糖類ゼロ"], ["甘味料ゼロ"]],
      sourTableAttributes: [
        ["メーカー"],
        ["アルコール度数 (%)"],
        ["純アルコール量 (g)"],
        ["カロリー (kcal)"],
        ["果汁 (%)"],
      ],
      buttonDrinkToday: "今日はこれを飲む！",
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
    linkAndPassSour() {
      this.$router.push({
        name: "calculation",
        params: { lemonSour: this.lemonSour },
      });
    },
  },
  created() {
    axios
      .get(`/api/v1/lemon_sours/${this.$route.params.id}`)
      .then((res) => {
        this.lemonSour = res.data;
        this.sourFlagsAttributes[0].push(this.lemonSour.zero_sugar);
        this.sourFlagsAttributes[1].push(this.lemonSour.zero_sweetener);
        this.sourTableAttributes[0].push(this.lemonSour.manufacturer);
        this.sourTableAttributes[1].push(this.lemonSour.alcohol_content);
        this.sourTableAttributes[2].push(this.lemonSour.pure_alcohol);
        this.sourTableAttributes[3].push(this.lemonSour.calories);
        this.sourTableAttributes[4].push(this.lemonSour.fruit_juice);
      })
      .catch((err) => {
        console.log(err);
      });
    this.checkAuthenticated();
    this.markCurrentPage();
  },
};
</script>
