<template>
  <div class="loading">
    <vue-loaders
      class="class-based-color loading-icon"
      name="pacman"
      color="currentColor"
      scale="2"
    ></vue-loaders>
    <div class="loading-text">now loading...</div>
  </div>
</template>

<style scoped lang="scss">
.loading {
  width: 220px;
  height: 150px;
  position: relative;
  .class-based-color {
    color: $base-yellow;
  }
  .loading-icon {
    position: absolute;
    top: 27px;
    left: 57px;
  }
  .loading-text {
    position: absolute;
    top: 120px;
    left: 54px;
    font-size: 2.4rem;
    color: $second-dark-yellow;
  }
}
</style>
