import { mount } from "@vue/test-utils";
import SourDisplay from "@/components/molecules/SourDisplay";

describe("SourDisplay component test", () => {
  it("sourName props, sourImage propsを子コンポーネントに渡している", () => {
    const wrapper = mount(SourDisplay, {
      propsData: {
        sourName: "ストロングゼロ",
        sourImage: "@/assets/test/ls_test_sample.png",
      },
    });
    expect(wrapper.find(".sour-display-name").text()).toBe("ストロングゼロ");
    expect(wrapper.find(".sour-display-image").attributes().src).toBe(
      "@/assets/test/ls_test_sample.png"
    );
  });
});
