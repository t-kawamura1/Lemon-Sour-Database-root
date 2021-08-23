<template>
  <div class="icon">
    <font-awesome-icon class="icon-body" :icon="iconText" />
  </div>
</template>

<script>
export default {
  props: {
    iconText: String,
  },
};
</script>
