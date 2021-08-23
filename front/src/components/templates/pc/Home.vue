<template>
  <div class="template-pc-home">
    <div class="pc-home-modal">
      <slot name="modal"></slot>
    </div>
    <div class="pc-home-sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="pc-home-notice">
      <slot name="notice"></slot>
    </div>
    <div class="pc-home-main">
      <div class="pc-home-container">
        <slot name="pc-home-container"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-pc-home {
  display: flex;
  flex-direction: column;
  .pc-home-sidebar {
    position: fixed;
    z-index: $z-sidebar;
  }
  .pc-home-notice {
    z-index: $z-notice-pc;
    position: fixed;
    width: 100%;
  }
}
</style>
