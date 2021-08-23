<template>
  <div class="sp-home-title">
    <h2 class="sp-home-title-text">
      <span>L</span>emon <span>S</span>our <span>DB</span>
    </h2>
    <div class="sp-home-title-opening-text1">{{ homeTitleOpenings[0] }}</div>
    <div class="sp-home-title-opening-text2">{{ homeTitleOpenings[1] }}</div>
  </div>
</template>

<script>
export default {
  props: {
    homeTitleOpenings: Array,
  },
};
</script>

<style scoped lang="scss">
.sp-home-title {
  background: rgba(255, 255, 255, 0.4)
    url("~@/assets/image/lemon_bg_dark_rotate90.jpg") no-repeat fixed;
  background-size: 100%;
  background-blend-mode: lighten;
  padding: 120px 10px 90px;
  .sp-home-title-text {
    font-size: 4.2rem;
    font-weight: 400;
    margin-bottom: 30px;
    letter-spacing: 1px;
    color: $darkest-yellow;
    span {
      color: $light-green;
    }
  }
  .sp-home-title-opening-text1 {
    font-size: 2rem;
    margin-bottom: 10px;
    color: $light-pastel-blue;
  }
  .sp-home-title-opening-text2 {
    font-size: 2rem;
    color: $light-pastel-blue;
  }
}
</style>
