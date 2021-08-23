import { mount } from "@vue/test-utils";
import AppTitle from "@/components/molecules/AppTitle";

describe("AppTitle component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(AppTitle, {
      propsData: {
        sidebarIconText: "lemon",
      },
      stubs: ["font-awesome-icon"],
    });
  });

  it("sidebarIconText propsを子コンポーネントに渡している", () => {
    expect(wrapper.find(".icon-body").attributes().icon).toBe("lemon");
  });

  it("アプリタイトルをクリックすると、linkイベントとtoHomeがemitされる", async () => {
    await wrapper.find(".app-title").trigger("click");
    expect(wrapper.emitted().link).toBeTruthy();
    expect(wrapper.emitted().link[0][0]).toBe("toHome");
  });
});
