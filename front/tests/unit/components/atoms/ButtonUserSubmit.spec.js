import { mount } from "@vue/test-utils";
import ButtonUserSubmit from "@/components/atoms/ButtonUserSubmit";

describe("ButtonUserSubmit component test", () => {
  it("userSubmitText propsを表示する", () => {
    const wrapper = mount(ButtonUserSubmit, {
      propsData: {
        userSubmitText: "登録する",
      },
    });
    expect(wrapper.text()).toBe("登録する");
  });
});
