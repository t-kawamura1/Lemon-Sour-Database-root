<template>
  <div class="page-user">
    <!-- DISPLAY PC -->
    <pc-user v-if="$mq === 'pc'">
      <!-- MODAL -->
      <template v-slot:modal>
        <the-modal>
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
      <!-- USER-CONTAINER -->
      <template v-slot:user-container>
        <user-container>
          <template v-slot:user-heading>
            <the-heading :heading-text="heading"></the-heading>
          </template>
          <template v-slot:user-image-edit>
            <user-image-edit
              v-if="userImageEditContents.image_url"
              :image-edit-contents="userImageEditContents"
              :error-messages="userImageEditErrors"
              @submitUserImage="editUserImage"
            ></user-image-edit>
          </template>
          <template v-slot:user-edit>
            <user-edit
              :edit-contents="userEditContents"
              :error-messages="userEditErrors"
              @submitUser="editUser"
              @modal="openModal"
            ></user-edit>
          </template>
        </user-container>
      </template>
      <!-- SIDE-BLANK -->
      <template v-slot:side-blank>
        <blank-side></blank-side>
      </template>
    </pc-user>
    <!-- DISPLAY SP -->
    <sp-user v-if="$mq === 'sp'">
      <!-- MODAL -->
      <template v-slot:modal>
        <the-modal>
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
      <!-- USER-CONTAINER -->
      <template v-slot:user-container>
        <user-container>
          <template v-slot:user-heading>
            <the-heading :heading-text="heading"></the-heading>
          </template>
          <template v-slot:user-image-edit>
            <user-image-edit
              v-if="userImageEditContents.image_url"
              :image-edit-contents="userImageEditContents"
              :error-messages="userImageEditErrors"
              @submitUserImage="editUserImage"
            ></user-image-edit>
          </template>
          <template v-slot:user-edit>
            <user-edit
              :edit-contents="userEditContents"
              :error-messages="userEditErrors"
              @submitUser="editUser"
              @modal="openModal"
            ></user-edit>
          </template>
        </user-container>
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
    </sp-user>
  </div>
</template>

<script>
import axios from "axios";
import CommonData from "@/mixins/common-data";
import CommonMethods from "@/mixins/common-methods";
import PcUser from "@/components/templates/pc/User";
import SpUser from "@/components/templates/sp/User";
import TheModal from "@/components/organisms/TheModal";
import TheSidebar from "@/components/organisms/TheSidebar";
import TheHeader from "@/components/organisms/TheHeader";
import UserContainer from "@/components/organisms/UserContainer";
import TheFooter from "@/components/organisms/TheFooter";
import ModalDeleteUser from "@/components/molecules/ModalDeleteUser";
import AppTitle from "@/components/molecules/AppTitle";
import SidebarMenusAuthenticated from "@/components/molecules/SidebarMenusAuthenticated";
import HeaderIconsAuthenticated from "@/components/molecules/HeaderIconsAuthenticated";
import UserImageEdit from "@/components/molecules/UserImageEdit";
import UserEdit from "@/components/molecules/UserEdit";
import FooterIcons from "@/components/molecules/FooterIcons";
import TheNotice from "@/components/atoms/TheNotice";
import TheHeading from "@/components/atoms/TheHeading";
import BlankSide from "@/components/atoms/BlankSide";

export default {
  mixins: [CommonData, CommonMethods],
  components: {
    PcUser,
    SpUser,
    TheModal,
    TheSidebar,
    TheHeader,
    UserContainer,
    TheFooter,
    ModalDeleteUser,
    SidebarMenusAuthenticated,
    HeaderIconsAuthenticated,
    UserImageEdit,
    UserEdit,
    FooterIcons,
    AppTitle,
    TheNotice,
    TheHeading,
    BlankSide,
  },
  props: {
    currentUser: Object,
  },
  data() {
    return {
      heading: "プロフィール編集",
      userImageEditErrors: [],
      userEditErrors: [],
      userImageEditContents: {
        icon: "image",
        image_url: this.currentUser.user_image,
        button: "画像の変更を保存",
      },
      userEditContents: [
        [
          ["ユーザー名", ["text", "ユーザー名", "name", this.currentUser.name]],
          [
            "メールアドレス",
            ["email", "メールアドレス", "email", this.currentUser.email],
          ],
          [
            "画像の変更以外は必須",
            ["password", "現在のパスワード", "current_password"],
          ],
          [
            "新しいパスワード（変更する場合のみ）",
            ["password", "新しいパスワード(8文字以上)", "password"],
          ],
        ],
        "登録",
        "ユーザーアカウント削除",
      ],
      userDeleteContents: [
        "ユーザーアカウント削除",
        "本当に削除しますか？",
        "削除する",
      ],
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
        case this.authenticatedSidebarMenus[1].name:
        case this.footerIcons[1][0]:
          this.$router.push("/calculation");
          break;
        case this.footerIcons[2][0]:
        case this.authenticatedSidebarMenus[2].name:
          this.$router.push(`/drinking_records/${this.userId}`);
          break;
        case this.authenticatedUserFunctions[0]:
          break;
      }
    },
    editUserImage(inputImage) {
      const formData = new FormData();
      formData.append("user_image", inputImage);
      this.decryptHeaders();
      axios
        .put("/api/v1/auth", formData, {
          headers: this.authHeader,
        })
        .then((res) => {
          this.userImageEditErrors = [];
          this.authHeader = { "access-token": "", client: "", uid: "" };
          this.userImageEditContents.image_url = res.data.data.user_image;
          this.noticeMessage = "画像の変更を受け付けました。";
          setTimeout(() => {
            this.noticeMessage = "";
          }, 5000);
        })
        .catch((err) => {
          console.log(err.response);
          this.userEditErrors = err.response.data.errors.full_messages;
        });
    },
    editUser(inputData) {
      this.decryptHeaders();
      axios
        .put("/api/v1/auth", inputData, {
          headers: this.authHeader,
        })
        .then((res) => {
          console.log(res);
          this.userEditErrors = [];
          this.authHeader = { "access-token": "", client: "", uid: "" };
          this.noticeMessage = "変更を受け付けました。";
          setTimeout(() => {
            this.noticeMessage = "";
          }, 5000);
        })
        .catch((err) => {
          console.log(err.response);
          this.userEditErrors = err.response.data.errors.full_messages;
        });
    },
    deleteUser() {
      this.decryptHeaders();
      axios
        .delete("/api/v1/auth", {
          headers: this.authHeader,
        })
        .then(() => {
          this.$cookies.remove("auth-header");
          this.userId = "";
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  created() {
    this.userId = this.currentUser.id;
    this.markCurrentPage();
  },
};
</script>
