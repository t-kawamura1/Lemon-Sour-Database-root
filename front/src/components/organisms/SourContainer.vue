<template>
  <div class="sour-container">
    <div class="sour-container-sour-display">
      <slot name="sour-display"></slot>
    </div>
    <div class="sour-container-sour-flags">
      <slot name="sour-flags"></slot>
    </div>
    <div class="sour-container-sour-attributes">
      <slot name="sour-attributes"></slot>
    </div>
    <div class="sour-container-button-drink-today">
      <slot name="button-drink-today"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sour-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .sour-container-sour-display {
    margin-bottom: 30px;
  }
  .sour-container-sour-flags {
    margin-bottom: 30px;
  }
  .sour-container-sour-attributes {
    margin-bottom: 30px;
  }
}
</style>
