<template>
  <div class="password-reset">
    <form
      class="password-reset-form"
      @submit.prevent="$emit('submitUser', passwordSet)"
    >
      <error-message
        class="password-reset-error-message"
        v-for="(errorMessage, index) in errorMessages"
        :key="`error-${index}`"
        :error-message-text="errorMessage"
      ></error-message>
      <input-text
        class="password-reset-input-text"
        ref="focusThis"
        v-for="(inputAttributesArray, index) in passwordResetContents[0]"
        :key="`input-${index}`"
        :input-attributes="inputAttributesArray"
        @input="substitutePasswordSet"
      ></input-text>
      <button-user-submit
        class="password-reset-button-submit"
        :user-submit-text="passwordResetContents[1]"
      ></button-user-submit>
    </form>
  </div>
</template>

<script>
import InputText from "@/components/atoms/InputText";
import ButtonUserSubmit from "@/components/atoms/ButtonUserSubmit";
import ErrorMessage from "@/components/atoms/ErrorMessage";

export default {
  components: {
    InputText,
    ButtonUserSubmit,
    ErrorMessage,
  },
  props: {
    passwordResetContents: Array,
    errorMessages: Array,
  },
  data() {
    return {
      passwordSet: {
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    substitutePasswordSet($event) {
      if ($event.target.name == "password") {
        this.passwordSet.password = $event.target.value;
      } else if ($event.target.name == "password_confirmation") {
        this.passwordSet.password_confirmation = $event.target.value;
      }
    },
  },
  beforeMount() {
    this.$nextTick(() => {
      this.$refs.focusThis[0].$el.focus();
    });
  },
};
</script>

<style scoped lang="scss">
.password-reset {
  color: $second-dark-yellow;
  .password-reset-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    .password-reset-error-message {
      font-size: 1.4rem;
      text-align: left;
    }
    .password-reset-input-text {
      margin-top: 15px;
    }
    .password-reset-button-submit {
      margin-top: 30px;
    }
  }
}
</style>
