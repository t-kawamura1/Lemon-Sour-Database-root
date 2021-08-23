import { mount } from "@vue/test-utils";
import DayDatePicker from "@/components/atoms/DayDatePicker";

describe("DayDatePicker component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(DayDatePicker);
  });

  it("初期描画時、inputイベントと今日の日付がemitされる", async () => {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();
    month = ("0" + month).slice(-2);
    let day = today.getDate();
    day = ("0" + day).slice(-2);
    const yearMonthDay = year + "-" + month + "-" + day;
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0][0]).toBe(yearMonthDay);
  });
});
