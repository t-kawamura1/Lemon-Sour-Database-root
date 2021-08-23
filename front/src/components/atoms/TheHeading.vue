<template>
  <div class="the-heading">{{ headingText }}</div>
</template>

<script>
export default {
  props: {
    headingText: String,
  },
};
</script>

<style scoped lang="scss">
.the-heading {
  font-weight: 700;
  color: $font-color-bg-white;
  letter-spacing: 1.5px;
  font-size: 2rem;
  &::after {
    content: "";
    display: block;
    margin: 0 auto;
    width: 20%;
    height: 6px;
    border-bottom: 3px dotted $base-yellow-complementary;
  }
}
</style>
