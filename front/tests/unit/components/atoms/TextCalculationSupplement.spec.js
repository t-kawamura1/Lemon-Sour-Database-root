import { mount } from "@vue/test-utils";
import TextCalculationSupplement from "@/components/atoms/TextCalculationSupplement";

describe("TextCalculationSupplement component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(TextCalculationSupplement, {
      propsData: {
        supplementText: "飲み過ぎはあかんよ",
      },
    });
  });

  it("supplementText propsが表示される", () => {
    expect(wrapper.find(".text-calculation-supplement").text()).toBe(
      "飲み過ぎはあかんよ"
    );
  });
});
