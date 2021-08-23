import { mount } from "@vue/test-utils";
import SidebarMenusAuthenticated from "@/components/molecules/SidebarMenusAuthenticated";

describe("SidebarMenusAuthenticated component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(SidebarMenusAuthenticated, {
      propsData: {
        menuNames: [
          { name: ["アプリの", "機能その０"] },
          { name: ["アプリの", "機能その１"] },
          { name: ["アプリの", "機能その２"] },
          { name: ["ユーザー", "機能"], dropdown: "enabled" },
        ],
        dropdownFunctions: ["テストユーザー機能", "テストログアウト"],
      },
    });
  });

  it("menuNamesの要素の数だけ、リストレンダリングする", () => {
    expect(wrapper.findAll(".authenticated-sidebar-menu")).toHaveLength(4);
  });

  it("ユーザー以外のどれか一つメニューをクリックすると、linkイベントとそのメニュー名がemitされる", async () => {
    await wrapper
      .findAll(".authenticated-menu-without-dropdown")
      .at(0)
      .trigger("click");
    expect(wrapper.emitted().link).toBeTruthy();
    expect(wrapper.emitted().link[0][0]).toStrictEqual([
      "アプリの",
      "機能その０",
    ]);
  });

  it("ユーザーメニューをクリックすると、isActiveがtrueになる", async () => {
    await wrapper.find(".authenticated-menu-with-dropdown").trigger("click");
    expect(wrapper.vm.isActive).toBe(true);
  });

  it("1つ目のドロップダウンリストをクリックすると、linkイベントとその機能名がemitされる", async () => {
    await wrapper
      .findAll(".authenticated-menu-dropdown-list")
      .at(0)
      .trigger("click");
    expect(wrapper.emitted().link).toBeTruthy();
    expect(wrapper.emitted().link[0][0]).toStrictEqual("テストユーザー機能");
  });

  it("2つ目のドロップダウンリストをクリックすると、submitUserイベントがemitされる", async () => {
    await wrapper
      .findAll(".authenticated-menu-dropdown-list")
      .at(1)
      .trigger("click");
    expect(wrapper.emitted().submitUser).toBeTruthy();
  });
});
