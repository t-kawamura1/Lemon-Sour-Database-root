import { mount } from "@vue/test-utils";
import AgeConfirmation from "@/components/molecules/AgeConfirmation";

describe("AgeConfirmation component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(AgeConfirmation, {
      propsData: {
        warningIconText: "caution",
        ageConfirmationTexts: ["未成年は", "あかんで！", "回れ右！"],
        buttonTexts: ["YES", "NO"],
      },
      stubs: ["font-awesome-icon"],
    });
  });

  it("warningIconText propsを子コンポーネントに渡している", () => {
    expect(wrapper.find("font-awesome-icon-stub").attributes("icon")).toBe(
      "caution"
    );
  });

  it("ageConfirmationTextsの要素の数だけ、text-mainコンポーネントをリストレンダリングする", () => {
    expect(wrapper.findAll(".age-confirmation-text")).toHaveLength(3);
  });

  it("buttonTextsの要素の数だけ、button-age-confirmationコンポーネントをリストレンダリングする", () => {
    expect(wrapper.findAll(".age-confirmation-button")).toHaveLength(2);
  });

  it("年齢確認ボタンを押すと、checkイベントとbuttonTextsのいずれかの値がemitされる", async () => {
    await wrapper.findAll(".age-confirmation-button").at(0).trigger("click");
    expect(wrapper.emitted().check).toBeTruthy();
    expect(wrapper.emitted().check[0][0]).toBe("YES");
  });
});
