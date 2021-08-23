import { mount } from "@vue/test-utils";
import PasswordReset from "@/components/molecules/PasswordReset";

describe("PasswordReset component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(PasswordReset, {
      propsData: {
        passwordResetContents: [
          [
            ["password", "シン・パスワード(8文字以上)", "password"],
            ["password", "もう一回！", "password_confirmation"],
          ],
          "登録",
        ],
        errorMessages: ["エラーの数だけ", "強くなれるよ"],
      },
    });
  });

  it("errorMessagesの要素の数だけ、error-messageコンポーネントをリストレンダリングする", () => {
    expect(wrapper.findAll(".error-message")).toHaveLength(2);
  });

  it("passwordResetContents[0]の要素の数（配列の数）だけ、input-textコンポーネントをリストレンダリングする", () => {
    expect(wrapper.findAll(".input-text")).toHaveLength(2);
  });

  it("modalUserContents props[1]を子コンポーネントに渡している", () => {
    expect(wrapper.find(".button-user-submit").exists()).toBeTruthy();
  });

  it("input-textに入力されるとpasswordSetが更新され、submitボタンを押すとsubmitUserイベントとそのpasswordSetがemitされる", async () => {
    const passwordInput = wrapper.findAll("input").at(0);
    const passwordConfirmationInput = wrapper.findAll("input").at(1);
    await passwordInput.setValue("newaoi@inuyama3");
    await passwordConfirmationInput.setValue("newaoi@inuyama3");
    passwordInput.vm.$emit("input", passwordInput.element.value);
    passwordConfirmationInput.vm.$emit(
      "input",
      passwordConfirmationInput.element.value
    );
    wrapper.vm.passwordSet.password = passwordInput.element.value;
    wrapper.vm.passwordSet.password_confirmation =
      passwordConfirmationInput.element.value;
    await wrapper.find(".button-user-submit").trigger("click");
    await wrapper.find(".password-reset-form").trigger("submit");
    expect(wrapper.emitted().submitUser).toBeTruthy();
    expect(wrapper.emitted().submitUser[0][0]).toStrictEqual({
      password: "newaoi@inuyama3",
      password_confirmation: "newaoi@inuyama3",
    });
  });
});
