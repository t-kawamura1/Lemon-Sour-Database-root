<template>
  <div class="user-image-edit">
    <form class="user-image-edit-form" @submit.prevent="checkForImage">
      <label
        class="user-image-edit-input-label"
        for="user-image-edit-input-file"
      ></label>
      <input
        id="user-image-edit-input-file"
        type="file"
        accept=".jpg, .jpeg, .png"
        @change="setImage"
      />
      <icon
        class="user-image-edit-icon"
        :icon-text="imageEditContents.icon"
      ></icon>
      <user-image
        class="user-image-edit-temp-user-image"
        v-if="!!tempImage"
        :user-image-url="tempImage"
      ></user-image>
      <user-image
        class="user-image-edit-current-user-image"
        v-else
        :user-image-url="imageEditContents.image_url.url"
      ></user-image>
      <error-message
        class="user-image-edit-error-message"
        v-for="(errorMessage, index) in errorMessages"
        :key="index"
        :error-message-text="errorMessage"
      ></error-message>
      <button-user-submit
        class="user-image-edit-button-submit"
        :user-submit-text="imageEditContents.button"
      ></button-user-submit>
    </form>
  </div>
</template>

<script>
import UserImage from "@/components/atoms/UserImage";
import Icon from "@/components/atoms/Icon";
import ErrorMessage from "@/components/atoms/ErrorMessage";
import ButtonUserSubmit from "@/components/atoms/ButtonUserSubmit";

export default {
  components: {
    UserImage,
    Icon,
    ErrorMessage,
    ButtonUserSubmit,
  },
  props: {
    imageEditContents: Object,
    errorMessages: Array,
  },
  data() {
    return {
      tempImage: null,
      inputImage: null,
    };
  },
  methods: {
    setImage(event) {
      this.inputImage = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = () => {
        this.tempImage = fileReader.result;
      };
    },
    checkForImage() {
      if (this.inputImage) {
        this.$emit("submitUserImage", this.inputImage);
      } else {
        this.errorMessages.push("新しい画像が添付されていません");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.user-image-edit {
  color: $second-dark-yellow;
  width: 320px;
  .user-image-edit-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .user-image-edit-input-label {
      position: relative;
      width: 180px;
      height: 180px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.1);
      z-index: $z-user-image-edit-input-label;
      cursor: pointer;
    }
    #user-image-edit-input-file {
      opacity: 0;
    }
    .user-image-edit-icon {
      position: absolute;
      top: 66px;
      z-index: $z-user-image-edit-icon;
      font-size: 5rem;
      color: white;
    }
    .user-image-edit-temp-user-image,
    .user-image-edit-current-user-image {
      position: absolute;
      z-index: $z-user-image-edit-user-image;
    }
    .user-image-edit-error-message {
      font-size: 1.4rem;
      margin-bottom: 15px;
    }
  }
}
</style>
