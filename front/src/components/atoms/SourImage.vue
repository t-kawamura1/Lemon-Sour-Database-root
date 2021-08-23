<template>
  <img class="sour-image" :src="sourImageUrl" alt="レモンサワーの画像" />
</template>

<script>
export default {
  props: {
    sourImageUrl: String,
  },
};
</script>
