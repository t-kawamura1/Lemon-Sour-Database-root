<template>
  <div class="sp-sours-index-container">
    <div class="sp-sours-index-container-heading">
      <slot name="sp-heading"></slot>
    </div>
    <div class="sp-sours-index-container-selects-set">
      <slot name="sp-selects-set"></slot>
    </div>
    <div class="sp-sours-index-container-index-items">
      <slot name="sp-sours-index-items"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sp-sours-index-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  .sp-sours-index-container-heading {
    margin-bottom: 20px;
  }
  .sp-sours-index-container-selects-set {
    margin-bottom: 20px;
  }
}
</style>
