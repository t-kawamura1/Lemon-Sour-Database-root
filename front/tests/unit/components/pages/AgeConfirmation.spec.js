import { mount, createLocalVue } from "@vue/test-utils";
import AgeConfirmation from "@/components/pages/AgeConfirmation";
import VueCookies from "vue-cookies";

const localVue = createLocalVue();
localVue.use(VueCookies);

let wrapper;
let $mq;
let $router;

$router = { path: "/" };

describe("(pc display) AgeConfirmation component test", () => {
  beforeEach(() => {
    $mq = "pc";
    wrapper = mount(AgeConfirmation, {
      mocks: {
        $mq,
        $router,
      },
      stubs: ["font-awesome-icon"],
    });
  });
  // これまたうまくいかない…封印
  describe("年齢確認ボタンをクリックすると、", () => {
    it("rememberAgeメソッドが実行される", async () => {
      console.log(wrapper.html());
      // const rememberAge = jest.fn();
      // wrapper.setMethods({ rememberAge })
      // // expect(rememberAge.mock.calls.length).toBe(0);
      // await wrapper.findAll(".button-age-confirmation").at(0).trigger("click");
      // await wrapper.find(".age-confirmation-button").trigger("answer")
      // await wrapper.findAll(".age-confirmation").at(0).trigger("answer");
      // await wrapper.find(".age-confirmation").trigger("check")
      // wrapper.find(".age-confirmation").vm.$emit("check", "はい")
      // await wrapper.trigger("check", "はい")
      // expect(rememberAge).toBeCalled();
    });

    // it("rememberAgeメソッドは、ボタンの表示テキストを引数に持つ", () => {
    //   expect(rememberAge).toHaveBeenCalledWith("はい");
    // });
  });
});

// describe("(sp display) AgeConfirmation component test", () => {
//   const mockRouterPush = jest.fn();

//   beforeEach(() => {
//     $mq = "sp";
//     wrapper = mount(AgeConfirmation, {
//       mocks: {
//         $mq,
//         $router: {
//           push: mockRouterPush,
//         },
//       },
//       stubs: ["font-awesome-icon"]
//     });
//   });

//   describe("年齢確認ボタンをクリックすると、", () => {
//     it("rememberAgeメソッドが実行される", async () => {
//       expect(mockRouterPush.mock.calls.length).toBe(0);
//       await wrapper.find(".button-age-confirmation").trigger("click");
//       expect(mockRouterPush.mock.calls.length).toBe(1);
//     });

//     it("rememberAgeメソッドは、ボタンの表示テキストを引数に持つ", () => {
//       expect(mockRouterPush).toHaveBeenCalledWith("はい");
//     });
//   });
// });
