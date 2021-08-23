<template>
  <div class="modal-user">
    <overlay>
      <div class="modal-user-content">
        <button-close
          class="modal-user-button-close"
          @close="$emit('modal', modalUserContents[0])"
        ></button-close>
        <modal-title
          class="modal-user-title"
          :modal-title-text="modalUserContents[0]"
        ></modal-title>
        <form
          class="modal-user-form"
          @submit.prevent="$emit('submitUser', userData)"
        >
          <error-message
            class="modal-user-error-message"
            v-for="(errorMessage, index) in errorMessages"
            :key="`error-${index}`"
            :error-message-text="errorMessage"
          ></error-message>
          <input-text
            class="modal-user-input-text"
            ref="focusThis"
            v-for="(inputAttributesArray, index) in modalUserContents[1]"
            :key="`input-${index}`"
            :input-attributes="inputAttributesArray"
            @input="substituteUserData"
          ></input-text>
          <button-user-submit
            class="modal-user-button-submit"
            :user-submit-text="modalUserContents[2]"
          ></button-user-submit>
        </form>
        <div v-if="modalUserContents[0] == 'ログイン'">
          <div class="modal-user-replace-modal" @click="$emit('replace')">
            新規登録はこちら
          </div>
          <div class="modal-user-forgot-password" @click="isActive = !isActive">
            パスワードをお忘れですか？
          </div>
          <form
            v-show="isActive"
            class="modal-user-form-reset"
            @submit.prevent="$emit('resetPassword', userEmailForReset)"
          >
            <error-message
              class="modal-user-error-message-reset"
              v-for="(errorMessageReset, index) in errorMessagesReset"
              :key="`error-reset-${index}`"
              :error-message-text="errorMessageReset"
            ></error-message>
            <input-text
              class="modal-user-input-text-reset"
              :input-attributes="modalUserContents[1][0]"
              @input="substituteUserEmail"
            ></input-text>
            <button-user-submit
              class="modal-user-button-submit-reset"
              :user-submit-text="modalUserContents[3]"
            ></button-user-submit>
          </form>
        </div>
      </div>
    </overlay>
  </div>
</template>

<script>
import Overlay from "@/components/atoms/Overlay";
import ButtonClose from "@/components/atoms/ButtonClose";
import ModalTitle from "@/components/atoms/ModalTitle";
import InputText from "@/components/atoms/InputText";
import ButtonUserSubmit from "@/components/atoms/ButtonUserSubmit";
import ErrorMessage from "@/components/atoms/ErrorMessage";

export default {
  components: {
    Overlay,
    ButtonClose,
    ModalTitle,
    InputText,
    ButtonUserSubmit,
    ErrorMessage,
  },
  props: {
    modalUserContents: Array,
    errorMessages: Array,
    errorMessagesReset: Array,
  },
  data() {
    return {
      userData: {
        name: "",
        email: "",
        password: "",
      },
      userEmailForReset: "",
      isActive: false,
    };
  },
  methods: {
    substituteUserData($event) {
      if ($event.target.name == "name") {
        this.userData.name = $event.target.value;
      } else if ($event.target.name == "email") {
        this.userData.email = $event.target.value;
      } else if ($event.target.name == "password") {
        this.userData.password = $event.target.value;
      }
    },
    substituteUserEmail($event) {
      this.userEmailForReset = $event.target.value;
    },
  },
  // 親でv-ifにした上で、このタイミング + nextTickでしかfocusされなかった。
  beforeMount() {
    this.$nextTick(() => {
      this.$refs.focusThis[0].$el.focus();
    });
  },
};
</script>

<style scoped lang="scss">
.modal-user {
  .modal-user-content {
    color: $second-dark-yellow;
    background-color: white;
    width: 300px;
    z-index: $z-modal;
    position: relative;
    padding: 36px 30px;
    border-radius: 3%;
    .modal-user-button-close {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .modal-user-title {
      margin-bottom: 30px;
    }
    .modal-user-form {
      display: flex;
      flex-flow: column;
      align-items: center;
      margin-bottom: 15px;
      .modal-user-error-message {
        font-size: 1.4rem;
        text-align: left;
      }
      .modal-user-input-text {
        margin-top: 6px;
      }
      .modal-user-button-submit {
        margin-top: 15px;
      }
    }
    .modal-user-replace-modal,
    .modal-user-forgot-password {
      cursor: pointer;
      font-size: 1.4rem;
      margin: 20px auto 20px;
      width: 190px;
      &:hover {
        color: $darkest-yellow;
      }
    }
    .modal-user-form-reset {
      display: flex;
      flex-flow: column;
      align-items: center;
      .modal-user-error-message-reset {
        font-size: 1.4rem;
        text-align: left;
        margin-bottom: 6px;
      }
      .modal-user-button-submit-reset {
        margin-top: 15px;
      }
    }
  }
}
</style>
