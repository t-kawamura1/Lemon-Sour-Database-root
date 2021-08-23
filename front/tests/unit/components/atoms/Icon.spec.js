import { mount } from "@vue/test-utils";
import Icon from "@/components/atoms/Icon";

describe("Icon component test", () => {
  it("font-awesome-iconのicon属性にはiconText propsが入る", () => {
    const wrapper = mount(Icon, {
      propsData: {
        iconText: "lemon",
      },
      stubs: ["font-awesome-icon"],
    });
    expect(wrapper.find("font-awesome-icon-stub").attributes("icon")).toBe(
      "lemon"
    );
  });
});
