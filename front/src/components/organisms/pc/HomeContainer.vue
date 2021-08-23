<template>
  <div class="pc-home-container">
    <div class="pc-home-container-home-title">
      <slot name="pc-home-title"></slot>
    </div>
    <div class="pc-home-container-home-function-items">
      <slot name="pc-home-function-items"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pc-home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.5) url("~@/assets/image/lemon_bg_dark.jpg")
    no-repeat fixed right;
  background-size: cover;
  background-blend-mode: lighten;
  padding: 90px 0 60px $sidebar-width;
}
</style>
