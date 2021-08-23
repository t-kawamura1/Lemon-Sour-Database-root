<template>
  <button class="button-delete" @click="$emit('delete')">
    {{ buttonDeleteText }}
  </button>
</template>

<script>
export default {
  props: {
    buttonDeleteText: String,
  },
};
</script>

<style scoped lang="scss">
.button-delete {
  cursor: pointer;
  background-color: $base-yellow-complementary;
  color: $lightest-yellow;
  border: 1px solid $base-yellow-complementary;
  border-radius: 6px;
  padding: 6px 9px;
  font-size: 1.6rem;
  &:hover {
    background-color: white;
    border: 1px solid $base-yellow-complementary;
    color: $base-yellow-complementary;
  }
}
</style>
