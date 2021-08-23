<template>
  <h1 class="app-title" @click="$emit('link', 'toHome')">
    <icon class="app-title-logo" :icon-text="sidebarIconText"></icon>
    <div class="app-title-line1"><span>L</span>emon</div>
    <div class="app-title-line2">
      <span>S</span><span>our</span>
      <span>DB</span>
    </div>
  </h1>
</template>

<script>
import Icon from "@/components/atoms/Icon";

export default {
  components: {
    Icon,
  },
  props: {
    sidebarIconText: String,
  },
};
</script>

<style scoped lang="scss">
.app-title {
  margin: 0 auto;
  color: $second-dark-yellow;
  width: 160px;
  height: 80px;
  letter-spacing: 1px;
  font-size: 3.3rem;
  position: relative;
  &:hover {
    cursor: pointer;
  }
  .app-title-logo {
    font-size: 2.1em;
    color: $little-deep-yellow;
    margin-right: 10px;
    position: absolute;
    left: 0;
  }
  .app-title-line1 {
    position: absolute;
    top: 18px;
    left: 30px;
    span:first-child {
      color: $base-yellow-complementary;
    }
  }
  .app-title-line2 {
    position: absolute;
    top: 52px;
    left: 18px;
    span:first-child {
      color: $base-yellow-complementary;
    }
    span:nth-child(2) {
      margin-right: 11px;
    }
    span:nth-child(3) {
      color: $base-yellow-complementary;
    }
  }
}
</style>
