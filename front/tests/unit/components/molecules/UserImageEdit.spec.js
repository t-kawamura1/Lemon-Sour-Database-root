import { mount } from "@vue/test-utils";
import UserImageEdit from "@/components/molecules/UserImageEdit";

describe("UserImageEdit component test", () => {
  const setImageMock = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = mount(UserImageEdit, {
      propsData: {
        imageEditContents: {
          icon: "photo",
          image_url: {
            url: "https://hoge.jp",
          },
          button: "変更を保存",
        },
        errorMessages: ["画像がないよ", "なんかエラー"],
      },
      stubs: ["font-awesome-icon"],
    });
  });

  it("errorMessagesの要素の数だけ、error-messageコンポーネントをリストレンダリングする", () => {
    expect(wrapper.findAll(".error-message")).toHaveLength(2);
  });

  it("imageEditContents[0]を子コンポーネントに渡している", () => {
    expect(wrapper.find("font-awesome-icon-stub").attributes("icon")).toBe(
      "photo"
    );
  });

  it("imageEditContents[1]を子コンポーネントに渡している", () => {
    expect(wrapper.find("img").attributes("src")).toBe("https://hoge.jp");
  });

  it("imageEditContents[2]を子コンポーネントに渡している", () => {
    expect(wrapper.find(".user-image-edit-button-submit").text()).toBe(
      "変更を保存"
    );
  });

  it("inputのchangeイベントが発火すると、setImageメソッドが呼び出される", async () => {
    wrapper.setMethods({ setImage: setImageMock });
    expect(setImageMock.mock.calls.length).toBe(0);
    await wrapper.find("#user-image-edit-input-file").trigger("change");
    expect(setImageMock.mock.calls.length).toBe(1);
  });

  describe("ボタンを押すと、checkForImageメソッドが発火し、", () => {
    it("inputImageにデータが入っていれば、submitUserImageイベントとそのinputImageをemitする", async () => {
      wrapper.vm.inputImage = "test_tomio_jpg";
      await wrapper.find(".user-image-edit-button-submit").trigger("click");
      await wrapper.find(".user-image-edit-form").trigger("submit");
      expect(wrapper.emitted().submitUserImage).toBeTruthy();
      expect(wrapper.emitted().submitUserImage[0][0]).toBe("test_tomio_jpg");
    });

    it("inputImageにデータが入っていなければ、新たなエラーメッセージを表示する", async () => {
      wrapper.vm.inputImage = null;
      await wrapper.find(".user-image-edit-button-submit").trigger("click");
      await wrapper.find(".user-image-edit-form").trigger("submit");
      expect(
        wrapper.findAll(".user-image-edit-error-message").at(2).text()
      ).toBe("新しい画像が添付されていません");
    });
  });
});
