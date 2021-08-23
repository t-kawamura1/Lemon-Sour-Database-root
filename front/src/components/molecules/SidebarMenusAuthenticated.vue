<template>
  <div class="authenticated-sidebar-menus">
    <div
      class="authenticated-sidebar-menu"
      v-for="(menuName, index) in menuNames"
      :key="index"
    >
      <div
        class="authenticated-menu-without-dropdown"
        v-if="!menuName.dropdown"
        @click="$emit('link', menuName.name)"
      >
        <sidebar-menu :menu-name-text="menuName.name"></sidebar-menu>
      </div>
      <div class="authenticated-menu-with-dropdown" v-else @click="dropdown">
        <sidebar-menu :menu-name-text="menuName.name"></sidebar-menu>
        <ul class="authenticated-menu-dropdown" :class="{ isActive }">
          <li
            class="authenticated-menu-dropdown-list"
            @click="$emit('link', dropdownFunctions[0])"
          >
            <list-dropdown
              :dropdown-text="dropdownFunctions[0]"
            ></list-dropdown>
          </li>
          <li
            class="authenticated-menu-dropdown-list"
            @click="$emit('submitUser')"
          >
            <list-dropdown
              :dropdown-text="dropdownFunctions[1]"
            ></list-dropdown>
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
      ".authenticated-menu-without-dropdown"
    );
    const userMenu = document.querySelector(
      ".authenticated-menu-with-dropdown"
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
.authenticated-sidebar-menu {
  color: $second-dark-yellow;
  margin-bottom: 54px;
  &:hover {
    cursor: pointer;
    color: $aged-yellow;
  }
  .authenticated-menu-with-dropdown {
    position: relative;
    .authenticated-menu-dropdown {
      position: absolute;
      display: none;
      background-color: $base-yellow;
      color: $second-dark-yellow;
      top: 54px;
      right: -20px;
      list-style: none;
      padding: 0;
      .authenticated-menu-dropdown-list {
        padding: 9px 12px;
        cursor: pointer;
        font-weight: 700;
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
