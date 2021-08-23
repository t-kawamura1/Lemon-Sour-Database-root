<template>
  <a class="button-twitter" :href="twitter" @click="generateUrl">
    <font-awesome-icon class="button-twitter-icon" :icon="['fab', 'twitter']" />
    結果をツイート
  </a>
</template>

<script>
export default {
  props: {
    pureAlc: String,
  },
  data() {
    return {
      twitter: "",
      hashtags: ["レモンサワー", "LSDB"],
    };
  },
  methods: {
    generateUrl() {
      const pageUrl = encodeURIComponent(location.origin);
      const pageTitle = "Lemon Sour DB";
      const tweetText =
        "今日の純アルコール摂取量は" +
        this.pureAlc +
        "gでした。|　" +
        pageTitle;
      const tweet = encodeURIComponent(tweetText);
      this.twitter =
        "https://twitter.com/intent/tweet?url=" +
        pageUrl +
        "&text=" +
        tweet +
        "&hashtags=" +
        this.hashtags;
    },
  },
  created() {
    this.generateUrl();
    console.log(location.origin);
  },
};
</script>

<style scoped lang="scss">
.button-twitter {
  cursor: pointer;
  background-color: $twitter;
  color: white;
  border: 1px solid $twitter;
  border-radius: 15px;
  padding: 6px 12px;
  &:hover {
    background-color: white;
    border: 1px solid $twitter;
    color: $twitter;
  }
}
</style>
