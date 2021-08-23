import { mount } from "@vue/test-utils";
import ZeroFlag from "@/components/atoms/ZeroFlag";

describe("ZeroFlag component test", () => {
  it("flagSet[1]がtrueの場合、ZeroFlagコンポーネントが存在し、flagSet[0]の値が表示される", () => {
    const wrapper = mount(ZeroFlag, {
      propsData: {
        flagSet: ["人工甘味料ゼロ", true],
      },
    });
    expect(wrapper.find(".zero-flag").exists()).toBe(true);
    expect(wrapper.text()).toBe("人工甘味料ゼロ");
  });

  it("flagSet[1]がfalseの場合、ZeroFlagコンポーネントは存在しない", () => {
    const wrapper = mount(ZeroFlag, {
      propsData: {
        flagSet: ["人工甘味料ゼロ", false],
      },
    });
    expect(wrapper.find(".zero-flag").exists()).toBe(false);
  });
});
