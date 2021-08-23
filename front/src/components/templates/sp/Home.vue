<template>
  <div class="template-sp-home">
    <div class="sp-home-modal">
      <slot name="modal"></slot>
    </div>
    <div class="sp-home-header">
      <slot name="header"></slot>
    </div>
    <div class="sp-home-notice">
      <slot name="notice"></slot>
    </div>
    <div class="sp-home-main">
      <div class="sp-home-container">
        <slot name="sp-home-container"></slot>
      </div>
    </div>
    <div class="sp-home-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-sp-home {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  .sp-home-header {
    position: fixed;
    width: 100%;
    height: $header-height;
    z-index: $z-header;
  }
  .sp-home-notice {
    position: fixed;
    width: 100%;
    z-index: $z-notice-sp;
  }
  .sp-home-main {
    margin-bottom: $footer-height;
  }
  .sp-home-footer {
    position: fixed;
    width: 100%;
    height: $footer-height;
    z-index: $z-footer;
    bottom: 0;
  }
}
</style>
