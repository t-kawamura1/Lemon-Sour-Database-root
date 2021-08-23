import { mount } from "@vue/test-utils";
import HomeFunctionItems from "@/components/molecules/pc/HomeFunctionItems";

// spも動作は同じなためテストは省略
describe("HomeFunctionItems component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(HomeFunctionItems, {
      propsData: {
        functionItemsHeading: "ええかんじの機能",
        functionItems: [
          {
            name: "市販レモンサワーデータベース",
            icon: "database",
            text: "市販のRTDレモンサワーをデーターベース化。",
            button: "レモンサワーをみつける",
          },
          {
            name: "アルコール摂取量計算",
            icon: "calculator",
            text: "アルコール摂取量は健康のバロメーター。",
            button: "アルコール量を計算する",
          },
          {
            name: "摂取量記録カレンダー",
            icon: "calendar-alt",
            text: "計算した記録はカレンダーに反映。",
            button: "ユーザー登録",
          },
        ],
      },
      stubs: ["font-awesome-icon"],
    });
  });

  it("functionItemsHeading propsを表示する", () => {
    expect(wrapper.find(".pc-home-function-items-heading").text()).toBe(
      "ええかんじの機能"
    );
  });

  it("functionItems propsの要素の数だけ、機能のdivをリストレンダリングする", () => {
    expect(wrapper.findAll(".pc-home-function-items-box")).toHaveLength(3);
  });

  it("functionItems propsの各要素のnameとtextを表示する", () => {
    expect(wrapper.findAll(".pc-home-function-items-name").at(0).text()).toBe(
      "市販レモンサワーデータベース"
    );
    expect(wrapper.findAll(".pc-home-function-items-name").at(1).text()).toBe(
      "アルコール摂取量計算"
    );
    expect(wrapper.findAll(".pc-home-function-items-name").at(2).text()).toBe(
      "摂取量記録カレンダー"
    );
    expect(wrapper.findAll(".pc-home-function-items-text").at(0).text()).toBe(
      "市販のRTDレモンサワーをデーターベース化。"
    );
    expect(wrapper.findAll(".pc-home-function-items-text").at(1).text()).toBe(
      "アルコール摂取量は健康のバロメーター。"
    );
    expect(wrapper.findAll(".pc-home-function-items-text").at(2).text()).toBe(
      "計算した記録はカレンダーに反映。"
    );
  });

  it("functionItems propsの各要素のiconとbuttonを子コンポーネントに渡している", () => {
    expect(
      wrapper.findAll("font-awesome-icon-stub").at(0).attributes("icon")
    ).toBe("database");
    expect(
      wrapper.findAll("font-awesome-icon-stub").at(1).attributes("icon")
    ).toBe("calculator");
    expect(
      wrapper.findAll("font-awesome-icon-stub").at(2).attributes("icon")
    ).toBe("calendar-alt");
    expect(wrapper.findAll(".pc-home-function-items-button").at(0).text()).toBe(
      "レモンサワーをみつける"
    );
    expect(wrapper.findAll(".pc-home-function-items-button").at(1).text()).toBe(
      "アルコール量を計算する"
    );
    expect(wrapper.findAll(".pc-home-function-items-button").at(2).text()).toBe(
      "ユーザー登録"
    );
  });

  describe("ボタンをクリックしたとき、子コンポーネントからemitされた値が、", () => {
    it("functionItems[0]の場合、linkイベントとtoLemonSoursがemitされる", async () => {
      await wrapper.findAll(".pc-home-function-items-button").trigger("click");
      expect(wrapper.emitted().link).toBeTruthy();
      expect(wrapper.emitted().link[0][0]).toBe("toLemonSours");
    });

    it("functionItems[1]の場合、linkイベントとtoCalculationがemitされる", async () => {
      await wrapper.findAll(".pc-home-function-items-button").trigger("click");
      expect(wrapper.emitted().link).toBeTruthy();
      expect(wrapper.emitted().link[1][0]).toBe("toCalculation");
    });

    it("functionItems[0]の場合、modalイベントとtoLemonSoursがemitされる", async () => {
      await wrapper.findAll(".pc-home-function-items-button").trigger("click");
      expect(wrapper.emitted().modal).toBeTruthy();
      expect(wrapper.emitted().modal[0][0]).toBe("ユーザー登録");
    });
  });
});
