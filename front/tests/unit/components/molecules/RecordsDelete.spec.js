import { mount } from "@vue/test-utils";
import RecordsDelete from "@/components/molecules/RecordsDelete";

describe("RecordsDelete component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(RecordsDelete, {
      propsData: {
        errorMessage: "日付を選択してね",
        buttonDelete: "削除",
      },
      stubs: ["v-date-picker"],
    });
  });

  it("errorMessage propsを子コンポーネントに渡している", () => {
    expect(wrapper.find(".records-delete-error").text()).toBe(
      "日付を選択してね"
    );
  });

  it("buttonDelete propsを子コンポーネントに渡している", () => {
    expect(wrapper.find(".records-delete-button").text()).toBe("削除");
  });

  it("初期描画時、コンポーネントのdataに今日の日付が入る", async () => {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();
    month = ("0" + month).slice(-2);
    let day = today.getDate();
    day = ("0" + day).slice(-2);
    const yearMonthDay = year + "-" + month + "-" + day;
    await wrapper.find(".records-delete-date-picker").trigger("input");
    expect(wrapper.vm.deleteDate).toBe(yearMonthDay);
  });

  it("削除ボタンをクリックすると、submitイベントと入力された日付がemitされる", async () => {
    wrapper.vm.deleteDate = "2021-4-17";
    await wrapper.find(".records-delete-button").trigger("click");
    expect(wrapper.emitted().submit).toBeTruthy();
    expect(wrapper.emitted().submit[0][0]).toBe("2021-4-17");
  });
});
