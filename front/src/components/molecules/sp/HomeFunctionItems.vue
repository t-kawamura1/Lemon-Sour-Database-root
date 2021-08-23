<template>
  <div class="sp-home-function-items">
    <div class="sp-home-function-items-heading">{{ functionItemsHeading }}</div>
    <div class="sp-home-function-items-container">
      <div
        class="sp-home-function-items-box"
        v-for="(functionItem, index) in functionItems"
        :key="index"
      >
        <div class="sp-home-function-items-name">{{ functionItem.name }}</div>
        <icon
          class="sp-home-function-items-icon"
          :icon-text="functionItem.icon"
        ></icon>
        <div class="sp-home-function-items-text">{{ functionItem.text }}</div>
        <button-home-content
          class="sp-home-function-items-button"
          :home-content-text="functionItem.button"
          @linkOrModal="sortButton"
        ></button-home-content>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/atoms/Icon";
import ButtonHomeContent from "@/components/atoms/ButtonHomeContent";

export default {
  components: {
    Icon,
    ButtonHomeContent,
  },
  props: {
    functionItemsHeading: String,
    functionItems: Array,
  },
  methods: {
    sortButton(event) {
      if (event == this.functionItems[0].button) {
        this.$emit("link", "toLemonSours");
      } else if (event == this.functionItems[1].button) {
        this.$emit("link", "toCalculation");
      } else {
        this.$emit("modal", "ユーザー登録");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.sp-home-function-items {
  background-color: $light-pastel-blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  .sp-home-function-items-heading {
    font-size: 2.4rem;
    margin-bottom: 45px;
    &::after {
      content: "";
      display: block;
      margin-left: 165px;
      width: 40px;
      height: 6px;
      border-bottom: 5px dotted $base-yellow-complementary;
    }
  }
  .sp-home-function-items-container {
    .sp-home-function-items-box {
      width: 300px;
      height: 300px;
      padding: 30px 24px;
      margin-bottom: 15px;
      background-color: rgba(255, 244, 98, 0.9);
      border-radius: 5%;
      .sp-home-function-items-name {
        margin-bottom: 15px;
        font-weight: 700;
        font-size: 1.8rem;
      }
      .sp-home-function-items-icon {
        font-size: 6rem;
        margin-bottom: 15px;
      }
      .sp-home-function-items-text {
        font-size: 1.4rem;
        text-align: left;
        line-height: 2rem;
        margin-bottom: 24px;
      }
    }
  }
}
</style>
