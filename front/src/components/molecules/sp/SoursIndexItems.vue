<template>
  <div class="sp-sours-index-items">
    <div
      class="sp-sours-index-items-item"
      v-for="(lemonSour, index) in lemonSours"
      :key="index"
      @click="$emit('link', ['toLemonSour', lemonSour.id])"
    >
      <sour-name
        class="sp-sours-index-items-item-name"
        :sour-name-text="lemonSour.name"
      ></sour-name>
      <sour-image
        class="sp-sours-index-items-item-image"
        :sour-image-url="lemonSour.sour_image.url"
      ></sour-image>
    </div>
    <loading class="sp-sours-index-items-loading" v-show="loading"></loading>
    <error-message
      class="sp-sours-index-items-error"
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
.sp-sours-index-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 300px;
  .sp-sours-index-items-item {
    width: 147px;
    height: 147px;
    border: solid 1px $second-dark-yellow;
    border-radius: 5%;
    padding: 3px 1px;
    margin-bottom: 15px;
    .sp-sours-index-items-item-name {
      font-size: 1rem;
    }
    .sp-sours-index-items-item-image {
      width: 100px;
      height: 100px;
      margin: 0 auto;
    }
  }
  .sp-sours-index-items-loading {
    margin: 60px auto 0;
  }
}
</style>
