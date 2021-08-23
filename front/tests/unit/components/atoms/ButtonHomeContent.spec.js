import { mount } from "@vue/test-utils";
import ButtonHomeContent from "@/components/atoms/ButtonHomeContent";

describe("ButtonHomeContent component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ButtonHomeContent, {
      propsData: {
        homeContentText: "この機能を使う",
      },
    });
  });

  it("homeContentText propsを受け取って表示する", () => {
    expect(wrapper.find(".button-home-content").text()).toBe("この機能を使う");
  });

  it("ボタンをクリックすると、linkOrModalイベントと受け取ったpropsの値がemitされる", async () => {
    await wrapper.find(".button-home-content").trigger("click");
    expect(wrapper.emitted().linkOrModal).toBeTruthy();
    expect(wrapper.emitted().linkOrModal[0][0]).toBe("この機能を使う");
  });
});
