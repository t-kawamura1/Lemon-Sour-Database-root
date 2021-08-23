<template>
  <input
    class="input-text"
    :type="inputAttributes[0]"
    :placeholder="inputAttributes[1]"
    :name="inputAttributes[2]"
    :value="inputAttributes[3]"
    @change="$emit('input', $event)"
  />
</template>

<script>
export default {
  props: {
    inputAttributes: Array,
  },
};
</script>

<style scoped lang="scss">
.input-text {
  width: 100%;
  height: 40px;
  border: 1px solid $second-dark-yellow;
  border-radius: 10px;
  font-size: 1.4rem;
  padding: 0 10px;
}
</style>
