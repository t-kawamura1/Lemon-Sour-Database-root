<template>
  <div class="age-confirmation-container">
    <div class="age-confirmation-container-heading">
      <slot name="age-confirmation-heading"></slot>
    </div>
    <div class="age-confirmation-container-age-confirmation">
      <slot name="age-confirmation"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.age-confirmation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .age-confirmation-container-heading {
    margin-bottom: 45px;
  }
}
</style>
