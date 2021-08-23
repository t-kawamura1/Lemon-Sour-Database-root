<template>
  <div class="unauthenticated-sidebar-menus">
    <div
      class="unauthenticated-sidebar-menu"
      v-for="(menuName, index) in menuNames"
      :key="index"
    >
      <div
        class="unauthenticated-menu-without-dropdown"
        v-if="!menuName.dropdown"
        @click="$emit('link', menuName.name)"
      >
        <sidebar-menu :menu-name-text="menuName.name"></sidebar-menu>
      </div>
      <div class="unauthenticated-menu-with-dropdown" v-else @click="dropdown">
        <sidebar-menu :menu-name-text="menuName.name"></sidebar-menu>
        <ul class="unauthenticated-menu-dropdown" :class="{ isActive }">
          <li
            class="unauthenticated-menu-dropdown-list"
            v-for="(dropdownFunction, index) in dropdownFunctions"
            :key="index"
            @click="$emit('modal', dropdownFunction)"
          >
            <list-dropdown :dropdown-text="dropdownFunction"></list-dropdown>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarMenu from "@/components/atoms/SidebarMenu";
import ListDropdown from "@/components/atoms/ListDropdown";

export default {
  components: {
    SidebarMenu,
    ListDropdown,
  },
  props: {
    menuNames: Array,
    dropdownFunctions: Array,
    currentPage: String,
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
  mounted() {
    const otherMenus = document.querySelectorAll(
      ".unauthenticated-menu-without-dropdown"
    );
    const userMenu = document.querySelector(
      ".unauthenticated-menu-with-dropdown"
    );
    if (this.currentPage == "データベース") {
      otherMenus[0].classList.add("isCurrentPage");
    } else if (this.currentPage == "計算") {
      otherMenus[1].classList.add("isCurrentPage");
    } else if (this.currentPage == "記録") {
      otherMenus[2].classList.add("isCurrentPage");
    }
    if (this.currentPage == "ユーザー") {
      userMenu.classList.add("isCurrentPage");
    }
  },
};
</script>

<style scoped lang="scss">
.unauthenticated-sidebar-menu {
  color: $second-dark-yellow;
  margin-bottom: 54px;
  &:hover {
    cursor: pointer;
  }
  .unauthenticated-menu-with-dropdown {
    position: relative;
    .unauthenticated-menu-dropdown {
      position: absolute;
      display: none;
      background-color: $base-yellow;
      color: $second-dark-yellow;
      top: 50px;
      right: -20px;
      list-style: none;
      padding: 0;
      .unauthenticated-menu-dropdown-list {
        padding: 6px 12px;
        cursor: pointer;
        border-bottom: 1px solid $aged-yellow;
      }
    }
    .isActive {
      display: block;
    }
  }
  .isCurrentPage {
    color: $aged-yellow;
  }
}
</style>
