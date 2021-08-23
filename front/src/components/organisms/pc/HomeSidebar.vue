<template>
  <div class="home-sidebar">
    <div class="home-sidebar-title">
      <slot name="title"></slot>
    </div>
    <div class="home-sidebar-menus">
      <slot name="menus"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-sidebar {
  width: $sidebar-width;
  box-shadow: 1px 0 3px $second-light-pastel-blue;
  height: 100vh;
  padding: 75px 20px 60px 20px;
  background-color: rgba(255, 255, 255, 0.5);
  .home-sidebar-title {
    margin-bottom: 60px;
  }
}
</style>
