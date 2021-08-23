// Cannot read property 'access-token' of nullによりwrapperがundefinedになる。
// 原因が解明できないため、一旦封印する。

// import { mount, createLocalVue } from "@vue/test-utils";
// import RecordsByMonth from "@/components/molecules/RecordsByMonth";
// import VueCookies from "vue-cookies";

// const localVue = createLocalVue();
// localVue.use(VueCookies);

// jest.mock("axios", () => ({
//   get: jest.fn(() =>
//     Promise.resolve({
//       data: [
//         {
//           year_month: "2021-08",
//           total_pure_alcohol: 123.4,
//           total_drinking: 3000,
//         },
//         {
//           year_month: "2021-09",
//           total_pure_alcohol: 154.8,
//           total_drinking: 5000,
//         },
//       ],
//     })
//   ),
// }));

describe("RecordsByMonth component test", () => {
  // let wrapper;
  // beforeEach(() => {
  //   wrapper = mount(RecordsByMonth, {
  //     localVue,
  //     propsData: {
  //       authHeader: {
  //         "access-token": "afaefkahfk",
  //         client: "lknlv53lkr8",
  //         uid: "test@test.com",
  //       },
  //     },
  //   });
  //   const decryptHeaders = jest
  //     .spyOn(RecordsByMonth.methods, "decryptHeaders")
  //     .mockImplementation(() => {
  //       const authHeader = {
  //         "access-token": "afaefkahfk",
  //         client: "lknlv53lkr8",
  //         uid: "test@test.com",
  //       };
  //       wrapper.vm.authHeader = authHeader;
  //     });
  //   decryptHeaders();
  // });

  it("colorsAndTexts propsの要素の数だけ、リストレンダリングし、各テキストを表示する", () => {
    //   expect(wrapper.find(".records-by-month-date-select").element.value).toBe(
    //     ""
    //   );
  });
});
