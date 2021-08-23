export default {
  data() {
    return {
      showUserRegistrationModal: false,
      showUserLoginModal: false,
      showUserDeleteModal: false,
      noticeMessage: "",
      userModalErrors: [],
      userModalResetErrors: [],
      userRegistrationContents: [
        "ユーザー登録",
        [
          ["text", "ユーザー名", "name"],
          ["email", "メールアドレス", "email"],
          ["password", "パスワード(8文字以上)", "password"],
        ],
        "登録",
      ],
      userLoginContents: [
        "ログイン",
        [
          ["email", "メールアドレス", "email"],
          ["password", "パスワード(8文字以上)", "password"],
        ],
        "ログイン",
        "パスワードリセット",
      ],
      authenticatedUserFunctions: ["プロフィール編集", "ログアウト"],
      unauthenticatedUserFunctions: ["ユーザー登録", "ログイン"],
      authHeader: {
        "access-token": "",
        client: "",
        uid: "",
      },
      authRequiredRoutes: ["drinkingRecord", "user"],
      isAuthenticated: false,
      userId: "",
      authenticatedSidebarMenus: [
        { name: ["市販レモンサワー", "データベース"] },
        { name: ["アルコール摂取量", "計算"] },
        { name: ["摂取量記録", "カレンダー"] },
        { name: ["ユーザー情報", "ログアウト"], dropdown: "enabled" },
      ],
      unauthenticatedSidebarMenus: [
        { name: ["市販レモンサワー", "データベース"] },
        { name: ["アルコール摂取量", "計算"] },
        { name: ["摂取量記録", "カレンダー"] },
        { name: ["ユーザー登録", "ログイン"], dropdown: "enabled" },
      ],
      sidebarIcon: "lemon",
      headerIcons: ["lemon", "address-card"],
      footerIcons: [
        ["database", "LSDB"],
        ["calculator", "アルコール量計算"],
        ["calendar-alt", "カレンダー"],
      ],
      currentPageName: "",
    };
  },
};
