<template>
  <div class="template-sp-calculation">
    <div class="sp-calculation-modal">
      <slot name="modal"></slot>
    </div>
    <div class="sp-calculation-header">
      <slot name="header"></slot>
    </div>
    <div class="sp-calculation-notice">
      <slot name="notice"></slot>
    </div>
    <div class="sp-calculation-main">
      <slot name="calculation-container"></slot>
    </div>
    <div class="sp-calculation-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-sp-calculation {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  .sp-calculation-header {
    position: fixed;
    width: 100%;
    height: $header-height;
    z-index: $z-header;
  }
  .sp-calculation-notice {
    position: fixed;
    width: 100%;
    z-index: $z-notice-sp;
  }
  .sp-calculation-main {
    margin-top: $header-height;
    margin-bottom: $footer-height;
    padding: 10px;
  }
  .sp-calculation-footer {
    position: fixed;
    width: 100%;
    height: $footer-height;
    z-index: $z-footer;
    bottom: 0;
  }
}
</style>
