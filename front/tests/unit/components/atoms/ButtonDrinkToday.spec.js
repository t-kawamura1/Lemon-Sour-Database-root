import { mount } from "@vue/test-utils";
import ButtonDrinkToday from "@/components/atoms/ButtonDrinkToday";

describe("ButtonDrinkToday component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ButtonDrinkToday, {
      propsData: {
        buttonDrinkTodayText: "君に決めた！",
      },
    });
  });

  it("buttonDrinkTodayText propsを表示する", () => {
    expect(wrapper.text()).toBe("君に決めた！");
  });

  it("クリックすると、linkAndPassイベントをemitする", async () => {
    await wrapper.trigger("click");
    expect(wrapper.emitted().linkAndPass).toBeTruthy();
  });
});
