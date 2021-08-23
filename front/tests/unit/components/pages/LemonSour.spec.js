import { mount, createLocalVue } from "@vue/test-utils";
import LemonSour from "@/components/pages/LemonSour";
import flushPromises from "flush-promises";
import VueCookies from "vue-cookies";

jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        name: "テストサワー",
        manufacturer: "テスポロ",
        alcohol_content: 9,
        pure_alcohol: 7.2,
        calories: 54,
        fruit_juice: 4.5,
        zero_sugar: true,
        zero_sweetener: false,
        sour_image: { url: "@/assets/test/ls_test_sample.png" },
      },
    })
  ),
}));

const localVue = createLocalVue();
localVue.use(VueCookies);

// この記述がないとTypeErrorが出る。下記公式参照。
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

let wrapper;
let $mq;
let $route;

$route = {
  params: { id: 1 },
  name: "",
};

describe("(pc display) LemonSour component test", () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    $mq = "pc";
    wrapper = mount(LemonSour, {
      localVue,
      mocks: {
        $mq,
        $route,
        $router: {
          push: mockRouterPush,
        },
      },
      stubs: ["font-awesome-icon"],
    });
  });

  it("レモンサワーのデータを１件取得して表示する", async () => {
    await flushPromises();
    expect(wrapper.find(".sour-name").text()).toBe("テストサワー");
    expect(wrapper.find(".sour-image")).toBeTruthy();
    expect(wrapper.findAll(".zero-flag")).toHaveLength(1);
    expect(wrapper.find(".zero-flag").text()).toBe("糖類ゼロ");
    expect(wrapper.findAll(".sour-attribute")).toHaveLength(5);
  });

  describe("「これを飲む」ボタンをクリックすると、", () => {
    it("linkAndPassSourメソッドが実行される", async () => {
      expect(mockRouterPush.mock.calls.length).toBe(0);
      await wrapper.find(".button-drink-today").trigger("click");
      expect(mockRouterPush.mock.calls.length).toBe(1);
    });

    it("inkAndPassSourメソッドは、セットされているデータをparamsとして引数に持つ", () => {
      const testSour = wrapper.vm.lemonSour;
      expect(mockRouterPush).toHaveBeenCalledWith({
        name: "calculation",
        params: {
          lemonSour: testSour,
        },
      });
    });
  });
});

describe("(sp display) LemonSour component test", () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    $mq = "sp";
    wrapper = mount(LemonSour, {
      localVue,
      mocks: {
        $mq,
        $route,
        $router: {
          push: mockRouterPush,
        },
      },
      stubs: ["font-awesome-icon"],
    });
  });

  it("レモンサワーのデータを１件取得して表示する", async () => {
    await flushPromises();
    expect(wrapper.find(".sour-name").text()).toBe("テストサワー");
    expect(wrapper.find(".sour-image")).toBeTruthy();
    expect(wrapper.findAll(".zero-flag")).toHaveLength(1);
    expect(wrapper.find(".zero-flag").text()).toBe("糖類ゼロ");
    expect(wrapper.findAll(".sour-attribute")).toHaveLength(5);
  });

  describe("「これを飲む」ボタンをクリックすると、", () => {
    it("linkAndPassSourメソッドが実行される", async () => {
      expect(mockRouterPush.mock.calls.length).toBe(0);
      await wrapper.find(".button-drink-today").trigger("click");
      expect(mockRouterPush.mock.calls.length).toBe(1);
    });

    it("inkAndPassSourメソッドは、セットされているデータをparamsとして引数に持つ", () => {
      const testSour = wrapper.vm.lemonSour;
      expect(mockRouterPush).toHaveBeenCalledWith({
        name: "calculation",
        params: {
          lemonSour: testSour,
        },
      });
    });
  });
});
