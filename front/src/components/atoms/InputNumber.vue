<template>
  <input
    class="input-number"
    type="number"
    :placeholder="inputNumberAttributes[0]"
    :step="inputNumberAttributes[1]"
    :min="inputNumberAttributes[2]"
    :max="inputNumberAttributes[3]"
    @change="$emit('input', $event)"
    :value="input"
  />
</template>

<script>
export default {
  props: {
    inputNumberAttributes: Array,
    initValue: Number,
  },
  data() {
    return {
      input: this.initValue,
    };
  },
};
</script>

<style scoped lang="scss">
.input-number {
  border: 1px solid $second-dark-yellow;
  border-radius: 6px;
}
</style>
