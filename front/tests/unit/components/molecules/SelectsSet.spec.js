import { mount } from "@vue/test-utils";
// spも表示内容は同じため、テストは省略
import SelectsSet from "@/components/molecules/pc/SelectsSet";

describe("PcSelectsSet component test", () => {
  let wrapper;
  let selects;
  let optionsManufacturers;
  let optionsIngredients;
  let optionsOrders;

  beforeEach(() => {
    wrapper = mount(SelectsSet, {
      propsData: {
        selectsTypes: ["メーカー", "成分", "並び順"],
        selectsManufacturers: ["テストビール", "テストリー"],
        selectsIngredients: ["糖類ゼロ", "甘味料ゼロ"],
        selectsOrders: ["度数高い順", "果汁少ない順", "カロリー高い順"],
        errorMessages: ["何か入れてね", "エラーだよ"],
      },
      stubs: ["font-awesome-icon"],
    });
    selects = wrapper.findAll("select");
    optionsManufacturers = selects.at(0).findAll("option");
    optionsIngredients = selects.at(1).findAll("option");
    optionsOrders = selects.at(2).findAll("option");
  });

  it("selectsTypes, selectsManufacturers, selectsIngredients, selectsOrdersの各propsを子コンポーネントに渡している", () => {
    expect(optionsManufacturers.at(0).text()).toBe("メーカー");
    expect(optionsManufacturers.at(1).text()).toBe("テストビール");
    expect(optionsManufacturers.at(2).text()).toBe("テストリー");
    expect(optionsIngredients.at(0).text()).toBe("成分");
    expect(optionsIngredients.at(1).text()).toBe("糖類ゼロ");
    expect(optionsIngredients.at(2).text()).toBe("甘味料ゼロ");
    expect(optionsOrders.at(0).text()).toBe("並び順");
    expect(optionsOrders.at(1).text()).toBe("度数高い順");
    expect(optionsOrders.at(2).text()).toBe("果汁少ない順");
    expect(optionsOrders.at(3).text()).toBe("カロリー高い順");
  });

  it("selectsManufacturers, selectsIngredients, selectsOrdersそれぞれの要素の数だけリストレンダリングする", () => {
    // selectsTypesもあるので+1している
    expect(optionsManufacturers).toHaveLength(2 + 1);
    expect(optionsIngredients).toHaveLength(2 + 1);
    expect(optionsOrders).toHaveLength(3 + 1);
  });

  it("errorMessagesの要素の数だけリストレンダリングする", () => {
    expect(wrapper.findAll(".error-message")).toHaveLength(2);
  });

  it("各selectの初期表示値として、各検索選択肢の最初の値が表示される", () => {
    expect(selects.at(0).element.value).toBe("テストビール");
    expect(selects.at(1).element.value).toBe("糖類ゼロ");
    expect(selects.at(2).element.value).toBe("度数高い順");
  });

  describe("InputSelect子コンポーネントから各valueがemitされるとき", () => {
    beforeEach(() => {
      selects.at(0).vm.$emit("input", "テストリー");
      selects.at(1).vm.$emit("input", "甘味料ゼロ");
      selects.at(2).vm.$emit("input", "カロリー高い順");
    });

    it("それらの各valueが、selectedManufacturer, selectedIngredient, selectedOrderの各dataに入る", () => {
      expect(wrapper.vm.selectedManufacturer).toBe("テストリー");
      expect(wrapper.vm.selectedIngredient).toBe("甘味料ゼロ");
      expect(wrapper.vm.selectedOrder).toBe("カロリー高い順");
    });

    it("検索ボタンをクリックすると、packSelectedValuesメソッドが呼び出され、sortByイベントとそれらの各valueがemitされる", async () => {
      await wrapper.find("button").trigger("click");
      await wrapper.find("form").trigger("submit");
      expect(wrapper.emitted().sortBy).toBeTruthy();
      expect(wrapper.emitted().sortBy[0][0]).toStrictEqual([
        "テストリー",
        "甘味料ゼロ",
        "カロリー高い順",
      ]);
    });
  });
});
