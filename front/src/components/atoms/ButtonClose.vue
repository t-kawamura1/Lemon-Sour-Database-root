<template>
  <button class="button-close" @click="$emit('close')">
    <font-awesome-icon icon="times" />
  </button>
</template>

<style scoped lang="scss">
.button-close {
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: $font-color-bg-white;
}
</style>
