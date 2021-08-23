import { mount } from "@vue/test-utils";
import InputSelect from "@/components/atoms/InputSelect";

describe("InputSelect component test", () => {
  let wrapper;
  let options;

  beforeEach(() => {
    wrapper = mount(InputSelect, {
      propsData: {
        sortType: "メーカー",
        sortValues: ["テストビール", "テスト酒造"],
        initValue: "テストサワー",
      },
    });
    options = wrapper.find("select").findAll("option");
  });

  it("sortType props, sortValue propsを表示する", () => {
    expect(options.at(0).text()).toBe("メーカー");
    expect(options.at(1).text()).toBe("テストビール");
    expect(options.at(2).text()).toBe("テスト酒造");
  });

  it("selectの初期値として、initValue propsが入る", () => {
    expect(wrapper.vm.selected).toBe("テストサワー");
  });

  it("選択されたoptionのvalueが親のselectに入る", () => {
    options.at(1).setSelected();
    expect(wrapper.find("select").element.value).toBe("テストビール");
    options.at(2).setSelected();
    expect(wrapper.find("select").element.value).toBe("テスト酒造");
  });

  it("optionが選択されたとき、inputイベントと選択されたvalueをemitする", () => {
    options.at(1).setSelected();
    const emittedValue = wrapper.find("select").element.value;
    wrapper.find("select").vm.$emit("input", emittedValue);
    expect(wrapper.emitted().input[0][0]).toBe("テストビール");
  });
});
