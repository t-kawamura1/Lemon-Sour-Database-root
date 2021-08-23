<template>
  <div class="button-drink-today" @click="$emit('linkAndPass')">
    {{ buttonDrinkTodayText }}
  </div>
</template>

<script>
export default {
  props: {
    buttonDrinkTodayText: String,
  },
};
</script>

<style scoped lang="scss">
.button-drink-today {
  cursor: pointer;
  background-color: $aged-yellow;
  color: $lightest-yellow;
  border: 1px solid $aged-yellow;
  border-radius: 6px;
  padding: 9px 21px;
  &:hover {
    background-color: $lightest-yellow;
    border: 1px solid $aged-yellow;
    color: $aged-yellow;
  }
}
</style>
