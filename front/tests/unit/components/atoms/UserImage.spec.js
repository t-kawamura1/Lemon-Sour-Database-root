import { mount } from "@vue/test-utils";
import UserImage from "@/components/atoms/UserImage";

describe("UserImage component test", () => {
  let wrapper;

  describe("UserImageUrl propsにデータが入っている場合、", () => {
    it("imgタグのsrc属性には画像データのパスが入る", () => {
      wrapper = mount(UserImage, {
        propsData: {
          userImageUrl: "@/assets/test/user_test_sample.png",
        },
      });
      expect(wrapper.findAll("img").at(0).attributes("src")).toBe(
        "@/assets/test/user_test_sample.png"
      );
    });
  });

  describe("UserImageUrl propsにデータが入っていない場合、", () => {
    it("imgタグのsrc属性にはデフォルトの画像データのパスが入る", () => {
      wrapper = mount(UserImage, {
        propsData: {
          userImageUrl: null,
        },
      });
      expect(wrapper.findAll("img").at(0).attributes("src")).toBe(
        "~@/assets/image/default.jpg"
      );
    });
  });
});
