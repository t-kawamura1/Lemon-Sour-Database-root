<template>
  <input
    class="input-month"
    type="month"
    @change="$emit('input', $event.target.value)"
    :value="valueText"
  />
</template>

<script>
export default {
  props: {
    valueText: String,
  },
};
</script>

<style scoped lang="scss">
.input-month {
  border: 1px solid $second-dark-yellow;
  border-radius: 6px;
  padding: 6px;
  width: 210px;
}
</style>
