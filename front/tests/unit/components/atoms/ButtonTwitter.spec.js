import { mount } from "@vue/test-utils";
import ButtonTwitter from "@/components/atoms/ButtonTwitter";

describe("ButtonTwitter component test", () => {
  it("リンク先のURLにpureAlc propsを含む", () => {
    const wrapper = mount(ButtonTwitter, {
      propsData: {
        pureAlc: "39.9",
      },
      stubs: ["font-awesome-icon"],
    });
    expect(wrapper.find(".button-twitter").attributes().href).toContain("39.9");
  });
});
