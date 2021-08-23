import { mount } from "@vue/test-utils";
import CalendarExplanation from "@/components/atoms/CalendarExplanation";

describe("CalendarExplanation component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(CalendarExplanation, {
      propsData: {
        explanationSet: ["green", "健康的な飲酒量"],
      },
    });
  });

  it("explanationSet[0]がclass属性に入る", () => {
    expect(
      wrapper.find(".calendar-explanation-circle").attributes("class")
    ).toContain("green");
  });

  it("explanationSet[1]が表示される", () => {
    expect(wrapper.find(".calendar-explanation").text()).toBe("健康的な飲酒量");
  });
});
