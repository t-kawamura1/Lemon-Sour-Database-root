<template>
  <div class="template-pc-user">
    <div class="pc-user-modal">
      <slot name="modal"></slot>
    </div>
    <div class="pc-user-sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="pc-user-notice">
      <slot name="notice"></slot>
    </div>
    <div class="pc-user-main">
      <slot name="user-container"></slot>
    </div>
    <div class="pc-user-side-blank">
      <slot name="side-blank"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-pc-user {
  .pc-user-sidebar {
    position: fixed;
    z-index: $z-sidebar;
  }
  .pc-user-notice {
    z-index: $z-notice-pc;
    position: fixed;
    width: 100%;
  }
  .pc-user-main {
    margin: 0 $sidebar-width / 2 0 $sidebar-width;
    padding: 75px 10px 60px;
  }
  .pc-user-side-blank {
    position: fixed;
    top: 0;
    right: 0;
    z-index: $z-sidebar;
  }
}
</style>
