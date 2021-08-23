<template>
  <div class="footer-icons">
    <div
      class="footer-icons-set"
      v-for="(footerIcon, index) in footerIcons"
      :key="index"
      @click="$emit('link', footerIcon[0])"
    >
      <icon :icon-text="footerIcon[0]" class="footer-icon"></icon>
      <span class="footer-icon-title">{{ footerIcon[1] }}</span>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/atoms/Icon";

export default {
  components: {
    Icon,
  },
  props: {
    footerIcons: Array,
    currentPage: String,
  },
  mounted() {
    const footerMenus = document.querySelectorAll(".footer-icons-set");
    if (this.currentPage == "データベース") {
      footerMenus[0].classList.add("isCurrentPage");
    } else if (this.currentPage == "計算") {
      footerMenus[1].classList.add("isCurrentPage");
    } else if (this.currentPage == "記録") {
      footerMenus[2].classList.add("isCurrentPage");
    }
  },
};
</script>

<style scoped lang="scss">
.footer-icons {
  display: flex;
  height: $footer-height;
  padding: 0 15px;
  justify-content: space-around;
  align-items: center;
  color: $second-dark-yellow;
  background-color: $base-yellow;
  box-shadow: 0 -1px 3px $silver;
  .footer-icons-set {
    .footer-icon {
      font-size: 4.5rem;
      margin-bottom: 6px;
    }
    .footer-icon-title {
      font-size: 1.5rem;
    }
  }
  .isCurrentPage {
    color: $aged-yellow;
  }
}
</style>
