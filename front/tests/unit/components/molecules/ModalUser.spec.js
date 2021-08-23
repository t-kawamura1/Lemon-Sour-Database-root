import { mount } from "@vue/test-utils";
import ModalUser from "@/components/molecules/ModalUser";

describe("ModalUser component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ModalUser, {
      propsData: {
        modalUserContents: [
          "ゆるキャン登録",
          [
            ["text", "しまりん", "name"],
            ["email", "nadesiko@yuno.com", "email"],
            ["password", "inuko", "password"],
          ],
          "入部",
        ],
        errorMessages: ["だめだ", "セキュアじゃない", "やりなおせ"],
        errorMessagesReset: ["そんなメールアドレスは知らん"],
      },
      stubs: ["font-awesome-icon"],
    });
  });

  describe("ユーザー登録モーダルの場合", () => {
    it("errorMessagesの要素の数だけ、error-messageコンポーネントをリストレンダリングする", () => {
      expect(wrapper.findAll(".modal-user-error-message")).toHaveLength(3);
    });

    it("modalUserContents[1]の要素の数（配列の数）だけ、input-textコンポーネントをリストレンダリングする", () => {
      expect(wrapper.findAll(".modal-user-input-text")).toHaveLength(3);
    });

    it("button-closeがクリックされると、modalイベントとmodalUserContents[0]をemitする", async () => {
      await wrapper.find(".button-close").trigger("click");
      expect(wrapper.emitted().modal).toBeTruthy();
      expect(wrapper.emitted().modal[0][0]).toBe("ゆるキャン登録");
    });

    it("modalUserContents propsの[0]と[2]を子コンポーネントに渡している", () => {
      expect(wrapper.find(".modal-title").exists()).toBeTruthy();
      expect(wrapper.find(".modal-user-button-submit").exists()).toBeTruthy();
    });

    it("input-textに入力されるとuserDataが更新され、submitボタンを押すとsubmitUserイベントとそのuserDataがemitされる", async () => {
      const nameInput = wrapper.findAll(".modal-user-input-text").at(0);
      const emailInput = wrapper.findAll(".modal-user-input-text").at(1);
      const passwordInput = wrapper.findAll(".modal-user-input-text").at(2);
      await nameInput.setValue("大垣千明");
      await emailInput.setValue("sima@rin.com");
      await passwordInput.setValue("aoi@inuyama3");
      nameInput.vm.$emit("input", nameInput.element.value);
      emailInput.vm.$emit("input", emailInput.element.value);
      passwordInput.vm.$emit("input", passwordInput.element.value);
      wrapper.vm.userData.name = nameInput.element.value;
      wrapper.vm.userData.email = emailInput.element.value;
      wrapper.vm.userData.password = passwordInput.element.value;
      await wrapper.find(".modal-user-button-submit").trigger("click");
      await wrapper.find(".modal-user-form").trigger("submit");
      expect(wrapper.emitted().submitUser).toBeTruthy();
      expect(wrapper.emitted().submitUser[0][0]).toStrictEqual({
        name: "大垣千明",
        email: "sima@rin.com",
        password: "aoi@inuyama3",
      });
    });
  });

  describe("ログインモーダルの場合", () => {
    beforeEach(() => {
      wrapper.setProps({
        modalUserContents: [
          "ログイン",
          [
            ["email", "nadesiko@yuno.com", "email"],
            ["password", "inuko", "password"],
          ],
          "ログイン",
        ],
      });
    });

    it("errorMessagesResetの要素の数だけ、error-messageコンポーネントをリストレンダリングする", () => {
      expect(wrapper.findAll(".modal-user-error-message-reset")).toHaveLength(
        1
      );
    });

    it("modalUserContents[1]の要素の数（配列の数）だけ、input-textコンポーネントをリストレンダリングする", () => {
      expect(wrapper.findAll(".modal-user-input-text")).toHaveLength(2);
    });

    it("新規登録ボタンを押すと、replaceイベントがemitされる", () => {
      wrapper.find(".modal-user-replace-modal").trigger("click");
      expect(wrapper.emitted().replace).toBeTruthy;
    });

    describe("パスワードリセットについて", () => {
      let passwordForgot;
      beforeEach(() => {
        passwordForgot = wrapper.find(".modal-user-forgot-password");
      });

      it("パスワードを忘れた場合の文章（ボタン）が表示されている", () => {
        expect(passwordForgot).toBeTruthy;
      });

      it("それをクリックするとリセットフォームが表示される。", async () => {
        await passwordForgot.trigger("click");
        expect(wrapper.find(".modal-user-form-reset")).toBeTruthy;
      });

      it("そのフォームにメールアドレスを入力してボタンを押すと、resetPasswordイベントと入力されたメールアドレスがemitされる", async () => {
        await passwordForgot.trigger("click");
        const emailInput = wrapper.find(".modal-user-input-text-reset");
        await emailInput.setValue("wasureta@shanai.com");
        emailInput.vm.$emit("input", emailInput.element.value);
        wrapper.vm.userEmailForReset = emailInput.element.value;
        await wrapper.find(".modal-user-button-submit-reset").trigger("click");
        await wrapper.find(".modal-user-form-reset").trigger("submit");
        expect(wrapper.emitted().resetPassword).toBeTruthy();
        expect(wrapper.emitted().resetPassword[0][0]).toStrictEqual(
          "wasureta@shanai.com"
        );
      });
    });
  });
});
