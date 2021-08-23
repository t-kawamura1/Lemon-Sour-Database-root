<template>
  <div class="zero-flag" v-if="flagSet[1]">
    {{ flagSet[0] }}
  </div>
</template>

<script>
export default {
  props: {
    flagSet: Array,
  },
};
</script>

<style scoped lang="scss">
.zero-flag {
  display: inline-block;
  background: $base-yellow;
  width: $sour-column-width / 2 - 10px;
  height: 30px;
  line-height: 30px;
  color: $dark-green;
  letter-spacing: 2px;
  border: solid 1px $light-green;
}
</style>
