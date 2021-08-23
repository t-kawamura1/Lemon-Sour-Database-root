import { mount } from "@vue/test-utils";
import UserEdit from "@/components/molecules/UserEdit";

describe("UserEdit component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(UserEdit, {
      propsData: {
        editContents: [
          [
            [
              "ユーザー名",
              ["text", "ユーザー名", "name", "ストロングおじさん"],
            ],
            [
              "メルアド",
              ["email", "メールアドレス", "email", "strong@sour.com"],
            ],
            [
              "変更のとき必須",
              ["password", "現在のパスワード", "current_password"],
            ],
            [
              "変える場合入力",
              ["password", "新しいパスワード(8文字以上)", "password"],
            ],
          ],
          "登録",
          "アカウント削除だ！",
        ],
        errorMessages: ["だめだ", "セキュアじゃない", "やりなおせ"],
      },
    });
  });

  it("errorMessagesの要素の数だけ、error-messageコンポーネントをリストレンダリングする", () => {
    expect(wrapper.findAll(".error-message")).toHaveLength(3);
  });

  it("editContents[0]の中の各配列[0]の数だけ、input-labelコンポーネントをリストレンダリングする", () => {
    expect(wrapper.findAll(".input-label")).toHaveLength(4);
  });

  it("editContents[0]の中の各配列[1]の数だけ、input-textコンポーネントをリストレンダリングする", () => {
    expect(wrapper.findAll(".input-text")).toHaveLength(4);
  });

  it("editContents[1]を子コンポーネントに渡している", () => {
    expect(wrapper.find(".button-user-submit").text()).toBe("登録");
  });

  it("editContents[2]を表示しており、それをクリックするとmodalイベントとeditContents[2]がemitされる", async () => {
    expect(wrapper.find(".user-edit-delete").text()).toBe("アカウント削除だ！");
    await wrapper.find(".user-edit-delete").trigger("click");
    expect(wrapper.emitted().modal).toBeTruthy();
    expect(wrapper.emitted().modal[0][0]).toStrictEqual("アカウント削除だ！");
  });

  it("input-textに入力されるとuserDataが更新され、submitボタンを押すとsubmitUserイベントとそのuserDataがemitされる", async () => {
    const nameInput = wrapper.findAll("input").at(0);
    const emailInput = wrapper.findAll("input").at(1);
    const currentPasswordInput = wrapper.findAll("input").at(2);
    const passwordInput = wrapper.findAll("input").at(3);
    await nameInput.setValue("大垣千明");
    await emailInput.setValue("sima@rin.com");
    await currentPasswordInput.setValue("aoi@inuyama3");
    await passwordInput.setValue("newaoi@inuyama3");
    nameInput.vm.$emit("input", nameInput.element.value);
    emailInput.vm.$emit("input", emailInput.element.value);
    currentPasswordInput.vm.$emit("input", currentPasswordInput.element.value);
    passwordInput.vm.$emit("input", passwordInput.element.value);
    wrapper.vm.userData.name = nameInput.element.value;
    wrapper.vm.userData.email = emailInput.element.value;
    wrapper.vm.userData.current_password = currentPasswordInput.element.value;
    wrapper.vm.userData.password = passwordInput.element.value;
    await wrapper.find(".button-user-submit").trigger("click");
    await wrapper.find(".user-edit-form").trigger("submit");
    expect(wrapper.emitted().submitUser).toBeTruthy();
    expect(wrapper.emitted().submitUser[0][0]).toStrictEqual({
      name: "大垣千明",
      email: "sima@rin.com",
      current_password: "aoi@inuyama3",
      password: "newaoi@inuyama3",
    });
  });
});
