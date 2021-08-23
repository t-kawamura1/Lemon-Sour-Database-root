<template>
  <div class="template-sp-user">
    <div class="sp-user-modal">
      <slot name="modal"></slot>
    </div>
    <div class="sp-user-header">
      <slot name="header"></slot>
    </div>
    <div class="sp-user-notice">
      <slot name="notice"></slot>
    </div>
    <div class="sp-user-main">
      <slot name="user-container"></slot>
    </div>
    <div class="sp-user-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-sp-user {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  .sp-user-header {
    position: fixed;
    width: 100%;
    height: $header-height;
    z-index: $z-header;
  }
  .sp-user-notice {
    position: fixed;
    width: 100%;
    z-index: $z-notice-sp;
  }
  .sp-user-main {
    margin-top: $header-height;
    margin-bottom: $footer-height;
    padding: 10px 30px;
  }
  .sp-user-footer {
    position: fixed;
    width: 100%;
    height: $footer-height;
    z-index: $z-footer;
    bottom: 0;
  }
}
</style>
