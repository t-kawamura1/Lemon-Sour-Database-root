<template>
  <button class="button-user-submit" type="submit">
    {{ userSubmitText }}
  </button>
</template>

<script>
export default {
  props: {
    userSubmitText: String,
  },
};
</script>

<style scoped lang="scss">
.button-user-submit {
  cursor: pointer;
  background-color: $dark-green;
  color: white;
  border: none;
  border-radius: 15px;
  width: 170px;
  height: 33px;
  font-size: 1.4rem;
  letter-spacing: 2px;
  &:hover {
    background-color: $light-green;
  }
}
</style>
