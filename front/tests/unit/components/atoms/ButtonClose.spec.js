import { mount } from "@vue/test-utils";
import ButtonClose from "@/components/atoms/ButtonClose";

describe("ButtonClose component test", () => {
  it("ボタンをクリックすると、closeイベントがemitされる", async () => {
    const wrapper = mount(ButtonClose, {
      stubs: ["font-awesome-icon"],
    });
    await wrapper.find(".button-close").trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
