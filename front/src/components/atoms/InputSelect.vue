<template>
  <select
    class="input-select"
    @change="$emit('input', $event.target.value)"
    v-model="selected"
  >
    <option disabled value="">{{ sortType }}</option>
    <option
      v-for="(sortValue, index) in sortValues"
      :key="index"
      :value="sortValue"
    >
      {{ sortValue }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    sortType: String,
    sortValues: Array,
    initValue: String,
  },
  data() {
    return {
      selected: this.initValue,
    };
  },
};
</script>

<style scoped lang="scss">
.input-select {
  border: 1px solid $second-dark-yellow;
  border-radius: 6px;
}
</style>
