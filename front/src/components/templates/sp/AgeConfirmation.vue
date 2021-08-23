<template>
  <div class="template-sp-age-confirmation">
    <div class="sp-age-confirmation-main">
      <slot name="age-confirmation-container"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-sp-age-confirmation {
  display: flex;
  flex-direction: column;
  .sp-age-confirmation-main {
    padding: 90px 30px 60px;
  }
}
</style>
