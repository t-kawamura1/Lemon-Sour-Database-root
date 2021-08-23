import { mount } from "@vue/test-utils";
import HeaderIconsAuthenticated from "@/components/molecules/HeaderIconsAuthenticated";

describe("HeaderIconsAuthenticated component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(HeaderIconsAuthenticated, {
      propsData: {
        headerIcons: ["lemon", "address-card"],
        dropdownFunctions: ["テストユーザー機能", "テストログアウト"],
      },
      stubs: ["font-awesome-icon"],
    });
  });

  it("headerIconsの要素の数だけ、リストレンダリングする", () => {
    expect(wrapper.findAll(".icon")).toHaveLength(2);
  });

  it("dropdownFunctionsの要素の数だけlist-downがある", () => {
    expect(wrapper.findAll(".list-dropdown")).toHaveLength(2);
  });

  it("最初のアイコンをクリックすると、linkイベントとそのアイコン名がemitされる", async () => {
    await wrapper.findAll(".icon").at(0).trigger("click");
    expect(wrapper.emitted().link).toBeTruthy();
    expect(wrapper.emitted().link[0][0]).toStrictEqual("lemon");
  });

  it("2つ目のアイコンをクリックすると、isActiveがtrueになる", async () => {
    await wrapper.findAll(".authenticated-header-icon2").trigger("click");
    expect(wrapper.vm.isActive).toBe(true);
  });

  it("1つ目のドロップダウンリストをクリックすると、clickイベントとその機能名がemitされる", async () => {
    await wrapper
      .findAll(".authenticated-header-icon-dropdown-list")
      .at(0)
      .trigger("click");
    expect(wrapper.emitted().link).toBeTruthy();
    expect(wrapper.emitted().link[0][0]).toStrictEqual("テストユーザー機能");
  });

  it("2つ目のドロップダウンリストをクリックすると、submitUserイベントがemitされる", async () => {
    await wrapper
      .findAll(".authenticated-header-icon-dropdown-list")
      .at(1)
      .trigger("click");
    expect(wrapper.emitted().submitUser).toBeTruthy();
  });
});
