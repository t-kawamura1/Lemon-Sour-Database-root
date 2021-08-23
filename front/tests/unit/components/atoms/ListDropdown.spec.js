import { mount } from "@vue/test-utils";
import ListDropdown from "@/components/atoms/ListDropdown";

describe("ListDropdown component test", () => {
  it("dropdownText propsを表示する", () => {
    const wrapper = mount(ListDropdown, {
      propsData: {
        dropdownText: "ゆるキャン登録",
      },
    });
    expect(wrapper.text()).toBe("ゆるキャン登録");
  });
});
