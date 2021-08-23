<template>
  <div class="pc-home-function-items">
    <div class="pc-home-function-items-heading">{{ functionItemsHeading }}</div>
    <div class="pc-home-function-items-container">
      <div
        class="pc-home-function-items-box"
        v-for="(functionItem, index) in functionItems"
        :key="index"
      >
        <div class="pc-home-function-items-name">{{ functionItem.name }}</div>
        <icon
          class="pc-home-function-items-icon"
          :icon-text="functionItem.icon"
        ></icon>
        <div class="pc-home-function-items-text">{{ functionItem.text }}</div>
        <button-home-content
          class="pc-home-function-items-button"
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
.pc-home-function-items {
  padding-left: 30px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  .pc-home-function-items-heading {
    font-size: 2.7rem;
    margin-bottom: 45px;
    width: 330px;
    &::after {
      content: "";
      display: block;
      margin-left: 195px;
      width: 45px;
      height: 6px;
      border-bottom: 5px dotted $base-yellow-complementary;
    }
  }
  .pc-home-function-items-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    .pc-home-function-items-box {
      width: 300px;
      height: 300px;
      padding: 30px 24px;
      margin: 0 15px 30px 0;
      background-color: rgba(255, 244, 98, 0.9);
      border-radius: 5%;
      .pc-home-function-items-name {
        margin-bottom: 15px;
        font-weight: 700;
        font-size: 1.8rem;
      }
      .pc-home-function-items-icon {
        font-size: 6rem;
        margin-bottom: 15px;
      }
      .pc-home-function-items-text {
        font-size: 1.6rem;
        text-align: left;
        line-height: 2rem;
        margin-bottom: 24px;
      }
    }
  }
}
</style>
