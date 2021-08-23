import { mount } from "@vue/test-utils";
import ButtonAgeConfirmation from "@/components/atoms/ButtonAgeConfirmation";

describe("ButtonAgeConfirmation component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ButtonAgeConfirmation, {
      propsData: {
        buttonAnswerText: "YES!!",
      },
    });
  });

  it("AgeConfirmationText propsを受け取って表示する", () => {
    expect(wrapper.find(".button-age-confirmation").text()).toBe("YES!!");
  });

  it("ボタンをクリックすると、answerイベントと受け取ったpropsの値がemitされる", async () => {
    await wrapper.find(".button-age-confirmation").trigger("click");
    expect(wrapper.emitted().answer).toBeTruthy();
    expect(wrapper.emitted().answer[0][0]).toBe("YES!!");
  });
});
