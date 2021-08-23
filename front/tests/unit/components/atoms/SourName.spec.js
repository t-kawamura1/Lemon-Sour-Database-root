import { mount } from "@vue/test-utils";
import SourName from "@/components/atoms/SourName";

describe("SourName component test", () => {
  describe("sourNameTextに空白がない場合", () => {
    const wrapper = mount(SourName, {
      propsData: {
        sourNameText: "テスト酒場のレモンサワー",
      },
    });
    it("表示されるsourNameは１つだけである", () => {
      expect(wrapper.findAll(".sour-name-line")).toHaveLength(1);
      expect(wrapper.find(".sour-name-line").text()).toBe(
        "テスト酒場のレモンサワー"
      );
    });
  });

  describe("sourNameTextに空白がある場合", () => {
    const wrapper = mount(SourName, {
      propsData: {
        sourNameText: "テスト堂 カミソリレモン",
      },
    });
    it("空白でテキストが改行されて表示される", () => {
      expect(wrapper.findAll(".sour-name-line")).toHaveLength(2);
      expect(wrapper.findAll(".sour-name-line").at(0).text()).toBe("テスト堂");
      expect(wrapper.findAll(".sour-name-line").at(1).text()).toBe(
        "カミソリレモン"
      );
    });
  });
});
