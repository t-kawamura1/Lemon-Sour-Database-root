<template>
  <h2 class="pc-home-title">
    <div class="pc-home-title-box">
      <icon class="pc-home-title-icon" :icon-text="pcHomeTitleIcon"></icon>
      <div class="pc-home-title-text">
        <span>L</span>emon <span>S</span>our <span>DB</span>
      </div>
    </div>
    <div class="pc-home-title-opening-text1">{{ homeTitleOpenings[0] }}</div>
    <div class="pc-home-title-opening-text2">{{ homeTitleOpenings[1] }}</div>
  </h2>
</template>

<script>
import Icon from "@/components/atoms/Icon";

export default {
  components: {
    Icon,
  },
  props: {
    pcHomeTitleIcon: String,
    homeTitleOpenings: Array,
  },
};
</script>

<style scoped lang="scss">
.pc-home-title {
  width: 500px;
  .pc-home-title-box {
    margin-bottom: 30px;
    font-size: 6rem;
    font-weight: 400;
    height: 75px;
    position: relative;
    .pc-home-title-icon {
      font-size: 1.5em;
      position: absolute;
      top: -20px;
      color: $little-deep-yellow;
    }
    .pc-home-title-text {
      position: absolute;
      left: 36px;
      letter-spacing: 1px;
      color: $darkest-yellow;
      span {
        color: $light-green;
      }
      span:first-child {
        color: $base-yellow-complementary;
      }
    }
  }
  .pc-home-title-opening-text1 {
    font-size: 2.4rem;
    margin-bottom: 10px;
  }
  .pc-home-title-opening-text2 {
    font-size: 2.4rem;
    margin-bottom: 90px;
  }
}
</style>
