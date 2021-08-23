import { mount } from "@vue/test-utils";
import SidebarMenu from "@/components/atoms/SidebarMenu";

describe("SidebarMenu component test", () => {
  it("menuNameText propsを表示する", () => {
    const wrapper = mount(SidebarMenu, {
      propsData: {
        menuNameText: ["いちごサワー", "データベース"],
      },
    });
    expect(wrapper.text()).toBe("いちごサワー データベース");
  });
});
