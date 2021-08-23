<template>
  <div class="template-sp-lemon-sour">
    <div class="sp-lemon-sour-modal">
      <slot name="modal"></slot>
    </div>
    <div class="sp-lemon-sour-header">
      <slot name="header"></slot>
    </div>
    <div class="sp-lemon-sour-notice">
      <slot name="notice"></slot>
    </div>
    <div class="sp-lemon-sour-main">
      <div class="sp-sour-container">
        <slot name="sour-container"></slot>
      </div>
      <div class="sp-lemon-sour-review-container">
        <slot name="review-container"></slot>
      </div>
    </div>
    <div class="sp-lemon-sour-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-sp-lemon-sour {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  .sp-lemon-sour-header {
    position: fixed;
    width: 100%;
    height: $header-height;
    z-index: $z-header;
  }
  .sp-lemon-sour-notice {
    position: fixed;
    width: 100%;
    z-index: $z-notice-sp;
  }
  .sp-lemon-sour-main {
    padding: 10px;
    margin-top: $header-height;
    margin-bottom: $footer-height;
  }
  .sp-lemon-sour-footer {
    position: fixed;
    width: 100%;
    height: $footer-height;
    z-index: $z-footer;
    bottom: 0;
  }
}
</style>
