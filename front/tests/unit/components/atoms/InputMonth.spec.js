import { mount } from "@vue/test-utils";
import InputMonth from "@/components/atoms/InputMonth";

describe("InputMonth component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(InputMonth, {
      propsData: {
        valueText: "2021-09",
      },
    });
  });

  it("valueText propsを表示する", () => {
    expect(wrapper.find("input").element.value).toBe("2021-09");
  });

  it("inputに値が入力されると、inputイベントとその入力された値がemitされる", async () => {
    await wrapper.find("input").setValue("2021-07");
    const emittedValue = wrapper.find("input").element.value;
    wrapper.find("input").vm.$emit("input", emittedValue);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0][0]).toBe("2021-07");
  });
});
