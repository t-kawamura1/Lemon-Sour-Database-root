import { mount } from "@vue/test-utils";
import SourFlags from "@/components/molecules/SourFlags";

describe("SourFlags component test", () => {
  it("flagAttributesにtrueを含む配列の数だけ、リストレンダリングする", () => {
    const wrapper = mount(SourFlags, {
      propsData: {
        flagAttributes: [
          ["砂糖ゼロ", true],
          ["甘さゼロ", true],
          ["糖分ゼロ", false],
        ],
      },
    });
    expect(wrapper.findAll(".zero-flag")).toHaveLength(2);
  });
});
