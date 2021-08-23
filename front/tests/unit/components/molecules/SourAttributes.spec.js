import { mount } from "@vue/test-utils";
import SourAttributes from "@/components/molecules/SourAttributes";

describe("SourAttributes component test", () => {
  it("tableAttributes内の配列の数だけ、リストレンダリングする", () => {
    const wrapper = mount(SourAttributes, {
      propsData: {
        tableAttributes: [
          ["度数", 7],
          ["カロリー", 45],
        ],
      },
    });
    expect(wrapper.findAll(".sour-attribute")).toHaveLength(2);
  });
});
