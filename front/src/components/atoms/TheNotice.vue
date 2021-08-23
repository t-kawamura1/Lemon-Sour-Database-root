<template>
  <div class="the-notice">{{ noticeText }}</div>
</template>

<script>
export default {
  props: {
    noticeText: String,
  },
};
</script>

<style scoped lang="scss">
.the-notice {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: $light-green;
  color: $darkest-yellow;
  padding: 0 63px;
  height: $header-height;
}
</style>
