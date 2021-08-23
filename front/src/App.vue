<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    createTitleAndDescription(routeInstance) {
      if (routeInstance.meta.title) {
        const setTitle = routeInstance.meta.title + " | Lemon Sour DB";
        document.title = setTitle;
      } else {
        document.title = "Lemon Sour DB";
      }
      if (routeInstance.meta.desc) {
        const setDesc = routeInstance.meta.desc + " | Lemon Sour DB";
        document
          .querySelector("meta[name='description']")
          .setAttribute("content", setDesc);
      }
    },
  },
  mounted() {
    const routeInstance = this.$route;
    this.createTitleAndDescription(routeInstance);
  },
  watch: {
    $route(routeInstance) {
      this.createTitleAndDescription(routeInstance);
    },
  },
};
</script>
