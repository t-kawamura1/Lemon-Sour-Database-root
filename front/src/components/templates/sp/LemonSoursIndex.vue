<template>
  <div class="template-sp-lemon-sours-index">
    <div class="sp-lemon-sours-index-modal">
      <slot name="modal"></slot>
    </div>
    <div class="sp-lemon-sours-index-header">
      <slot name="header"></slot>
    </div>
    <div class="sp-lemon-sours-index-notice">
      <slot name="notice"></slot>
    </div>
    <div class="sp-lemon-sours-index-main">
      <slot name="sp-sours-index-container"></slot>
    </div>
    <div class="sp-lemon-sours-index-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-sp-lemon-sours-index {
  display: flex;
  flex-direction: column;
  .sp-lemon-sours-index-header {
    position: fixed;
    width: 100%;
    height: $header-height;
    z-index: $z-header;
  }
  .sp-lemon-sours-index-notice {
    position: fixed;
    width: 100%;
    z-index: $z-notice-sp;
  }
  .sp-lemon-sours-index-main {
    padding: 10px;
    margin-top: $header-height;
    margin-bottom: $footer-height;
  }
  .sp-lemon-sours-index-footer {
    position: fixed;
    width: 100%;
    height: $footer-height;
    z-index: $z-footer;
    bottom: 0;
  }
}
</style>
