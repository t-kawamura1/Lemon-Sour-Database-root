<template>
  <div class="pc-selects-set">
    <form class="pc-selects-form" @submit.prevent="packSelectedValues">
      <input-select
        class="pc-input-select"
        :sort-type="selectsTypes[0]"
        :sort-values="selectsManufacturers"
        :init-value="selectsManufacturers[0]"
        @input="selectedManufacturer = $event"
      ></input-select>
      <input-select
        class="pc-input-select"
        :sort-type="selectsTypes[1]"
        :sort-values="selectsIngredients"
        :init-value="selectsIngredients[0]"
        @input="selectedIngredient = $event"
      ></input-select>
      <input-select
        class="pc-input-select"
        :sort-type="selectsTypes[2]"
        :sort-values="selectsOrders"
        :init-value="selectsOrders[0]"
        @input="selectedOrder = $event"
      ></input-select>
      <button-search class="pc-search-button"></button-search>
    </form>
    <div
      class="pc-selects-errors"
      v-for="(errorMessage, index) in errorMessages"
      :key="index"
    >
      <error-message :error-message-text="errorMessage"></error-message>
    </div>
  </div>
</template>

<script>
import InputSelect from "@/components/atoms/InputSelect";
import ErrorMessage from "@/components/atoms/ErrorMessage";
import ButtonSearch from "@/components/atoms/ButtonSearch";

export default {
  components: {
    InputSelect,
    ErrorMessage,
    ButtonSearch,
  },
  data() {
    return {
      selectedManufacturer: "",
      selectedIngredient: "",
      selectedOrder: "",
      selectedValues: [],
    };
  },
  props: {
    selectsTypes: Array,
    selectsManufacturers: Array,
    selectsIngredients: Array,
    selectsOrders: Array,
    errorMessages: Array,
  },
  methods: {
    packSelectedValues() {
      this.selectedValues.push(this.selectedManufacturer);
      this.selectedValues.push(this.selectedIngredient);
      this.selectedValues.push(this.selectedOrder);
      this.$emit("sortBy", this.selectedValues);
      this.selectedValues = [];
    },
  },
};
</script>

<style scoped lang="scss">
.pc-selects-set {
  .pc-selects-form {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
    .pc-input-select {
      padding: 9px 0 9px 3px;
      width: 150px;
      font-size: 1.5rem;
      margin: 0 6px 6px 0;
      &:hover {
        cursor: pointer;
      }
    }
    .pc-search-button {
      padding: 6px 0;
      margin-bottom: 6px;
      font-size: 1.5rem;
    }
  }
  .pc-selects-errors {
    text-align: left;
    padding-left: 15px;
  }
}
</style>
