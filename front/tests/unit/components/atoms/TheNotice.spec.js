import { mount } from "@vue/test-utils";
import TheNotice from "@/components/atoms/TheNotice";

describe("TheNotice component test", () => {
  it("noticeText propsを表示する", () => {
    const wrapper = mount(TheNotice, {
      propsData: {
        noticeText: "テストオールグリーン！",
      },
    });
    expect(wrapper.text()).toBe("テストオールグリーン！");
  });
});
