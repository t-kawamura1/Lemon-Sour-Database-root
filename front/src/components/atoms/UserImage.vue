<template>
  <div class="user-image">
    <img
      :src="userImageUrl"
      alt="ユーザーの画像"
      width="180"
      height="180"
      v-if="userImageUrl"
    />
    <img
      src="~@/assets/image/default.jpg"
      alt="ユーザーの画像"
      width="180"
      height="180"
      v-else
    />
  </div>
</template>

<script>
export default {
  props: {
    userImageUrl: String,
  },
};
</script>

<style scoped lang="scss">
.user-image {
  img {
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>
