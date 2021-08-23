import { mount } from "@vue/test-utils";
import ButtonDelete from "@/components/atoms/ButtonDelete";

describe("ButtonDelete component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ButtonDelete, {
      propsData: {
        buttonDeleteText: "削除",
      },
    });
  });

  it("buttonDeleteText propsを表示する", () => {
    expect(wrapper.find(".button-delete").text()).toBe("削除");
  });

  it("ボタンをクリックすると、deleteイベントがemitされる", async () => {
    await wrapper.find(".button-delete").trigger("click");
    expect(wrapper.emitted().delete).toBeTruthy();
  });
});
