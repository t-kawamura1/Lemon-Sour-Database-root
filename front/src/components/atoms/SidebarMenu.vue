<template>
  <div class="sidebar-menu">
    <div class="sidebar-menu-box">
      <div class="sidebar-menu-line1">{{ menuNameText[0] }}</div>
      <div class="sidebar-menu-line2">{{ menuNameText[1] }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuNameText: Array,
  },
};
</script>

<style scoped lang="scss">
.sidebar-menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  &::after {
    content: "";
    display: inline-block;
    width: 12px;
    height: 12px;
    border-top: solid 3px;
    border-right: solid 3px;
    transform: rotate(45deg);
    margin-right: 10px;
    color: $aged-yellow;
  }
  .sidebar-menu-box {
    width: 180px;
    .sidebar-menu-line1 {
      margin-bottom: 6px;
    }
  }
}
</style>
