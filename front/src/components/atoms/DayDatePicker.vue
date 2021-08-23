<template>
  <v-date-picker
    class="day-date-picker"
    v-model="date"
    :select-attribute="selectAttribute"
  >
    <template v-slot="{ inputValue, inputEvents }">
      <input
        class="day-date-picker-input"
        :value="inputValue"
        v-on="inputEvents"
      />
    </template>
  </v-date-picker>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      selectAttribute: {
        highlight: {
          class: "records-delete-highlight-bg",
          contentClass: "records-delete-highlight-content",
        },
      },
    };
  },
  watch: {
    date: {
      handler(newDate) {
        const year = newDate.getFullYear().toString();
        let month = (newDate.getMonth() + 1).toString();
        month = ("0" + month).slice(-2);
        let day = newDate.getDate();
        day = ("0" + day).slice(-2);
        const yearMonthDay = year + "-" + month + "-" + day;
        this.$emit("input", yearMonthDay);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped lang="scss">
.day-date-picker {
  .day-date-picker-input {
    border: 1px solid $second-dark-yellow;
    border-radius: 6px;
    padding: 9px;
    width: 210px;
    font-size: 1.6rem;
  }
}
</style>

<style lang="scss">
.records-delete-highlight-bg {
  background-color: $base-yellow-complementary;
}
.records-delete-highlight-content {
  color: $base-yellow;
}
</style>
