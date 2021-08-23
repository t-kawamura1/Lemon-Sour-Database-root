<template>
  <div class="template-pc-drinking-record">
    <div class="pc-drinking-record-sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="pc-drinking-record-notice">
      <slot name="notice"></slot>
    </div>
    <div class="pc-drinking-record-main">
      <slot name="drinking-record-container"></slot>
    </div>
    <div class="pc-drinking-record-side-blank">
      <slot name="side-blank"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-pc-drinking-record {
  .pc-drinking-record-sidebar {
    position: fixed;
    z-index: $z-sidebar;
  }
  .pc-drinking-record-notice {
    z-index: $z-notice-pc;
    position: fixed;
    width: 100%;
  }
  .pc-drinking-record-main {
    margin: 0 $sidebar-width / 2 0 $sidebar-width;
    padding: 75px 30px 60px;
  }
  .pc-drinking-record-side-blank {
    position: fixed;
    top: 0;
    right: 0;
    z-index: $z-sidebar;
  }
}
</style>
