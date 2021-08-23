<template>
  <div class="authenticated-header-icons">
    <div
      class="authenticated-header-icon1"
      @click="$emit('link', headerIcons[0])"
    >
      <icon :icon-text="headerIcons[0]"></icon>
    </div>
    <div class="authenticated-header-icon2" @click="dropdown">
      <icon :icon-text="headerIcons[1]"></icon>
      <ul class="authenticated-header-icon-dropdown" :class="{ isActive }">
        <li
          class="authenticated-header-icon-dropdown-list"
          @click="$emit('link', dropdownFunctions[0])"
        >
          <list-dropdown :dropdown-text="dropdownFunctions[0]"></list-dropdown>
        </li>
        <li
          class="authenticated-header-icon-dropdown-list"
          @click="$emit('submitUser')"
        >
          <list-dropdown :dropdown-text="dropdownFunctions[1]"></list-dropdown>
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
.authenticated-header-icons {
  display: flex;
  height: $header-height;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  font-size: 4rem;
  .authenticated-header-icon1 {
    color: $little-deep-yellow;
  }
  .authenticated-header-icon2 {
    position: relative;
    color: $second-dark-yellow;
    .authenticated-header-icon-dropdown {
      position: absolute;
      display: none;
      background-color: $base-yellow;
      color: $second-dark-yellow;
      right: 0;
      list-style: none;
      padding: 0;
      .authenticated-header-icon-dropdown-list {
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
