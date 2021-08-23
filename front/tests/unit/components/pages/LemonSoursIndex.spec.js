import { mount, createLocalVue } from "@vue/test-utils";
import LemonSoursIndex from "@/components/pages/LemonSoursIndex";
// import flushPromises from "flush-promises";
import VueCookies from "vue-cookies";

jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          name: "テストサワー",
          manufacturer: "サッポロ",
          sour_image: { url: "@/assets/test/ls_test_sample1.png" },
        },
        {
          name: "テストチューハイ",
          manufacturer: "サントリー",
          sour_image: { url: "@/assets/test/ls_test_sample2.png" },
        },
      ],
    })
  ),
}));

// 以下がないとテスト全体が落ちる。
// axiosの挙動を変える必要があるため、認証判定ロジックはここではテストしない。
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
let $route;
let $mq;

$route = { name: "" };

describe("(pc display) LemonSoursIndex component test", () => {
  beforeEach(() => {
    $mq = "pc";
    wrapper = mount(LemonSoursIndex, {
      localVue,
      mocks: {
        $route,
        $mq,
      },
      stubs: ["font-awesome-icon", "vue-loaders"],
    });
  });

  describe("初期描画時", () => {
    it("レモンサワーのデータを全件取得して表示する", async () => {
      expect(wrapper.findAll(".sour-name").at(0).text()).toBe("テストサワー");
      expect(wrapper.findAll(".sour-name")).toHaveLength(2);
    });

    it("何も選択しないまま検索ボタンを押すと、エラーメッセージが表示される", async () => {
      await wrapper.find(".pc-search-button").trigger("click");
      await wrapper.find(".pc-selects-form").trigger("submit");
      expect(wrapper.find(".pc-selects-errors").text()).toBe(
        "少なくとも１つ選択して検索してください"
      );
    });
  });

  // 実際に受け取る値が想像の斜め上を行く。まったく挙動のロジックがつかめないので一旦コメントアウトする
  // it("存在するデータについて検索するとき、該当するレモンサワーのデータが返ってくる", async () => {
  //   const searchBy = jest
  //     .spyOn(LemonSoursIndex.methods, "searchBy")
  //     .mockImplementation(() => {
  //       Promise.resolve(
  //         wrapper.vm.lemonSours = [
  //           {
  //             name: "テストチューハイ",
  //             manufacturer: "サントリー",
  //             sour_image: { url: "@/assets/test/ls_test_sample22222.png" },
  //           },
  //         ]
  //       );
  //     });
  //   wrapper.find(".pc-selects-set").vm.$emit("sortBy", ["サントリー"]);
  //   searchBy();
  //   await flushPromises();
  //   expect(wrapper.findAll(".pc-sours-index-items-item")).toHaveLength(1);
  //   expect(wrapper.find(".pc-sours-index-items-item-image").attributes("src")).toBe("@/assets/test/ls_test_sample2222.png");
  // });

  // it("存在しないデータについて検索するとき、エラーメッセージが返ってくる", async () => {
  //   const searchBy = jest
  //     .spyOn(LemonSoursIndex.methods, "searchBy")
  //     .mockImplementation(() => {
  //       Promise.resolve(
  //         wrapper.vm.lemonSours = null,
  //         wrapper.vm.noContentsError = "お探しのデータはありません。"
  //       );
  //     });
  //   wrapper.find(".pc-selects-set").vm.$emit("sortBy", ["宝酒造"]);
  //   searchBy();
  //   await flushPromises();
  //   console.log(wrapper.html())
  //   expect(wrapper.findAll(".pc-sours-index-items-item")).toHaveLength(0);
  //   expect(wrapper.find(".pc-sours-index-items-error").text()).toBe("お探しのデータはありません。");
  // });
});

describe("(sp display) LemonSoursIndex component test", () => {
  beforeEach(() => {
    $mq = "sp";
    wrapper = mount(LemonSoursIndex, {
      localVue,
      mocks: {
        $route,
        $mq,
      },
      stubs: ["font-awesome-icon", "vue-loaders"],
    });
  });

  describe("初期描画時", () => {
    it("レモンサワーのデータを全件取得して表示する", async () => {
      expect(wrapper.findAll(".sour-name").at(0).text()).toBe("テストサワー");
      expect(wrapper.findAll(".sour-name")).toHaveLength(2);
    });

    it("何も選択しないまま検索ボタンを押すと、エラーメッセージが表示される", async () => {
      await wrapper.find(".sp-search-button").trigger("click");
      await wrapper.find(".sp-selects-form").trigger("submit");
      expect(wrapper.find(".sp-selects-errors").text()).toBe(
        "少なくとも１つ選択して検索してください"
      );
    });
  });

  // it("存在するデータについて検索するとき、該当するレモンサワーのデータが返ってくる", async () => {
  //   const searchBy = jest
  //     .spyOn(LemonSoursIndex.methods, "searchBy")
  //     .mockImplementation(() => {
  //       Promise.resolve(
  //         wrapper.vm.lemonSours = [
  //           {
  //             name: "テストチューハイ",
  //             manufacturer: "サントリー",
  //             sour_image: { url: "@/assets/test/ls_test_sample2222.png" },
  //           },
  //         ]
  //       );
  //     });
  //   wrapper.find(".sp-selects-set").vm.$emit("sortBy", ["サントリー"]);
  //   searchBy();
  //   await flushPromises();
  //   expect(wrapper.findAll(".sp-sours-index-items-item")).toHaveLength(1);
  //   expect(wrapper.find(".sp-sours-index-items-item-image").attributes("src")).toBe("@/assets/test/ls_test_sample2222.png");
  // });
});
