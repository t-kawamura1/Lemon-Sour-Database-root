import { mount } from "@vue/test-utils";
import InputLabel from "@/components/atoms/InputLabel";

describe("InputLabel component test", () => {
  it("labelText propsを表示する", () => {
    const wrapper = mount(InputLabel, {
      propsData: {
        labelText: "サッポロ黒ラベル",
      },
    });
    expect(wrapper.text()).toBe("サッポロ黒ラベル");
  });
});
