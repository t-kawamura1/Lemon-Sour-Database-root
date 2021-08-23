<template>
  <div class="unauthenticated-header-icons">
    <div
      class="unauthenticated-header-icon1"
      @click="$emit('link', headerIcons[0])"
    >
      <icon :icon-text="headerIcons[0]"></icon>
    </div>
    <div class="unauthenticated-header-icon2" @click="dropdown">
      <icon :icon-text="headerIcons[1]"></icon>
      <ul class="unauthenticated-header-icon-dropdown" :class="{ isActive }">
        <li
          class="unauthenticated-header-icon-dropdown-list"
          v-for="(dropdownFunction, index) in dropdownFunctions"
          :key="index"
          @click="$emit('modal', dropdownFunction)"
        >
          <list-dropdown :dropdown-text="dropdownFunction"></list-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/atoms/Icon";
import ListDropdown from "@/components/atoms/ListDropdown";

export default {
  components: {
    Icon,
    ListDropdown,
  },
  props: {
    headerIcons: Array,
    dropdownFunctions: Array,
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    dropdown() {
      return (this.isActive = !this.isActive);
    },
  },
};
</script>

<style scoped lang="scss">
.unauthenticated-header-icons {
  display: flex;
  height: $header-height;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  font-size: 4rem;
  .unauthenticated-header-icon1 {
    color: $little-deep-yellow;
  }
  .unauthenticated-header-icon2 {
    position: relative;
    color: $second-dark-yellow;
    .unauthenticated-header-icon-dropdown {
      position: absolute;
      display: none;
      background-color: $base-yellow;
      color: $second-dark-yellow;
      right: 0;
      list-style: none;
      padding: 0;
      .unauthenticated-header-icon-dropdown-list {
        padding: 6px 12px;
        cursor: pointer;
        border-bottom: 1px solid $second-dark-yellow;
      }
    }
    .isActive {
      display: block;
    }
  }
}
</style>
