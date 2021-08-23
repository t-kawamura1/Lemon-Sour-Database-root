import { mount } from "@vue/test-utils";
import SourAttribute from "@/components/atoms/SourAttribute";

describe("SourAttribute component test", () => {
  it("flagSetの値を表示する", () => {
    const wrapper = mount(SourAttribute, {
      propsData: {
        attributeSet: ["度数", 9],
      },
    });
    expect(wrapper.find(".attr-name").text()).toBe("度数");
    expect(wrapper.find(".attr-value").text()).toBe("9");
  });
});
