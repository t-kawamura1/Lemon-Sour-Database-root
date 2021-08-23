<template>
  <div class="sour-name">
    <div
      class="sour-name-line"
      v-for="(sourName, index) in sourNameArray"
      :key="index"
    >
      {{ sourName }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sourNameText: String,
  },
  data() {
    return {
      sourNameArray: [],
    };
  },
  created() {
    this.sourNameArray = this.sourNameText.split(" ");
  },
};
</script>

<style scoped lang="scss">
.sour-name {
  font-weight: 700;
  color: $font-color-bg-white;
  letter-spacing: 1px;
  .sour-name-line {
    margin-bottom: 6px;
  }
}
</style>
