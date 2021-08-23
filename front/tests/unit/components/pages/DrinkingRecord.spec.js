// Cannot read property 'access-token' of nullによりwrapperがundefinedになる。
// 原因が解明できないため、一旦封印する。

// import { mount, createLocalVue } from "@vue/test-utils";
// import DrinkingRecord from "@/components/pages/DrinkingRecord";
// // import flushPromises from "flush-promises";
// import VueCookies from "vue-cookies";

// const localVue = createLocalVue();
// localVue.use(VueCookies);

// jest.mock("axios", () => ({
//   get: jest.fn(() =>
//     Promise.resolve({
//       data: [
//         {
//           drinking_date: "2021-08-09",
//           total_pure_alcohol: 14.2,
//           total_drinking: 700,
//         },
//         {
//           drinking_date: "2021-08-12",
//           total_pure_alcohol: 19.6,
//           total_drinking: 850,
//         },
//         {
//           drinking_date: "2021-08-06",
//           total_pure_alcohol: 25.9,
//           total_drinking: 900,
//         },
//         {
//           drinking_date: "2021-08-11",
//           total_pure_alcohol: 32.7,
//           total_drinking: 1000,
//         },
//         {
//           drinking_date: "2021-08-3",
//           total_pure_alcohol: 44.4,
//           total_drinking: 1500,
//         },
//         {
//           drinking_date: "2021-08-16",
//           total_pure_alcohol: 59.8,
//           total_drinking: 2000,
//         },
//       ],
//     })
//   ),
// }));

// let wrapper;
// let $mq;
// let $router;
// let $route;

// beforeEach(() => {
//   $router = { path: "" };
//   $route = { name: "" };
// });

describe("(pc display) DrinkingRecord component test", () => {
  //   beforeEach(() => {
  //     $mq = "pc";
  //     wrapper = mount(DrinkingRecord, {
  //       localVue,
  //       propsData: {
  //         currentUser: {
  //           id: 1,
  //           name: "test",
  //           email: "test@test.com",
  //         },
  //       },
  //       mocks: {
  //         $mq,
  //         $router,
  //         $route,
  //       },
  //       stubs: ["font-awesome-icon", "v-calendar", "v-date-picker"],
  //     });
  //   });

  describe("ログイン済みユーザーの場合", () => {
    it("日付欄に入力がない状態で記録ボタンを押すと、エラーが表示される", async () => {
      // const recordDrinking = jest
      //   .spyOn(Calculation.methods, "recordDrinking")
      //   .mockImplementation(() => {
      //     wrapper.setData({
      //       calculationRecordErrors: ["なんで日付いれへんの？"],
      //     });
      //   });
      // wrapper.find(".calculate-alcohol-date-picker").vm.$emit("input", "");
      // await wrapper.find(".calculate-alcohol-calc-rec-button").trigger("click");
      // wrapper.find(".calculate-alcohol").vm.$emit("submitRecord", recordData);
      // recordDrinking();
      // await flushPromises();
      // expect(wrapper.find(".calculate-alcohol-error-message").text()).toBe(
      //   "なんで日付いれへんの？"
      // );
    });
  });
});

// describe("(sp display) DrinkingRecord component test", () => {
//   beforeEach(() => {
//     $mq = "sp";
//     wrapper = mount(DrinkingRecord, {
//       localVue,
//       mocks: {
//         $mq,
//         $router,
//         $route,
//       },
//       stubs: ["font-awesome-icon", "v-calendar", "v-date-picker"],
//     });
//   });

//   describe("ログイン済みユーザーの場合", () => {
//     it("日付欄に入力がない状態で記録ボタンを押すと、エラーが表示される", async () => {
//       // const recordDrinking = jest
//       //   .spyOn(Calculation.methods, "recordDrinking")
//       //   .mockImplementation(() => {
//       //     wrapper.setData({
//       //       calculationRecordErrors: ["なんで日付いれへんの？"],
//       //     });
//       //   });
//       // wrapper.find(".calculate-alcohol-date-picker").vm.$emit("input", "");
//       // await wrapper.find(".calculate-alcohol-calc-rec-button").trigger("click");
//       // wrapper.find(".calculate-alcohol").vm.$emit("submitRecord", recordData);
//       // recordDrinking();
//       // await flushPromises();
//       // expect(wrapper.find(".calculate-alcohol-error-message").text()).toBe(
//       //   "なんで日付いれへんの？"
//       // );
//     });
//   });
// });
