import { mount } from "@vue/test-utils";
import PcHomeTitle from "@/components/molecules/pc/HomeTitle";
import SpHomeTitle from "@/components/molecules/sp/HomeTitle";

describe("PcHomeTitle component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(PcHomeTitle, {
      propsData: {
        pcHomeTitleIcon: "lemon",
        homeTitleOpenings: ["飲みすぎたら", "あかんで！！"],
      },
      stubs: ["font-awesome-icon"],
    });
  });

  it("pcHomeTitleIcon propsを子コンポーネントに渡している", () => {
    expect(wrapper.find("font-awesome-icon-stub").attributes("icon")).toBe(
      "lemon"
    );
  });

  it("homeTitleOpenings propsを表示する", () => {
    expect(wrapper.find(".pc-home-title-opening-text1").text()).toBe(
      "飲みすぎたら"
    );
    expect(wrapper.find(".pc-home-title-opening-text2").text()).toBe(
      "あかんで！！"
    );
  });
});

describe("SpHomeTitle component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(SpHomeTitle, {
      propsData: {
        homeTitleOpenings: ["飲みすぎたら", "あかんでsp！！"],
      },
    });
  });

  it("homeTitleOpenings propsを表示する", () => {
    expect(wrapper.find(".sp-home-title-opening-text1").text()).toBe(
      "飲みすぎたら"
    );
    expect(wrapper.find(".sp-home-title-opening-text2").text()).toBe(
      "あかんでsp！！"
    );
  });
});
