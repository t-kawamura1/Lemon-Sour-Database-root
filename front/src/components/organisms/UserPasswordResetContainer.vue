<template>
  <div class="user-password-reset-container">
    <div class="user-password-reset-container-heading">
      <slot name="user-password-reset-heading"></slot>
    </div>
    <div class="user-password-reset-container-password-reset">
      <slot name="password-reset"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-password-reset-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .user-password-reset-container-heading {
    margin-bottom: 30px;
  }
}
</style>
