import { mount } from "@vue/test-utils";
import ErrorMessage from "@/components/atoms/ErrorMessage";

describe("ErrorMessage component test", () => {
  it("errorMessageText propsを表示する", () => {
    const wrapper = mount(ErrorMessage, {
      propsData: {
        errorMessageText: "test error message",
      },
    });
    expect(wrapper.text()).toBe("test error message");
  });
});
