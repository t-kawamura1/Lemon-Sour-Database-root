import { mount } from "@vue/test-utils";
import CalculateAlcohol from "@/components/molecules/CalculateAlcohol";

describe("CalculateAlcohol component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(CalculateAlcohol, {
      propsData: {
        calculationSupplementTexts: [
          "純アルコール量で算定するで。クリックで表示",
          [
            "量(ml) × 度数/100 × 0.8 = 純アルコール量(g)",
            "適切な飲酒量： 1日当たり20g程度やで",
            "やばい飲酒量：",
            "men 40g以上、 women 20g以上",
          ],
        ],
        errorMessages: ["日付は必要", "今のとこないけども一つエラー"],
        soursSelect: ["ー", ["サワー選択", "テスレモ", "テスサワ", "テスハイ"]],
        lemonSours: [
          { name: "テスレモ", alcohol_content: 5.5 },
          { name: "テスサワ", alcohol_content: 9 },
          { name: "テスハイ", alcohol_content: 7 },
        ],
        alcoholInputs: {
          alcContent: ["度数", 0.5, 0.5, 13],
          amountSelect: {
            sortType: "ー",
            sortValues: ["容量", 350, 400, 500, 334, 633, 135, 250],
            initValue: "容量",
          },
          drinkingCounts: ["", 1, 0, 99],
        },
        iconTexts: ["times", "plus-circle", "arrow-right"],
        calcButton: "結果を記録",
        todaySour: undefined,
      },
      stubs: ["font-awesome-icon", "v-date-picker"],
    });
  });

  it("calculationSupplementTexts[0]を表示している", () => {
    expect(wrapper.find(".calculate-alcohol-supplement-button").text()).toBe(
      "純アルコール量で算定するで。クリックで表示"
    );
  });

  it("calculationSupplementTexts[1]の要素の数だけ,レンダリングする", () => {
    expect(wrapper.findAll(".calculate-alcohol-supplement-text")).toHaveLength(
      4
    );
  });

  it("errorMessagesの要素の数だけ、子コンポーネントをリストレンダリングする", () => {
    expect(wrapper.findAll(".calculate-alcohol-error-message")).toHaveLength(2);
  });

  it("InputSelectコンポーネントにsoursSelect propsを渡している", () => {
    const options = wrapper
      .find(".calculate-alcohol-sour-select")
      .findAll("option");
    expect(options).toHaveLength(5);
    expect(options.at(0).text()).toBe("ー");
    expect(options.at(1).text()).toBe("サワー選択");
  });

  it("alcoholInputs propsを各子コンポーネントに渡している", () => {
    expect(
      wrapper
        .findAll(".calculate-alcohol-formula-alcohol-content-input")
        .at(0)
        .attributes().max
    ).toBe("13");
    expect(
      wrapper
        .findAll(".calculate-alcohol-formula-amount-input")
        .at(0)
        .findAll("option")
        .at(1)
        .text()
    ).toBe("容量");
    expect(
      wrapper
        .findAll(".calculate-alcohol-formula-counts-input")
        .at(2)
        .attributes().max
    ).toBe("99");
  });

  it("iconTexts propsを各子コンポーネントに渡している", () => {
    expect(
      wrapper.findAll("font-awesome-icon-stub").at(0).attributes("icon")
    ).toBe("times");
    expect(
      wrapper.findAll("font-awesome-icon-stub").at(6).attributes("icon")
    ).toBe("plus-circle");
    expect(
      wrapper.findAll("font-awesome-icon-stub").at(7).attributes("icon")
    ).toBe("arrow-right");
  });

  it("calcButton propsを子コンポーネントに渡している", () => {
    expect(wrapper.find(".calculate-alcohol-calc-rec-button").text()).toBe(
      "結果を記録"
    );
  });

  it("DayDatePickerコンポーネントからinputイベントと日付がemitされると、その日付がdataにセットされる", () => {
    wrapper
      .find(".calculate-alcohol-date-picker")
      .vm.$emit("input", "2021-05-30");
    expect(wrapper.vm.recordData.drinking_record.drinking_date).toBe(
      "2021-05-30"
    );
  });

  it("計算式追加ボタンを押すと、計算式が一つ追加される", async () => {
    expect(wrapper.findAll(".calculate-alcohol-formula")).toHaveLength(3);
    await wrapper.find(".calculate-alcohol-formula-plus").trigger("click");
    expect(wrapper.findAll(".calculate-alcohol-formula")).toHaveLength(4);
  });

  it("入力欄に度数・本数を入力すると、純アルコール量の総量が表示される", async () => {
    const alcContent0 = wrapper
      .findAll(".calculate-alcohol-formula-alcohol-content-input")
      .at(0);
    const drinkAmount0 = wrapper
      .findAll(".calculate-alcohol-formula-amount-input")
      .at(0);
    const drinkCounts0 = wrapper
      .findAll(".calculate-alcohol-formula-counts-input")
      .at(0);
    await alcContent0.setValue(5);
    await alcContent0.trigger("change");
    await drinkAmount0.findAll("option").at(4).setSelected();
    await drinkCounts0.setValue(1);
    await drinkCounts0.trigger("change");
    const alcContent1 = wrapper
      .findAll(".calculate-alcohol-formula-alcohol-content-input")
      .at(1);
    const drinkAmount1 = wrapper
      .findAll(".calculate-alcohol-formula-amount-input")
      .at(1);
    const drinkCounts1 = wrapper
      .findAll(".calculate-alcohol-formula-counts-input")
      .at(1);
    await alcContent1.setValue(7);
    await alcContent1.trigger("change");
    await drinkAmount1.findAll("option").at(2).setSelected();
    await drinkCounts1.setValue(2);
    await drinkCounts1.trigger("change");
    expect(wrapper.find(".calculate-alcohol-calculation-result").text()).toBe(
      "59.2"
    );
  });

  it("選択欄からレモンサワーをどれか選択すると、そのアルコール度数が入力欄にセットされる", async () => {
    const selects = wrapper.find(".calculate-alcohol-sour-select");
    await selects.findAll("option").at(2).setSelected();
    selects.vm.$emit("input", selects.element.value);
    await selects.trigger("input");
    wrapper
      .findAll(".calculate-alcohol-formula-alcohol-content-input")
      .setValue("9");
    expect(wrapper.find("option:checked").element.value).toBe("テスレモ");
    expect(
      wrapper.findAll(".calculate-alcohol-formula-alcohol-content-input").at(0)
        .element.value
    ).toBe("9");
  });

  it("記録ボタンを押すと、submitRecordイベントと入力された値（日付、純アルコール量、飲酒量）がemitされる", async () => {
    const substituteRecordData = jest
      .spyOn(CalculateAlcohol.methods, "substituteRecordData")
      .mockImplementation(() => {
        wrapper.vm.recordData.drinking_amount = 850;
        wrapper.vm.recordData.pure_alcohol_amount = 26.5;
        wrapper.vm.$emit("submitRecord", wrapper.vm.recordData);
      });
    await wrapper.find(".calculate-alcohol-calc-rec-button").trigger("record");
    wrapper.vm.recordData.drinking_date = wrapper.find(
      ".calculate-alcohol-date-picker"
    ).element.value;
    substituteRecordData();
    expect(wrapper.emitted().submitRecord).toBeTruthy();
    expect(wrapper.emitted().submitRecord[0][0].pure_alcohol_amount).toBe(26.5);
    expect(wrapper.emitted().submitRecord[0][0].drinking_amount).toBe(850);
  });

  describe("todaySour propsがundefinedの場合、", () => {
    it("dataのsourNameには、soursSelect[1][0]が入っている", () => {
      expect(wrapper.vm.sourName).toBe("サワー選択");
    });

    it("input-numberコンポーネントに、dataのsourAlcoholContentの初期値を渡している", () => {
      expect(
        wrapper
          .findAll(".calculate-alcohol-formula-alcohol-content-input")
          .at(0).element.value
      ).toBe("0");
      expect(
        wrapper
          .findAll(".calculate-alcohol-formula-alcohol-content-input")
          .at(1).element.value
      ).toBe("0");
      expect(
        wrapper
          .findAll(".calculate-alcohol-formula-alcohol-content-input")
          .at(2).element.value
      ).toBe("0");
    });
  });

  describe("todaySour propsがundefined以外の場合、", () => {
    beforeEach(() => {
      wrapper = mount(CalculateAlcohol, {
        propsData: {
          calculationSupplementTexts: [
            "純アルコール量で算定するで。クリックで表示",
            [
              "量(ml) × 度数/100 × 0.8 = 純アルコール量(g)",
              "適切な飲酒量： 1日当たり20g程度やで",
              "やばい飲酒量：",
              "men 40g以上、 women 20g以上",
            ],
          ],
          errorMessages: ["日付は必要", "今のとこないけども一つエラー"],
          soursSelect: [
            "ー",
            ["サワー選択", "テスレモ", "テスサワ", "テスハイ"],
          ],
          lemonSours: [
            { name: "テスレモ", alcohol_content: 5.5 },
            { name: "テスサワ", alcohol_content: 9 },
            { name: "テスハイ", alcohol_content: 7 },
          ],
          alcoholInputs: {
            alcContent: ["度数", 0.5, 0.5, 13],
            amountSelect: {
              sortType: "ー",
              sortValues: ["容量", 350, 400, 500, 334, 633, 135, 250],
              initValue: "容量",
            },
            drinkingCounts: ["", 1, 0, 99],
          },
          iconTexts: ["times", "plus-circle", "arrow-right"],
          calcButton: "結果を記録",
          todaySour: { name: "テスチュー", alcohol_content: 8 },
        },
        stubs: ["font-awesome-icon", "v-date-picker"],
      });
    });

    it("dataのsourNameには、todaySourのnameの値が入っている", async () => {
      expect(wrapper.vm.sourName).toBe("テスチュー");
    });

    it("dataのsourAlcoholContentには、todaySourのalcohol_contentの値が入っている", async () => {
      expect(wrapper.vm.alcContentForDisplay).toBe(8);
    });
  });
});
