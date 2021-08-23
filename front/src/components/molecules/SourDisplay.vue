<template>
  <div class="sour-display">
    <sour-name class="sour-display-name" :sour-name-text="sourName"></sour-name>
    <sour-image
      class="sour-display-image"
      :sour-image-url="sourImage"
    ></sour-image>
  </div>
</template>

<script>
import SourName from "@/components/atoms/SourName";
import SourImage from "@/components/atoms/SourImage";

export default {
  components: {
    SourName,
    SourImage,
  },
  props: {
    sourName: String,
    sourImage: String,
  },
};
</script>

<style scoped lang="scss">
.sour-display {
  .sour-display-name {
    font-size: 2rem;
  }
}
</style>
