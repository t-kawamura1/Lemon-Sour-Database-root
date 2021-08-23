<template>
  <div class="pc-sours-index-container">
    <div class="pc-sours-index-container-heading">
      <slot name="pc-heading"></slot>
    </div>
    <div class="pc-sours-index-container-selects-set">
      <slot name="pc-selects-set"></slot>
    </div>
    <div class="pc-sours-index-container-index-items">
      <slot name="pc-sours-index-items"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pc-sours-index-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  .pc-sours-index-container-heading {
    margin-bottom: 45px;
  }
  .pc-sours-index-container-selects-set {
    margin-bottom: 30px;
  }
}
</style>
