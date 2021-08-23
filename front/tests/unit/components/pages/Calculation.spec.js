import { mount, createLocalVue } from "@vue/test-utils";
import Calculation from "@/components/pages/Calculation";
import flushPromises from "flush-promises";
import VueCookies from "vue-cookies";

const localVue = createLocalVue();
localVue.use(VueCookies);

jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          name: "テストサワー",
          manufacturer: "テスポロ",
          sour_image: { url: "@/assets/test/ls_test_sample.png" },
        },
        {
          name: "テストチューハイ",
          manufacturer: "テストリー",
          sour_image: { url: "@/assets/test/ls_test_sample.png" },
        },
      ],
    })
  ),
}));

let wrapper;
let $mq;
let $router;
let $route;
let recordData;

beforeEach(() => {
  $router = { path: "" };
  $route = { name: "" };
  recordData = {
    user_id: "",
    lemon_sour_id: "",
    drinking_date: "",
    pure_alcohol_amount: "",
    drinking_amount: "",
  };
});

describe("(pc display) Calculation component test", () => {
  beforeEach(() => {
    $mq = "pc";
    wrapper = mount(Calculation, {
      localVue,
      mocks: {
        $mq,
        $router,
        $route,
      },
      stubs: ["font-awesome-icon", "v-date-picker"],
    });
  });

  describe("ログイン済みユーザーの場合", () => {
    it("日付欄に入力がない状態で記録ボタンを押すと、エラーが表示される", async () => {
      const recordDrinking = jest
        .spyOn(Calculation.methods, "recordDrinking")
        .mockImplementation(() => {
          wrapper.setData({
            calculationRecordErrors: ["なんで日付いれへんの？"],
          });
        });
      wrapper.find(".calculate-alcohol-date-picker").vm.$emit("input", "");
      await wrapper.find(".calculate-alcohol-calc-rec-button").trigger("click");
      wrapper.find(".calculate-alcohol").vm.$emit("submitRecord", recordData);
      recordDrinking();
      await flushPromises();
      expect(wrapper.find(".calculate-alcohol-error-message").text()).toBe(
        "なんで日付いれへんの？"
      );
    });
  });

  describe("ログインしていないユーザーの場合", () => {
    it("記録ボタンを押すと、通知メッセージが表示され、ログインモーダルが開く", async () => {
      const recordDrinking = jest
        .spyOn(Calculation.methods, "recordDrinking")
        .mockImplementation(() => {
          wrapper.setData({ noticeMessage: "ログインが必要やで" });
          wrapper.setData({ showUserLoginModal: true });
        });
      await wrapper.find(".calculate-alcohol-calc-rec-button").trigger("click");
      recordDrinking();
      await flushPromises();
      expect(wrapper.find(".the-notice").text()).toBe("ログインが必要やで");
      expect(wrapper.find(".modal-title").text()).toBe("ログイン");
    });
  });
});

describe("(sp display) Calculation component test", () => {
  beforeEach(() => {
    $mq = "sp";
    wrapper = mount(Calculation, {
      localVue,
      mocks: {
        $mq,
        $router,
        $route,
      },
      stubs: ["font-awesome-icon", "v-date-picker"],
    });
  });

  describe("ログイン済みユーザーの場合", () => {
    it("日付欄に入力がない状態で記録ボタンを押すと、エラーが表示される", async () => {
      const recordDrinking = jest
        .spyOn(Calculation.methods, "recordDrinking")
        .mockImplementation(() => {
          wrapper.setData({
            calculationRecordErrors: ["なんで日付いれへんの？"],
          });
        });
      wrapper.find(".calculate-alcohol-date-picker").vm.$emit("input", "");
      await wrapper.find(".calculate-alcohol-calc-rec-button").trigger("click");
      wrapper.find(".calculate-alcohol").vm.$emit("submitRecord", recordData);
      recordDrinking();
      await flushPromises();
      expect(wrapper.find(".calculate-alcohol-error-message").text()).toBe(
        "なんで日付いれへんの？"
      );
    });
  });

  describe("ログインしていないユーザーの場合", () => {
    it("記録ボタンを押すと、通知メッセージが表示され、ログインモーダルが開く", async () => {
      const recordDrinking = jest
        .spyOn(Calculation.methods, "recordDrinking")
        .mockImplementation(() => {
          wrapper.setData({ noticeMessage: "ログインが必要やで" });
          wrapper.setData({ showUserLoginModal: true });
        });
      await wrapper.find(".calculate-alcohol-calc-rec-button").trigger("click");
      recordDrinking();
      await flushPromises();
      expect(wrapper.find(".the-notice").text()).toBe("ログインが必要やで");
      expect(wrapper.find(".modal-title").text()).toBe("ログイン");
    });
  });
});
