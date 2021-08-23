<template>
  <div class="template-pc-user-password-reset">
    <div class="pc-user-password-reset-side-blank-left">
      <slot name="side-blank-left"></slot>
    </div>
    <div class="pc-user-password-reset-notice">
      <slot name="notice"></slot>
    </div>
    <div class="pc-user-password-reset-main">
      <slot name="user-password-reset-container"></slot>
    </div>
    <div class="pc-user-password-reset-side-blank-right">
      <slot name="side-blank-right"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-pc-user-password-reset {
  display: flex;
  flex-direction: column;
  .pc-user-password-reset-side-blank-left {
    position: fixed;
    top: 0;
    left: 0;
  }
  .pc-user-password-reset-notice {
    z-index: $z-notice-pc;
    position: fixed;
    width: 100%;
  }
  .pc-user-password-reset-main {
    padding: 75px 30px 60px;
    margin: 0 $sidebar-width / 2;
  }
  .pc-user-password-reset-side-blank-right {
    position: fixed;
    top: 0;
    right: 0;
    z-index: $z-sidebar;
  }
}
</style>
