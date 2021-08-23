import { mount } from "@vue/test-utils";
import InputNumber from "@/components/atoms/InputNumber";

describe("InputNumber component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(InputNumber, {
      propsData: {
        inputNumberAttributes: ["アルコール度数", 0.5, 0.5, 99],
        initValue: 9,
      },
    });
  });

  it("inputタグのplaceholder,step,min,max属性に、inputNumberAttributes propsがそれぞれ入る", () => {
    expect(wrapper.find("input").attributes("placeholder")).toBe(
      "アルコール度数"
    );
    expect(wrapper.find("input").attributes("step")).toBe("0.5");
    expect(wrapper.find("input").attributes("min")).toBe("0.5");
    expect(wrapper.find("input").attributes("max")).toBe("99");
  });

  it("inputの初期値として、initValue propsが表示される", () => {
    expect(wrapper.find("input").element.value).toBe("9");
  });

  it("inputに値が入力されると、inputイベントとその入力された値がemitされる", async () => {
    await wrapper.find("input").setValue(9);
    const emittedValue = wrapper.find("input").element.value;
    wrapper.find("input").vm.$emit("input", emittedValue);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0][0]).toBe("9");
  });
});
