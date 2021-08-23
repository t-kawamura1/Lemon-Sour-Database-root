<template>
  <div class="template-pc-age-confirmation">
    <div class="pc-age-confirmation-side-blank-left">
      <slot name="side-blank-left"></slot>
    </div>
    <div class="pc-age-confirmation-main">
      <slot name="age-confirmation-container"></slot>
    </div>
    <div class="pc-age-confirmation-side-blank-right">
      <slot name="side-blank-right"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-pc-age-confirmation {
  display: flex;
  flex-direction: column;
  .pc-age-confirmation-side-blank-left {
    position: fixed;
    top: 0;
    left: 0;
  }
  .pc-age-confirmation-main {
    padding: 90px 30px 60px;
    margin: 0 $sidebar-width / 2;
  }
  .pc-age-confirmation-side-blank-right {
    position: fixed;
    top: 0;
    right: 0;
  }
}
</style>
