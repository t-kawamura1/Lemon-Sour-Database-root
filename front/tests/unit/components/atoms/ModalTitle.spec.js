import { mount } from "@vue/test-utils";
import ModalTitle from "@/components/atoms/ModalTitle";

describe("ModalTitle component test", () => {
  it("modalTitleText propsを表示する", () => {
    const wrapper = mount(ModalTitle, {
      propsData: {
        modalTitleText: "ゆるキャン登録",
      },
    });
    expect(wrapper.text()).toBe("ゆるキャン登録");
  });
});
