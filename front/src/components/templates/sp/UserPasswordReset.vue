<template>
  <div class="template-sp-user-password-reset">
    <div class="sp-user-password-reset-notice">
      <slot name="notice"></slot>
    </div>
    <div class="sp-user-password-reset-main">
      <slot name="user-password-reset-container"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-sp-user-password-reset {
  display: flex;
  flex-direction: column;
  .pc-user-password-reset-notice {
    z-index: $z-notice-sp;
    position: fixed;
    width: 100%;
  }
  .sp-user-password-reset-main {
    padding: 60px 30px;
  }
}
</style>
