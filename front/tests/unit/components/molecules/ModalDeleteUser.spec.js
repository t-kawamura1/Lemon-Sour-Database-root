import { mount } from "@vue/test-utils";
import ModalDeleteUser from "@/components/molecules/ModalDeleteUser";

describe("ModalDeleteUser component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ModalDeleteUser, {
      propsData: {
        modalDeleteUserContents: [
          "アカウント削除",
          "ほんまにええか？",
          "ええで",
        ],
      },
      stubs: ["font-awesome-icon"],
    });
  });

  it("button-closeがクリックされると、modalイベントとmodalDeleteUserContents[0]をemitする", async () => {
    await wrapper.find(".button-close").trigger("click");
    expect(wrapper.emitted().modal).toBeTruthy();
    expect(wrapper.emitted().modal[0][0]).toBe("アカウント削除");
  });

  it("modalDeleteUserContents propsの[0]と[2]を子コンポーネントに渡している", () => {
    expect(wrapper.find(".modal-title").text()).toBe("アカウント削除");
    expect(wrapper.find(".button-user-submit").text()).toBe("ええで");
  });

  it("modalDeleteUserContents propsの[1]を表示している", () => {
    expect(wrapper.find(".modal-delete-user-message").text()).toBe(
      "ほんまにええか？"
    );
  });

  it("submitボタンを押すとsubmitUserイベントがemitされる", async () => {
    await wrapper.find(".modal-delete-user-button-submit").trigger("click");
    wrapper.vm.$emit("submitUser");
    expect(wrapper.emitted().submitUser).toBeTruthy();
  });
});
