<template>
  <div class="pc-sours-index-items">
    <div
      class="pc-sours-index-items-item"
      v-for="(lemonSour, index) in lemonSours"
      :key="index"
      @click="$emit('link', ['toLemonSour', lemonSour.id])"
    >
      <sour-name
        class="pc-sours-index-items-item-name"
        :sour-name-text="lemonSour.name"
      ></sour-name>
      <sour-image
        class="pc-sours-index-items-item-image"
        :sour-image-url="lemonSour.sour_image.url"
      ></sour-image>
    </div>
    <loading class="pc-sours-index-items-loading" v-show="loading"></loading>
    <error-message
      class="pc-sours-index-items-error"
      :error-message-text="errorMessage"
    ></error-message>
  </div>
</template>

<script>
import SourName from "@/components/atoms/SourName";
import SourImage from "@/components/atoms/SourImage";
import Loading from "@/components/atoms/Loading";
import ErrorMessage from "@/components/atoms/ErrorMessage";

export default {
  components: {
    SourName,
    SourImage,
    Loading,
    ErrorMessage,
  },
  props: {
    lemonSours: Array,
    loading: Boolean,
    errorMessage: String,
  },
};
</script>

<style scoped lang="scss">
.pc-sours-index-items {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  .pc-sours-index-items-item {
    width: 240px;
    height: 240px;
    border: solid 1px gray;
    border-radius: 5%;
    padding: 10px;
    margin: 0 10px 20px 0;
    .pc-sours-index-items-item-name {
      font-size: 1.5rem;
    }
    .pc-sours-index-items-item-image {
      width: 180px;
      height: 180px;
      margin: 0 auto;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .pc-sours-index-items-loading {
    position: absolute;
    left: 150px;
  }
}
</style>
