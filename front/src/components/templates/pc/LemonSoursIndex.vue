<template>
  <div class="template-pc-lemon-sours-index">
    <div class="pc-lemon-sours-index-modal">
      <slot name="modal"></slot>
    </div>
    <div class="pc-lemon-sours-index-sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="pc-lemon-sours-index-notice">
      <slot name="notice"></slot>
    </div>
    <div class="pc-lemon-sours-index-main">
      <slot name="pc-sours-index-container"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-pc-lemon-sours-index {
  display: flex;
  flex-direction: column;
  .pc-lemon-sours-index-sidebar {
    position: fixed;
    z-index: $z-sidebar;
  }
  .pc-lemon-sours-index-notice {
    z-index: $z-notice-pc;
    position: fixed;
    width: 100%;
  }
  .pc-lemon-sours-index-main {
    margin-left: $sidebar-width;
    padding: 75px 30px 60px;
  }
}
</style>
