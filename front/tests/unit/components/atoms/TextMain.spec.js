import { mount } from "@vue/test-utils";
import TextMain from "@/components/atoms/TextMain";

describe("TextMain component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(TextMain, {
      propsData: {
        mainText: "飲酒量を記録できます",
      },
    });
  });

  it("MainText propsが表示される", () => {
    expect(wrapper.find(".text-main").text()).toBe("飲酒量を記録できます");
  });
});
