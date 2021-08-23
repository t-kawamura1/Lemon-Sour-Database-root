<template>
  <div class="button-calculation-record" @click="$emit('record')">
    {{ buttonCalcRecText }}
  </div>
</template>

<script>
export default {
  props: {
    buttonCalcRecText: String,
  },
};
</script>

<style scoped lang="scss">
.button-calculation-record {
  cursor: pointer;
  background-color: $aged-yellow;
  color: $lightest-yellow;
  border: 1px solid $aged-yellow;
  border-radius: 15px;
  padding: 9px 12px;
  &:hover {
    background-color: $lightest-yellow;
    border: 1px solid $aged-yellow;
    color: $aged-yellow;
  }
}
</style>
