<template>
  <div class="records-sour-names">
    <text-main
      class="records-sour-names-explanation"
      :main-text="sourNamesExplanation"
    ></text-main>
    <div
      class="records-sour-names-box"
      v-for="(recordSourName, index) in recordsSourNames"
      :key="index"
    >
      <icon
        class="records-sour-names-icon"
        :class="`ranking-icon-${index + 1}`"
        :icon-text="iconRanking"
      ></icon>
      <span class="records-sour-names-rank">{{ index + 1 }}</span>
      <text-main
        class="records-sour-names-text"
        :main-text="recordSourName.name"
      ></text-main>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/atoms/Icon";
import TextMain from "@/components/atoms/TextMain";

export default {
  components: {
    Icon,
    TextMain,
  },
  props: {
    sourNamesExplanation: String,
    iconRanking: String,
    recordsSourNames: Array,
  },
};
</script>

<style scoped lang="scss">
.records-sour-names {
  .records-sour-names-explanation {
    margin-bottom: 6px;
    background-color: $base-yellow;
    color: $second-dark-yellow;
    line-height: 30px;
    height: 30px;
    border-radius: 12px;
    padding: 0 12px;
  }
  .records-sour-names-box {
    display: flex;
    position: relative;
    margin-bottom: 6px;
    padding: 0 10px;
    .records-sour-names-icon {
      font-size: 2.7rem;
      margin-right: 10px;
    }
    .ranking-icon-1 {
      color: $gold;
    }
    .ranking-icon-2 {
      color: $silver;
    }
    .ranking-icon-3 {
      color: $bronze;
    }
    .records-sour-names-rank {
      position: absolute;
      top: 7px;
      left: 22px;
      color: white;
    }
    .records-sour-names-text {
      width: 90%;
      text-align: left;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
    }
  }
}
</style>
