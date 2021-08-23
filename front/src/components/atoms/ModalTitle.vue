<template>
  <div class="modal-title">{{ modalTitleText }}</div>
</template>

<script>
export default {
  props: {
    modalTitleText: String,
  },
};
</script>

<style scoped lang="scss">
.modal-title {
  font-size: 2rem;
  font-weight: 700;
  color: $font-color-bg-white;
  &::before,
  &::after {
    content: "";
    display: inline-block;
    vertical-align: top;
    background-color: $little-deep-yellow;
    border: 1px solid $little-deep-yellow;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin: 0 10px;
  }
}
</style>
