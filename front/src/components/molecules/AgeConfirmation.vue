<template>
  <div class="age-confirmation">
    <icon class="age-confirmation-icon" :icon-text="warningIconText"></icon>
    <div class="age-confirmation-text-box">
      <text-main
        class="age-confirmation-text"
        v-for="(ageConfirmationText, index) in ageConfirmationTexts"
        :key="`text-${index}`"
        :main-text="ageConfirmationText"
      ></text-main>
    </div>
    <button-age-confirmation
      class="age-confirmation-button"
      v-for="(buttonText, index) in buttonTexts"
      :key="`button-${index}`"
      :button-answer-text="buttonText"
      @answer="$emit('check', $event)"
    ></button-age-confirmation>
  </div>
</template>

<script>
import Icon from "@/components/atoms/Icon";
import TextMain from "@/components/atoms/TextMain";
import ButtonAgeConfirmation from "@/components/atoms/ButtonAgeConfirmation";

export default {
  components: {
    Icon,
    TextMain,
    ButtonAgeConfirmation,
  },
  props: {
    warningIconText: String,
    ageConfirmationTexts: Array,
    buttonTexts: Array,
  },
};
</script>

<style scoped lang="scss">
.age-confirmation {
  display: flex;
  flex-direction: column;
  align-items: center;
  .age-confirmation-icon {
    margin-bottom: 45px;
    color: $little-deep-yellow;
    font-size: 9rem;
  }
  .age-confirmation-text-box {
    margin-bottom: 30px;
    .age-confirmation-text {
      margin-bottom: 15px;
      font-size: 1.8rem;
    }
  }
  .age-confirmation-button {
    margin-bottom: 20px;
  }
}
</style>
