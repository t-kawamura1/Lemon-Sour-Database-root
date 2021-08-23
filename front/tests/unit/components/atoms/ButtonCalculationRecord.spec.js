import { mount } from "@vue/test-utils";
import ButtonCalculationRecord from "@/components/atoms/ButtonCalculationRecord";

describe("ButtonCalculationRecord component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ButtonCalculationRecord, {
      propsData: {
        buttonCalcRecText: "結果を記録します",
      },
    });
  });

  it("buttonCalcRecText propsを表示する", () => {
    expect(wrapper.text()).toBe("結果を記録します");
  });

  it("クリックすると、recordイベントをemitする", async () => {
    await wrapper.trigger("click");
    expect(wrapper.emitted().record).toBeTruthy();
  });
});
