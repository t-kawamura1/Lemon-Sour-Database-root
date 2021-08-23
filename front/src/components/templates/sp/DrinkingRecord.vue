<template>
  <div class="template-sp-drinking-record">
    <div class="sp-drinking-record-header">
      <slot name="header"></slot>
    </div>
    <div class="sp-drinking-record-notice">
      <slot name="notice"></slot>
    </div>
    <div class="sp-drinking-record-main">
      <slot name="drinking-record-container"></slot>
    </div>
    <div class="sp-drinking-record-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-sp-drinking-record {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  .sp-drinking-record-header {
    position: fixed;
    width: 100%;
    height: $header-height;
    z-index: $z-header;
  }
  .sp-drinking-record-notice {
    position: fixed;
    width: 100%;
    z-index: $z-notice-sp;
  }
  .sp-drinking-record-main {
    margin-top: $header-height;
    margin-bottom: $footer-height;
    padding: 10px;
    z-index: $z-notice-sp;
  }
  .sp-drinking-record-footer {
    position: fixed;
    width: 100%;
    height: $footer-height;
    z-index: $z-footer;
    bottom: 0;
  }
}
</style>
