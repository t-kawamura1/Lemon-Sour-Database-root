import { mount } from "@vue/test-utils";
import SourImage from "@/components/atoms/SourImage";

describe("SourImage component test", () => {
  it("imgタグのsrc属性には画像データのパスが入る", () => {
    const wrapper = mount(SourImage, {
      propsData: {
        sourImageUrl: "@/assets/test/ls_test_sample.png",
      },
    });
    expect(wrapper.find("img").attributes("src")).toBe(
      "@/assets/test/ls_test_sample.png"
    );
  });
});
