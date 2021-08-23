<template>
  <div class="sour-attributes">
    <table
      v-for="(tableAttribute, index) in tableAttributes"
      :key="index"
      class="sour-attributes-table"
    >
      <sour-attribute :attribute-set="tableAttribute"></sour-attribute>
    </table>
  </div>
</template>

<script>
import SourAttribute from "@/components/atoms/SourAttribute";

export default {
  components: {
    SourAttribute,
  },
  props: {
    tableAttributes: Array,
  },
};
</script>

<style scoped lang="scss">
.sour-attributes {
  .sour-attributes-table {
    border-collapse: collapse;
    margin: 0 auto;
    padding: 0;
    width: $sour-column-width;
  }
}
</style>
