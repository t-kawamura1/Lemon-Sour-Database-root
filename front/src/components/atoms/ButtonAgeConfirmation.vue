<template>
  <button
    class="button-age-confirmation"
    @click="$emit('answer', buttonAnswerText)"
  >
    {{ buttonAnswerText }}
  </button>
</template>

<script>
export default {
  props: {
    buttonAnswerText: String,
  },
};
</script>

<style scoped lang="scss">
.button-age-confirmation {
  cursor: pointer;
  background-color: $base-yellow-complementary;
  color: white;
  border: 1px solid $base-yellow-complementary;
  border-radius: 6px;
  padding: 3px 0;
  width: 230px;
  font-size: 1.6rem;
  letter-spacing: 1px;
  &:hover {
    background-color: $aged-yellow;
    border: 1px solid $aged-yellow;
  }
}
</style>
