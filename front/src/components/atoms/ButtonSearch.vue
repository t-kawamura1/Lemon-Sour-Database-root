<template>
  <button class="button-search" type="submit">
    <font-awesome-icon icon="search-plus" />
    <span class="button-search-text">絞り込み</span>
  </button>
</template>

<style scoped lang="scss">
.button-search {
  cursor: pointer;
  background-color: $base-yellow;
  border: 1px solid $second-dark-yellow;
  color: $second-dark-yellow;
  border-radius: 6px;
  width: 100px;
  &:hover {
    background-color: $second-dark-yellow;
    color: $base-yellow;
  }
  .button-search-text {
    margin-left: 6px;
  }
}
</style>
