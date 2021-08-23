<template>
  <div class="sidebar">
    <div class="sidebar-title">
      <slot name="title"></slot>
    </div>
    <div class="sidebar-menus">
      <slot name="menus"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  width: $sidebar-width;
  box-shadow: 1px 0 3px $silver;
  height: 100vh;
  padding: 75px 20px 60px 20px;
  background-color: $lightest-yellow;
  .sidebar-title {
    margin-bottom: 60px;
  }
}
</style>
