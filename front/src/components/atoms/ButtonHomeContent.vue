<template>
  <button
    class="button-home-content"
    @click="$emit('linkOrModal', homeContentText)"
  >
    <span class="button-home-content-arrow"></span>
    {{ homeContentText }}
  </button>
</template>

<script>
export default {
  props: {
    homeContentText: String,
  },
};
</script>

<style scoped lang="scss">
.button-home-content {
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
  .button-home-content-arrow {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-top: 2px solid white;
    border-right: 2px solid white;
    transform: rotate(45deg);
    margin-right: 6px;
  }
}
</style>
