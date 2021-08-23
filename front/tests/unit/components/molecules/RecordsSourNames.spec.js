import { mount } from "@vue/test-utils";
import RecordsSourNames from "@/components/molecules/RecordsSourNames";

describe("RecordsSourNames component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(RecordsSourNames, {
      propsData: {
        sourNamesExplanation: "あなたのよく飲むレモンサワー",
        iconRanking: "crown",
        recordsSourNames: [
          { name: "テスサワ", name_count: 5 },
          { name: "テスチュー", name_count: 4 },
          { name: "テスハイ", name_count: 2 },
        ],
      },
      stubs: ["font-awesome-icon"],
    });
  });

  it("sourNamesExplanation propsを子コンポーネントに渡している", () => {
    expect(wrapper.find(".records-sour-names-explanation").text()).toBe(
      "あなたのよく飲むレモンサワー"
    );
  });

  it("iconRanking propsを子コンポーネントに渡している", () => {
    expect(
      wrapper.findAll("font-awesome-icon-stub").at(0).attributes("icon")
    ).toBe("crown");
  });

  it("recordsSourNamesのnameを子コンポーネントに渡している", () => {
    expect(wrapper.findAll(".records-sour-names-text").at(0).text()).toBe(
      "テスサワ"
    );
  });

  it("recordsSourNames propsの要素の数だけ、アイコンと数字をレモンサワー名をリストレンダリングする", () => {
    expect(wrapper.findAll(".records-sour-names-icon")).toHaveLength(3);
    expect(wrapper.findAll(".records-sour-names-rank")).toHaveLength(3);
    expect(wrapper.findAll(".records-sour-names-text")).toHaveLength(3);
  });
});
