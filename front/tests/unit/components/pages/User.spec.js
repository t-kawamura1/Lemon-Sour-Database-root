import { mount } from "@vue/test-utils";
import User from "@/components/pages/User";
import flushPromises from "flush-promises";

let wrapper;
let $mq;
let $router;
let $route;
let userData;
let inputImage;

beforeEach(() => {
  $router = { path: "" };
  $route = { name: "" };
  userData = {
    name: "テストユーザー",
    email: "test@sample.com",
    current_password: "",
    password: "",
  };
  inputImage = "image-file";
});

describe("(pc display) User component test", () => {
  beforeEach(() => {
    $mq = "pc";
    wrapper = mount(User, {
      mocks: {
        $mq,
        $router,
        $route,
      },
      stubs: ["font-awesome-icon"],
      propsData: {
        currentUser: {
          name: "テストユーザー",
          email: "test@sample.com",
          user_image: "/image/test.png",
        },
      },
    });
  });

  it("画像の変更が受け付けられると、通知メッセージが表示される", async () => {
    const editUserImage = jest
      .spyOn(User.methods, "editUserImage")
      .mockImplementation(() => {
        wrapper.setData({ noticeMessage: "画像の変更受付" });
      });
    console.log(wrapper.html());
    await wrapper.find(".user-image-edit-form").trigger("submit");
    wrapper.find(".user-image-edit").vm.$emit("submitUserImage", inputImage);
    editUserImage();
    expect(editUserImage).toHaveBeenCalled();
    await flushPromises();
    expect(wrapper.find(".the-notice").text()).toBe("画像の変更受付");
  });

  it("入力欄に現在のパスワードが入力されていないとエラーが表示される", async () => {
    const editUser = jest
      .spyOn(User.methods, "editUser")
      .mockImplementation(() => {
        wrapper.setData({ userEditErrors: ["現在のパスワード未入力エラー"] });
      });
    // ことごとく上手く行かないので、やむなく人為的にモックメソッドを呼び出した。
    await wrapper.find(".user-edit-form").trigger("submit");
    wrapper.find(".user-edit").vm.$emit("submitUser", userData);
    editUser();
    expect(editUser).toHaveBeenCalled();
    await flushPromises();
    expect(wrapper.find(".user-edit-error-message").text()).toBe(
      "現在のパスワード未入力エラー"
    );
  });

  it("ユーザー名、メールアドレスが入力されていないとエラーが表示される", async () => {
    userData.name = "";
    userData.email = "";
    userData.current_password = "testpassword";
    const editUser = jest
      .spyOn(User.methods, "editUser")
      .mockImplementation(() => {
        wrapper.setData({
          userEditErrors: ["ユーザー名未入力", "メルアド未入力"],
        });
      });
    await wrapper.find(".user-edit-form").trigger("submit");
    wrapper.find(".user-edit").vm.$emit("submitUser", userData);
    editUser();
    expect(editUser).toHaveBeenCalled();
    await flushPromises();
    expect(wrapper.findAll(".user-edit-error-message")).toHaveLength(2);
    expect(wrapper.findAll(".user-edit-error-message").at(0).text()).toBe(
      "ユーザー名未入力"
    );
    expect(wrapper.findAll(".user-edit-error-message").at(1).text()).toBe(
      "メルアド未入力"
    );
  });

  it("現在のパスワードを入力すると、変更が受け付けられる", async () => {
    userData.current_password = "testpassword";
    const editUser = jest
      .spyOn(User.methods, "editUser")
      .mockImplementation(() => {
        wrapper.setData({ noticeMessage: "変更受付" });
      });
    await wrapper.find(".user-edit-form").trigger("submit");
    wrapper.find(".user-edit").vm.$emit("submitUser", userData);
    editUser();
    expect(editUser).toHaveBeenCalled();
    await flushPromises();
    expect(wrapper.find(".the-notice").text()).toBe("変更受付");
  });

  it("「ユーザーアカウント削除」をクリックするとモーダルが現れ、削除ボタンを押すとホームページへ遷移する", async () => {
    const deleteUser = jest
      .spyOn(User.methods, "deleteUser")
      .mockImplementation(() => {
        wrapper.vm.$router.path = "/";
      });
    await wrapper.find(".user-edit-delete").trigger("click");
    expect(wrapper.find(".modal-delete-user").exists()).toBeTruthy();
    await wrapper.find(".modal-delete-user-button-submit").trigger("click");
    deleteUser();
    expect(deleteUser).toHaveBeenCalled();
    expect(wrapper.vm.$router.path).toBe("/");
  });
});

describe("(sp display) User component test", () => {
  beforeEach(() => {
    $mq = "sp";
    wrapper = mount(User, {
      mocks: {
        $mq,
        $router,
        $route,
      },
      stubs: ["font-awesome-icon"],
      propsData: {
        currentUser: {
          name: "テストユーザー",
          email: "test@sample.com",
          user_image: "/image/test.png",
        },
      },
    });
  });

  it("画像の変更が受け付けられると、通知メッセージが表示される", async () => {
    const editUserImage = jest
      .spyOn(User.methods, "editUserImage")
      .mockImplementation(() => {
        wrapper.setData({ noticeMessage: "画像の変更受付" });
      });
    console.log(wrapper.html());
    await wrapper.find(".user-image-edit-form").trigger("submit");
    wrapper.find(".user-image-edit").vm.$emit("submitUserImage", inputImage);
    editUserImage();
    expect(editUserImage).toHaveBeenCalled();
    await flushPromises();
    expect(wrapper.find(".the-notice").text()).toBe("画像の変更受付");
  });

  it("入力欄に現在のパスワードが入力されていないとエラーが表示される", async () => {
    const editUser = jest
      .spyOn(User.methods, "editUser")
      .mockImplementation(() => {
        wrapper.setData({ userEditErrors: ["現在のパスワード未入力エラー"] });
      });
    await wrapper.find(".user-edit-form").trigger("submit");
    wrapper.find(".user-edit").vm.$emit("submitUser", userData);
    editUser();
    expect(editUser).toHaveBeenCalled();
    await flushPromises();
    expect(wrapper.find(".user-edit-error-message").text()).toBe(
      "現在のパスワード未入力エラー"
    );
  });

  it("ユーザー名、メールアドレスが入力されていないとエラーが表示される", async () => {
    userData.name = "";
    userData.email = "";
    userData.current_password = "testpassword";
    const editUser = jest
      .spyOn(User.methods, "editUser")
      .mockImplementation(() => {
        wrapper.setData({
          userEditErrors: ["ユーザー名未入力", "メルアド未入力"],
        });
      });
    await wrapper.find(".user-edit-form").trigger("submit");
    wrapper.find(".user-edit").vm.$emit("submitUser", userData);
    editUser();
    expect(editUser).toHaveBeenCalled();
    await flushPromises();
    expect(wrapper.findAll(".user-edit-error-message")).toHaveLength(2);
    expect(wrapper.findAll(".user-edit-error-message").at(0).text()).toBe(
      "ユーザー名未入力"
    );
    expect(wrapper.findAll(".user-edit-error-message").at(1).text()).toBe(
      "メルアド未入力"
    );
  });

  it("現在のパスワードを入力すると、変更が受け付けられる", async () => {
    userData.current_password = "testpassword";
    const editUser = jest
      .spyOn(User.methods, "editUser")
      .mockImplementation(() => {
        wrapper.setData({ noticeMessage: "変更受付" });
      });
    await wrapper.find(".user-edit-form").trigger("submit");
    wrapper.find(".user-edit").vm.$emit("submitUser", userData);
    editUser();
    expect(editUser).toHaveBeenCalled();
    await flushPromises();
    expect(wrapper.find(".the-notice").text()).toBe("変更受付");
  });

  it("「ユーザーアカウント削除」をクリックするとモーダルが現れ、削除ボタンを押すとホームページへ遷移する", async () => {
    const deleteUser = jest
      .spyOn(User.methods, "deleteUser")
      .mockImplementation(() => {
        wrapper.vm.$router.path = "/";
      });
    await wrapper.find(".user-edit-delete").trigger("click");
    expect(wrapper.find(".modal-delete-user").exists()).toBeTruthy();
    await wrapper.find(".modal-delete-user-button-submit").trigger("click");
    deleteUser();
    expect(deleteUser).toHaveBeenCalled();
    expect(wrapper.vm.$router.path).toBe("/");
  });
});
