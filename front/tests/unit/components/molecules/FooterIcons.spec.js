import { mount } from "@vue/test-utils";
import FooterIcons from "@/components/molecules/FooterIcons";

describe("FooterIcons component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(FooterIcons, {
      propsData: {
        footerIcons: [
          ["database", "LSDB"],
          ["calculator", "アルコール量計算"],
          ["calendar-alt", "摂取量記録"],
        ],
      },
      stubs: ["font-awesome-icon"],
    });
  });

  it("footerIcons内の要素の数（配列の数）だけ、アイコンをリストレンダリングする", () => {
    expect(wrapper.findAll(".icon")).toHaveLength(3);
  });

  it("footerIcons内の各配列の数だけ、アイコンタイトルをリストレンダリングし、そのテキストを表示する", () => {
    expect(wrapper.findAll(".footer-icon-title")).toHaveLength(3);
    expect(wrapper.findAll(".footer-icon-title").at(0).text()).toBe("LSDB");
  });

  it("どれか一つアイコンをクリックすると、linkイベントとそのアイコン名がemitされる", async () => {
    await wrapper.findAll(".footer-icon").at(0).trigger("click");
    expect(wrapper.emitted().link).toBeTruthy();
    expect(wrapper.emitted().link[0][0]).toStrictEqual("database");
  });
});
