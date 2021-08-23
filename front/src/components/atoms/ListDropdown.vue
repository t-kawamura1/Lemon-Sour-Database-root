<template>
  <div class="list-dropdown">
    {{ dropdownText }}
  </div>
</template>

<script>
export default {
  props: {
    dropdownText: String,
  },
};
</script>

<style scoped lang="scss">
.list-dropdown {
  font-size: 1.5rem;
  text-align: left;
  width: 120px;
}
</style>
